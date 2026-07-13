<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SchoolYear;
use App\Models\StudentClass;
use App\Models\Student;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class NewStudents2026Seeder extends Seeder
{
    public function run()
    {
        // 1. Buat atau Cari Tahun Pelajaran 2026/2027
        $schoolYear = SchoolYear::firstOrCreate(
            ['name' => '2026/2027'],
            ['is_active' => false]
        );

        // 2. Buat atau Cari Kelas 'Kelompok A'
        $studentClass = StudentClass::firstOrCreate(
            [
                'name' => 'Kelompok A',
                'school_year_id' => $schoolYear->id
            ]
        );

        $studentsData = [
            ['nisn' => '3207314709210001', 'nama' => 'FAJIRA SIDQIA RAHMAN', 'tempat' => 'CIAMIS', 'tanggal' => '2021-09-07', 'jk' => 'P', 'ayah' => 'ANDI RAHMAH', 'ibu' => 'YENI YULIAWATI'],
            ['nisn' => '3207316209210001', 'nama' => 'KAYRA SEPTIA ANINDIRA', 'tempat' => 'TASIKMALAYA', 'tanggal' => '2021-09-22', 'jk' => 'P', 'ayah' => 'JOHAN CARDIA', 'ibu' => 'RITA SUGIARTI'],
            ['nisn' => '3207312904210003', 'nama' => 'SYAKIR AL FATIH RAMADHAN', 'tempat' => 'CIAMIS', 'tanggal' => '2021-04-29', 'jk' => 'L', 'ayah' => 'ENDANG', 'ibu' => 'AI NURHASANAH'],
            ['nisn' => '3207312604210002', 'nama' => 'MUHAMMAD YAZRI RAZKA ALFATAH', 'tempat' => 'CIAMIS', 'tanggal' => '2021-04-26', 'jk' => 'L', 'ayah' => 'RICKY RAMDANI', 'ibu' => 'NURUL APRILIANTI'],
            ['nisn' => '3207312003200001', 'nama' => 'MUHAMMAD RAFA HAMZAH', 'tempat' => 'CIAMIS', 'tanggal' => '2020-03-20', 'jk' => 'L', 'ayah' => 'HAMBALI', 'ibu' => 'DEDAH'],
            ['nisn' => '3207311201220001', 'nama' => 'MUHAMMAD DAFFA ALSYARIF', 'tempat' => 'CIAMIS', 'tanggal' => '2021-08-27', 'jk' => 'L', 'ayah' => 'SYARIF', 'ibu' => 'SUSAN SRI SULASTRI'],
            ['nisn' => '3207311201220009', 'nama' => 'EL RUMI AKBAR ZAAHIRULHAQ', 'tempat' => 'CIAMIS', 'tanggal' => '2022-01-12', 'jk' => 'L', 'ayah' => 'ASEP RIDWAN', 'ibu' => 'SITI BALQIS'],
            ['nisn' => '3207313010200002', 'nama' => 'MUHAMMAD GHIBRAN ALHAFIZ', 'tempat' => 'CIAMIS', 'tanggal' => '2020-10-30', 'jk' => 'L', 'ayah' => 'ARIF ZULFIKAR', 'ibu' => 'DEDE HANI'],
            ['nisn' => '3207312509210001', 'nama' => 'MUHAMMAD ZAIDAN ATTAR ALFARUK', 'tempat' => 'TASIKMALAYA', 'tanggal' => '2021-06-25', 'jk' => 'L', 'ayah' => 'CECEP MULYADI', 'ibu' => 'IIS SUSANTI'],
            ['nisn' => '3207311508200002', 'nama' => 'DAFFA ARYA NUGRAHA', 'tempat' => 'CIAMIS', 'tanggal' => '2020-08-15', 'jk' => 'L', 'ayah' => 'DUDI SUPRIADI', 'ibu' => 'IDAH HIDAYANTI'],
            ['nisn' => '3207310901220021', 'nama' => 'ADNAN ELFATHAN GANI', 'tempat' => 'CIAMIS', 'tanggal' => '2022-01-09', 'jk' => 'L', 'ayah' => 'DENDI RAMDAN', 'ibu' => 'AI TRESNA HERDIANAH'],
            ['nisn' => '3207311401220001', 'nama' => 'MUHAMMAD FARIZ', 'tempat' => 'CIAMIS', 'tanggal' => '2022-01-14', 'jk' => 'L', 'ayah' => 'DEDI IRAWAN', 'ibu' => 'EMAH'],
            ['nisn' => '3207312211200002', 'nama' => 'DEVAN DIKA PRATAMA', 'tempat' => 'CIAMIS', 'tanggal' => '2021-11-20', 'jk' => 'L', 'ayah' => 'HADI SISWANTO', 'ibu' => 'TIKA SEPTIYANI'],
            ['nisn' => '3207312206200001', 'nama' => 'BARA ATHARRAZKA NUGRAHA', 'tempat' => 'CIAMIS', 'tanggal' => '2020-06-22', 'jk' => 'L', 'ayah' => 'RAPID AKBAR NUGRAHA', 'ibu' => 'MAYA IRMAYANTI'],
            ['nisn' => '3207310105210003', 'nama' => 'DANIYAL RAMADHAN', 'tempat' => 'CIAMIS', 'tanggal' => '2021-05-01', 'jk' => 'L', 'ayah' => 'HAERUDIN', 'ibu' => 'AI SURYATI'],
            ['nisn' => '3207311206200001', 'nama' => 'DIAS AGARA', 'tempat' => 'CIAMIS', 'tanggal' => '2020-06-12', 'jk' => 'L', 'ayah' => 'IWAN SETIAWAN', 'ibu' => 'EULIS MARPUAH'],
            ['nisn' => '3207310504200001', 'nama' => 'MUHAMAD AKBAR', 'tempat' => 'BANDUNG', 'tanggal' => '2020-04-05', 'jk' => 'L', 'ayah' => 'DEDE SUPRIATNA', 'ibu' => 'YAYU RAHAYU'],
            ['nisn' => '3207312910200002', 'nama' => 'MUHAMMAD FAYYADH ABIL RASYAD', 'tempat' => 'CIAMIS', 'tanggal' => '2020-10-29', 'jk' => 'L', 'ayah' => 'IRFAN FIRMANSYAH', 'ibu' => 'YUNI SRIWAHYUNI'],
            ['nisn' => '3207311712200002', 'nama' => 'MUHAMMAD HAIDAR ABIMANA', 'tempat' => 'TASIKMALAYA', 'tanggal' => '2020-12-17', 'jk' => 'L', 'ayah' => 'DEDE YUYU WAHYU, S.E', 'ibu' => 'NOVI LISDAYANI'],
            ['nisn' => '3207315305210001', 'nama' => 'NAZLA ANINDIRA ADIBA', 'tempat' => 'CIAMIS', 'tanggal' => '2021-05-13', 'jk' => 'P', 'ayah' => 'ERUL SAEPUL RAMDHANI', 'ibu' => 'YORI FAUZIAH'],
            ['nisn' => '3207314612210001', 'nama' => 'HILYA KARIMATUN NISA', 'tempat' => 'CIAMIS', 'tanggal' => '2021-12-06', 'jk' => 'P', 'ayah' => 'DUDUNG HIDAYAT', 'ibu' => 'RENI NURAAFIFAH'],
            ['nisn' => '3207310710200001', 'nama' => 'DADIN SAEPULOH', 'tempat' => 'CIAMIS', 'tanggal' => '2020-10-07', 'jk' => 'L', 'ayah' => 'DADANG SAEPUL MIKDAR', 'ibu' => 'ETIN SUPRIATIN'],
            ['nisn' => '3207312010200004', 'nama' => 'MUHAMMAD ARGA SAPUTRA', 'tempat' => 'CIAMIS', 'tanggal' => '2020-10-20', 'jk' => 'L', 'ayah' => 'HARYADI', 'ibu' => 'ICAH'],
        ];

        foreach ($studentsData as $data) {
            // Kita coba buat akun User untuk orang tuanya juga jika belum ada
            $user = User::firstOrCreate(
                ['email' => strtolower(str_replace(' ', '', $data['nama'])) . '@student.com'],
                [
                    'name' => $data['ayah'],
                    'password' => Hash::make('password123'),
                    'role' => 'parent',
                    'nik' => $data['nisn'] // Ini adalah NIK orangtua
                ]
            );

            Student::updateOrCreate(
                [
                    'full_name' => $data['nama'],
                    'school_year_id' => $schoolYear->id,
                ],
                [
                'place_of_birth' => $data['tempat'],
                'date_of_birth' => $data['tanggal'],
                'gender' => $data['jk'] == 'L' ? 'male' : 'female',
                'father_name' => $data['ayah'],
                'mother_name' => $data['ibu'],
                'class_id' => $studentClass->id,
                'user_id' => $user->id,
                'status' => 'aktif',
                'nisn' => null
            ]);
        }
    }
}
