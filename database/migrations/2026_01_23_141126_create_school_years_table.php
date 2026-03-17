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
        Schema::create('school_years', function (Blueprint $table) {
            $table->id(); // ID Unik
            $table->string('name'); // Nama Tahun Pelajaran (contoh: "2024/2025")
            $table->boolean('is_active')->default(false); // Status Aktif (true = aktif, false = tidak)
            $table->timestamps(); // Waktu Dibuat & Diperbarui
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('school_years');
    }
};
