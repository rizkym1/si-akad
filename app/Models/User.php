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

    // Class connection
    public function studentClasses(): HasMany
    {
        return $this->hasMany(StudentClass::class, 'teacher_id');
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
     * The accessors to append to the model's array form.
     *
     * @var list<string>
     */
    protected $appends = [
        'occupation',
        'phone',
        'address',
        'religion',
    ];

    /**
     * Get the children (students) associated with the parent user.
     */
    public function children(): HasMany
    {
        return $this->hasMany(Student::class, 'user_id');
    }

    /**
     * Get the occupation attribute (pekerjaan orang tua dari siswa terkait).
     */
    public function getOccupationAttribute()
    {
        if ($this->role !== 'parent') {
            return $this->attributes['occupation'] ?? null;
        }

        if (!empty($this->attributes['occupation'])) {
            return $this->attributes['occupation'];
        }

        $child = $this->children->first();
        if (!$child) {
            return null;
        }

        $cleanName = trim(explode('(Ortu dari', $this->name)[0]);
        if ($child->father_name && stripos($cleanName, trim($child->father_name)) !== false) {
            return $child->father_job;
        } elseif ($child->mother_name && stripos($cleanName, trim($child->mother_name)) !== false) {
            return $child->mother_job;
        } elseif ($child->guardian_name && stripos($cleanName, trim($child->guardian_name)) !== false) {
            return $child->guardian_job;
        }

        if ($this->gender === 'P' && !empty($child->mother_job)) {
            return $child->mother_job;
        }

        return $child->father_job ?: $child->mother_job ?: $child->guardian_job;
    }

    /**
     * Get the phone attribute (nomor telepon dari siswa terkait).
     */
    public function getPhoneAttribute()
    {
        if (!empty($this->attributes['phone'])) {
            return $this->attributes['phone'];
        }

        if ($this->role === 'parent') {
            $child = $this->children->first();
            if ($child) {
                return $child->phone ?: $child->student_phone;
            }
        }

        return null;
    }

    /**
     * Get the address attribute (alamat dari siswa terkait).
     */
    public function getAddressAttribute()
    {
        if (!empty($this->attributes['address'])) {
            return $this->attributes['address'];
        }

        if ($this->role === 'parent') {
            $child = $this->children->first();
            if ($child) {
                if (!empty($child->student_address)) {
                    return $child->student_address;
                }
                $parts = array_filter([
                    $child->address_street,
                    $child->address_village ? 'Kel. ' . $child->address_village : null,
                    $child->address_district ? 'Kec. ' . $child->address_district : null,
                    $child->address_city,
                    $child->address_province,
                ]);
                return !empty($parts) ? implode(', ', $parts) : null;
            }
        }

        return null;
    }

    /**
     * Get the religion attribute (agama).
     */
    public function getReligionAttribute()
    {
        if (!empty($this->attributes['religion'])) {
            return $this->attributes['religion'];
        }

        if ($this->role === 'parent') {
            $child = $this->children->first();
            if ($child && !empty($child->religion)) {
                return $child->religion;
            }
            return 'Islam';
        }

        return null;
    }

    /**
     * Get the gender attribute (jenis kelamin).
     */
    public function getGenderAttribute($value)
    {
        if (!empty($value)) {
            return $value;
        }

        if ($this->role === 'parent') {
            $child = $this->children->first();
            if ($child) {
                $cleanName = trim(explode('(Ortu dari', $this->name)[0]);
                if ($child->father_name && stripos($cleanName, trim($child->father_name)) !== false) {
                    return 'L';
                }
                if ($child->mother_name && stripos($cleanName, trim($child->mother_name)) !== false) {
                    return 'P';
                }
            }
        }

        return $value;
    }
}
