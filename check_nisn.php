<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Student;
use App\Models\Rdm\ESiswa;
use Illuminate\Support\Facades\DB;

$students = Student::limit(5)->get();
foreach ($students as $s) {
    echo "Local Student: ID={$s->id}, NISN={$s->nisn}, Name={$s->full_name}\n";
    
    $e_siswa = ESiswa::where('siswa_nisn', $s->nisn)->first();
    if ($e_siswa) {
        echo "  -> Found in ESiswa: siswa_id={$e_siswa->siswa_id}\n";
        
        $rapor = DB::connection('rdm')
            ->table('e_rapor')
            ->where('siswa_id', $e_siswa->siswa_id)
            ->whereIn('jenisnilai_id', [1, 2, 3])
            ->get();
        echo "  -> Rapor count: " . $rapor->count() . "\n";
    } else {
        echo "  -> NOT FOUND in ESiswa\n";
    }
}
