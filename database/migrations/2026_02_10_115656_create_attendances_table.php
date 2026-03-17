<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('attendances', function (Blueprint $table) {
            $table->id(); // ID Unik
            $table->foreignId('student_id')->constrained()->onDelete('restrict'); // ID Siswa (Relasi ke tabel students)
            $table->foreignId('school_year_id')->constrained()->onDelete('restrict'); // ID Tahun Pelajaran (Relasi ke tabel school_years)
            $table->integer('month'); // Bulan (1-12)
            $table->integer('present')->default(0); // Jumlah Hadir
            $table->integer('sick')->default(0); // Jumlah Sakit
            $table->integer('permitted')->default(0); // Jumlah Izin
            $table->integer('absent')->default(0); // Jumlah Alpa/Tanpa Keterangan
            $table->text('notes')->nullable(); // Catatan Tambahan
            $table->timestamps(); // Waktu Dibuat & Diperbarui (created_at, updated_at)

            // Index & constraint
            $table->unique(['student_id', 'school_year_id', 'month']); // 1 siswa punya 1 rekap per tahun pelajaran per bulan
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendances');
    }
};
