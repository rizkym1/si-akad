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
        $query = StudentClass::select('id', 'name');

        if (auth()->user()->role === 'teacher') {
            $query->where('teacher_id', auth()->id());
        }

        $kelasList = $query->get();
        
        // Default ke kelas pertama jika ada
        $selectedKelas = $request->get('class_id', $kelasList->first()?->id);

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
                    ->orderBy('full_name')
                    ->get();
            }
        }

        return Inertia::render('admin/nilai-kokurikuler/index', [
            'kelasList'     => $kelasList,
            'selectedKelas' => (string)$selectedKelas,
            'siswaList'     => $siswaList,
        ]);
    }

    /**
     * Halaman penilaian: detail 3 kriteria rapor untuk siswa tertentu
     */
    public function penilaian(string $nisn)
    {
        $student = Student::with('studentClass')->where('nisn', $nisn)->firstOrFail();

        if (auth()->user()->role === 'teacher') {
            if ($student->studentClass?->teacher_id !== auth()->id()) {
                abort(403, 'Unauthorized access to this student');
            }
        }

        $rapor = $this->rdmService->getRaporPerkembanganAnak($nisn);

        return Inertia::render('admin/nilai-kokurikuler/penilaian', [
            'student' => $student,
            'rapor'   => $rapor,
        ]);
    }
}