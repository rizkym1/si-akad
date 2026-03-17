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
        Schema::create('users', function (Blueprint $table) {
            $table->id(); // ID Unik
            $table->string('name'); // Nama Lengkap
            $table->string('email')->unique(); // Alamat Email (Unik)
            $table->timestamp('email_verified_at')->nullable(); // Waktu Verifikasi Email
            $table->string('password'); // Kata Sandi (Hashed)
            $table->enum('role', ['admin', 'teacher', 'parent'])->default('admin'); // Peran Pengguna (Admin, Guru, Orang Tua)
            $table->string('photo')->nullable(); // Foto Profil
            $table->string('nik')->nullable(); // Nomor Induk Kependudukan
            $table->string('homeroom_teacher')->nullable(); // Guru Wali Kelas
            $table->enum('gender', ['L', 'P'])->nullable(); // Jenis Kelamin (Laki-laki / Perempuan)
            $table->string('education')->nullable(); // Pendidikan Terakhir
            $table->rememberToken(); // Token "Ingat Saya"
            $table->timestamps(); // Waktu Dibuat & Diperbarui
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary(); // Alamat Email
            $table->string('token'); // Token Reset Kata Sandi
            $table->timestamp('created_at')->nullable(); // Waktu Dibuat
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary(); // ID Sesi
            $table->foreignId('user_id')->nullable()->index(); // ID Pengguna (Opsional)
            $table->string('ip_address', 45)->nullable(); // Alamat IP
            $table->text('user_agent')->nullable(); // Informasi Peramban (User Agent)
            $table->longText('payload'); // Data Sesi
            $table->integer('last_activity')->index(); // Waktu Aktivitas Terakhir
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
