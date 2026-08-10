<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SchoolYear;
use App\Models\Student;
use App\Models\StudentClass;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class StudentPromotionController extends Controller
{
    /**
     * Show the form for creating student promotions for a specific class.
     */
    public function create(Request $request, StudentClass $studentClass)
    {
        $studentClass->load('schoolYear');

        $students = Student::where('class_id', $studentClass->id)
            ->where('status', 'aktif')
            ->orderBy('full_name', 'asc')
            ->get();

        $schoolYears = SchoolYear::orderBy('is_active', 'desc')
            ->orderBy('name', 'desc')
            ->get(['id', 'name', 'is_active']);

        $studentClasses = StudentClass::with('schoolYear')
            ->leftJoin('school_years', 'student_classes.school_year_id', '=', 'school_years.id')
            ->orderBy('school_years.is_active', 'desc')
            ->orderBy('student_classes.name', 'asc')
            ->select('student_classes.*')
            ->get();

        return Inertia::render('admin/student-classes/promotions', [
            'sourceClass' => $studentClass,
            'students'    => $students,
            'schoolYears' => $schoolYears,
            'studentClasses' => $studentClasses,
        ]);
    }

    /**
     * Process the student promotion or graduation.
     */
    public function store(Request $request, StudentClass $studentClass)
    {
        $validated = $request->validate([
            'student_ids'                => ['required', 'array', 'min:1'],
            'student_ids.*'              => ['exists:students,id'],
            'action'                     => ['required', 'in:promote,graduate'],
            'destination_school_year_id' => ['required_if:action,promote', 'nullable', 'exists:school_years,id'],
            'destination_class_id'       => ['required_if:action,promote', 'nullable', 'exists:student_classes,id'],
        ]);

        try {
            DB::beginTransaction();

            if ($validated['action'] === 'graduate') {
                Student::whereIn('id', $validated['student_ids'])->update([
                    'status' => 'lulus'
                ]);
                $message = 'Siswa terpilih berhasil diluluskan.';
            } else {
                Student::whereIn('id', $validated['student_ids'])->update([
                    'school_year_id' => $validated['destination_school_year_id'],
                    'class_id'       => $validated['destination_class_id'],
                ]);
                $message = 'Siswa terpilih berhasil dinaikkan / dipindahkan ke kelas tujuan.';
            }

            DB::commit();

            return Redirect::route('admin.student-classes.index')->with('success', $message);
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Terjadi kesalahan saat memproses data: ' . $e->getMessage());
        }
    }
}
