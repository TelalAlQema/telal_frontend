<!DOCTYPE html>
<html lang="en">
<?php
include 'server.php';
session_start();
$otp = rand(000000, 999999);
// error_reporting(E_ALL);
// ini_set('display_errors', '0');
// ini_set('log_errors', '1');
$_SESSION['type'] = $_GET['type'];
?>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">

    <!-- jQuery library -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>

    <!-- Latest compiled JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>

    <!-- Linking registration_email CSS file -->
    <!-- <link rel="stylesheet" href="../CSS/registration_email.css"> -->

    <!-- Linking javascript for registration_email.css -->
    <script src="../JAVASCRIPT/registration_email.js"></script>
</head>

<body>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xl-12">
                <div class="container">
                    <form class="email-form" method="POST" action="PHP/email_source_file.php">
                        <?php if (isset($_SESSION['Error'])) {
                            echo $_SESSION['Error'];
                            unset($_SESSION['Error']);
                        } ?>
                        <h2>New account</h2>
                        <label for="email">Enter your email:</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email" required
                            autocomplete="off">
                        <input type="hidden" id="email" name="otp" placeholder="Enter your email"
                            value="<?php echo $otp ?>">
                        <p>Check your gmail to get your OTP</p>
                        <button type="submit" name="submit" class="">Get OTP</button>
                        <span>Already have account? <a href="login.php">Login</a></span>
                    </form>
                </div>
            </div>
        </div>
    </div>
</body>

</html>