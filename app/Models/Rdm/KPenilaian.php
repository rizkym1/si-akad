<?php

namespace App\Models\Rdm;

use Illuminate\Database\Eloquent\Model;

class KPenilaian extends Model
{
    protected $connection = 'rdm';
    protected $table      = 'k_penilaian';
    protected $primaryKey = 'penilaian_id';
    public $timestamps    = false;

    public function kNilai()
    {
        return $this->hasMany(KNilai::class, 'penilaian_id', 'penilaian_id');
    }
}