<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SchoolYear extends Model
{
    protected $fillable = [
        'name',
        'is_active',
        'calendar_file',
    ];

    

    public function students()
    {
        return $this->hasMany(Student::class);
    }

    public function getCalendarFileUrlAttribute()
    {
        return $this->calendar_file ? asset('storage/' . $this->calendar_file) : null;
    }

    protected $appends = ['calendar_file_url'];

    /**
     * Relasi ke penilaian perkembangan anak
     */
    

    // Scope untuk tahun aktif
    public static function getActive()
    {
        return static::where('is_active', true)->first();
    }
}