<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\StudentClass;
use App\Services\RdmService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NilaiKokurikulerController extends Controller
{
    public function __construct(protected RdmService $rdmService) {}

    /**
     * Halaman index: daftar siswa lokal
     */
    public function index(Request $request)
    {
        $query = StudentClass::select('id', 'name', 'school_year_id');

        if (auth()->user()->role === 'teacher') {
            $query->where('teacher_id', auth()->id());
        }

        $kelasList = $query->get();
        
        $school_years = \App\Models\SchoolYear::whereIn('id', $kelasList->pluck('school_year_id')->unique())
            ->orderBy('name', 'desc')
            ->get();

        // Cari default kelas: utamakan dari tahun ajaran aktif, jika tidak ada, ambil dari tahun ajaran terbaru
        $activeYear = $school_years->where('is_active', true)->first() ?? $school_years->first();
        $defaultKelasId = $kelasList->where('school_year_id', $activeYear?->id)->first()?->id;

        $selectedKelas = $request->get('class_id', $defaultKelasId);

        $siswaList = [];
        if ($selectedKelas) {
            // Pastikan jika teacher, kelas yang dipilih benar-benar miliknya (validasi ekstra)
            $isValidClass = true;
            if (auth()->user()->role === 'teacher') {
                $isValidClass = $kelasList->contains('id', $selectedKelas);
            }

            if ($isValidClass) {
                $siswaList = Student::where('class_id', $selectedKelas)
                    ->select('id', 'nisn', 'full_name')
                    ->orderBy($request->input('sort', 'full_name'), $request->input('direction', 'asc'))
                    ->get();
            }
        }

        // school_years sudah diambil di atas

        return Inertia::render('admin/nilai-kokurikuler/index', [
            'kelasList'     => $kelasList,
            'school_years'  => $school_years,
            'selectedKelas' => (string)$selectedKelas,
            'siswaList'     => $siswaList,
        ]);
    }

    /**
     * Halaman penilaian: detail 3 kriteria rapor untuk siswa tertentu
     */
    public function penilaian(string $id)
    {
        $student = Student::with('studentClass')->findOrFail($id);

        if (auth()->user()->role === 'teacher') {
            if ($student->studentClass?->teacher_id !== auth()->id()) {
                abort(403, 'Unauthorized access to this student');
            }
        }

        $rapor = $this->rdmService->getRaporPerkembanganAnak($student->nisn);

        return Inertia::render('admin/nilai-kokurikuler/penilaian', [
            'student' => $student,
            'rapor'   => $rapor,
        ]);
    }
}