<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\StudentClass;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function index(Request $request)
    {
        $teacherId = auth()->id();
        $student_classes = StudentClass::where('teacher_id', $teacherId)->get();
        $classIds = $student_classes->pluck('id')->toArray();

        // Akses daftar siswa (view only)
        $query = Student::with(['studentClass', 'schoolYear'])
                        ->whereIn('class_id', $classIds);

        if ($request->has('class_id') && $request->class_id != '') {
            $query->where('class_id', $request->class_id);
        }

        if ($request->has('search') && $request->search != '') {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('full_name', 'like', "%{$search}%")
                  ->orWhere('nisn', 'like', "%{$search}%");
            });
        }

        $entries = $request->input('entries', 10);
        $students = $query->paginate($entries)->withQueryString();

        return Inertia::render('teacher/students/index', [
            'students' => $students,
            'student_classes' => $student_classes,
            'filters' => $request->only(['search', 'class_id']),
        ]);
    }

    public function show(Student $student)
    {
        // Detail siswa (bisa melihat kontak ortu)
        $student->load(['studentClass.schoolYear', 'parentUser']);
        
        return Inertia::render('teacher/students/detail', [
            'student' => $student
        ]);
    }
}
