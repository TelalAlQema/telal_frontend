<link rel="shortcut icon" href="images/logo/title-telal.png">
<?php

include 'server.php';
require "./PHPMailer/Exception.php";
require "./PHPMailer/PHPMailer.php";
require "./PHPMailer/SMTP.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// -------------------------
// Collect POST data safely
// -------------------------
$name     = trim($_POST['name'] ?? '');
$email    = trim($_POST['email'] ?? '');
$phone    = trim($_POST['phone'] ?? '');
$services = trim($_POST['services'] ?? '');
$comment  = trim($_POST['comment'] ?? '');

// -------------------------
// Detect form page for error redirect
// -------------------------
function getErrorRedirect() {
    $fallback = 'contact.php';

    if (!empty($_SERVER['HTTP_REFERER'])) {
        $refererHost = parse_url($_SERVER['HTTP_REFERER'], PHP_URL_HOST);
        $serverHost  = $_SERVER['HTTP_HOST'] ?? '';

        // Only allow same-site redirect
        if ($refererHost && $serverHost && strtolower($refererHost) === strtolower($serverHost)) {
            $path = parse_url($_SERVER['HTTP_REFERER'], PHP_URL_PATH);
            if ($path) {
                $page = basename($path);
                if ($page !== '') {
                    return $page;
                }
            }
        }
    }

    return $fallback;
}

$error_redirect   = getErrorRedirect();
$success_redirect = 'thankyou.php';

// -------------------------
// SweetAlert helper (SAFE)
// -------------------------
function showAlert($title, $text, $icon = 'success', $redirect = '') {
    $title    = json_encode($title);
    $text     = json_encode($text);
    $icon     = json_encode($icon);
    $redirect = json_encode($redirect);

    echo "<script src='https://cdn.jsdelivr.net/npm/sweetalert2@11'></script>
    <script>
    window.onload = function() {
        Swal.fire({
            title: $title,
            text: $text,
            icon: $icon,
            confirmButtonText: 'OK'
        }).then(function() {
            if ($redirect) {
                window.location.href = $redirect;
            }
        });
    };
    </script>";
}

// -------------------------
// Security Helper Functions
// -------------------------
function containsLink($text) {
    return preg_match('/(https?:\/\/|www\.|<a\s|url=)/i', $text);
}

function hasSpecialChars($text) {
    return preg_match('/[^a-zA-Z\s]/', $text);
}

// -------------------------
// Only process POST
// -------------------------
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['contact'])) {

    // -------------------------
    // STRONG VALIDATION
    // -------------------------
    if (empty($name) || empty($email) || empty($phone) || empty($services)) {
        showAlert("Invalid Input", "All fields are required.", "warning", $error_redirect);
        exit;
    }

    // Email validation
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        showAlert("Error", "Invalid email format.", "warning", $error_redirect);
        exit;
    }

    // Prevent email injection
    if (preg_match("/[\r\n]/", $email)) {
        showAlert("Error", "Invalid email.", "error", $error_redirect);
        exit;
    }

    // Name: only letters + spaces
    if (hasSpecialChars($name) || strlen($name) < 2 || strlen($name) > 100) {
        showAlert("Error", "Name must contain only letters.", "warning", $error_redirect);
        exit;
    }

    // Phone: only digits (no text allowed)
    if (!preg_match('/^[0-9]{7,15}$/', $phone)) {
        showAlert("Error", "Phone must be 7–15 digits only.", "warning", $error_redirect);
        exit;
    }

    // Block links
    if (containsLink($name) || containsLink($comment)) {
        showAlert("Error", "Links are not allowed.", "error", $error_redirect);
        exit;
    }

    // Comment: block special characters & limit
    if (!empty($comment) && preg_match('/[<>{}]/', $comment)) {
        showAlert("Error", "Invalid characters in message.", "warning", $error_redirect);
        exit;
    }

    if (strlen($comment) > 1000) {
        showAlert("Error", "Message too long.", "warning", $error_redirect);
        exit;
    }

    // -------------------------
    // VERIFY reCAPTCHA (FROM ENV)
    // -------------------------
    $recaptcha_secret   = getenv('RECAPTCHA_SECRET');
    $recaptcha_response = $_POST['g-recaptcha-response'] ?? '';

    $verify = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$recaptcha_secret}&response={$recaptcha_response}");
    $response_data = json_decode($verify);

    if (!$response_data || !$response_data->success) {
        showAlert("CAPTCHA Failed", "Please verify you are not a robot.", "error", $error_redirect);
        exit;
    }

    // -------------------------
    // INSERT INTO DATABASE
    // -------------------------
    $date = date('d-M-Y');
    $time = date('h:i:s A');

    $stmt = $connect->prepare("INSERT INTO contactcontact (name, email, phone, services, comment, date, time) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssss", $name, $email, $phone, $services, $comment, $date, $time);

    if (!$stmt->execute()) {
        showAlert("Database Error", "Something went wrong.", "error", $error_redirect);
        exit;
    }

    // -------------------------
    // SMTP CONFIG FROM ENV
    // -------------------------
    $smtp_host = getenv('SMTP_HOST');
    $smtp_user = getenv('SMTP_USER');
    $smtp_pass = getenv('SMTP_PASS');
    $smtp_port = getenv('SMTP_PORT');

    // -------------------------
    // Send Customer Email
    // -------------------------
    try {
        $mail = new PHPMailer(true);

        $mail->isSMTP();
        $mail->Host       = $smtp_host;
        $mail->SMTPAuth   = true;
        $mail->Username   = $smtp_user;
        $mail->Password   = $smtp_pass;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = $smtp_port;

        $mail->setFrom($smtp_user, 'Telal Al Qema Building Contracting');
        $mail->addAddress($email);

        $mail->isHTML(true);
        $mail->Subject = 'Thank you for contacting us!';

        $mail->Body = "
        <h2>Thank You, " . htmlspecialchars($name) . "!</h2>
        <p>We received your request and will contact you soon.</p>
        ";

        $mail->send();

    } catch (Exception $e) {
        error_log("Customer email error: " . $mail->ErrorInfo);
    }

    // -------------------------
    // Send Admin Email
    // -------------------------
    try {
        $mail = new PHPMailer(true);

        $mail->isSMTP();
        $mail->Host       = $smtp_host;
        $mail->SMTPAuth   = true;
        $mail->Username   = $smtp_user;
        $mail->Password   = $smtp_pass;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = $smtp_port;

        $mail->setFrom($smtp_user, 'Contact Form');
        $mail->addReplyTo($email, $name);
        $mail->addAddress($smtp_user);

        $mail->isHTML(true);
        $mail->Subject = 'New Contact Form Submission';

        $mail->Body = "
        <h3>New Contact Request</h3>
        <p>Name: " . htmlspecialchars($name) . "</p>
        <p>Email: " . htmlspecialchars($email) . "</p>
        <p>Phone: " . htmlspecialchars($phone) . "</p>
        <p>Services: " . htmlspecialchars($services) . "</p>
        <p>Message:<br>" . nl2br(htmlspecialchars($comment)) . "</p>
        ";

        $mail->send();

    } catch (Exception $e) {
        error_log("Admin email error: " . $mail->ErrorInfo);
    }

    // -------------------------
    // SUCCESS
    // -------------------------
    showAlert("Success", "Your contact request has been submitted!", "success", $success_redirect);
}
?>