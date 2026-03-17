<?php

namespace App\Http\Controllers\Parent;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\Attendance;
use App\Models\SchoolYear;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    /**
     * Menampilkan rekap kehadiran untuk orang tua.
     */
    public function index(Request $request)
    {
        $user = auth()->user();
        
        $children    = Student::where('user_id', $user->id)->get(['id', 'full_name', 'nisn']);
        $schoolYears = SchoolYear::orderBy('name', 'desc')->get(['id', 'name', 'is_active']);
        
        $selectedStudentId = $request->query('student_id', $children->first()?->id);
        
        $activeSchoolYear = $request->query('school_year_id') 
            ?? $schoolYears->where('is_active', true)->first()?->id 
            ?? $schoolYears->first()?->id;

        $monthStr = $request->query('month');
        $activeMonth = $monthStr !== null ? (int) $monthStr : 0; // 0 = Semua Bulan

        $summary = ['present' => 0, 'sick' => 0, 'permission' => 0, 'absent' => 0];
        $monthlyRecords = [];
        
        if ($selectedStudentId) {
            $isValidChild = $children->contains('id', $selectedStudentId);
            
            if ($isValidChild) {
                // Fetch query based on school year
                $query = Attendance::where('student_id', $selectedStudentId)
                                 ->where('school_year_id', $activeSchoolYear);
                
                // Get all raw records for the table below (1-12)
                $allRecordsThisYear = $query->get();
                $monthlyRecords = $allRecordsThisYear->keyBy('month')->toArray();

                // Build summary based on activeMonth
                if ($activeMonth > 0) {
                    $record = $allRecordsThisYear->where('month', $activeMonth)->first();
                    if ($record) {
                        $summary['present']    = $record->present;
                        $summary['sick']       = $record->sick;
                        $summary['permission'] = $record->permitted;
                        $summary['absent']     = $record->absent;
                    }
                } else {
                    $summary['present']    = $allRecordsThisYear->sum('present');
                    $summary['sick']       = $allRecordsThisYear->sum('sick');
                    $summary['permission'] = $allRecordsThisYear->sum('permitted');
                    $summary['absent']     = $allRecordsThisYear->sum('absent');
                }
            } else {
                abort(403);
            }
        }

        return Inertia::render('parent/attendances/index', [
            'children'       => $children,
            'schoolYears'    => $schoolYears,
            'filters'        => [
                'student_id'    => $selectedStudentId ? (int)$selectedStudentId : null,
                'school_year_id'=> $activeSchoolYear ? (int)$activeSchoolYear : null,
                'month'         => $activeMonth,
            ],
            'summary'        => $summary,
            'monthlyRecords' => (object)$monthlyRecords,
            'hasData'        => array_sum($summary) > 0,
        ]);
    }
}
