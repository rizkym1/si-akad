<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SchoolYear extends Model
{
    protected $fillable = [
        'name',
        'is_active',
    ];

    

    public function students()
    {
        return $this->hasMany(Student::class);
    }

    /**
     * Relasi ke penilaian perkembangan anak
     */
    

    // Scope untuk tahun aktif
    public static function getActive()
    {
        return static::where('is_active', true)->first();
    }
}