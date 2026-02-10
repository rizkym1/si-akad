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
            $table->id();
            $table->string('full_name');
            $table->string('nickname')->nullable();
            $table->string('nisn')->unique();
            $table->date('date_of_birth');
            $table->enum('gender', ['male', 'female'])->nullable();
            $table->string('religion')->nullable();
            $table->tinyInteger('child_order')->unsigned()->nullable();
            $table->string('father_name')->nullable();
            $table->string('mother_name')->nullable();
            $table->string('phone')->nullable();
            $table->string('father_job')->nullable();
            $table->string('mother_job')->nullable();
            $table->text('address')->nullable();
            $table->string('guardian_name')->nullable();
            $table->string('guardian_job')->nullable();
            $table->text('guardian_address')->nullable();
            $table->string('photo')->nullable();
            $table->foreignId('class_id')
                  ->nullable()
                  ->constrained('classes', 'id') // ← asumsi tabel classes pakai primary key 'id' default
                  ->nullOnDelete();
            $table->timestamps();
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