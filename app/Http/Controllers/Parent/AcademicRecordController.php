<?php
namespace App\Http\Controllers\Parent;
use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Services\RdmService;
use Illuminate\Http\Request;
use Inertia\Inertia;
class AcademicRecordController extends Controller
{
    public function __construct(protected RdmService $rdmService) {}
    /**
     * Menampilkan riwayat akademik/nilai anak.
     */
    public function index(Student $student)
    {
        if ($student->user_id !== auth()->id()) {
            abort(403, 'Anda tidak memiliki akses ke data akademik anak ini.');
        }
        $student->load(['studentClass.schoolYear']);
        
        $records = [];
        
        if ($student->nisn) {
            $rdmResult = $this->rdmService->getNilaiBySiswa($student->nisn);
            
            if (!empty($rdmResult['nilai'])) {
                foreach ($rdmResult['nilai'] as $idx => $n) {
                    $records[] = [
                        'id' => $idx + 1,
                        'penilaian_id' => $idx + 1,
                        'nisn' => $rdmResult['siswa']['nisn'] ?? $student->nisn,
                        'nama_siswa' => $rdmResult['siswa']['nama'] ?? $student->full_name,
                        'nama_rombel' => $rdmResult['siswa']['kelas'] ?? ($student->studentClass?->name ?? '-'),
                        'predikat' => $n['predikat'],
                        'deskripsi' => 'Capaian kompetensi ' . $n['predikat'] . ' (' . $n['nilai_data'] . ')',
                        'penilaian' => [
                            'id' => $idx + 1,
                            'tanggal_kegiatan' => null, // RDM tak menyimpan tgl spesifik
                            'nama_kegiatan' => $n['penilaian_deskripsi'] ?: 'Evaluasi Berkala',
                            'lokasi_kegiatan' => 'Sekolah',
                        ],
                    ];
                }
            }
        }
        return Inertia::render('parent/academic-records/index', [
            'student' => $student,
            'records' => $records,
        ]);
    }
}
