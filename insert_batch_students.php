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
        'nis' => '250014',
        'nisn' => '3186781982',
        'full_name' => 'ANNISA NURRUL QOLBY',
        'gender' => 'female',
        'place_of_birth' => 'CIAMIS',
        'date_of_birth' => '2018-12-27',
        'religion' => 'Islam',
        'family_status' => 'Anak Kandung',
        'child_order' => 2,
        'student_address' => 'DUSUN TUGU, Kel. SUKASENANG, Kec. SINDANGKASIH, JAWA BARAT, 46268',
        'accepted_date' => '2025-07-14',
        'class_id' => 2,
        'school_year_id' => 1,
        'father_name' => 'HENDI',
        'mother_name' => 'SITI AISAH',
        'father_job' => 'Buruh',
        'mother_job' => null,
    ],
    [
        'nis' => '240005',
        'nisn' => '3205309254',
        'full_name' => 'AZKIA ZAHRA NURSIFA',
        'gender' => 'female',
        'place_of_birth' => 'CIAMIS',
        'date_of_birth' => '2020-04-05',
        'religion' => 'Islam',
        'family_status' => 'Anak Kandung',
        'child_order' => 2,
        'student_address' => 'SIRNAGALIH, Kel. GUNUNGCUPU, Kec. SINDANGKASIH, JAWA BARAT, 46268',
        'accepted_date' => '2024-07-15',
        'class_id' => 2,
        'school_year_id' => 1,
        'father_name' => 'CECEP SAHARA',
        'mother_name' => 'SITI MARDIANAH',
        'father_job' => 'Buruh',
        'mother_job' => 'Mengurus Rumah Tangga',
    ],
    [
        'nis' => '240006',
        'nisn' => '3198820898',
        'full_name' => 'HAFIZ NAJWAN',
        'gender' => 'male',
        'place_of_birth' => 'CIAMIS',
        'date_of_birth' => '2019-10-25',
        'religion' => 'Islam',
        'family_status' => 'Anak Kandung',
        'child_order' => 2,
        'student_address' => 'DUSUN SUBANG, Kel. GUNUNGCUPU, Kec. SINDANGKASIH, JAWA BARAT, 46268',
        'accepted_date' => '2024-07-15',
        'class_id' => 2,
        'school_year_id' => 1,
        'father_name' => 'DODO HENDRA',
        'mother_name' => 'ATIN SUPRIATIN',
        'father_job' => null,
        'mother_job' => 'Mengurus Rumah Tangga',
    ],
    [
        'nis' => '240007',
        'nisn' => '3199037426',
        'full_name' => 'HANIF HUSNI RAMADHAN',
        'gender' => 'male',
        'place_of_birth' => 'CIAMIS',
        'date_of_birth' => '2019-05-28',
        'religion' => 'Islam',
        'family_status' => 'Anak Kandung',
        'child_order' => 3,
        'student_address' => 'DUSUN SUBANG, Kel. GUNUNGCUPU, Kec. SINDANGKASIH, JAWA BARAT, 46268',
        'accepted_date' => '2024-08-15',
        'class_id' => 2,
        'school_year_id' => 1,
        'father_name' => 'EDI SUPRIADI',
        'mother_name' => 'ENTIK TATI',
        'father_job' => 'Buruh',
        'mother_job' => 'Mengurus Rumah Tangga',
    ],
    [
        'nis' => '240008',
        'nisn' => '3196993818',
        'full_name' => 'HILYA DWI ANNAURI',
        'gender' => 'female',
        'place_of_birth' => 'CIAMIS',
        'date_of_birth' => '2019-05-02',
        'religion' => 'Islam',
        'family_status' => 'Anak Kandung',
        'child_order' => 2,
        'student_address' => 'DUSUN TUGU, Kel. SUKASENANG, Kec. SINDANGKASIH, JAWA BARAT, 46268',
        'accepted_date' => '2024-07-15',
        'class_id' => 2,
        'school_year_id' => 1,
        'father_name' => 'JAJANG SURYANA',
        'mother_name' => 'IMAS RAHMAWATI',
        'father_job' => 'Wiraswasta/Wirausaha',
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

echo "All 5 students have been successfully inserted!\n";
