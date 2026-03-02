<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $entries = $request->input('entries', 10);
        $role = $request->route('role') ?? $request->query('role');

        $users = User::query()
            ->when($role, function ($query, $role) {
                // The DB values might be 'guru' and 'kepala_sekolah'
                $query->where('role', $role);
            })
            ->when($search, function ($query, $search) {
                $query->where(function($q) use ($search) {
                    $q->where('name', 'like', '%' . $search . '%')
                      ->orWhere('email', 'like', '%' . $search . '%');
                });
            })
            ->paginate($entries)
            ->withQueryString(); // Maintain search parameters during pagination

        return Inertia::render('admin/users/index', [
            'users' => $users,
            'role' => $role, // pass role back to view so it knows what it's looking at
            'search' => $search,
            'entries' => $entries,
        ]);
    }

    

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/users/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'role' => ['required', 'in:admin,guru,kepala_sekolah'],
            'nik' => ['nullable', 'string', 'max:255'],
            'homeroom_teacher' => ['nullable', 'string', 'max:255'],
            'gender' => ['nullable', 'in:L,P'],
            'education' => ['nullable', 'string', 'max:255'],
            'photo' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
        ]);

        $photoPath = null;
        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('user_photos', 'public');
        }

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'], // tidak perlu strtolower() karena sudah divalidasi
            'nik' => $validated['nik'] ?? null,
            'homeroom_teacher' => $validated['homeroom_teacher'] ?? null,
            'gender' => $validated['gender'] ?? null,
            'education' => $validated['education'] ?? null,
            'photo' => $photoPath,
        ]);

        return $this->redirectBasedOnRole($validated['role'], 'User berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return Inertia::render('admin/users/show', [
            'user' => $user
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return Inertia::render('admin/users/edit', [
            'user' => $user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'email',
                Rule::unique('users')->ignore($user->id),
            ],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
            'role' => ['required', Rule::in(['admin', 'guru', 'kepala_sekolah'])],
            'nik' => ['nullable', 'string', 'max:255'],
            'homeroom_teacher' => ['nullable', 'string', 'max:255'],
            'gender' => ['nullable', 'in:L,P'],
            'education' => ['nullable', 'string', 'max:255'],
            'photo' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
        ]);

        $photoPath = $user->photo;
        if ($request->hasFile('photo')) {
            if ($photoPath) {
                Storage::disk('public')->delete($photoPath);
            }
            $photoPath = $request->file('photo')->store('user_photos', 'public');
        }

        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'role' => $validated['role'],
            'password' => $validated['password'] ? Hash::make($validated['password']) : $user->password,
            'nik' => $validated['nik'] ?? null,
            'homeroom_teacher' => $validated['homeroom_teacher'] ?? null,
            'gender' => $validated['gender'] ?? null,
            'education' => $validated['education'] ?? null,
            'photo' => $photoPath,
        ]);

        return $this->redirectBasedOnRole($validated['role'], 'User berhasil diperbarui.');
    }

    private function redirectBasedOnRole($role, $message) {
        $routeName = match ($role) {
            'admin' => 'admin.admins.index',
            'kepala_sekolah' => 'admin.principals.index',
            'guru' => 'admin.teachers.index',
            default => 'admin.users.index',
        };
        return to_route($routeName)->with('success', $message);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        // Cegah menghapus diri sendiri
        if (auth()->id() === $user->id) {
            return back()->with('error', 'Anda tidak dapat menghapus akun sendiri.');
        }

        $user->delete();

        return to_route('admin.users.index')->with('success', 'User berhasil dihapus.');
    }

    public function bulkDelete(Request $request)
    {
    $request->validate(['ids' => 'required|array']);
    User::whereIn('id', $request->ids)->delete();
    return to_route('admin.users.index');
    }
}
