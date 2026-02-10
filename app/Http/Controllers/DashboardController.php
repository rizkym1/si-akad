<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\StudentClass;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Total counts
        $total_students = Student::count();
        $total_classes = StudentClass::count();
        $total_teachers = User::where('role', 'guru')->count(); // ← Ambil dari users
        $total_subjects = 0; // Nanti ganti setelah ada tabel subjects

        // Siswa berdasarkan gender
        $students_by_gender = [
            'male' => Student::where('gender', 'male')->count(),
            'female' => Student::where('gender', 'female')->count(),
        ];

        // Siswa berdasarkan kelas
        $students_by_class = DB::table('students')
            ->join('student_classes', 'students.class_id', '=', 'student_classes.id')
            ->select('student_classes.name as class_name', DB::raw('count(*) as student_count'))
            ->groupBy('student_classes.id', 'student_classes.name')
            ->orderBy('student_count', 'desc')
            ->get();

        // 5 Siswa terbaru
        $recent_students = Student::with('studentClass')
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($student) {
                return [
                    'id' => $student->id,
                    'full_name' => $student->full_name,
                    'nisn' => $student->nisn,
                    'class_name' => $student->studentClass ? $student->studentClass->name : null,
                    'created_at' => $student->created_at,
                ];
            });

        return Inertia::render('dashboard', [
            'total_students' => $total_students,
            'total_classes' => $total_classes,
            'total_teachers' => $total_teachers,
            'total_subjects' => $total_subjects,
            'students_by_gender' => $students_by_gender,
            'students_by_class' => $students_by_class,
            'recent_students' => $recent_students,
        ]);
    }
}
