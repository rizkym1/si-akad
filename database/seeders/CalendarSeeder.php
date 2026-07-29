<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\AcademicCalendar;

class CalendarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Bersihkan data sebelumnya (opsional, tapi disarankan agar data baru tidak tumpang tindih)
        DB::table('academic_calendars')->truncate();

        $events = [
            // JULI 2026
            ['title' => 'Awal Masuk Tahun Ajaran 2026/2027', 'start_date' => '2026-07-14', 'end_date' => '2026-07-14', 'type' => 'event'],
            ['title' => 'Pengenalan Lingkungan Madrasah', 'start_date' => '2026-07-14', 'end_date' => '2026-07-19', 'type' => 'event'],

            // AGUSTUS 2026
            ['title' => 'HUT Kemerdekaan RI', 'start_date' => '2026-08-17', 'end_date' => '2026-08-17', 'type' => 'holiday'],
            ['title' => 'Maulid Nabi Muhammad SAW', 'start_date' => '2026-08-25', 'end_date' => '2026-08-25', 'type' => 'holiday'],

            // NOVEMBER - DESEMBER 2026
            ['title' => 'Rentang ASAS Gasal', 'start_date' => '2026-11-23', 'end_date' => '2026-12-05', 'type' => 'event'],
            
            // DESEMBER 2026
            ['title' => 'Pengolahan Nilai Raport', 'start_date' => '2026-12-07', 'end_date' => '2026-12-17', 'type' => 'event'],
            ['title' => 'Penyerahan Laporan Hasil Belajar Semester Gasal', 'start_date' => '2026-12-18', 'end_date' => '2026-12-19', 'type' => 'event'],
            ['title' => 'Libur Semester Gasal', 'start_date' => '2026-12-21', 'end_date' => '2026-12-31', 'type' => 'holiday'],
            ['title' => 'Kelahiran Yesus Kristus dan Cuti Bersama', 'start_date' => '2026-12-25', 'end_date' => '2026-12-26', 'type' => 'holiday'],

            // JANUARI 2027
            ['title' => 'Tahun Baru Masehi', 'start_date' => '2027-01-01', 'end_date' => '2027-01-01', 'type' => 'holiday'],
            ['title' => 'Libur Semester Gasal', 'start_date' => '2027-01-01', 'end_date' => '2027-01-02', 'type' => 'holiday'],
            ['title' => 'Hari Amal Bakti (HAB) Kementerian Agama RI', 'start_date' => '2027-01-03', 'end_date' => '2027-01-03', 'type' => 'holiday'],
            ['title' => 'Awal Masuk Semester Genap Tahun Ajaran 2026/2027', 'start_date' => '2027-01-04', 'end_date' => '2027-01-04', 'type' => 'event'],
            ['title' => 'Peringatan Isra Mi\'raj Nabi Muhammad saw.', 'start_date' => '2027-01-05', 'end_date' => '2027-01-05', 'type' => 'holiday'],

            // FEBRUARI 2027
            ['title' => 'Tahun Baru Imlek', 'start_date' => '2027-02-06', 'end_date' => '2027-02-06', 'type' => 'holiday'],

            // MARET 2027
            ['title' => 'Libur seputar Hari Raya Idulfitri 1448 H', 'start_date' => '2027-03-06', 'end_date' => '2027-03-13', 'type' => 'holiday'],
            ['title' => 'Hari Raya Nyepi', 'start_date' => '2027-03-09', 'end_date' => '2027-03-09', 'type' => 'holiday'],
            ['title' => 'Hari Raya Idulfitri 1448 H (menyesuaikan dengan ketetapan pemerintah)', 'start_date' => '2027-03-10', 'end_date' => '2027-03-11', 'type' => 'holiday'],
            ['title' => 'Wafat Isa Almasih', 'start_date' => '2027-03-26', 'end_date' => '2027-03-26', 'type' => 'holiday'],

            // MARET - MEI 2027 (Digabung karena berkesinambungan 29 Mar - 31 Mar, 1 Apr - 30 Apr, 1 Mei - 15 Mei)
            ['title' => 'Rentang Waktu Ujian Madrasah', 'start_date' => '2027-03-29', 'end_date' => '2027-05-15', 'type' => 'event'],

            // MEI 2027
            ['title' => 'Kenaikan Isa Almasih', 'start_date' => '2027-05-06', 'end_date' => '2027-05-06', 'type' => 'holiday'],
            ['title' => 'Perkiraan Rentang Waktu ASAS Genap', 'start_date' => '2027-05-24', 'end_date' => '2027-05-30', 'type' => 'event'],

            // JUNI 2027
            ['title' => 'Hari Lahir Pancasila', 'start_date' => '2027-06-01', 'end_date' => '2027-06-01', 'type' => 'holiday'],
            ['title' => 'Perkiraan Rentang Waktu ASAS Genap', 'start_date' => '2027-06-02', 'end_date' => '2027-06-05', 'type' => 'event'],
            ['title' => 'Pengolahan Nilai Raport', 'start_date' => '2027-06-08', 'end_date' => '2027-06-17', 'type' => 'event'],
            ['title' => 'Penyerahan Laporan Hasil Belajar Semester Genap', 'start_date' => '2027-06-18', 'end_date' => '2027-06-19', 'type' => 'event'],
            ['title' => 'Libur Akhir Tahun Ajaran', 'start_date' => '2027-06-21', 'end_date' => '2027-06-30', 'type' => 'holiday'],
        ];

        foreach ($events as $event) {
            AcademicCalendar::create([
                'title' => $event['title'],
                'start_date' => $event['start_date'],
                'end_date' => $event['end_date'],
                'type' => $event['type'],
                'description' => null,
            ]);
        }
    }
}
