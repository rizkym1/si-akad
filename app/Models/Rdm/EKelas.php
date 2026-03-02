<?php

namespace App\Models\Rdm;

use Illuminate\Database\Eloquent\Model;

class EKelas extends Model
{
    protected $connection = 'rdm';
    protected $table      = 'e_kelas';
    protected $primaryKey = 'kelas_id';
    public $timestamps    = false;

    public function siswa()
    {
        return $this->hasMany(ESiswa::class, 'kelas_id', 'kelas_id');
    }
}