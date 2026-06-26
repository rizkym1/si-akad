<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;

$dplpc = DB::connection('rdm')->table('k_dplpc')->get();
foreach ($dplpc as $d) {
    echo json_encode($d) . "\n";
}

// also check e_rapor if there is any data
$rapor = DB::connection('rdm')->table('e_rapor')->limit(3)->get();
foreach ($rapor as $r) {
    echo json_encode($r) . "\n";
}

