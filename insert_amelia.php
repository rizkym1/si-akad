<?php

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Student;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

$studentData = [
    'nis' => '240004',
    'nisn' => '3196018725',
    'full_name' => 'AMELIA RAHMA JULIANTI',
    'gender' => 'female',
    'place_of_birth' => 'CIAMIS',
    'date_of_birth' => '2019-07-01',
    'religion' => 'Islam',
    'family_status' => 'Anak Kandung',
    'child_order' => 2,
    'student_address' => 'DUSUN SUBANG, Kel. GUNUNGCUPU, Kec. SINDANGKASIH, JAWA BARAT, 46268',
    'accepted_date' => '2024-07-15',
    'class_id' => 2,
    'school_year_id' => 1,
    'father_name' => 'SANUSI',
    'mother_name' => 'RAHMAWATI',
    'father_job' => 'Sopir/Masinis',
    'mother_job' => 'Mengurus Rumah Tangga',
];

$parentName = 'SANUSI';
$accountName = $parentName . ' (Ortu dari AMELIA RAHMA JULIANTI)';
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

echo "Student AMELIA RAHMA JULIANTI has been successfully inserted!\n";
