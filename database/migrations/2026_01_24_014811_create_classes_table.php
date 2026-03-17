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
        Schema::create('classes', function (Blueprint $table) {
            $table->id(); // ID Unik
            $table->string('name'); // Nama Kelas
            $table->foreignId('school_year_id') // ID Tahun Pelajaran
                  ->nullable()
                  ->constrained('school_years')
                  ->nullOnDelete(); 
            $table->timestamps(); // Waktu Dibuat & Diperbarui
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('classes');
    }
};
