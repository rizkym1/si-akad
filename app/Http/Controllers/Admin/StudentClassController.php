<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\StudentClass;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class StudentClassController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');

        $studentClasses = StudentClass::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', '%' . $search . '%')
                      ->orWhere('nisn', 'like', '%' . $search . '%');
            })
            ->paginate(10)
            ->withQueryString(); // Pertahankan parameter pencarian saat pagination

        return Inertia::render('admin/student-classes/index', [
            'studentClasses' => $studentClasses,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'academic_year' => ['required', 'string', 'max:20'], // Contoh: "2024/2025"
        ]);

        StudentClass::create($validated);

        return Redirect::route('admin.student-classes.index')->with('success', 'Kelas berhasil ditambahkan.');
    }

    /**
     * Update the specified resource in storage.
     * Digunakan untuk modal edit (tanpa halaman edit tersendiri)
     */
    public function update(Request $request, string $id)
    {
        $studentClass = StudentClass::findOrFail($id);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'academic_year' => ['required', 'string', 'max:20'],
        ]);

        $studentClass->update($validated);

        return Redirect::route('admin.student-classes.index')->with('success', 'Kelas berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $studentClass = StudentClass::findOrFail($id);
        $studentClass->delete();

        return Redirect::route('admin.student-classes.index')->with('success', 'Kelas berhasil dihapus.');
    }

    /**
     * Bulk delete selected resources.
     */
    public function bulkDelete(Request $request)
    {
        $ids = $request->ids; // Array of IDs
        StudentClass::whereIn('id', $ids)->delete();

        return Redirect::route('admin.student-classes.index')->with('success', 'Kelas terpilih berhasil dihapus.');
    }

}
