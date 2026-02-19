<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AcademicYear extends Model
{
    protected $fillable = [
        'name',
        'start_date',
        'end_date',
        'is_active',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date'   => 'date',
        'is_active'  => 'boolean',
    ];

    public function students()
    {
        return $this->hasMany(Student::class);
    }

    // Scope untuk tahun aktif
    public static function getActive()
    {
        return static::where('is_active', true)->first();
    }
}