<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;

$columns = DB::connection('rdm')->select("SHOW COLUMNS FROM `e_rapor`");
foreach ($columns as $c) {
    echo $c->Field . " - " . $c->Type . "\n";
}

echo "\n--- k_dplpc ---\n";
$columns = DB::connection('rdm')->select("SHOW COLUMNS FROM `k_dplpc`");
foreach ($columns as $c) {
    echo $c->Field . " - " . $c->Type . "\n";
}

echo "\n--- p_elemen ---\n";
$columns = DB::connection('rdm')->select("SHOW COLUMNS FROM `p_elemen`");
foreach ($columns as $c) {
    echo $c->Field . " - " . $c->Type . "\n";
}
