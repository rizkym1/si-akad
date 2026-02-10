<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Mengganti nama tabel dari 'classes' ke 'student_classes'
        Schema::rename('classes', 'student_classes');
    }

    public function down(): void
    {
        // Mengembalikan nama tabel jika di-rollback
        Schema::rename('student_classes', 'classes');
    }
};
