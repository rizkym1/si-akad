<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Admin
        User::create([
            'name'     => 'Admin',
            'email'    => 'admin@ra-alislam.test',
            'password' => Hash::make('admin123'),
            'role'     => 'admin',
        ]);

        // Guru
        User::create([
            'name'     => 'Guru',
            'email'    => 'guru@ra-alislam.test',
            'password' => Hash::make('guru123'),
            'role'     => 'guru',
        ]);

        // Kepala Sekolah
        User::create([
            'name'     => 'Kepala Sekolah',
            'email'    => 'kepsek@ra-alislam.test',
            'password' => Hash::make('kepsek123'),
            'role'     => 'kepala_sekolah',
        ]);
    }
}
