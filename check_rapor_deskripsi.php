<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;

$rapor = DB::connection('rdm')
    ->table('e_rapor')
    ->limit(5)
    ->get();

echo "Data e_rapor:\n";
foreach ($rapor as $r) {
    echo "Siswa ID: {$r->siswa_id}, Jenis Nilai ID: {$r->jenisnilai_id}\n";
    echo "Deskripsi: {$r->rapor_deskripsi}\n\n";
}

$nilai = DB::connection('rdm')
    ->table('k_nilai as n')
    ->join('k_penilaian as p', 'n.penilaian_id', '=', 'p.penilaian_id')
    ->join('k_dplpc as d', 'p.dplpc_id', '=', 'd.dplpc_id')
    ->where('n.nilai_data', '>=', 3) // Mampu
    ->select('n.siswa_id', 'p.penilaian_deskripsi', 'd.dplpc_type')
    ->limit(10)
    ->get();

echo "\nData k_nilai & k_penilaian:\n";
print_r($nilai->toArray());
