<?php

namespace App\Services;

use App\Models\Rdm\ESiswa;
use App\Models\Rdm\KNilai;
use Illuminate\Support\Facades\DB;

class RdmService
{
    /**
     * Ambil semua proyek P5 beserta relasi tema
     */
    public function getAllProyek(): array
    {
        $list = DB::connection('rdm')
            ->table('p_proyek as p')
            ->leftJoin('p_tema as t', 'p.tema_id', '=', 't.tema_id')
            ->select(
                'p.proyek_id',
                'p.proyek_nama',
                'p.proyek_judul',
                'p.proyek_deskripsi',
                'p.kelas_id',
                't.tema_nama'
            )
            ->orderBy('p.kelas_id')
            ->get();

        return $list->map(function ($item) {
            return [
                'proyek_id'        => $item->proyek_id,
                'proyek_nama'      => $item->proyek_nama,
                'proyek_judul'     => $item->proyek_judul,
                'proyek_deskripsi' => $item->proyek_deskripsi,
                'kelas_id'         => (string) $item->kelas_id,
                'tema_nama'        => $item->tema_nama,
            ];
        })->toArray();
    }

    /**
     * Ambil semua kelas yang ada proyeknya
     */
    public function getKelasList(): array
    {
        $list = DB::connection('rdm')
            ->table('p_proyek as p')
            ->leftJoin('e_kelas as ek', 'p.kelas_id', '=', 'ek.kelas_id')
            ->select('p.kelas_id', 'ek.tingkat_id')
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
     * Ambil data elemen beserta relasinya untuk proyek tertentu
     */
    public function getElemenByProyek(int $proyekId): array
    {
        return DB::connection('rdm')
            ->table('p_target as pt')
            ->join('p_targetelemen as pte', 'pt.targetelemen_id', '=', 'pte.targetelemen_id')
            ->join('p_elemen as pe', 'pte.elemen_id', '=', 'pe.elemen_id')
            ->join('p_dimensi as pd', 'pe.dimensi_id', '=', 'pd.dimensi_id')
            ->where('pt.proyek_id', $proyekId)
            ->select(
                'pt.target_id',
                'pe.elemen_nama',
                'pd.dimensi_nama',
                'pte.targetelemen_detail'
            )
            ->get()
            ->toArray();
    }

    /**
     * Ambil data siswa beserta nilai elemen untuk proyek tertentu
     */
    public function getNilaiProyekSiswa(int $proyekId): array
    {
        $rdmData = DB::connection('rdm')
            ->table('p_nilai as pn')
            ->join('p_target as pt', 'pn.target_id', '=', 'pt.target_id')
            ->where('pt.proyek_id', $proyekId)
            ->select(
                'pn.siswa_id',
                'pn.target_id',
                'pn.nilai_data'
            )
            ->get();

        $siswaIds = $rdmData->pluck('siswa_id')->unique()->toArray();
        $students = \App\Models\Student::whereIn('id', $siswaIds)->get()->keyBy('id');

        $result = [];
        foreach ($siswaIds as $siswaId) {
            $student = $students->get($siswaId);
            $scores = $rdmData->where('siswa_id', $siswaId)->keyBy('target_id')->map(function($item) {
                return $item->nilai_data;
            })->toArray();

            $result[] = [
                'siswa_id'   => $siswaId,
                'siswa_nisn' => $student ? $student->nisn : '-',
                'siswa_nama' => $student ? $student->full_name : '-',
                'nilai'      => $scores, // Dictionary target_id => nilai_data
            ];
        }

        return collect($result)->sortBy('siswa_nama')->values()->toArray();
    }

    /**
     * Ambil detail proyek by id
     */
    public function getProyekById(int $proyekId): ?array
    {
        $item = DB::connection('rdm')
            ->table('p_proyek as p')
            ->leftJoin('p_tema as t', 'p.tema_id', '=', 't.tema_id')
            ->where('p.proyek_id', $proyekId)
            ->select(
                'p.proyek_id',
                'p.proyek_nama',
                'p.proyek_judul',
                'p.proyek_deskripsi',
                't.tema_nama'
            )
            ->first();

        if (!$item) return null;

        return [
            'proyek_id'        => $item->proyek_id,
            'proyek_nama'      => $item->proyek_nama,
            'proyek_judul'     => $item->proyek_judul,
            'proyek_deskripsi' => $item->proyek_deskripsi,
            'tema_nama'        => $item->tema_nama,
        ];
    }

    /**
     * Hapus proyek berdasarkan proyek_id
     */
    public function deleteProyek(int $proyekId): bool
    {
        try {
            $targets = DB::connection('rdm')->table('p_target')->where('proyek_id', $proyekId)->pluck('target_id')->toArray();
            if (!empty($targets)) {
                DB::connection('rdm')->table('p_nilai')->whereIn('target_id', $targets)->delete();
                DB::connection('rdm')->table('p_target')->where('proyek_id', $proyekId)->delete();
            }
            DB::connection('rdm')->table('p_proyek')->where('proyek_id', $proyekId)->delete();

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

    /**
     * Ambil rapor perkembangan anak (3 kriteria) dari RDM
     */
    public function getRaporPerkembanganAnak(string $nisn): array
    {
        $siswa = \App\Models\Student::where('nisn', $nisn)->first();

        if (!$siswa) {
            return [
                [
                    'kriteria'  => 'Nilai Agama dan Budi Pekerti',
                    'deskripsi' => null,
                ],
                [
                    'kriteria'  => 'Jati Diri',
                    'deskripsi' => null,
                ],
                [
                    'kriteria'  => 'Dasar-dasar Literasi, Matematika, Sains, Teknologi, Rekayasa, Seni',
                    'deskripsi' => null,
                ],
            ];
        }

        $rapor = DB::connection('rdm')
            ->table('e_rapor')
            ->where('siswa_id', $siswa->id)
            ->whereIn('jenisnilai_id', [1, 2, 3])
            ->orderBy('rapor_id', 'asc')
            ->get()
            ->keyBy('jenisnilai_id');

        return [
            [
                'kriteria'  => 'Nilai Agama dan Budi Pekerti',
                'deskripsi' => $rapor->has(1) ? $this->cleanDeskripsi($rapor->get(1)->rapor_deskripsi) : null,
            ],
            [
                'kriteria'  => 'Jati Diri',
                'deskripsi' => $rapor->has(2) ? $this->cleanDeskripsi($rapor->get(2)->rapor_deskripsi) : null,
            ],
            [
                'kriteria'  => 'Dasar-dasar Literasi, Matematika, Sains, Teknologi, Rekayasa, Seni',
                'deskripsi' => $rapor->has(3) ? $this->cleanDeskripsi($rapor->get(3)->rapor_deskripsi) : null,
            ],
        ];
    }

    /**
     * Rapihkan tanda baca dan kapitalisasi pada deskripsi rapor yang di-generate RDM
     */
    private function cleanDeskripsi(?string $text): ?string
    {
        if (!$text) return null;

        // 1. Perbaiki tanda baca berantakan (titik sebelum koma, koma spasi, dsb)
        $text = str_replace('.,', ',', $text);
        $text = str_replace(' ,', ',', $text);
        $text = str_replace('..', '.', $text);

        // 2. Hilangkan kata "Anak" yang redundan karena sudah ada awalan "Ananda" di UI
        $text = str_ireplace('mampu Anak ', 'mampu ', $text);
        $text = str_ireplace('perlu bimbingan dalam Anak ', 'perlu bimbingan dalam ', $text);

        // 3. Lowercase huruf kapital yang muncul di tengah kalimat setelah kata "mampu " atau "dalam "
        $text = preg_replace_callback('/(mampu |perlu bimbingan dalam )([A-Z])/', function($matches) {
            return $matches[1] . strtolower($matches[2]);
        }, $text);

        // 4. Pastikan teks diakhiri dengan tepat satu titik
        $text = rtrim($text, '., ') . '.';

        return $text;
    }
}