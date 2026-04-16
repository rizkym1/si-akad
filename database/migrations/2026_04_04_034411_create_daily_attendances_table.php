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
        Schema::create('daily_attendances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained()->onDelete('restrict');
            $table->foreignId('school_year_id')->constrained()->onDelete('restrict');
            $table->date('date'); // Tanggal absensi harian
            $table->enum('status', ['present', 'sick', 'permitted', 'absent'])->default('present'); // Status kehadiran
            $table->text('notes')->nullable(); // Keterangan tambahan
            $table->timestamps();

            // Memastikan 1 siswa hanya dapat 1 jenis absen di 1 tanggal yang sama
            $table->unique(['student_id', 'date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('daily_attendances');
    }
};
