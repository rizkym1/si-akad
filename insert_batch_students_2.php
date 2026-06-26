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
        'nis' => '240009',
        'nisn' => '3196285378',
        'full_name' => 'MUHAMMAD LUTHFI IBNU HAFIDZ',
        'gender' => 'male',
        'place_of_birth' => 'CIAMIS',
        'date_of_birth' => '2019-07-11',
        'religion' => 'Islam',
        'family_status' => 'Anak Kandung',
        'child_order' => 4,
        'student_address' => 'DUSUN TUGU, Kel. SUKASENANG, Kec. SINDANGKASIH, JAWA BARAT, 46268',
        'accepted_date' => '2024-07-15',
        'class_id' => 2,
        'school_year_id' => 1,
        'father_name' => 'ASEP DODO',
        'mother_name' => 'WARI',
        'father_job' => 'Buruh',
        'mother_job' => 'Mengurus Rumah Tangga',
    ],
    [
        'nis' => '240010',
        'nisn' => '3195329264',
        'full_name' => 'MUHAMMAD RAFI HAFIZ ALFATIH',
        'gender' => 'male',
        'place_of_birth' => 'CIAMIS',
        'date_of_birth' => '2019-05-04',
        'religion' => 'Islam',
        'family_status' => 'Anak Kandung',
        'child_order' => 2,
        'student_address' => 'DUSUN TUGU, Kel. SUKASENANG, Kec. SINDANGKASIH, JAWA BARAT, 46268',
        'accepted_date' => '2024-07-15',
        'class_id' => 2,
        'school_year_id' => 1,
        'father_name' => 'AZIS MUSLIM',
        'mother_name' => 'RINI YANTI RAHAYU',
        'father_job' => 'Buruh',
        'mother_job' => 'Mengurus Rumah Tangga',
    ],
    [
        'nis' => '240011',
        'nisn' => '3196449784',
        'full_name' => 'NABILA NUR AZIZAH',
        'gender' => 'female',
        'place_of_birth' => 'CIAMIS',
        'date_of_birth' => '2019-02-27',
        'religion' => 'Islam',
        'family_status' => 'Anak Kandung',
        'child_order' => 1,
        'student_address' => 'DUSUN SIRNAGALIH, Kel. GUNUNGCUPU, Kec. SINDANGKASIH, JAWA BARAT, 46268',
        'accepted_date' => '2024-07-15',
        'class_id' => 2,
        'school_year_id' => 1,
        'father_name' => 'ASEP SAEPULLOH',
        'mother_name' => 'SITI KHOERIAH',
        'father_job' => 'Pedagang',
        'mother_job' => 'Mengurus Rumah Tangga',
    ],
    [
        'nis' => '240012',
        'nisn' => '3192889481',
        'full_name' => 'NADIFA NURUL JANNAH',
        'gender' => 'female',
        'place_of_birth' => 'CIAMIS',
        'date_of_birth' => '2019-02-27',
        'religion' => 'Islam',
        'family_status' => 'Anak Kandung',
        'child_order' => 2,
        'student_address' => 'SIRNAGALIH, Kel. GUNUNGCUPU, Kec. SINDANGKASIH, JAWA BARAT, 46268',
        'accepted_date' => '2024-08-16',
        'class_id' => 2,
        'school_year_id' => 1,
        'father_name' => 'AEP SAEPULLOH',
        'mother_name' => 'SITI KHOERIAH',
        'father_job' => 'Pedagang',
        'mother_job' => 'Mengurus Rumah Tangga',
    ],
    [
        'nis' => '250015',
        'nisn' => '3195070489',
        'full_name' => 'NADZIFAH JAUHAR NAFISAH',
        'gender' => 'female',
        'place_of_birth' => 'CIAMIS',
        'date_of_birth' => '2019-02-06',
        'religion' => 'Islam',
        'family_status' => 'Anak Kandung',
        'child_order' => 3,
        'student_address' => 'SIRNAGALIH, Kel. GUNUNGCUPU, Kec. SINDANGKASIH, JAWA BARAT, 46268',
        'accepted_date' => '2025-07-14',
        'class_id' => 2,
        'school_year_id' => 1,
        'father_name' => 'NANANG FARIDUDIN',
        'mother_name' => 'ENUNG NURHAYATI',
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

echo "All 5 new students have been successfully inserted!\n";
