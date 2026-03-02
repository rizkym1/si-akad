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
            $table->foreignId('school_year_id')->constrained()->onDelete('restrict');
            $table->integer('present')->default(0);
            $table->integer('sick')->default(0);
            $table->integer('permitted')->default(0);
            $table->integer('absent')->default(0);
            $table->text('notes')->nullable(); // Catatan (opsional)
            $table->timestamps(); // created_at, updated_at

            // Index & constraint
            $table->unique(['student_id', 'school_year_id']); // 1 siswa punya 1 rekap per tahun pelajaran
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
