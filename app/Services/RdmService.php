<?php

namespace App\Services;

use App\Models\Rdm\ESiswa;
use App\Models\Rdm\KNilai;
use Illuminate\Support\Facades\DB;

class RdmService
{
   /**
 * Ambil semua penilaian beserta relasi dplpc + kelas dari koordinator
 */
public function getAllPenilaian(): array
{
    $list = DB::connection('rdm')
        ->table('k_penilaian as p')
        ->leftJoin('k_dplpc as d', 'p.dplpc_id', '=', 'd.dplpc_id')
        ->leftJoin('k_koordinator as k', 'p.koordinator_id', '=', 'k.koordinator_id')
        ->leftJoin('e_kelas as ek', 'k.kelas_id', '=', 'ek.kelas_id')
        ->select(
            'p.penilaian_id',
            'p.penilaian_deskripsi',
            'p.koordinator_id',
            'k.kelas_id as koor_kelas_id',
            'ek.tingkat_id',
            'd.dplpc_id',
            'd.dplpc_nama',
            'd.dplpc_type',
        )
        ->orderBy('k.kelas_id')
        ->orderBy('d.dplpc_id')
        ->get();

    return $list->map(function ($item) {
        return [
            'penilaian_id'       => $item->penilaian_id,
            'penilaian_deskripsi'=> $item->penilaian_deskripsi,
            'koordinator_id'     => $item->koordinator_id,
            'koor_kelas_id'      => (string) $item->koor_kelas_id,
            'kelas_nama'         => 'Kelas ' . $item->tingkat_id,
            'dplpc_id'           => $item->dplpc_id,
            'dplpc_nama'         => $item->dplpc_nama,
            'dplpc_type'         => $item->dplpc_type,
        ];
    })->toArray();
}

    /**
 * Ambil semua kelas yang ada di koordinator
 */
public function getKelasList(): array
{
    $list = DB::connection('rdm')
        ->table('k_koordinator as k')
        ->leftJoin('e_kelas as ek', 'k.kelas_id', '=', 'ek.kelas_id')
        ->select('k.kelas_id', 'ek.tingkat_id')
        ->distinct()
        ->orderBy('ek.tingkat_id')
        ->get();

    return $list->map(function ($item) {
        return [
            'kelas_id'   => (string) $item->kelas_id,
            'kelas_nama' => 'Kelas ' . $item->tingkat_id,
        ];
    })->toArray();
}

    /**
     * Ambil data siswa beserta nilai untuk penilaian tertentu
     */
    public function getSiswaNilaiByPenilaian(int $penilaianId): array
    {
        return DB::connection('rdm')
            ->table('k_nilai as kn')
            ->leftJoin('e_siswa as s', 'kn.siswa_id', '=', 's.siswa_id')
            ->where('kn.penilaian_id', $penilaianId)
            ->select(
                's.siswa_id',
                's.siswa_nisn',
                's.siswa_nama',
                'kn.nilai_id',
                'kn.nilai_data',
            )
            ->orderBy('s.siswa_nama')
            ->get()
            ->toArray();
    }

    /**
 * Ambil detail penilaian by id
 */
public function getPenilaianById(int $penilaianId): ?array
{
    $item = DB::connection('rdm')
        ->table('k_penilaian as p')
        ->leftJoin('k_dplpc as d', 'p.dplpc_id', '=', 'd.dplpc_id')
        ->leftJoin('k_koordinator as k', 'p.koordinator_id', '=', 'k.koordinator_id')
        ->leftJoin('e_kelas as ek', 'k.kelas_id', '=', 'ek.kelas_id')
        ->where('p.penilaian_id', $penilaianId)
        ->select(
            'p.penilaian_id',
            'p.penilaian_deskripsi',
            'p.koordinator_id',
            'k.kelas_id as koor_kelas_id',
            'ek.tingkat_id',
            'd.dplpc_nama',
            'd.dplpc_type',
        )
        ->first();

    if (!$item) return null;

    return [
        'penilaian_id'        => $item->penilaian_id,
        'penilaian_deskripsi' => $item->penilaian_deskripsi,
        'koordinator_id'      => $item->koordinator_id,
        'koor_kelas_id'       => (string) $item->koor_kelas_id,
        'kelas_nama'          => 'Kelas ' . $item->tingkat_id,
        'dplpc_nama'          => $item->dplpc_nama,
        'dplpc_type'          => $item->dplpc_type,
    ];
}

    /**
     * Hapus penilaian berdasarkan penilaian_id
     */
    public function deletePenilaian(int $penilaianId): bool
    {
        try {
            // Hapus nilai siswa yang terkait dulu
            DB::connection('rdm')
                ->table('k_nilai')
                ->where('penilaian_id', $penilaianId)
                ->delete();

            // Baru hapus penilaian
            DB::connection('rdm')
                ->table('k_penilaian')
                ->where('penilaian_id', $penilaianId)
                ->delete();

            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * Ambil semua nilai (untuk keperluan lain)
     */
    public function getAllNilai(): array
    {
        return KNilai::with(['siswa', 'penilaian'])
            ->get()
            ->map(function ($nilai) {
                return [
                    'nama_siswa'          => $nilai->siswa?->siswa_nama,
                    'nisn'                => $nilai->siswa?->siswa_nisn,
                    'penilaian_deskripsi' => $nilai->penilaian?->penilaian_deskripsi,
                    'nilai_data'          => $nilai->nilai_data,
                ];
            })
            ->toArray();
    }

    /**
     * Ambil nilai siswa berdasarkan NISN
     */
    public function getNilaiBySiswa(string $nisn): array
    {
        $siswa = ESiswa::where('siswa_nisn', $nisn)
            ->with(['kNilai.penilaian', 'eKelas'])
            ->first();

        if (!$siswa) return [];

        return [
            'siswa' => [
                'nisn'  => $siswa->siswa_nisn,
                'nama'  => $siswa->siswa_nama,
                'kelas' => $siswa->eKelas?->kelas_nama,
            ],
            'nilai' => $siswa->kNilai->map(function ($nilai) {
                return [
                    'penilaian_deskripsi' => $nilai->penilaian?->penilaian_deskripsi,
                    'nilai_data'          => $nilai->nilai_data,
                    'predikat'            => $this->getPredikat($nilai->nilai_data),
                ];
            })->toArray(),
        ];
    }

    /**
     * Konversi nilai angka ke predikat
     */
    public function getPredikat(int $nilai): string
    {
        return match (true) {
            $nilai >= 4 => 'BSB',
            $nilai == 3 => 'BSH',
            $nilai == 2 => 'MB',
            default     => 'BB',
        };
    }
}