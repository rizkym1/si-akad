<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\RdmService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NilaiKokurikulerController extends Controller
{
    public function __construct(protected RdmService $rdmService) {}

    /**
     * Halaman index: daftar penilaian
     */
    public function index(Request $request)
{
    $penilaian = collect($this->rdmService->getAllPenilaian());
    $kelasList = $this->rdmService->getKelasList();

    // Default ke kelas pertama
    $selectedKelas = $request->get('kelas_id', $kelasList[0]['kelas_id'] ?? null);

    // Filter berdasarkan kelas yang dipilih
    if ($selectedKelas) {
        $penilaian = $penilaian->filter(
            fn($p) => (string)$p['koor_kelas_id'] === (string)$selectedKelas
        )->values();
    }

    return Inertia::render('admin/nilai-kokurikuler/index', [
        'penilaian'     => $penilaian,
        'kelasList'     => $kelasList,
        'selectedKelas' => (string)$selectedKelas,
    ]);
}

    /**
     * Halaman penilaian: daftar siswa + nilai per penilaian
     */
    public function penilaian(int $penilaianId)
    {
        $detail  = $this->rdmService->getPenilaianById($penilaianId);
        $siswaList = $this->rdmService->getSiswaNilaiByPenilaian($penilaianId);

        return Inertia::render('admin/nilai-kokurikuler/penilaian', [
            'detail'    => $detail,
            'siswaList' => $siswaList,
        ]);
    }
}