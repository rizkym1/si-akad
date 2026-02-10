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
            $table->id();
            $table->foreignId('student_id')->constrained()->onDelete('restrict'); // FK ke students.id
            $table->date('date'); // Tanggal absensi
            $table->enum('status', ['Present', 'Permitted', 'Sick', 'Absent'])->default('Absent'); // Status kehadiran
            $table->text('notes')->nullable(); // Catatan (opsional)
            $table->timestamps(); // created_at, updated_at

            // Index & constraint
            $table->index('date'); // Mempercepat pencarian per tanggal
            $table->unique(['student_id', 'date']); // Cegah duplikasi absensi per siswa per hari
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
