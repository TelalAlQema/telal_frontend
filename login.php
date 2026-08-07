<?php
session_start();
include 'server.php';
$error = "";
$msg = "";
if (isset($_POST['submit'])) {
	$email = $_POST['email'];
	$pass = $_POST['pass'];

	$sql = "SELECT * FROM login where 'info@telal-contracting.com' = '$email' && 'telal786' = '$pass'";
	$result = mysqli_query($connect, $sql);
	$row = mysqli_fetch_array($result);
	if ($row) {
		$_SESSION['open'] = 1;
		header("location:detail.php");

	} else {
		$error = "<p class='alert alert-warning'>Email or Password doesnot match!</p> ";
	}
} else {
	$error = "<p class='alert alert-warning'>Please Fill all the fields</p>";
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
	<!-- Required meta tags -->
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta name="google-adsense-account" content="ca-pub-3498544422186445">
	<!-- Meta Tags -->
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<link rel="shortcut icon" href="images/logo/title-telal.png">

	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

	<!-- Latest compiled JavaScript -->
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
	<!--	Fonts
	========================================================-->
	<link href="https://fonts.googleapis.com/css?family=Muli:400,400i,500,600,700&amp;display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Comfortaa:400,700" rel="stylesheet">

	<!--	Css Link
	========================================================-->
	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="css/bootstrap-slider.css">
	<link rel="stylesheet" type="text/css" href="css/jquery-ui.css">
	<link rel="stylesheet" type="text/css" href="css/layerslider.css">
	<link rel="stylesheet" type="text/css" href="css/color.css">
	<link rel="stylesheet" type="text/css" href="css/owl.carousel.min.css">
	<link rel="stylesheet" type="text/css" href="css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" href="fonts/flaticon/flaticon.css">
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<link rel="stylesheet" type="text/css" href="css/login.css">
	<!-- FOR MORE PROJECTS visit: codeastro.com -->
	<!--	Title
	=========================================================-->
	<title>Login - Telal Al Qema Building Contracting</title>
	<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3498544422186445"
     crossorigin="anonymous"></script>
</head>

<body>
	<div id="page-wrapper">
		<div class="row">
			<img class="nav-logo" style="width:250px" src="images/logo/telal-logo.png" alt="">
			<div class="page-wrappers login-body full-row bg-gray">
				<div class="login-wrapper">
					<div class="container">
						<div class="loginbox">
							<div class="login-right">
								<div class="login-right-wrap">
									<h1>Login</h1>
									<p class="account-subtitle">Access to our dashboard</p>
									<?php echo $error; ?>
									<?php echo $msg; ?>
									<!-- Form -->
									<form method="post">
										<div class="form-group">
											<input type="email" name="email" class="form-control"
												placeholder="Your Email*">
										</div>
										<div class="form-group">
											<input type="password" name="pass" id="password" class="form-control"
												placeholder="Your Password">
										</div>
										<div class="form-group">
											Show Password
											<input type="checkbox" class="mt-1" onclick="myFunction()"
												placeholder="Your Password">
										</div>

										<button class="btn btn-success" name="submit" value="Login"
											type="submit">Login</button>

									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<a href="#" class="bg-secondary text-white hover-text-secondary" id="scroll"><i
					class="fas fa-angle-up"></i></a>
			<!-- End Scroll To top -->
		</div>
	</div>
	<!-- Wrapper End -->

	<!--	Js Link
============================================================-->
	<script src="js/jquery.min.js"></script>
	<!--jQuery Layer Slider -->
	<script src="js/greensock.js"></script>
	<script src="js/layerslider.transitions.js"></script>
	<script src="js/layerslider.kreaturamedia.jquery.js"></script>
	<!--jQuery Layer Slider -->
	<script src="js/popper.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<script src="js/owl.carousel.min.js"></script>
	<script src="js/tmpl.js"></script>
	<script src="js/jquery.dependClass-0.1.js"></script>
	<script src="js/draggable-0.1.js"></script>
	<script src="js/jquery.slider.js"></script>
	<script src="js/wow.js"></script>
	<script src="js/custom.js"></script>
	<script>
		function myFunction() {
			a = document.getElementById('password');
			if (a.type === 'password') {
				a.type = 'text';
			} else {
				a.type = 'password';
			}
		}
	</script>
</body>

</html>