<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Attendance;
use App\Models\Student;
use App\Models\StudentClass;
use App\Models\SchoolYear;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    public function index(Request $request)
    {
        $teacherId = auth()->id();
        $schoolYears = SchoolYear::all();
        $classes = StudentClass::where('teacher_id', $teacherId)->get();
        
        $classIds = $classes->pluck('id')->toArray();

        $activeSchoolYear = SchoolYear::where('is_active', true)->first();
        $targetSchoolYearId = $request->school_year_id ?? ($activeSchoolYear ? $activeSchoolYear->id : null);
        $targetClassId = $request->class_id ?? ($classIds[0] ?? null);
        $targetDate = $request->date ?? date('Y-m-d'); // Default hari ini
        $search = $request->search ?? '';

        $studentsQuery = Student::query()
            ->whereIn('class_id', $classIds)
            ->with(['studentClass', 'dailyAttendances' => function($q) use ($targetSchoolYearId, $targetDate) {
                if ($targetSchoolYearId) {
                    $q->where('school_year_id', $targetSchoolYearId);
                }
                $q->where('date', $targetDate);
            }]);

        if ($targetSchoolYearId) {
            $studentsQuery->whereHas('studentClass', function ($q) use ($targetSchoolYearId) {
                $q->where('school_year_id', $targetSchoolYearId);
            });
        }
        if ($targetClassId) {
            $studentsQuery->where('class_id', $targetClassId);
        }
        if ($search) {
            $studentsQuery->where('full_name', 'like', "%{$search}%");
        }

        $students = $studentsQuery->get();

        return Inertia::render('teacher/attendances/index', [
            'students' => $students,
            'schoolYears' => $schoolYears,
            'classes' => $classes,
            'activeSchoolYear' => $targetSchoolYearId,
            'activeDate' => $targetDate,
            'activeClass' => $targetClassId,
            'search' => $search
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'school_year_id' => 'required|exists:school_years,id',
            'date'           => 'required|date',
            'attendances'    => 'required|array',
            'attendances.*.student_id' => 'required|exists:students,id',
            'attendances.*.status'     => 'required|in:present,sick,permitted,absent',
            'attendances.*.notes'      => 'nullable|string',
        ]);

        $schoolYearId = $request->school_year_id;
        $date = $request->date;
        $month = (int)date('n', strtotime($date));
        $teacherId = auth()->id();
        $classIds = StudentClass::where('teacher_id', $teacherId)->pluck('id')->toArray();

        // 1. Simpan Absensi Harian
        foreach ($request->attendances as $row) {
            $student = Student::find($row['student_id']);
            if (!$student || !in_array($student->class_id, $classIds)) {
                continue;
            }

            \App\Models\DailyAttendance::updateOrCreate(
                [
                    'student_id'     => $row['student_id'],
                    'date'           => $date,
                ],
                [
                    'school_year_id' => $schoolYearId,
                    'status'         => $row['status'],
                    'notes'          => $row['notes'] ?? null,
                ]
            );

            // 2. Otomatis rekap bulanan untuk integrasi dengan view PDF Admin & Orang Tua
            // Hitung total dari sebulan tersebut untuk siswa ini
            $monthlyData = \App\Models\DailyAttendance::selectRaw('
                COUNT(CASE WHEN status = "present" THEN 1 END) as present,
                COUNT(CASE WHEN status = "sick" THEN 1 END) as sick,
                COUNT(CASE WHEN status = "permitted" THEN 1 END) as permitted,
                COUNT(CASE WHEN status = "absent" THEN 1 END) as absent
            ')
            ->where('student_id', $row['student_id'])
            ->where('school_year_id', $schoolYearId)
            ->whereMonth('date', $month)
            ->whereYear('date', date('Y', strtotime($date)))
            ->first();

            Attendance::updateOrCreate(
                [
                    'student_id'     => $row['student_id'],
                    'school_year_id' => $schoolYearId,
                    'month'          => $month,
                ],
                [
                    'present'   => $monthlyData->present ?? 0,
                    'sick'      => $monthlyData->sick ?? 0,
                    'permitted' => $monthlyData->permitted ?? 0,
                    'absent'    => $monthlyData->absent ?? 0,
                ]
            );
        }

        return redirect()->back()->with('success', 'Data absensi tanggal ' . date('d F Y', strtotime($date)) . ' berhasil disimpan!');
    }
}
