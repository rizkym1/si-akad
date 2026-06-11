<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\AcademicCalendar;

class AcademicCalendarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $events = [
            // Semester Gasal
            ['title' => 'Awal Masuk Tahun Ajaran 2025/2026', 'start_date' => '2025-07-14', 'end_date' => '2025-07-14', 'type' => 'event'],
            ['title' => 'Rentang Waktu Pengenalan Lingkungan Madrasah', 'start_date' => '2025-07-14', 'end_date' => '2025-07-19', 'type' => 'event'],
            ['title' => 'Hari Kemerdekaan Indonesia', 'start_date' => '2025-08-17', 'end_date' => '2025-08-17', 'type' => 'holiday'],
            ['title' => 'Maulid Nabi Muhammad saw.', 'start_date' => '2025-09-05', 'end_date' => '2025-09-05', 'type' => 'holiday'],
            ['title' => 'Rentang ASAS Gasal', 'start_date' => '2025-11-24', 'end_date' => '2025-12-06', 'type' => 'event'],
            ['title' => 'Penyerahan Laporan Hasil Belajar Semester Gasal', 'start_date' => '2025-12-19', 'end_date' => '2025-12-20', 'type' => 'event'],
            ['title' => 'Hari Raya Natal', 'start_date' => '2025-12-25', 'end_date' => '2025-12-25', 'type' => 'holiday'],
            ['title' => 'Libur Semester Gasal', 'start_date' => '2025-12-22', 'end_date' => '2026-01-03', 'type' => 'holiday'],
            
            // Semester Genap
            ['title' => 'Tahun Baru Masehi', 'start_date' => '2026-01-01', 'end_date' => '2026-01-01', 'type' => 'holiday'],
            ['title' => 'Hari Amal Bakti (HAB) Kementerian Agama RI', 'start_date' => '2026-01-03', 'end_date' => '2026-01-03', 'type' => 'event'],
            ['title' => 'Awal Masuk Semester Genap Tahun Ajaran 2025/2026', 'start_date' => '2026-01-05', 'end_date' => '2026-01-05', 'type' => 'event'],
            ['title' => 'Peringatan Isra Mi\'raj Nabi Muhammad saw.', 'start_date' => '2026-01-16', 'end_date' => '2026-01-16', 'type' => 'holiday'],
            ['title' => 'Tahun Baru Imlek', 'start_date' => '2026-02-17', 'end_date' => '2026-02-17', 'type' => 'holiday'],
            ['title' => 'Libur seputar Hari Raya Idulfitri 1447 H', 'start_date' => '2026-03-12', 'end_date' => '2026-03-25', 'type' => 'holiday'],
            ['title' => 'Hari Raya Nyepi', 'start_date' => '2026-03-19', 'end_date' => '2026-03-19', 'type' => 'holiday'], // Note: IDUL FITRI is also on Mar 19
            ['title' => 'Hari Raya Idulfitri 1447 H', 'start_date' => '2026-03-19', 'end_date' => '2026-03-19', 'type' => 'holiday'],
            ['title' => 'Wafat Isa Almasih', 'start_date' => '2026-04-03', 'end_date' => '2026-04-03', 'type' => 'holiday'],
            ['title' => 'Rentang Waktu Ujian Madrasah', 'start_date' => '2026-03-30', 'end_date' => '2026-05-16', 'type' => 'event'],
            ['title' => 'Kenaikan Isa Almasih', 'start_date' => '2026-05-14', 'end_date' => '2026-05-14', 'type' => 'holiday'],
            ['title' => 'Perkiraan Rentang Waktu ASAS Genap', 'start_date' => '2026-05-25', 'end_date' => '2026-06-06', 'type' => 'event'],
            ['title' => 'Hari Lahir Pancasila', 'start_date' => '2026-06-01', 'end_date' => '2026-06-01', 'type' => 'holiday'],
            ['title' => 'Penyerahan Laporan Hasil Belajar Semester Genap', 'start_date' => '2026-06-19', 'end_date' => '2026-06-20', 'type' => 'event'],
            ['title' => 'Libur Akhir Tahun Ajaran', 'start_date' => '2026-06-22', 'end_date' => '2026-07-11', 'type' => 'holiday'],
        ];

        foreach ($events as $event) {
            AcademicCalendar::create($event);
        }
    }
}
