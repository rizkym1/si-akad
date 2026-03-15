<?php


use App\Http\Controllers\Admin\AttendanceController;
use App\Http\Controllers\Admin\NilaiKokurikulerController;
use App\Http\Controllers\Admin\SchoolYearController;
use App\Http\Controllers\Admin\StudentClassController;
use App\Http\Controllers\Admin\StudentController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\DashboardController;
use App\Services\RdmService;
use Illuminate\Support\Facades\DB;
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
        Route::get('admins', [UserController::class, 'index'])->defaults('role', 'admin')->name('admins.index');
        Route::get('teachers', [UserController::class, 'index'])->defaults('role', 'teacher')->name('teachers.index');
        Route::get('parents', [UserController::class, 'index'])->defaults('role', 'parent')->name('parents.index');
        Route::resource('users', UserController::class);
        Route::post('/users/bulk-delete', [UserController::class, 'bulkDelete'])->name('users.bulk-delete');
        Route::resource('students', StudentController::class);
        Route::get('students/{student}/card/pdf', [StudentController::class, 'cardPdf'])->name('students.card.pdf');
        Route::get('students/report/pdf', [StudentController::class, 'reportPdf'])->name('students.report.pdf');
        Route::post('/students/bulk-delete', [StudentController::class, 'bulkDelete'])->name('students.bulk-delete');
        Route::resource('student-classes', StudentClassController::class);
        Route::post('/student-classes/bulk-delete', [StudentClassController::class, 'bulkDelete'])->name('student-classes.bulk-delete');
        // Absensi
        Route::get('attendances/report/pdf', [AttendanceController::class, 'reportPdf'])->name('attendances.report.pdf');
        Route::resource('attendances', AttendanceController::class)->only(['index', 'store']);
        Route::post('/attendances/bulk-delete', [AttendanceController::class, 'bulkDelete'])->name('attendances.bulk-delete');
        // Route untuk mendapatkan daftar siswa (digunakan oleh modal)
        Route::get('students/list', [StudentController::class, 'list'])
        ->name('students.list');
        Route::resource('school-years', SchoolYearController::class);
        Route::post('/school-years/bulk-delete', [SchoolYearController::class, 'bulkDelete'])->name('school-years.bulk-delete');

        // Nilai Kokurikuler (RDM)
        // Nilai Kokurikuler (RDM)
Route::get('nilai-kokurikuler', [NilaiKokurikulerController::class, 'index'])
    ->name('nilai-kokurikuler.index');
Route::get('nilai-kokurikuler/{penilaianId}/penilaian', [NilaiKokurikulerController::class, 'penilaian'])
    ->name('nilai-kokurikuler.penilaian');
   
    });
});

Route::get('/test-student-class', function () {
    try {
        $classes = \App\Models\StudentClass::with('schoolYear')
                        ->get(['id', 'name', 'school_year_id']);
        return response()->json([
            'status'  => 'ok',
            'classes' => $classes,
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => $e->getMessage(),
        ]);
    }
});

// // Test koneksi - hapus setelah berhasil!
// Route::get('/test-rdm', function () {
//     try {
//         DB::connection('rdm')->getPdo();
//         $data = DB::connection('rdm')->table('k_penilaian')->get();
//         return response()->json([
//             'status' => 'Koneksi berhasil!',
//             'total'  => $data->count(),
//             'data'   => $data,
//         ]);
//     } catch (\Exception $e) {
//         return response()->json([
//             'status' => 'Gagal koneksi',
//             'error'  => $e->getMessage(),
//         ]);
//     }
// });

// // Cek semua tabel di database RDM
// Route::get('/test-rdm-tables', function () {
//     $tables = DB::connection('rdm')
//         ->select('SHOW TABLES');
//     return response()->json($tables);
// });

// // Cek struktur tabel nilai
// Route::get('/test-rdm-struktur', function () {
//     $tables = [
//         'e_siswa',
//         'e_inputnilai',
//         'e_mapel',
//         'e_kelas',
//         'e_semester',
//         'e_tahunajaran',
//         'k_nilai',
//         'k_penilaian',
//     ];

//     $result = [];
//     foreach ($tables as $table) {
//         $result[$table] = DB::connection('rdm')->select("DESCRIBE {$table}");
//     }

//     return response()->json($result);
// });


// // Test ambil semua nilai
// Route::get('/test-rdm-nilai', function () {
//     $service = new RdmService();
//     return response()->json($service->getAllNilai());
// });

// // Test ambil nilai per siswa by NISN
// Route::get('/test-rdm-nilai/{nisn}', function (string $nisn) {
//     $service = new RdmService();
//     return response()->json($service->getNilaiBySiswa($nisn));
// });


// Route::get('/test-rdm-dplpc', function () {
//     $dplpc = DB::connection('rdm')->table('k_dplpc')->get();
//     $koordinator = DB::connection('rdm')->table('k_koordinator')->get();
//     return response()->json([
//         'k_dplpc' => $dplpc,
//         'k_koordinator' => $koordinator,
//     ]);
// });

// Route::get('/test-rdm-kelas', function () {
//     $kelas1 = DB::connection('rdm')
//         ->table('e_siswa')
//         ->where('kelas_id', 2025100000000000002)
//         ->select('siswa_id', 'siswa_nisn', 'siswa_nama', 'kelas_id')
//         ->get();

//     $kelas2 = DB::connection('rdm')
//         ->table('e_siswa')
//         ->where('kelas_id', 2025100000000000001)
//         ->select('siswa_id', 'siswa_nisn', 'siswa_nama', 'kelas_id')
//         ->get();

//     $penilaian = DB::connection('rdm')
//         ->table('k_penilaian as p')
//         ->leftJoin('k_koordinator as k', 'p.koordinator_id', '=', 'k.koordinator_id')
//         ->leftJoin('k_dplpc as d', 'p.dplpc_id', '=', 'd.dplpc_id')
//         ->select('p.*', 'k.kelas_id as koor_kelas_id', 'd.dplpc_nama')
//         ->get();

//     return response()->json([
//         'kelas_1_jumlah' => $kelas1->count(),
//         'kelas_1_siswa'  => $kelas1,
//         'kelas_2_jumlah' => $kelas2->count(),
//         'kelas_2_siswa'  => $kelas2,
//         'penilaian'      => $penilaian,
//     ]);
// });

Route::get('/test-rdm-kelas2', function () {
    $kelas = DB::connection('rdm')->table('e_kelas')->get();
    $koordinator = DB::connection('rdm')->table('k_koordinator')->get();
    return response()->json([
        'e_kelas'       => $kelas,
        'k_koordinator' => $koordinator,
    ]);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
