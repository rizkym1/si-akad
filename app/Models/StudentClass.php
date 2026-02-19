<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class StudentClass extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     */
    protected $table = 'student_classes';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'academic_year_id',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Relationships
    public function students(): HasMany
    {
        return $this->hasMany(Student::class, 'class_id');
    }

    public function academicYear()
    {
        return $this->belongsTo(AcademicYear::class);
    }
}