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
            $table->string('nis')->nullable()->unique();
            $table->string('full_name');
            $table->string('nickname')->nullable();
            $table->string('nisn')->unique();
            $table->string('place_of_birth')->nullable();
            $table->date('date_of_birth');
            $table->enum('gender', ['male', 'female'])->nullable();
            $table->string('religion')->nullable();
            $table->string('family_status')->nullable();
            $table->tinyInteger('child_order')->unsigned()->nullable();
            $table->string('father_name')->nullable();
            $table->string('mother_name')->nullable();
            $table->string('phone')->nullable();
            $table->string('student_phone')->nullable();
            $table->string('father_job')->nullable();
            $table->string('mother_job')->nullable();
            $table->string('address_street')->nullable();
            $table->string('address_village')->nullable();
            $table->string('address_district')->nullable();
            $table->string('address_city')->nullable();
            $table->string('address_province')->nullable();
            $table->text('student_address')->nullable();
            $table->string('guardian_name')->nullable();
            $table->string('guardian_job')->nullable();
            $table->text('guardian_address')->nullable();
            $table->string('previous_school')->nullable();
            $table->date('accepted_date')->nullable();
            $table->string('accepted_grade')->nullable();
            $table->string('photo')->nullable();
            $table->foreignId('class_id')
                  ->nullable()
                  ->constrained('classes', 'id')
                  ->nullOnDelete();
            $table->foreignId('school_year_id')
                ->nullable()
                ->constrained('school_years')
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