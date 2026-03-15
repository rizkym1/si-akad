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
        'nis',
        'full_name',
        'nickname',
        'nisn',
        'place_of_birth',
        'date_of_birth',
        'gender',
        'religion',
        'family_status',
        'child_order',
        'father_name',
        'mother_name',
        'phone',
        'student_phone',
        'father_job',
        'mother_job',
        'address_street',   
        'address_village',  
        'address_district', 
        'address_city',     
        'address_province',
        'address',
        'student_address',
        'guardian_name',
        'guardian_job',
        'guardian_address',
        'previous_school',
        'accepted_date',
        'accepted_grade',
        'photo',
        'class_id',
        'user_id',
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

    /**
     * Relasi: Satu siswa memiliki banyak penilaian perkembangan anak.
     */
    

    public function schoolYear()
    {
        return $this->belongsTo(SchoolYear::class);
    }

    /**
     * Get the parent user associated with the student.
     */
    public function parentUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}