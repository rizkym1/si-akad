<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;

$rapor = DB::connection('rdm')
    ->table('e_rapor')
    ->where('siswa_id', 14)
    ->get();

echo "e_rapor untuk siswa_id 14:\n";
foreach ($rapor as $r) {
    echo "ID: {$r->rapor_id}, Jenis Nilai ID: {$r->jenisnilai_id}, Dimensi ID (jika ada): " . (isset($r->dimensi_id) ? $r->dimensi_id : 'N/A') . "\n";
    echo "Deskripsi: " . substr($r->rapor_deskripsi, 0, 50) . "...\n";
}

$jenis = DB::connection('rdm')
    ->select("SHOW TABLES LIKE '%jenis%'");
print_r($jenis);

$dimensi = DB::connection('rdm')
    ->select("SHOW TABLES LIKE '%dimensi%'");
print_r($dimensi);

