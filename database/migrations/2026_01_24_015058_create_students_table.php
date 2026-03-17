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
        Schema::create('students', function (Blueprint $table) {
            $table->id(); // ID Unik
            $table->string('nis')->nullable()->unique(); // Nomor Induk Siswa (Unik)
            $table->string('full_name'); // Nama Lengkap
            $table->string('nickname')->nullable(); // Nama Panggilan
            $table->string('nisn')->unique(); // Nomor Induk Siswa Nasional (Unik)
            $table->string('place_of_birth')->nullable(); // Tempat Lahir
            $table->date('date_of_birth'); // Tanggal Lahir
            $table->enum('gender', ['male', 'female'])->nullable(); // Jenis Kelamin (Laki-laki / Perempuan)
            $table->string('religion')->nullable(); // Agama
            $table->string('family_status')->nullable(); // Status dalam Keluarga
            $table->tinyInteger('child_order')->unsigned()->nullable(); // Anak ke-berapa
            $table->string('father_name')->nullable(); // Nama Ayah
            $table->string('mother_name')->nullable(); // Nama Ibu
            $table->string('phone')->nullable(); // Telepon Orang Tua
            $table->string('student_phone')->nullable(); // Telepon Siswa
            $table->string('father_job')->nullable(); // Pekerjaan Ayah
            $table->string('mother_job')->nullable(); // Pekerjaan Ibu
            $table->string('address_street')->nullable(); // Alamat Jalan
            $table->string('address_village')->nullable(); // Desa/Kelurahan
            $table->string('address_district')->nullable(); // Kecamatan
            $table->string('address_city')->nullable(); // Kota/Kabupaten
            $table->string('address_province')->nullable(); // Provinsi
            $table->text('student_address')->nullable(); // Alamat Lengkap Siswa
            $table->string('guardian_name')->nullable(); // Nama Wali
            $table->string('guardian_job')->nullable(); // Pekerjaan Wali
            $table->text('guardian_address')->nullable(); // Alamat Wali
            $table->string('previous_school')->nullable(); // Sekolah Asal
            $table->date('accepted_date')->nullable(); // Tanggal Diterima
            $table->string('accepted_grade')->nullable(); // Tingkat/Kelas saat Diterima
            $table->string('photo')->nullable(); // Foto Siswa
            $table->foreignId('class_id') // ID Kelas
                  ->nullable()
                  ->constrained('classes', 'id')
                  ->nullOnDelete();
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
        Schema::dropIfExists('students');
    }
};