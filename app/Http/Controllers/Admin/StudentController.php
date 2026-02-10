<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\StudentClass;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');

        $students = Student::query()
            ->when($search, function ($query, $search) {
                $query->where('full_name', 'like', '%' . $search . '%')
                      ->orWhere('nisn', 'like', '%' . $search . '%');
            })
            ->paginate(10)
            ->withQueryString(); // Pertahankan parameter pencarian saat pagination

        return Inertia::render('admin/students/index', [
            'students' => $students,
        ]);
    }

    

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/students/create', [
        'student_classes' => StudentClass::all(['id', 'name', 'academic_year']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
public function store(Request $request)
{
    $validated = $request->validate([
        'full_name' => ['required', 'string', 'max:255'],
        'nickname' => ['nullable', 'string', 'max:255'],
        'place_of_birth' => ['nullable', 'string', 'max:255'],
        'nisn' => ['required', 'string', 'max:255', 'unique:students,nisn'],
        'date_of_birth' => ['required', 'date'],
        'gender' => ['nullable', 'in:male,female'],
        'religion' => ['nullable', 'string', 'max:255'],
        'child_order' => ['nullable', 'integer', 'min:1'],
        'father_name' => ['nullable', 'string', 'max:255'],
        'mother_name' => ['nullable', 'string', 'max:255'],
        'phone' => ['nullable', 'string', 'max:255'],
        'father_job' => ['nullable', 'string', 'max:255'],
        'mother_job' => ['nullable', 'string', 'max:255'],
        'address' => ['nullable', 'string'],
        'guardian_name' => ['nullable', 'string', 'max:255'],
        'guardian_job' => ['nullable', 'string', 'max:255'],
        'guardian_address' => ['nullable', 'string'],
        'class_id' => ['nullable', 'exists:student_classes,id'],
        'photo' => ['nullable', 'image', 'max:2048'], // maks 2MB, hanya gambar
    ]);

    // Handle upload foto
    $photoPath = null;
    if ($request->hasFile('photo')) {
        $photoPath = $request->file('photo')->store('students/photos', 'public');
    }

    Student::create(array_merge($validated, [
        'photo' => $photoPath, // simpan path relatif
    ]));

    return to_route('admin.students.index')->with('success', 'Siswa berhasil ditambahkan.');
}


    public function show($id)
{
    $student = Student::with('studentClass')->findOrFail($id);
    
    return Inertia::render('admin/students/detail', [
        'student' => $student
    ]);
}


    /**
     * Display the specified resource.
     */
    public function edit(Student $student)
    {
        
        return Inertia::render('admin/students/edit', [
            'student' => $student,
            'student_classes' => StudentClass::all(['id', 'name', 'academic_year']),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
{
    $student = Student::findOrFail($id);

    $validated = $request->validate([
        'full_name' => ['required', 'string', 'max:255'],
        'nickname' => ['nullable', 'string', 'max:255'],
        'place_of_birth' => ['nullable', 'string', 'max:255'],
        // Menambahkan pengecualian ID pada unique validation
        'nisn' => ['required', 'string', 'max:255', 'unique:students,nisn,' . $student->id],
        'date_of_birth' => ['required', 'date'],
        'gender' => ['nullable', 'in:male,female'],
        'religion' => ['nullable', 'string', 'max:255'],
        'child_order' => ['nullable', 'integer', 'min:1'],
        'father_name' => ['nullable', 'string', 'max:255'],
        'mother_name' => ['nullable', 'string', 'max:255'],
        'phone' => ['nullable', 'string', 'max:255'],
        'father_job' => ['nullable', 'string', 'max:255'],
        'mother_job' => ['nullable', 'string', 'max:255'],
        'address' => ['nullable', 'string'],
        'guardian_name' => ['nullable', 'string', 'max:255'],
        'guardian_job' => ['nullable', 'string', 'max:255'],
        'guardian_address' => ['nullable', 'string'],
        // Ganti 'classes' menjadi 'student_classes' jika Anda sudah me-rename tabelnya
        'class_id' => ['nullable', 'exists:student_classes,id'], 
        'photo' => ['nullable', 'image', 'max:2048'],
    ]);

    // Handle Upload Foto
    if ($request->hasFile('photo')) {
        // Hapus foto lama dari storage jika ada
        if ($student->photo) {
            Storage::disk('public')->delete($student->photo);
        }
        // Simpan foto baru dan update array $validated
        $validated['photo'] = $request->file('photo')->store('students/photos', 'public');
    } else {
        // Pastikan photo lama tidak terhapus jika tidak ada upload baru
        unset($validated['photo']);
    }

    $student->update($validated);

    return redirect()->route('admin.students.index')->with('success', 'Siswa berhasil diperbarui.');
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
{
    $student = Student::findOrFail($id);

    // Hapus file foto dari storage jika ada
    if ($student->photo) {
        Storage::disk('public')->delete($student->photo);
    }

    // Hapus data dari database
    $student->delete();

    return Redirect::route('admin.students.index')->with('success', 'Data siswa berhasil dihapus.');
}

public function bulkDelete(Request $request)
{
    $ids = $request->ids; // Array of IDs
    $students = Student::whereIn('id', $ids)->get();

    foreach ($students as $student) {
        if ($student->photo) {
            Storage::disk('public')->delete($student->photo);
        }
        $student->delete();
    }

    return Redirect::route('admin.students.index')->with('success', 'Data siswa terpilih berhasil dihapus.');
}


}
