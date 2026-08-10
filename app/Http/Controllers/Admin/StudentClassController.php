<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SchoolYear;
use App\Models\StudentClass;
use App\Models\User;
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

        $entries = $request->input('entries', 10);

        $sort = $request->input('sort', 'name');
        $direction = $request->input('direction', 'asc');

        $studentClasses = StudentClass::with(['schoolYear', 'teacher'])
            ->leftJoin('school_years', 'student_classes.school_year_id', '=', 'school_years.id')
            ->select('student_classes.*')
            ->when($search, function ($query, $search) {
                $query->where('student_classes.name', 'like', '%' . $search . '%');
            })
            ->orderBy('school_years.is_active', 'desc')
            ->orderBy($sort === 'name' ? 'student_classes.name' : $sort, $direction)
            ->paginate($entries)
            ->withQueryString();

        return Inertia::render('admin/student-classes/index', [
            'studentClasses' => $studentClasses,
            'schoolYears'  => SchoolYear::orderBy('name', 'desc')->get(['id', 'name', 'is_active']),
            'teachers'     => User::where('role', 'teacher')->orderBy('name')->get(['id', 'name']),
            'search'         => $search,
            'entries'        => $request->input('entries', 10),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'             => ['required', 'string', 'max:255'],
            'school_year_id' => ['required', 'exists:school_years,id'],
            'teacher_id'     => ['nullable', 'exists:users,id'],
        ]);

        StudentClass::create($validated);

        return Redirect::route('admin.student-classes.index')->with('success', 'Kelas berhasil ditambahkan.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $studentClass = StudentClass::findOrFail($id);

        $validated = $request->validate([
            'name'             => ['required', 'string', 'max:255'],
            'school_year_id' => ['required', 'exists:school_years,id'],
            'teacher_id'     => ['nullable', 'exists:users,id'],
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
        $ids = $request->ids;
        StudentClass::whereIn('id', $ids)->delete();

        return Redirect::route('admin.student-classes.index')->with('success', 'Kelas terpilih berhasil dihapus.');
    }
}