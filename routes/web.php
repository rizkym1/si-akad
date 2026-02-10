<?php

use App\Http\Controllers\Admin\AttendanceController;
use App\Http\Controllers\Admin\StudentClassController;
use App\Http\Controllers\Admin\StudentController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\DashboardController;
use App\Models\Student;
use Inertia\Inertia;

Route::get('home/{nama}', [HomeController::class, 'index']);

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/hello/{nama}', function(string $nama){
    return "ini halaman hello " . $nama . request()->lengkap;
});

// Route::post('/')
// Route::put('/')
// Route::patch('/')
// Route::delete('/')
// Route::resource()

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
        Route::resource('users', UserController::class);
        Route::post('/users/bulk-delete', [UserController::class, 'bulkDelete'])->name('users.bulk-delete');
        Route::resource('students', StudentController::class);
        Route::post('/students/bulk-delete', [StudentController::class, 'bulkDelete'])->name('students.bulk-delete');
        Route::resource('student-classes', StudentClassController::class);
        Route::post('/student-classes/bulk-delete', [StudentClassController::class, 'bulkDelete'])->name('student-classes.bulk-delete');
        Route::resource('attendances', AttendanceController::class);
        Route::post('/attendances/bulk-delete', [AttendanceController::class, 'bulkDelete'])->name('attendances.bulk-delete');
        // Route untuk mendapatkan daftar siswa (digunakan oleh modal)
    Route::get('students/list', [StudentController::class, 'list'])
        ->name('students.list');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
