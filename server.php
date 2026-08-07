<?php
// =========================
// START SESSION (if needed)
// =========================
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// =========================
// LOAD ENV FILE (IMPROVED)
// =========================
function loadEnv($path) {
    if (!file_exists($path)) {
        error_log(".env file not found");
        return;
    }

    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    foreach ($lines as $line) {
        $line = trim($line);

        // Skip comments
        if ($line === '' || strpos($line, '#') === 0) continue;

        // Split only first "="
        list($name, $value) = explode('=', $line, 2);

        $name  = trim($name);
        $value = trim($value);

        // Remove quotes if exist
        $value = trim($value, "\"'");

        putenv("$name=$value");
    }
}

// Load .env
loadEnv(__DIR__ . '/.env');

// =========================
// GET ENV VARIABLES
// =========================
$db_host = getenv('DB_HOST') ?: 'localhost';
$db_name = getenv('DB_NAME') ?: '';
$db_user = getenv('DB_USER') ?: '';
$db_pass = getenv('DB_PASS') ?: '';

// =========================
// VALIDATE ENV (IMPORTANT)
// =========================
if (!$db_name || !$db_user) {
    error_log("Database ENV variables missing");
    die("Configuration error");
}

// =========================
// MYSQLI STRICT MODE
// =========================
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

// =========================
// CONNECT DATABASE
// =========================
try {
    $connect = new mysqli($db_host, $db_user, $db_pass, $db_name);

    // Secure charset
    $connect->set_charset("utf8mb4");

} catch (Exception $e) {

    // Log real error
    error_log("DB Connection Failed: " . $e->getMessage());

    // Generic response (no info leak)
    http_response_code(500);
    echo "Internal Server Error";

    exit;
}