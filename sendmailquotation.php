<?php
// Include server & PHPMailer files
include 'server.php';
require "./PHPMailer/Exception.php";
require "./PHPMailer/PHPMailer.php";
require "./PHPMailer/SMTP.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Get POST data safely
$name     = trim($_POST['name'] ?? '');
$email    = trim($_POST['email'] ?? '');
$phone    = trim($_POST['phone'] ?? '');
$services = trim($_POST['services'] ?? '');

// Utility function to show SweetAlert and redirect
function showAlertAndRedirect($title, $text, $icon, $redirect) {
    echo "<script src='https://cdn.jsdelivr.net/npm/sweetalert2@11'></script>
          <script>
              window.onload = function() {
                  Swal.fire({
                      title: '$title',
                      text: '$text',
                      icon: '$icon',
                      confirmButtonText: 'OK'
                  }).then(function() {
                      window.location.href = '$redirect';
                  });
              };
          </script>";
    exit;
}

// Check if form is submitted
if (!isset($_POST['quote'])) {
    showAlertAndRedirect("Error", "Invalid request.", "error", "index.php");
}

// Validate basic fields
if (empty($name) || empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    showAlertAndRedirect("Invalid Input", "Please provide a valid name and email.", "warning", "index.php");
}

// Verify reCAPTCHA
$recaptcha_secret   = '6LfRyE8rAAAAAJyy_cdDfTtu-vuaupITtPwPvQ3l';
$recaptcha_response = $_POST['g-recaptcha-response'] ?? '';

$verify = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$recaptcha_secret}&response={$recaptcha_response}");
$response_data = json_decode($verify);

if (!$response_data->success) {
    showAlertAndRedirect("CAPTCHA Failed", "Please verify you are not a robot.", "error", "index.php");
}

// Insert into database
$date = date('d-M-Y');
$time = date('h:i:s A');

$stmt = $connect->prepare("INSERT INTO freequote (name, email, phone, services, date, time) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $name, $email, $phone, $services, $date, $time);

if (!$stmt->execute()) {
    showAlertAndRedirect("Database Error", "Something went wrong. Please try again later.", "error", "index.php");
}

// --------------------
// PHPMailer: send to customer
// --------------------
function sendCustomerMail($name, $email) {
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'info@telal-contracting.com'; // Gmail account
        $mail->Password   = 'zvwkyjkaocqqveel';          // Gmail App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        $mail->setFrom('info@telal-contracting.com', 'Telal Al Qema Building Contracting');
        $mail->addAddress($email);
        $mail->Subject = 'Thank you for your quote request!';
        $mail->isHTML(true);

        $mail->Body = '
            <div style="font-family:Segoe UI,sans-serif; background:#f6f9fc; padding:30px; border-radius:10px; border:1px solid #ddd; max-width:600px; margin:auto;">
                <img src="http://www.telal-contracting.com/images/logo/telal-logo.png" alt="Logo" style="width:180px; margin-bottom:20px;">
                <h2 style="color:#4CAF50;">Thank You, '.htmlspecialchars($name).'!</h2>
                <p>We have received your request for <strong>Telal Al Qema Building Contracting</strong>. Our team will contact you soon.</p>
                <hr>
                <p>Contact: <a href="tel:+971555983192">+971 55 598 3192</a></p>
                <p>Email: info@telal-contracting.com</p>
                <p>Office: Al Reem Tower, Office 1301, Dubai-UAE</p>
                <p style="font-size:12px;color:#999;">Sent on '.date('d M Y, h:i A').'</p>
            </div>
        ';

        $mail->send();
    } catch (Exception $e) {
        error_log("Customer email error: " . $mail->ErrorInfo);
    }
}

// --------------------
// PHPMailer: send admin notification
// --------------------
function sendAdminNotification($name, $email, $phone, $services) {
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'info@telal-contracting.com';
        $mail->Password   = 'zvwkyjkaocqqveel';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        $mail->setFrom('info@telal-contracting.com', 'Telal Contracting Website');
        $mail->addReplyTo($email, $name);
        $mail->addAddress('info@telal-contracting.com'); // Admin email
        $mail->Subject = 'New Customer Quote Request';
        $mail->isHTML(true);

        $mail->Body = '
            <div style="font-family:Segoe UI,sans-serif; background:#fffefc; padding:30px; border:1px solid #ccc; border-radius:10px; max-width:600px; margin:auto;">
                <h2>New Quote Request Received</h2>
                <ul>
                    <li>Name: '.htmlspecialchars($name).'</li>
                    <li>Email: '.htmlspecialchars($email).'</li>
                    <li>Phone: '.htmlspecialchars($phone).'</li>
                    <li>Services: '.nl2br(htmlspecialchars($services)).'</li>
                </ul>
                <p style="font-size:12px;color:#999;">Submitted on '.date('d M Y, h:i A').'</p>
            </div>
        ';

        $mail->send();
    } catch (Exception $e) {
        error_log("Admin email error: " . $mail->ErrorInfo);
    }
}

// Send emails
sendCustomerMail($name, $email);
sendAdminNotification($name, $email, $phone, $services);

// Redirect to thank you page
header("Location: ../thankyou.php");
exit;

?>