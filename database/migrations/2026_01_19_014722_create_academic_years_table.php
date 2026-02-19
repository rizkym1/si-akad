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
        Schema::create('academic_years', function (Blueprint $table) {
            $table->id();
            $table->string('name');           // contoh: "2024/2025"
            $table->date('start_date');       // 2024-07-01
            $table->date('end_date');         // 2025-06-30
            $table->boolean('is_active')->default(false); // tahun pelajaran aktif
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('academic_years');
    }
};
