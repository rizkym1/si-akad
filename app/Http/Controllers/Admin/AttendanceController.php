<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\SchoolYear;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class AttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */

public function index(Request $request)
{
    $search = $request->input('search');
    $filterClassId = $request->input('class_id');

    $schoolYears = SchoolYear::orderBy('name', 'desc')
        ->get(['id', 'name', 'is_active']);
        
    $classes = \App\Models\StudentClass::select('id', 'name')->orderBy('name')->get();

    $activeSchoolYear = $request->input('school_year_id') 
        ?? $schoolYears->where('is_active', true)->first()?->id 
        ?? $schoolYears->first()?->id;

    $students = Student::query()
        ->when($search, function ($query, $search) {
            $query->where(function($q) use ($search) {
                $q->where('full_name', 'like', '%' . $search . '%')
                  ->orWhere('nisn', 'like', '%' . $search . '%');
            });
        })
        ->when($filterClassId, function ($query, $filterClassId) {
            $query->where('class_id', $filterClassId);
        })
        ->where(function ($query) use ($activeSchoolYear) {
            // Tampilkan siswa yang SAAT INI kelasnya ada di tahun ajaran yang difilter
            $query->whereHas('studentClass', function ($q) use ($activeSchoolYear) {
                $q->where('school_year_id', $activeSchoolYear);
            })
            // ATAU siswa yang sudah punya rekam jejak absensi di tahun ajaran tersebut
            ->orWhereHas('attendances', function ($q) use ($activeSchoolYear) {
                $q->where('school_year_id', $activeSchoolYear);
            });
        })
        ->with(['attendances' => function ($query) use ($activeSchoolYear) {
            $query->where('school_year_id', $activeSchoolYear);
        }])
        ->orderBy('full_name')
        ->get();

    return Inertia::render('admin/attendances/index', [
        'students'      => $students,
        'schoolYears'   => $schoolYears,
        'classes'       => $classes,
        'activeSchoolYear' => $activeSchoolYear,
        'activeClass'   => $filterClassId,
        'search'        => $search,
    ]);
}




    public function reportPdf(Request $request)
    {
        $schoolYearId = $request->query('school_year_id');
        
        $schoolYear = $schoolYearId 
            ? SchoolYear::find($schoolYearId) 
            : SchoolYear::where('is_active', true)->first();

        $schoolYearId = $schoolYear?->id ?? null;

        $recap = Student::with(['studentClass', 'attendances' => function ($query) use ($schoolYearId) {
                $query->where('school_year_id', '=', $schoolYearId);
            }])
            ->where(function ($query) use ($schoolYearId) {
                // 1. Yang saat ini berada di kelas pada tahun ajaran tersebut
                $query->whereHas('studentClass', function ($q) use ($schoolYearId) {
                    $q->where('school_year_id', $schoolYearId);
                })
                // 2. ATAU yang sudah punya data absensi di tahun ajaran tersebut
                ->orWhereHas('attendances', function ($q) use ($schoolYearId) {
                    $q->where('school_year_id', $schoolYearId);
                });
            })
            ->orderBy('full_name')
            ->get()
            ->map(function ($student) {
                $attendance = $student->attendances->first();
                return [
                    'name'      => $student->full_name,
                    'nisn'      => $student->nisn,
                    'gender'    => $student->gender,
                    'class'     => $student->studentClass?->name ?? '-',
                    'present'   => $attendance ? $attendance->present : 0,
                    'permitted' => $attendance ? $attendance->permitted : 0,
                    'sick'      => $attendance ? $attendance->sick : 0,
                    'absent'    => $attendance ? $attendance->absent : 0,
                    'total'     => $attendance ? ($attendance->present + $attendance->permitted + $attendance->sick + $attendance->absent) : 0,
                ];
            });

        $total     = $recap->sum('total');
        $present   = $recap->sum('present');
        $permitted = $recap->sum('permitted');
        $sick      = $recap->sum('sick');
        $absent    = $recap->sum('absent');

        $logoBase64 = base64_encode(file_get_contents(public_path('images/logo_alislam.png')));

        $pdf = Pdf::loadView('report-pdf-attendances', [
            'recap'       => $recap,
            'total'       => $total,
            'present'     => $present,
            'permitted'   => $permitted,
            'sick'        => $sick,
            'absent'      => $absent,
            'periode'     => $schoolYear?->name ?? 'Semua Periode',
            'logoBase64'  => $logoBase64,
        ])->setPaper('a4', 'landscape');

        return $pdf->stream('laporan-absensi-' . now()->format('Ymd') . '.pdf');
    }

    /**
     * Menyimpan/Memperbarui banyak data absensi sekaligus.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'school_year_id' => 'required|exists:school_years,id',
            'attendances' => 'required|array',
            'attendances.*.student_id' => 'required|exists:students,id',
            'attendances.*.present'    => 'nullable|integer|min:0',
            'attendances.*.sick'       => 'nullable|integer|min:0',
            'attendances.*.permitted'  => 'nullable|integer|min:0',
            'attendances.*.absent'     => 'nullable|integer|min:0',
        ]);

        $schoolYearId = $validated['school_year_id'];
        
        $upsertData = [];
        foreach ($validated['attendances'] as $attendanceData) {
            $upsertData[] = [
                'student_id'     => $attendanceData['student_id'],
                'school_year_id' => $schoolYearId,
                'present'        => $attendanceData['present'] ?? 0,
                'sick'           => $attendanceData['sick'] ?? 0,
                'permitted'      => $attendanceData['permitted'] ?? 0,
                'absent'         => $attendanceData['absent'] ?? 0,
            ];
        }

        Attendance::upsert(
            $upsertData,
            ['student_id', 'school_year_id'], // unique columns
            ['present', 'sick', 'permitted', 'absent'] // columns to update
        );

        return redirect()->back()
            ->with('success', 'Data absensi berhasil disimpan.');
    }
}
