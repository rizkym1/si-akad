<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get an active class and school year if any
        $classId = DB::table('student_classes')->inRandomOrder()->value('id');
        $schoolYearId = DB::table('school_years')->inRandomOrder()->value('id');

        $names = [
            ['Budi Santoso', 'L', 'Budi'],
            ['Aisyah Putri', 'P', 'Aisyah'],
            ['Achmad Faisal', 'L', 'Achmad'],
            ['Siti Nurhaliza', 'P', 'Siti'],
            ['Rizky Ramadhan', 'L', 'Rizky'],
            ['Nadia Salsabila', 'P', 'Nadia'],
            ['Dimas Anggara', 'L', 'Dimas'],
            ['Putri Maharani', 'P', 'Putri'],
            ['Kevin Julian', 'L', 'Kevin'],
            ['Zahra Larasati', 'P', 'Zahra']
        ];

        $students = [];

        foreach ($names as $index => $person) {
            $students[] = [
                'nis' => (string) str_pad(mt_rand(1000, 9999), 5, '0', STR_PAD_LEFT),
                'nisn' => (string) str_pad(mt_rand(1000000000, 2000000000), 10, '0', STR_PAD_LEFT),
                'full_name' => $person[0],
                'nickname' => $person[2],
                'place_of_birth' => 'Bandung',
                'date_of_birth' => now()->subYears(6)->subDays(mt_rand(1, 300))->format('Y-m-d'),
                'gender' => $person[1] === 'L' ? 'male' : 'female',
                'religion' => 'Islam',
                'family_status' => 'Anak Kandung',
                'child_order' => $index % 3 + 1,
                'father_name' => 'Ayah ' . $person[0],
                'mother_name' => 'Ibu ' . $person[0],
                'phone' => '0812' . mt_rand(10000000, 99999999),
                'father_job' => 'Wiraswasta',
                'mother_job' => 'Ibu Rumah Tangga',
                'address_street' => 'Jl. Merdeka No. ' . ($index + 1),
                'address_village' => 'Suka Maju',
                'address_district' => 'Kecamatan Tengah',
                'address_city' => 'Kota Bandung',
                'address_province' => 'Jawa Barat',
                'student_address' => 'Jl. Merdeka No. ' . ($index + 1),
                'previous_school' => 'TK BINTANG',
                'accepted_date' => now()->subMonths(6)->format('Y-m-d'),
                'accepted_grade' => 'TK A',
                'class_id' => $classId,
                'school_year_id' => $schoolYearId,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        DB::table('students')->insert($students);
    }
}
