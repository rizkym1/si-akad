<?php

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Student;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

$students = [
    [
        'nis' => '250016',
        'nisn' => '3206313252',
        'full_name' => 'SHOFA NURSYIFA HASANAH',
        'gender' => 'female',
        'place_of_birth' => 'CIAMIS',
        'date_of_birth' => '2020-02-02',
        'religion' => 'Islam',
        'family_status' => 'Anak Kandung',
        'child_order' => 3,
        'student_address' => 'DUSUN SIRNAGALIH, Kel. GUNUNGCUPU, Kec. SINDANGKASIH, JAWA BARAT, 46268',
        'accepted_date' => '2025-07-14',
        'class_id' => 2,
        'school_year_id' => 1,
        'father_name' => 'MUHAMAD TOHA',
        'mother_name' => 'IIF SARIPAH S.PD',
        'father_job' => null,
        'mother_job' => 'Guru/Dosen',
    ],
    [
        'nis' => '250017',
        'nisn' => '3194469072',
        'full_name' => 'SYASHA SHIDQIA',
        'gender' => 'female',
        'place_of_birth' => 'CIAMIS',
        'date_of_birth' => '2019-09-12',
        'religion' => 'Islam',
        'family_status' => 'Anak Kandung',
        'child_order' => 3,
        'student_address' => 'DUSUN TUGU, Kel. SUKASENANG, Kec. SINDANGKASIH, JAWA BARAT, 46268',
        'accepted_date' => '2025-07-14',
        'class_id' => 2,
        'school_year_id' => 1,
        'father_name' => 'DENI HERDIANA',
        'mother_name' => 'ATIK IRAWATI',
        'father_job' => 'Pedagang',
        'mother_job' => 'Mengurus Rumah Tangga',
    ],
    [
        'nis' => '240013',
        'nisn' => '3190130709',
        'full_name' => 'YOLLA OLIVIA',
        'gender' => 'female',
        'place_of_birth' => 'CIAMIS',
        'date_of_birth' => '2019-02-07',
        'religion' => 'Islam',
        'family_status' => 'Anak Kandung',
        'child_order' => 2,
        'student_address' => 'DUSUN TUGU, Kel. SUKASENANG, Kec. SINDANGKASIH, JAWA BARAT, 46268',
        'accepted_date' => '2024-07-15',
        'class_id' => 2,
        'school_year_id' => 1,
        'father_name' => 'AGUS SANJAYA',
        'mother_name' => 'MAYASARI MAHARANI',
        'father_job' => 'Buruh',
        'mother_job' => 'Mengurus Rumah Tangga',
    ]
];

foreach ($students as $studentData) {
    $parentName = $studentData['father_name'] ?: ($studentData['mother_name'] ?: 'Orang Tua');
    $accountName = $parentName . ' (Ortu dari ' . $studentData['full_name'] . ')';
    $baseEmailStr = strtolower(preg_replace('/[^a-zA-Z0-9]/', '', $parentName));
    
    if (empty($baseEmailStr)) {
        $baseEmailStr = 'ortu' . $studentData['nisn'];
    }
    
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
    
    echo "Inserted: " . $studentData['full_name'] . "\n";
}

echo "The last 3 students for Kelompok B have been successfully inserted!\n";
