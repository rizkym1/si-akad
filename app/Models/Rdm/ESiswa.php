<?php

namespace App\Models\Rdm;

use Illuminate\Database\Eloquent\Model;

class ESiswa extends Model
{
    protected $connection = 'rdm';
    protected $table      = 'e_siswa';
    protected $primaryKey = 'siswa_id';
    public $timestamps    = false;

    public function kNilai()
    {
        return $this->hasMany(KNilai::class, 'siswa_id', 'siswa_id');
    }

    public function eKelas()
    {
        return $this->belongsTo(EKelas::class, 'kelas_id', 'kelas_id');
    }
}