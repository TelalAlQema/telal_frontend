<?php
// include 'server.php';
// if (isset($_POST['contact'])) {
//     $name = $_POST['name'];
//     $email = $_POST['email'];
//     $phone = $_POST['phone'];
//     $services = $_POST['services'];
//     $comment = $_POST['comment'];
//     $date = date('d-M-Y');
//     $time = date('h:i:s A');

//     $data = "insert into indexcontact (name, email, phone, services, comment, date, time) values ('$name', '$email', '$phone', '$services','$comment','$date', '$time')";

//     $query = mysqli_query($connect, $data);

//     if ($query) {
//         // Redirect after successful insertion
//         header("Location: thankyou.php"); // Redirect to a thank you page or the same page
//         exit; // Make sure the script stops after redirect
//     } else {
//         // Show error message and then redirect
//         echo "<script>
//                 window.onload = function() {
//                     Swal.fire({
//                         title: 'Sorry',
//                         text: 'Try again later',
//                         icon: 'error',
//                         confirmButtonText: 'OK'
//                     }).then(function() {
//                         window.location.href = 'index.php'; // Redirect back to the form
//                     });
//                 };
//               </script>";
//     }
// }
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <!-- FOR MORE PROJECTS visit: codeastro.com -->
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta name="google-adsense-account" content="ca-pub-3498544422186445"><meta name="description" content="Telal Al Qema Building Contracting – Professional contracting services in UAE. Quality construction, MEP, waterproofing, and renovation solutions for residential and commercial projects.">

    <!-- Meta Tags -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="shortcut icon" href="images/logo/title-telal.png">
    <!-- Latest compiled and minified CSS -->
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
      <link rel="stylesheet" href="css/style.css" />

    <!--	Title
    =========================================================-->
    <title>Technical Services Company in Dubai | Telal Al Qema Building Contracting</title>
    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
        }

        .carousel-container {
            position: relative;
            width: 90%;
            margin: auto;
            overflow: hidden;
            background-color: #f9f9f9;
        }

        .carousel {
            display: flex;
            animation: scrollCarousel 20s linear infinite;
        }

        .card {
            flex: 0 0 calc(15% - 10px);
            /* Adjust card size with margin */
            margin: 5px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            background-color: #fff;
            border-radius: 8px;
            text-align: center;
            overflow: hidden;
            height: 160px;
        }

        .card img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-bottom: 2px solid #ddd;
        }

        .card p {
            padding: 10px 0;
            margin: 0;
            font-size: 14px;
            font-weight: bold;
        }

        /* Keyframes for infinite scrolling */
        @keyframes scrollCarousel {
            0% {
                transform: translateX(0);
            }

            100% {
                transform: translateX(-100%);
            }
        }

        /* Media queries for responsiveness */
        @media (max-width: 1200px) {
            .card {
                flex: 0 0 calc(25% - 10px);
                /* 4 cards per row */
                height: 160px;
            }

            .card p {
                font-size: 13px;
            }
        }

        @media (max-width: 992px) {
            .card {
                flex: 0 0 calc(33.33% - 10px);
                /* 3 cards per row */
                height: 160px;
            }

            .card p {
                font-size: 12px;
            }
        }

        @media (max-width: 768px) {
            .card {
                flex: 0 0 calc(50% - 10px);
                /* 2 cards per row */
                height: 160px;
            }

            .card p {
                font-size: 11px;
            }
        }

        @media (max-width: 480px) {
            .card {
                flex: 0 0 100%;
                /* 1 card per row */
                height: 160px;
            }

            .card p {
                font-size: 10px;
            }
        }
    </style>

</head>

<body>
    <?php require_once 'include/header.php'; ?>
    <div id="page-wrapper">
        <div class="row">
            <!--	Header start  -->
            <div class="row mt-5" id="banner" style="margin:15px">
                <div class="banner-right col-lg-4 col-md-5 col-sm-12 mt-5" id="banner-left">
                    <span class="" style="color:orange;font-weight:900">GREAT TECHNOLOGY</span>
                    <div class="mt-4" style="color:green;font-weight:900;font-size:36px"> BEST TECHNICAL</div>
                    <div class="mt-3" style="color:green;font-weight:900;font-size:36px">SERVICES</div>
                    <p class="mt-4">As a proficient company operating in Dubai, Telal Al Qema Building Contracting always
                        strives to meet
                        the demands of its clients with skill and capability. </p>
                </div>
                <div class="banner-left col-lg-8 col-md-7 col-sm-12" id="banner-right">
                    <img src="images/services/mainprofile.jpeg" class="" style="width:100%;height:100%" alt="...">
                </div>
            </div>
            <!--	Banner End  -->
            <!--	Text Block One
        ======================================================-->
            <div class="full-row bg-gray">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-12"><!-- FOR MORE PROJECTS visit: codeastro.com -->
                            <div class=" text-center mb-3" id="banner-top"
                                style="font-size:24px; color:green;font-weight:900;">
                                Telal Al Qema Building Contracting
                            </div>
                        </div>
                    </div>
                    <div class=" text-box-one" id="banner-bottom">
                        <div class="row">
                            <div class="thumbnails col-lg-3 col-md-6">
                                <div class="p-4 text-center hover-bg-white hover-shadow rounded mb-4 transation-3s">
                                    <a href="hvac.php">
                                    <img src="images/thumbnail4/hvac.webp" style="height:150px" alt="">
                                    <h5 class="text-secondary hover-text-success py-3 m-0">HVAC
                                            Installation
                                            and Maintenance</h5>
                                            </a>
                                </div>
                            </div>
                            <div class="thumbnails col-lg-3 col-md-6">
                                <div class="p-4 text-center hover-bg-white hover-shadow rounded mb-4 transation-3s">
                                    <a href="electrical.php">
                                    <img src="images/thumbnail4/electrician.webp" style="height:150px" alt="">
                                    <h5 class="text-secondary hover-text-success py-3 m-0">Electrical System
                                            Installation & Maintenance</h5></a>
                                </div>
                            </div>
                            <div class="thumbnails col-lg-3 col-md-6">
                                <div class="p-4 text-center hover-bg-white hover-shadow rounded mb-4 transation-3s">
                                    <a href="automatication.php">
                                    <img src="images/thumbnail4/automatication.jpg" style="height:150px" alt="">
                                    <h5 class="text-secondary hover-text-success py-3 m-0">Home
                                            Automatication System</h5>
                                            </a>
                                </div>
                            </div>
                            <div class="thumbnails col-lg-3 col-md-6">
                                <div class="p-4 text-center hover-bg-white hover-shadow rounded mb-4 transation-3s">
                                    <a href="plumbing.php">
                                    <img src="images/thumbnail4/plumbing.png" style="height:150px" alt="">
                                    <h5 class="text-secondary hover-text-success py-3 m-0">
                                            Plumbing
                                        </h5>
                                        </a>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="thumbnails col-lg-3 col-md-6">
                                <div class="p-4 text-center hover-bg-white hover-shadow rounded mb-4 transation-3s">
                                    <a href="fitout.php">
                                    <img src="images/thumbnail4/fitout.jpg" style="height:150px" alt="">
                                    <h5 class="text-secondary hover-text-success py-3 m-0">Fit
                                            Out</h5>
                                    </a>
                                </div>
                            </div>
                            <div class="thumbnails col-lg-3 col-md-6">
                                <div class="p-4 text-center hover-bg-white hover-shadow rounded mb-4 transation-3s">
                                    <a href="renovation.php">
                                    <img src="images/thumbnail4/renovation.jpg" style="height:150px" alt="">
                                    <h5 class="text-secondary hover-text-success py-3 m-0">Renovation
                                    </h5>
                                    </a>
                                </div>
                            </div>
                            <div class="thumbnails col-lg-3 col-md-6">
                                <div class="p-4 text-center hover-bg-white hover-shadow rounded mb-4 transation-3s">
                                    <a href="woodwork.php">
                                    <img src="images/thumbnail4/wood.jpg" style="height:150px" alt="">
                                    <h5 class="text-secondary hover-text-success py-3 m-0">Wood
                                            Work & Carpentry
                                    </h5>
                                    </a>
                                </div>
                            </div>
                            <div class="thumbnails col-lg-3 col-md-6">
                                <div class="p-4 text-center hover-bg-white hover-shadow rounded mb-4 transation-3s">
                                    <a href="tiling.php">
                                    <img src="images/thumbnail4/tile.jpg" style="height:150px" alt="">
                                    <h5 class="text-secondary hover-text-success py-3 m-0">Tiling
                                            Works
                                    </h5>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-5 col-md-5 col-sm-12"></div>
                            <div class="col-lg-2 col-md-2 col-sm-12"><a href="mainservices.php"
                                    class="btn btn-success form-control p-2" style="border:1px solid green"
                                    style="font-size:20px">Full View
                                    &#8594;</a></div>
                            <div class="col-lg-5 col-md-5 col-sm-12"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="full-row bg-white">
                <div class="container-fluid">
                    <div class="row" style="margin:15px">
                        <div class="col-lg-12 col-md-12" id="banner-top">
                            <!-- FOR MORE PROJECTS visit: codeastro.com -->
                            <div class=" text-center" style="font-size:24px; color:green;font-weight:900;">
                                Telal Al Qema Building Contracting DUBAI
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" style="margin:30px">
                    <div class="col-lg-12 col-md-12" id="banner-bottom">
                        <p style="text-align:justify">
                            At Telal Al Qema Building Contracting Dubai, we aim at delivering the best and most distinct
                            services to the clients in Dubai. Our achievements are based on the performance and
                            proficient services that are in accordance to the needs of our customers. Our management
                            team has extensive experience in the field of technical services. We have wide range of
                            services that are being provided to our highly satisfied clients in Dubai. Telal Al Qema Building Contracting sole purpose is to provide excellence and quality services in this field.
                        </p>
                    </div>
                </div>
            </div>
            <!-----  Our Services  ---->
            <div class="full-row bg-gray">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-12">
                            <div class="text-center mb-5" style="font-size:24px; color:green; font-weight:900;"
                                id="banner-top">
                                KEY FEATURES OF Telal Al Qema Building Contracting DUBAI
                            </div>
                            <div class="row" style="margin:30px;text-align:justify">
                                <div class="col-md-4 col-lg-4 col-sm-12 order-1 order-md-1" id="banner-left">
                                    <h4 style="color:orange">Quality Material</h4>
                                    <p>We use only the highest quality materials in all of our services and management
                                        to achieve optimal results and customer satisfaction.</p>
                                    <h4 style="color:orange">Expert Team</h4>
                                    <p>We have an experienced team, from base to field, that adds grace and beauty to
                                        the work.</p>
                                </div>
                                <div class="col-md-4 col-lg-4 col-sm-12 order-3 order-md-2" id="banner-bottom">
                                    <img src="images/banner/services.png" style="height:100%; width:100%;" alt="">
                                </div>
                                <div class="col-md-4 col-lg-4 col-sm-12 order-2 order-md-3" id="banner-right">
                                    <h4 style="color:orange">Reasonable Cost</h4>
                                    <p>We offer ways to reduce costs and energy consumption while maintaining reasonable
                                        prices for technical services to our clients in Dubai.</p>
                                    <h4 style="color:orange">Secure & Safe</h4>
                                    <p>We provide work and quality that is being delivered through safe and competent
                                        hands.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="full-row bg-white">
                <div class="container-fluid">
                    <div class="row" style="margin:30px">
                        <div class="col-md-4 col-lg-6 col-sm-12" id="banner-left">
                            <img src="images/banner/server2.webp" style="height:400px" alt="">
                        </div>
                        <div class="col-md-8 col-lg-6 col-sm-12" id="banner-right" style="text-align:justify">
                            <span style="color:green;font-size:24px;font-weight:900">BEST TECHNICAL SERVICES IN
                                DUBAI</span>
                            <p class="mt-3">We offer a wide range of technical services in Dubai such as ac maintenance, coil
                                cleaning, duct cleaning, plumbing, handyman servicing, electrical works,
                                water-tank cleaning, and painting. Our goal at Telal Al Qema Building Contracting is
                                to assist our customers, whether they are small businesses or large corporations
                                with multiple locations, by providing efficient, high-quality services.

                                Customer satisfaction is our highest priority, and we are committed to doing
                                everything we can to ensure our customers are satisfied. Our team of expert
                                technicians provides fast, reliable service to make spaces safe and comfortable.
                            </p>
                            <div style="border-left: 2px solid orange">
                                <p class="mx-3">
                                    Telal Al Qema Building Contracting commitment to reliable and trustworthy service has
                                    made it well-known for providing excellent, efficient, quality, and reasonably
                                    costing technical services in Dubai. We have acquired a name that has made our
                                    customers to continuously trust us for their needs and requirements and we look
                                    forward to keep up to our standards and values.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="full-row bg-white">
                    <div class="container-fluid">
                        <div class="row" style="background:orange" id="banner-top">
                            <div class="col-12 col-md-12 col-lg-12 col-sm-12 text-center p-5" id="banner-bottom">
                                <a href="tel:+971 43 372440" style="color:white; font-size:24px;font-weight: 900"><i
                                        class="fas fa-phone"></i>
                                    ONE CALL CAN SOLVE ALL YOUR HOUSE PROBLEMS</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="full-row bg-gray">
                    <div class="container-fluid">
                        <div class="row" style="margin:30px">
                            <div class="col-md-6 col-lg-6 col-sm-6 mt-5 order-lg-1 order-md-1 order-sm-2"
                                id="banner-left">
                                <img src="images/banner/contact.jpg" style="height:480px" alt="">
                            </div>
                            <div class="col-md-6 col-lg-6 col-sm-6 order-lg-2 order-md-2 order-sm-1" id="banner-right">
                                <div style="color:orange;font-size:24px;font-weight:900">Contact Us</div>
                                <div style="font-size:24px; color:green; font-weight:900" class="mt-3">YOU CAN CONTACT
                                    US, IF YOU
                                    HAVE </div>
                                <div style="font-size:24px; color:green; font-weight:900" class="mt-2">ANY QUERY</div>
                                <form action="sendmailcontact" method="POST" novalidate>
              <div class="row g-3">
                <div class="col-md-6">
                  <label for="name" class="form-label">Name</label>
                  <input type="text" id="name" name="name" class="form-control" maxlength="50" placeholder="Name" required style="border:1px solid lightgrey;">
                </div>

                <div class="col-md-6">
                  <label for="email" class="form-label">Email</label>
                  <input type="email" id="email" name="email" class="form-control" maxlength="50" placeholder="Email" required style="border:1px solid lightgrey;">
                </div>

                <div class="col-md-6">
                  <label for="phone" class="form-label">Phone</label>
                  <input type="tel" id="phone" name="phone" class="form-control" maxlength="16" value="+971" placeholder="Phone No" required style="border:1px solid lightgrey;">
                </div>

                <div class="col-md-6">
                  <label for="services" class="form-label">Service</label>
                  <select name="services" id="services" class="form-control" required style="border:1px solid lightgrey;">
                    <option value="">Select a service</option>
                    <option value="HVAC Installation & Maintenance">HVAC Installation & Maintenance</option>
                    <option value="Electrical System Installation & Maintenance">Electrical System Installation & Maintenance</option>
                    <option value="Home Automation System">Home Automation System</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Fit Out">Fit Out</option>
                    <option value="Renovation">Renovation</option>
                    <option value="Wood Work">Wood Works</option>
                    <option value="Tiling Works">Tiling Works</option>
                    <option value="Ceiling Work">Ceiling Work</option>
                    <option value="Carpentry Works">Carpentry Works</option>
                    <option value="Glass & Aluminium Works">Glass & Aluminium Works</option>
                    <option value="Home & Office Cleaning">Home & Office Cleaning</option>
                  </select>
                </div>

                <div class="col-12">
                  <label for="comments" class="form-label">Short Description</label>
                  <textarea name="comment" id="comments" class="form-control" rows="5" maxlength="300" required placeholder="Short Description" style="border:1px solid lightgrey;"></textarea>
                </div>

                <div class="col-12">
                  <div class="g-recaptcha"
                       data-sitekey="6Ldph5ssAAAAABLk-qllvm7kjNXig3ZUceG-hij7"
                       data-callback="enableSubmit"
                       data-expired-callback="disableSubmit"
                       data-error-callback="disableSubmit"></div>
                </div>

                <div class="col-12">
                  <button type="submit" name="contact" class="btn btn-success w-100" id="submitBtn1"  disabled style="border:1px solid green;">
                    Submit
                  </button>
                </div>
              </div>
            </form>
              <script src="https://www.google.com/recaptcha/api.js" async defer></script>
            <script>
              function enableSubmit() {
                document.getElementById('submitBtn1').disabled = false;
              }
            
              function disableSubmit() {
                document.getElementById('submitBtn1').disabled = true;
              }
            
              // Initialize button disabled until captcha is verified
              document.addEventListener('DOMContentLoaded', function () {
                disableSubmit();
              });
            </script>
                <p class="small text-muted mt-3">
              We respect your privacy. By contacting us you agree to receive a response regarding your enquiry.
            </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="full-row bg-white">
                    <div class="container-fluid">
                        <div class="row" style="margin:30px">
                            <div class="col-12 col-md-12 col-lg-12 col-sm-12 ">
                                <div class="row">
                                    <div class="col-md-4 col-lg-4 col-sm-12">
                                        <div style="color:green;font-size:24px; font-weight:900" id="banner-top">ANY
                                            QUESTIONS?
                                        </div>
                                        <div style="color:green;font-size:24px; font-weight:900" class="mt-2"
                                            id="banner-top"> CHECK OUT
                                            FAQs</div>
                                        <p style="color:orange" id="banner-top">Still have unanswered questions and need
                                            to get in
                                            touch?</p>

                                        <div class="services-card text-box-one">
                                            <div class="row">
                                                <div class="col-lg-6 col-md-6">
                                                    <a href="tel:+971555983192" style="font-size:24px">
                                                        <div
                                                            class="p-4 text-center hover-bg-white hover-shadow rounded mb-4 transation-3s">
                                                            <i class="fas fa-phone text-success flat-medium"
                                                                aria-hidden="true"></i>
                                                            <h5 class="text-secondary hover-text-success py-3 m-0">Still
                                                                have Question?</h5>
                                                            Call Us →
                                                        </div>
                                                    </a>
                                                </div>
                                                <div class="col-lg-6 col-md-6">
                                                    <a href="https://wa.me/971554812787" style="font-size:24px">
                                                        <div
                                                            class="p-4 text-center hover-bg-white hover-shadow rounded mb-4 transation-3s">
                                                            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                                                                style="width:52px" alt="WhatsApp"
                                                                style="width: 40px; height: 40px;">
                                                            <h5 class="text-secondary hover-text-success py-3 m-0">
                                                                Still have Question?
                                                            </h5>
                                                            Chat
                                                            With Us →
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-8 col-lg-8 col-sm-12" id="banner-right">
                                        <div class="accordion accordion-flush" id="accordionFlushExample">
                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="flush-headingOne">
                                                    <button class="accordion-button collapsed" type="button"
                                                        data-bs-toggle="collapse" data-bs-target="#flush-collapseOne"
                                                        aria-expanded="false" aria-controls="flush-collapseOne">
                                                        Q: What is an Annual Maintenance Contract (AMC)?
                                                    </button>
                                                </h2>
                                                <div id="flush-collapseOne" class="accordion-collapse collapse"
                                                    aria-labelledby="flush-headingOne"
                                                    data-bs-parent="#accordionFlushExample">
                                                    <div class="accordion-body">A: An Annual Maintenance Contract (AMC)
                                                        is
                                                        an agreement between the technical service provider and client
                                                        in
                                                        which the client's property is maintained and taken care of for
                                                        the
                                                        entire year. The services outlined in the agreement are provided
                                                        to
                                                        customers at their convenience, and it's a great way to get
                                                        support
                                                        at affordable prices.</div>
                                                </div>
                                            </div>
                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="flush-headingTwo">
                                                    <button class="accordion-button collapsed" type="button"
                                                        data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo"
                                                        aria-expanded="false" aria-controls="flush-collapseTwo">
                                                        Q: Is it worth getting an AMC contract with
                                                        Telal Al Qema Building Contracting?
                                                    </button>
                                                </h2>
                                                <div id="flush-collapseTwo" class="accordion-collapse collapse"
                                                    aria-labelledby="flush-headingTwo"
                                                    data-bs-parent="#accordionFlushExample">
                                                    <div class="accordion-body">
                                                        A: Absolutely! With our AMC, you get numerous technical services
                                                        of
                                                        your preference at pocket-friendly prices. With our AMC, you can
                                                        stop worrying about everything because it will take care of all
                                                        your
                                                        technical needs for a year. It makes maintenance an easy and
                                                        stress-free job for you with high-quality results.</div>
                                                </div>
                                            </div>
                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="flush-headingThree">
                                                    <button class="accordion-button collapsed" type="button"
                                                        data-bs-toggle="collapse" data-bs-target="#flush-collapseThree"
                                                        aria-expanded="false" aria-controls="flush-collapseThree">
                                                        Q: What services are offered in your AMC
                                                        package?
                                                    </button>
                                                </h2>
                                                <div id="flush-collapseThree" class="accordion-collapse collapse"
                                                    aria-labelledby="flush-headingThree"
                                                    data-bs-parent="#accordionFlushExample">
                                                    <div class="accordion-body">
                                                        A: Our AMC package includes services such as cleaning of
                                                        appliances,
                                                        AC maintenance services, maintenance of property, extra-low
                                                        voltage
                                                        services, commercial cleaning, and much more
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="flush-headingFour">
                                                    <button class="accordion-button collapsed" type="button"
                                                        data-bs-toggle="collapse" data-bs-target="#flush-collapseFour"
                                                        aria-expanded="false" aria-controls="flush-collapseFour">
                                                        Q: What makes Telal Al Qema Building Contracting
                                                        the best technical services company in Dubai?
                                                    </button>
                                                </h2>
                                                <div id="flush-collapseFour" class="accordion-collapse collapse"
                                                    aria-labelledby="flush-headingFour"
                                                    data-bs-parent="#accordionFlushExample">
                                                    <div class="accordion-body">
                                                        A: Telal Al Qema Building Contracting is considered the best
                                                        technical
                                                        services company in Dubai for several reasons. We offer a wide
                                                        range
                                                        of services to our customers, have all the modern machinery you
                                                        need
                                                        for maintenance, have a professional and highly reliable staff,
                                                        charge what we work for, and welcome entities of all sizes
                                                        including
                                                        villas.</div>
                                                </div>
                                            </div>
                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="flush-headingFive">
                                                    <button class="accordion-button collapsed" type="button"
                                                        data-bs-toggle="collapse" data-bs-target="#flush-collapseFive"
                                                        aria-expanded="false" aria-controls="flush-collapseFive">
                                                        Q: Do your technical services provide
                                                        quality results?
                                                    </button>
                                                </h2>
                                                <div id="flush-collapseFive" class="accordion-collapse collapse"
                                                    aria-labelledby="flush-headingFive"
                                                    data-bs-parent="#accordionFlushExample">
                                                    <div class="accordion-body">
                                                        A: Yes, definitely. We work with professionalism and have
                                                        skilled
                                                        laborers with modern machinery to provide you with the best
                                                        services. Quality is ensured because our team works through
                                                        detailed
                                                        planning, which is what makes us the best technical services
                                                        company
                                                        in Dubai.</div>
                                                </div>
                                            </div>
                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="flush-headingSix">
                                                    <button class="accordion-button collapsed" type="button"
                                                        data-bs-toggle="collapse" data-bs-target="#flush-collapseSix"
                                                        aria-expanded="false" aria-controls="flush-collapseSix">
                                                        Q: Do you also offer Villa maintenance in
                                                        your AMC?
                                                    </button>
                                                </h2>
                                                <div id="flush-collapseSix" class="accordion-collapse collapse"
                                                    aria-labelledby="flush-headingSix"
                                                    data-bs-parent="#accordionFlushExample">
                                                    <div class="accordion-body">
                                                        A: Yes! We are one of the best villa maintenance companies in
                                                        Dubai.
                                                        Our company offers Annual maintenance contracts to our customers
                                                        who
                                                        own villas to ensure the maintenance of such huge properties and
                                                        satisfy them. A wide range of services is offered including
                                                        cleaning, painting, water tank cleaning, and several others to
                                                        make
                                                        work a lot more accessible for you..
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="full-row bg-gray">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-12 col-md-12 col-lg-12 col-sm-12 text-center ">
                            <span style="font-size:24px;color:green;font-weight:900">Our Brand Partners</span>
                        </div>
                        <div class="col-12 col-md-12 col-lg-12 col-sm-12 mt-3">
                            <div class="row">
                                <div class="carousel-container">
                                    <div class="carousel">
                                        <!-- Individual cards for each image -->
                                        <div class="card"><img style="widht:100%" src="images/brands/brand1.jpeg"
                                                alt="Image 1">

                                        </div>
                                        <div class="card"><img style="widht:90%" src="images/brands/4.webp"
                                                alt="Image 2">

                                        </div>
                                        <div class="card"><img style="widht:100%;" src="images/brands/brand13.jpg"
                                                alt="Image 3">

                                        </div>
                                        <div class="card"><img style="widht:100%" src="images/brands/brand4.jpeg"
                                                alt="Image 4">

                                        </div>
                                        <div class="card"><img style="widht:100%" src="images/brands/leg3.png"
                                                alt="Image 5">

                                        </div>
                                        <div class="card"><img style="widht:100%" src="images/brands/brand6.jpeg"
                                                alt="Image 6">

                                        </div>

                                        <div class="card"><img style="widht:100%" src="images/brands/brand8.jpeg"
                                                alt="Image 8">

                                        </div>
                                        <div class="card"><img style="widht:100%" src="images/brands/s.png"
                                                alt="Image 9">

                                        </div>
                                        <div class="card"><img style="widht:100%" src="images/brands/brand10.jpeg"
                                                alt="Image 10">

                                        </div>
                                        <div class="card"><img style="widht:100%" src="images/brands/brand11.jpeg"
                                                alt="Image 11">

                                        </div>
                                        <div class="card"><img style="widht:100%" src="images/brands/b.gif"
                                                alt="Image 12">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <?php include("include/footer.php"); ?>
            <!--	Footer   start-->
            <!-- Scroll to top -->
            <a href="#" class="bg-success text-white hover-text-secondary" style="border-radius:50%" id="scroll"><i
                    class="fas fa-angle-up"></i></a>
            <a href="tel:+97552615993" class="bg-success text-white hover-text-secondary mt-3"
                style="border-radius:50%" id="scroll"><i class="fas fa-phone"></i></a>
            <a href="https://wa.me/971552615993" class="bg-success text-white hover-text-secondary mt-3"
                style="border-radius:50%" id="scroll"><img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" style="width:52px"
                    alt="WhatsApp" style="width: 40px; height: 40px;"></a>

            <!-- End Scroll To top -->
        </div>
    </div>


  <!-- Overlay -->
  <!--<div class="modal-overlay" id="modalOverlay"></div>-->

  <!-- Modal -->
<!--  <div class="modal" id="welcomeModal">-->
<!--    <div class="btn-close" id="modalClose">&times;</div>-->
    
    
<!--  <h5>Welcome to Telal Al Qema Building Contracting</h5>-->

<!--<p>-->
<!--  Thank you for visiting our official website. We specialize in delivering high-quality building contracting services across Dubai and the UAE — -->
<!--  including construction, fit-out, renovation, MEP works, waterproofing, and general maintenance. -->
<!--  Explore our site to discover how Telal Al Qema brings excellence, reliability, and innovation to every project.-->
<!--</p>-->

<!-- <p>If you want to list your properties? <a href="verifyemail">Create Account</a></p> -->

<!--<button class="btn btn-primary" id="gotItBtn">Got it</button>-->

<!--<span style="display:block; margin-bottom:10px;">-->
<!--  Developed By - Syed Hasnain Raza -->
<!--  <a class="portfolio-link" href="http://syedhasnain-portfolio.netlify.app/" target="_blank">-->
<!--    Check Portfolio-->
<!--  </a>-->
<!--</span>-->

<!--  </div>-->

  <script>
    document.addEventListener("DOMContentLoaded", function () {
      const modal = document.getElementById("welcomeModal");
      const overlay = document.getElementById("modalOverlay");
      const closeBtn = document.getElementById("modalClose");
      const gotItBtn = document.getElementById("gotItBtn");

      // Show modal once per session
      if (!sessionStorage.getItem("modalShown")) {
        setTimeout(() => {
          modal.style.display = "flex";
          overlay.style.display = "block";
          sessionStorage.setItem("modalShown", "true");
        }, 200);
      }

      function closeModal() {
        modal.style.display = "none";
        overlay.style.display = "none";
      }

      closeBtn.addEventListener("click", closeModal);
      gotItBtn.addEventListener("click", closeModal);
      overlay.addEventListener("click", closeModal);
    });
  </script>


  <script>
    document.addEventListener("DOMContentLoaded", function () {
      const modal = document.getElementById("welcomeModal");
      const overlay = document.getElementById("modalOverlay");
      const closeBtn = document.getElementById("modalClose");
      const gotItBtn = document.getElementById("gotItBtn");

      // Show modal once per session
      if (!sessionStorage.getItem("modalShown")) {
        setTimeout(() => {
          modal.style.display = "flex";
          overlay.style.display = "block";
          sessionStorage.setItem("modalShown", "true");
        }, 200);
      }

      function closeModal() {
        modal.style.display = "none";
        overlay.style.display = "none";
      }

      closeBtn.addEventListener("click", closeModal);
      gotItBtn.addEventListener("click", closeModal);
      overlay.addEventListener("click", closeModal);
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

</html>