<?php

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Student;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

$studentData = [
    'nis' => '240003',
    'nisn' => '3186404777',
    'full_name' => 'ALESHA MAULIDA',
    'gender' => 'female',
    'place_of_birth' => 'CIAMIS',
    'date_of_birth' => '2018-11-11',
    'religion' => 'Islam',
    'family_status' => 'Anak Kandung',
    'child_order' => 2,
    'student_address' => 'DUSUN RANJI RATA, Kel. CIMARI, Kec. CIKONENG, JAWA BARAT, 46268',
    'accepted_date' => '2024-07-15',
    'class_id' => 2,
    'school_year_id' => 1,
    'father_name' => 'DEDE MULYADI',
    'mother_name' => 'ANTI ROSTIANTI',
    'father_job' => 'Buruh',
    'mother_job' => 'Mengurus Rumah Tangga',
];

$parentName = 'DEDE MULYADI';
$accountName = $parentName . ' (Ortu dari ALESHA MAULIDA)';
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

echo "Student ALESHA MAULIDA has been successfully inserted!\n";
