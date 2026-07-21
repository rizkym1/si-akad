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
     * Menampilkan Penilaian anak/nilai anak.
     */
    public function index(Student $student)
    {
        if ($student->user_id !== auth()->id()) {
            abort(403, 'Anda tidak memiliki akses ke data akademik anak ini.');
        }
        $student->load(['studentClass.schoolYear']);
        
        $rapor = $this->rdmService->getRaporPerkembanganAnak($student->nisn);

        return Inertia::render('parent/academic-records/index', [
            'student' => $student,
            'rapor'   => $rapor,
        ]);
    }
}
