<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Sanctum\HasApiTokens;
class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'photo',
        'nik',
        'homeroom_teacher',
        'gender',
        'education',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

     // Scope untuk filter guru
    public function scopeTeachers($query)
    {
        return $query->where('role', 'teacher');
    }

    // Scope untuk filter admin
    public function scopeAdmins($query)
    {
        return $query->where('role', 'admin');
    }

    // Scope untuk filter parents
    public function scopeParents($query)
    {
        return $query->where('role', 'parent');
    }

    // Helper method untuk cek role
    public function isTeacher()
    {
        return $this->role === 'teacher';
    }

    public function isAdmin()
    {
        return $this->role === 'admin';
    }

    public function isParent()
    {
        return $this->role === 'parent';
    }

    /**
     * Get the children (students) associated with the parent user.
     */
    public function children(): HasMany
    {
        return $this->hasMany(Student::class, 'user_id');
    }
}
