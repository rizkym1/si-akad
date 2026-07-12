<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Student;
use App\Models\SchoolYear;
use App\Models\DailyAttendance;
use App\Models\Attendance;
use Carbon\Carbon;
use Carbon\CarbonPeriod;

class JuneAttendanceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Cari tahun ajaran 2025/2026
        $schoolYear = SchoolYear::where('name', '2025/2026')->first();

        if (!$schoolYear) {
            // Jika tidak ada nama persis 2025/2026, gunakan yang sedang aktif sebagai fallback
            $schoolYear = SchoolYear::where('is_active', true)->first();
        }

        if (!$schoolYear) {
            $this->command->error("Tidak ada tahun ajaran ditemukan.");
            return;
        }

        // Hapus dummy data yang salah (yang terlanjur masuk untuk bulan 6)
        $month = 6;
        $year = 2026;
        
        DailyAttendance::whereMonth('date', $month)->whereYear('date', $year)->delete();
        Attendance::where('month', $month)->where('school_year_id', $schoolYear->id)->delete();

        // Ambil semua siswa yang aktif dan berada di tahun ajaran yang dipilih
        $students = Student::where('status', 'aktif')
            ->whereHas('studentClass', function ($q) use ($schoolYear) {
                $q->where('school_year_id', $schoolYear->id);
            })
            ->get();

        if ($students->isEmpty()) {
            $this->command->error("Tidak ada data siswa aktif pada tahun ajaran {$schoolYear->name}.");
            return;
        }

        // Buat range tanggal dari 1 Juni hingga 30 Juni 2026
        $startDate = Carbon::createFromDate($year, $month, 1);
        $endDate = Carbon::createFromDate($year, $month, 30);
        $period = CarbonPeriod::create($startDate, $endDate);

        $insertedDailyCount = 0;

        foreach ($period as $date) {
            // Lewati hari Sabtu dan Minggu
            if ($date->isWeekend()) {
                continue;
            }

            // Generate waktu acak di sekitar jam 07:30 (antara 07:28 sampai 07:35)
            // Jadi jeda tidak lebih dari 5 menit dari jadwal asli.
            $randomMinute = rand(28, 35);
            $randomHour = 7;
            $randomSecond = rand(0, 59);
            
            $attendanceTime = $date->copy()->setTime($randomHour, $randomMinute, $randomSecond);

            foreach ($students as $student) {
                DailyAttendance::create([
                    'student_id' => $student->id,
                    'school_year_id' => $schoolYear->id,
                    'date' => $date->format('Y-m-d'),
                    'status' => 'present',
                    'notes' => null,
                    'created_at' => $attendanceTime,
                    'updated_at' => $attendanceTime,
                ]);
                $insertedDailyCount++;
            }
        }

        // Hitung ulang rekap bulanan per siswa
        foreach ($students as $student) {
            $presentCount = DailyAttendance::where('student_id', $student->id)
                ->whereMonth('date', $month)
                ->whereYear('date', $year)
                ->where('status', 'present')
                ->count();

            Attendance::create([
                'student_id'     => $student->id,
                'school_year_id' => $schoolYear->id,
                'month'          => $month,
                'present'        => $presentCount,
                'sick'           => 0,
                'permitted'      => 0,
                'absent'         => 0,
                'created_at'     => Carbon::createFromDate($year, $month, 30)->setTime(12, 0, 0),
                'updated_at'     => Carbon::createFromDate($year, $month, 30)->setTime(12, 0, 0),
            ]);
        }

        $this->command->info("Berhasil mereset dan menambahkan {$insertedDailyCount} data absensi harian, serta rekap bulanannya untuk siswa aktif di {$schoolYear->name}.");
    }
}
