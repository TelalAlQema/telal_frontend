<?php
// Initialize the session
session_start();
 
// Unset all of the session variables
$_SESSION = array();
$_SESSION['open'] = 0;
// Destroy the session.
session_destroy();

 
// Redirect to login page
header("location: index.php");
exit;
?>