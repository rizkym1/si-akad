<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;

$tables = DB::connection('rdm')->select('SHOW TABLES');
$tableKey = 'Tables_in_' . env('DB_RDM_DATABASE', 'alislam_rdm');

$targetStrings = ['Nilai Agama dan Budi Pekerti', 'Jati Diri', 'Dasar-dasar Literasi'];
$found = [];

foreach ($tables as $tableObj) {
    $table = (array)$tableObj;
    $tableName = array_values($table)[0];
    
    // get columns
    $columns = DB::connection('rdm')->select("SHOW COLUMNS FROM `$tableName`");
    
    foreach ($columns as $column) {
        $colName = $column->Field;
        // only search in text/varchar columns
        if (strpos(strtolower($column->Type), 'varchar') !== false || strpos(strtolower($column->Type), 'text') !== false) {
            foreach ($targetStrings as $str) {
                try {
                    $count = DB::connection('rdm')->table($tableName)->where($colName, 'LIKE', "%{$str}%")->count();
                    if ($count > 0) {
                        $found[] = "Found '$str' in table: $tableName, column: $colName";
                    }
                } catch (\Exception $e) {
                    // ignore errors
                }
            }
        }
    }
}

echo "Tables in RDM:\n";
foreach ($tables as $tableObj) {
    $table = (array)$tableObj;
    echo "- " . array_values($table)[0] . "\n";
}

echo "\nSearch Results:\n";
foreach ($found as $f) {
    echo $f . "\n";
}
