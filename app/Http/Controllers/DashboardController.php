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
        $user = auth()->user();

        // ── LOGIC KHUSUS ORANG TUA ──
        if ($user->role === 'parent') {
            $children = Student::with('studentClass.schoolYear')
                ->where('user_id', $user->id)
                ->get()
                ->map(function ($child) {
                    return [
                        'id' => $child->id,
                        'full_name' => $child->full_name,
                        'nis' => $child->nis,
                        'nisn' => $child->nisn,
                        'photo' => $child->photo,
                        'class_name' => $child->studentClass ? $child->studentClass->name : null,
                        'school_year' => ($child->studentClass && $child->studentClass->schoolYear) ? $child->studentClass->schoolYear->name : null,
                    ];
                });

            // Ambil 5 kegiatan kalender akademik terdekat
            $upcoming_events = \App\Models\AcademicCalendar::whereDate('end_date', '>=', now()->toDateString())
                ->orderBy('start_date', 'asc')
                ->take(5)
                ->get();

            return Inertia::render('parent/dashboard', [
                'children' => $children,
                'upcoming_events' => $upcoming_events,
            ]);
        }

        // ── LOGIC ADMIN & GURU (Default Dashboard) ──
        // Total counts
        $total_students = Student::count();
        $total_classes = StudentClass::count();
        $total_teachers = User::where('role', 'teacher')->count(); // ← Ambil dari users
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
