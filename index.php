<?php

/**
 * Forward root requests to the Laravel public front controller.
 * This allows the application to run from public_html instead of public_html/public.
 */

require __DIR__.'/public/index.php';
