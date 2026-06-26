<?php

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Student;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

$studentData = [
    'nis' => '101232070048210007',
    'nisn' => null,
    'full_name' => 'FAISAL MAULANA',
    'gender' => 'male',
    'place_of_birth' => 'CIAMIS',
    'date_of_birth' => '2015-01-24',
    'religion' => 'Islam',
    'family_status' => 'Anak Kandung',
    'child_order' => 1,
    'student_address' => 'DSN SIRNAGALIH RT. 040/019',
    'accepted_date' => '2021-07-12',
    'class_id' => 6, // Kelompok B for 2021/2022
    'school_year_id' => 4, // 2021/2022
    'father_name' => 'DENI ISWARA',
    'mother_name' => 'NURHIDAYAH',
    'father_job' => 'Pedagang',
    'mother_job' => 'Mengurus Rumah Tangga',
];

$parentName = 'DENI ISWARA';
$accountName = $parentName . ' (Ortu dari FAISAL MAULANA)';
$baseEmailStr = strtolower(preg_replace('/[^a-zA-Z0-9]/', '', $parentName));
$uniqueEmail = $baseEmailStr . '@gmail.com';
$counter = 1;
while (User::where('email', $uniqueEmail)->exists()) {
    $uniqueEmail = $baseEmailStr . $counter . '@gmail.com';
    $counter++;
}

$newUser = User::create([
    'name' => $accountName,
    'email' => $uniqueEmail,
    'password' => Hash::make('password'),
    'role' => 'parent',
]);

$studentData['user_id'] = $newUser->id;

Student::create($studentData);

echo "Student FAISAL MAULANA has been successfully inserted!\n";
