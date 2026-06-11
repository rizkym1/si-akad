<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DummyStudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create('id_ID');
        
        $schoolYear = \App\Models\SchoolYear::first();
        $classes = \App\Models\StudentClass::all();

        for ($i = 0; $i < 30; $i++) {
            // 1. Create a parent user
            $parentName = $faker->name();
            $parentEmail = 'orangtua' . $faker->unique()->randomNumber(5, true) . '@gmail.com';
            
            $parentUser = \App\Models\User::create([
                'name' => $parentName,
                'email' => $parentEmail,
                'password' => \Illuminate\Support\Facades\Hash::make('password'),
                'role' => 'parent',
                'nik' => $faker->nik(),
                'gender' => $faker->randomElement(['L', 'P']),
                'education' => $faker->randomElement(['SMA', 'D3', 'S1', 'S2']),
                'email_verified_at' => now(),
            ]);

            // 2. Create the student
            $gender = $faker->randomElement(['male', 'female']);
            $studentClassId = $classes->count() > 0 ? $classes->random()->id : null;
            
            \App\Models\Student::create([
                'nis' => $faker->unique()->numerify('#####'),
                'nisn' => $faker->unique()->numerify('##########'),
                'full_name' => $faker->firstName($gender == 'male' ? 'male' : 'female') . ' ' . $faker->lastName(),
                'nickname' => $faker->firstName($gender == 'male' ? 'male' : 'female'),
                'place_of_birth' => $faker->city(),
                'date_of_birth' => $faker->dateTimeBetween('-6 years', '-4 years')->format('Y-m-d'),
                'gender' => $gender,
                'religion' => 'Islam',
                'family_status' => 'Anak Kandung',
                'child_order' => $faker->numberBetween(1, 3),
                'father_name' => $parentUser->gender == 'L' ? $parentUser->name : $faker->name('male'),
                'mother_name' => $parentUser->gender == 'P' ? $parentUser->name : $faker->name('female'),
                'father_job' => $faker->jobTitle(),
                'mother_job' => $faker->jobTitle(),
                'address_street' => $faker->streetAddress(),
                'address_village' => $faker->citySuffix(),
                'address_district' => $faker->city(),
                'address_city' => $faker->city(),
                'address_province' => $faker->state(),
                'student_address' => $faker->address(),
                'previous_school' => '-',
                'accepted_date' => now()->format('Y-m-d'),
                'accepted_grade' => 'Kelompok A',
                'class_id' => $studentClassId,
                'user_id' => $parentUser->id,
                'school_year_id' => $schoolYear ? $schoolYear->id : null,
            ]);
        }
    }
}
