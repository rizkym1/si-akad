<?php

namespace App\Models\Rdm;

use Illuminate\Database\Eloquent\Model;

class KNilai extends Model
{
    protected $connection = 'rdm';
    protected $table      = 'k_nilai';
    protected $primaryKey = 'nilai_id';
    public $timestamps    = false;

    public function siswa()
    {
        return $this->belongsTo(ESiswa::class, 'siswa_id', 'siswa_id');
    }

    public function penilaian()
    {
        return $this->belongsTo(KPenilaian::class, 'penilaian_id', 'penilaian_id');
    }
}