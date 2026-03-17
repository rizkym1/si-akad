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
        Schema::create('academic_calendars', function (Blueprint $table) {
            $table->id(); // ID Unik
            $table->string('title'); // Judul Agenda/Kegiatan
            $table->date('start_date'); // Tanggal Mulai
            $table->date('end_date'); // Tanggal Selesai
            $table->enum('type', ['holiday', 'event'])->default('event'); // Tipe Agenda (Hari Libur / Kegiatan)
            $table->text('description')->nullable(); // Deskripsi Singkat
            $table->timestamps(); // Waktu Dibuat & Diperbarui
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('academic_calendars');
    }
};
