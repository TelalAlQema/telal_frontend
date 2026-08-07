<?php
include 'server.php';
$sql1 = "SELECT * FROM freequote ORDER BY date DESC";

$result1 = mysqli_query($connect, $sql1);
$sql2 = "select * from contactcontact order by date desc";
$result2 = mysqli_query($connect, $sql2);

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <!-- FOR MORE PROJECTS visit: codeastro.com -->
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
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3498544422186445"
     crossorigin="anonymous"></script>
    <!--	Css Link
    ========================================================-->
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/bootstrap-slider.css">
    <link rel="stylesheet" type="text/css" href="css/jquery-ui.css">
    <link rel="stylesheet" type="text/css" href="css/layerslider.css">
    <link rel="stylesheet" type="text/css" href="css/color.css" id="color-change">
    <link rel="stylesheet" type="text/css" href="css/owl.carousel.min.css">
    <link rel="stylesheet" type="text/css" href="css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="fonts/flaticon/flaticon.css">
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <link rel="stylesheet" type="text/css" href="css/animation.css">
    <!--	Title
    =========================================================-->
    <title>Incoming details | Telal Al Qema Building Contracting</title>
    <style>
        /* body {
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 20px;
        } */

        .toggle-button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100px;
            height: 40px;
            background-color: #4CAF50;
            /* Green color for both states */
            border-radius: 20px;
            font-size: 18px;
            font-weight: bold;
            color: white;
            position: relative;
            cursor: pointer;
            transition: transform 0.3s ease;
            border: none;
            outline: none;
        }

        .toggle-button::before {
            content: attr(data-status);
            /* Displays On/Off */
            position: absolute;
            left: 10px;
            font-size: 14px;
            font-weight: bold;
            color: white;
        }

        .number {
            margin-left: 50px;
            /* Moves the number to the right of the button */
            font-size: 18px;
            font-weight: bold;
            color: white;
        }
    </style>
</head>
<?php session_start();
if ($_SESSION['open'] == 1) {
    ?>

    <body>
        <?php include("include/header.php"); ?>
        <div id="page-wrapper">
            <div class="row" style="margin:30px">
                <!--	Header start  -->
                <div class="full-row bg-gray" style="mx-4">
                    <div class="p-3">
                    <a href="logout.php" style="float:right" class="btn btn-secondary">Logout</a>
                    <!-- <span style="float:right" ><a href="" class="btn">logout</a></span> -->
                    <button id="filterToggle" class="toggle-button" data-status="Table">
                        <span id="buttonNumber" class="number">1</span>
                    </button>
                    </div>
                    <div class="container-fluid">

                        <div class="row mt-4">
                            <div class="col-lg-12 col-md-12 col-sm-12">
                                <div class="row text-center" id="toggleStatus">
                                </div>
                                <table class="table table-striped table-hover" id="table1">
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Services</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                    </tr>
                                    <?php if (mysqli_num_rows($result1)) {
                                        while ($row1 = mysqli_fetch_assoc($result1)) {
                                            ?>
                                            <tr style="height:100px;overflow:hidden">
                                                <td><?php echo $row1['name'] ?></td>
                                                <td> <a
                                                        href="https://mail.google.com/mail/?view=cm&fs=1&to=<?php echo $row1['email'] ?>">
                                                        <?php echo $row1['email'] ?></a></td>
                                                <td><a
                                                        href="https://wa.me/<?php echo $row1['phone'] ?>"><?php echo $row1['phone'] ?></a>
                                                </td>
                                                <td><?php echo $row1['services'] ?></td>
                                                <td><?php echo $row1['date'] ?></td>
                                                <td><?php echo $row1['time'] ?></td>
                                            </tr>
                                            <?php
                                        }
                                    } ?>

                                </table>
                            </div>
                            <div class="col-lg-12 col-md-12 col-sm-12">
                                <div class="row text-center">
                                </div>
                                <table class="table table-striped table-hover" id="table2" class="table"
                                    style="display: none;">
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Services</th>
                                        <th>Comments</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                    </tr>

                                    <?php if (mysqli_num_rows($result2)) {
                                        while ($row2 = mysqli_fetch_assoc($result2)) {
                                            ?>
                                            <tr style="height:100px;overflow:auto">
                                                <td><?php echo $row2['name'] ?></td>
                                                <td> <a
                                                        href="https://mail.google.com/mail/?view=cm&fs=1&to=<?php echo $row2['email'] ?>">
                                                        <?php echo $row2['email'] ?></a></td>
                                                <td><a
                                                        href="https://wa.me/<?php echo $row2['phone'] ?>"><?php echo $row2['phone'] ?></a>
                                                </td>
                                                <td><?php echo $row2['services'] ?></td>
                                                <td><?php echo $row2['comment'] ?></td>
                                                <td><?php echo $row2['date'] ?></td>
                                                <td><?php echo $row2['time'] ?></td>
                                            </tr>
                                            <?php
                                        }
                                    } ?>
                                    <tr>
                                    <div>Index - Contact Details</div>
                                    </tr>
                                    <?php 
                                    $sql3 = "select * from indexcontact order by date desc";
                                    $result3 = mysqli_query($connect, $sql3);
                                    if (mysqli_num_rows($result3)) {
                                        while ($row3 = mysqli_fetch_assoc($result3)) {
                                            ?>
                                            <tr style="height:100px;overflow:hidden">
                                                <td><?php echo $row3['name'] ?></td>
                                                <td> <a
                                                        href="https://mail.google.com/mail/?view=cm&fs=1&to=<?php echo $row3['email'] ?>">
                                                        <?php echo $row3['email'] ?></a></td>
                                                <td><a
                                                        href="https://wa.me/<?php echo $row3['phone'] ?>"><?php echo $row3['phone'] ?></a>
                                                </td>
                                                <td><?php echo $row3['services'] ?></td>
                                                <td><?php echo $row3['comment'] ?></td>
                                                <td><?php echo $row3['date'] ?></td>
                                                <td><?php echo $row3['time'] ?></td>
                                            </tr>
                                            <?php
                                        }
                                    } ?>

                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <!--	Footer   start-->
                <!-- Scroll to top -->
                <a href="#" class="bg-success text-white hover-text-secondary" id="scroll"><i
                        class="fas fa-angle-up"></i></a>
                <!-- End Scroll To top -->
            </div>
        </div>
        <?php include("include/footer.php"); ?>

        <!-- Wrapper End -->
        <script>
            const toggleButton = document.getElementById('filterToggle');
            const buttonNumber = document.getElementById('buttonNumber');
            const toggleStatus = document.getElementById('toggleStatus');
            const table1 = document.getElementById('table1');
            const table2 = document.getElementById('table2');

            let counter = 1; // Initial count
            let isOn = false; // Initial state (Off)

            toggleButton.addEventListener('click', () => {
                isOn = !isOn;
                toggleButton.setAttribute('data-status', isOn ? 'Table' : 'Table');
                toggleStatus.textContent = `Status: ${isOn ? 'Comments' : 'Quotation'}`;

                if (isOn) {
                    table1.style.display = 'none';
                    table2.style.display = 'Table';
                    counter++;
                } else {
                    table1.style.display = 'Table';
                    table2.style.display = 'none';
                    counter--;
                }
                buttonNumber.textContent = counter; // Update the number on the button
            });
        </script>
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
        <script src="js/YouTubePopUp.jquery.js"></script>
        <script src="js/validate.js"></script>
        <script src="js/jquery.cookie.js"></script>
        <script src="js/custom.js"></script>
    </body>
<?php } else {
    header('location:index.php');
} ?>

</html>