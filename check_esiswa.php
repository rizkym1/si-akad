<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Rdm\ESiswa;

$esiswa = ESiswa::limit(5)->get();
foreach ($esiswa as $s) {
    echo "ESiswa: ID={$s->siswa_id}, NISN={$s->siswa_nisn}, Name={$s->siswa_nama}\n";
}
