<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\StudentClass;
use App\Models\AcademicCalendar;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        // Ringkasan sederhana untuk Guru
        $totalClasses = StudentClass::where('teacher_id', auth()->id())
            ->whereHas('schoolYear', function ($q) {
                $q->where('is_active', true);
            })
            ->count();
        
        $upcomingAgendas = AcademicCalendar::where('start_date', '>=', Carbon::today())
            ->orderBy('start_date', 'asc')
            ->take(3)
            ->get();

        return Inertia::render('teacher/dashboard', [
            'totalClasses' => $totalClasses,
            'upcomingAgendas' => $upcomingAgendas,
        ]);
    }
}
