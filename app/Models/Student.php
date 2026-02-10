<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Student extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'full_name',
        'nickname',
        'nisn',
        'place_of_birth',
        'date_of_birth',
        'gender',
        'religion',
        'child_order',
        'father_name',
        'mother_name',
        'phone',
        'father_job',
        'mother_job',
        'address',
        'guardian_name',
        'guardian_job',
        'guardian_address',
        'photo',
        'class_id',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'date_of_birth' => 'date:Y-m-d',
        'child_order' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * The attributes that should be mutated to dates.
     */
    protected $dates = [
        'date_of_birth',
    ];

    // Relationships
    public function studentClass(): BelongsTo
    {
        return $this->belongsTo(StudentClass::class, 'class_id');
    }

    /**
     * Relasi: Satu siswa memiliki banyak absensi.
     */
    public function attendances(): HasMany
    {
        return $this->hasMany(Attendance::class);
    }
}