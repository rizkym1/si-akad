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

        $activeSchoolYear = \App\Models\SchoolYear::where('is_active', true)->first();

        // Default to active school year if no filter is explicitly applied
        $selectedSchoolYearId = $request->has('school_year_id')
            ? $request->school_year_id
            : ($request->has('class_id') ? '' : ($activeSchoolYear ? (string)$activeSchoolYear->id : ''));

        $selectedClassId = $request->input('class_id', '');

        // Akses daftar siswa (view only)
        $query = Student::with(['studentClass', 'schoolYear'])
                        ->whereIn('class_id', $classIds);

        if ($selectedClassId != '') {
            $query->where('class_id', $selectedClassId);
        } elseif ($selectedSchoolYearId != '') {
            $query->whereHas('studentClass', function ($q) use ($selectedSchoolYearId) {
                $q->where('school_year_id', $selectedSchoolYearId);
            });
        }

        if ($request->has('search') && $request->search != '') {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('full_name', 'like', "%{$search}%")
                  ->orWhere('nis', 'like', "%{$search}%");
            });
        }

        $sort = $request->input('sort', 'full_name');
        $direction = $request->input('direction', 'asc');

        $entries = $request->input('entries', 10);
        $students = $query->orderBy($sort, $direction)->paginate($entries)->withQueryString();

        $school_years = \App\Models\SchoolYear::whereIn('id', $student_classes->pluck('school_year_id')->unique())
            ->orderBy('id', 'desc')
            ->get();

        return Inertia::render('teacher/students/index', [
            'students' => $students,
            'student_classes' => $student_classes,
            'school_years' => $school_years,
            'filters' => [
                'search' => $request->input('search', ''),
                'class_id' => $selectedClassId,
                'school_year_id' => $selectedSchoolYearId,
            ],
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
