<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;

echo "--- p_dimensi ---\n";
$dimensi = DB::connection('rdm')->table('p_dimensi')->get();
foreach ($dimensi as $d) {
    echo "ID: {$d->dimensi_id} | Nama: {$d->dimensi_nama}\n";
}

echo "\n--- k_penilaian ---\n";
$penilaian = DB::connection('rdm')->table('k_penilaian')->limit(10)->get();
foreach ($penilaian as $p) {
    echo json_encode($p) . "\n";
}

echo "\n--- k_nilai ---\n";
$nilai = DB::connection('rdm')->table('k_nilai')->limit(5)->get();
foreach ($nilai as $n) {
    echo json_encode($n) . "\n";
}
