<?php
$data = 'Sx7cL+p7uhfE3OBJWK4ojw=='; // Budi Santoso?
$keys = ['rdm', 'RDM', 'madrasah', 'Madrasah', 'RaporDigitalMadrasah', 'RaporDigital', 'm4dr4s4hb1s4d0n9', 'kemenag', 'Kemenag', '1234567890123456', '101232070043'];
$ciphers = ['AES-128-ECB', 'AES-256-ECB', 'AES-128-CBC', 'AES-256-CBC'];
$decoded = base64_decode($data);
foreach ($keys as $key) {
    foreach ($ciphers as $cipher) {
        $iv = str_repeat("\0", openssl_cipher_iv_length($cipher));
        $res = openssl_decrypt($decoded, $cipher, $key, OPENSSL_RAW_DATA | OPENSSL_NO_PADDING, $iv);
        if ($res && preg_match('/^[a-zA-Z0-9 ]+$/', trim($res))) {
            echo "SUCCESS: Key=$key, Cipher=$cipher, Result=" . trim($res) . "\n";
        }
        $res = openssl_decrypt($decoded, $cipher, $key, OPENSSL_RAW_DATA | OPENSSL_ZERO_PADDING, $iv);
        if ($res && preg_match('/^[a-zA-Z0-9 ]+$/', trim($res))) {
            echo "SUCCESS ZERO: Key=$key, Cipher=$cipher, Result=" . trim($res) . "\n";
        }
        $res = openssl_decrypt($decoded, $cipher, $key, OPENSSL_RAW_DATA, $iv);
        if ($res && preg_match('/^[a-zA-Z0-9 ]+$/', trim($res))) {
            echo "SUCCESS PKCS: Key=$key, Cipher=$cipher, Result=" . trim($res) . "\n";
        }
    }
}
echo "Done\n";
