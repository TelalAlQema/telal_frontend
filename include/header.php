
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
<header id="header" class="transparent-header-modern fixed-header-bg-white w-100">
    <div class="top-header bg-secondary">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <ul class="top-contact list-text-white d-table">
                      
                        <li><i class="fas fa-phone-alt text-success mr-1" style="color:white"></i><a href="https://wa.me/97143372440" style="color:white">+971
                                43 37 2440</a> 
                                <!--| <a href="https://wa.me/971555983192">+971-->
                                <!--55-598-3192</a> | <a href="https://wa.me/971564924444">+971-->
                                <!--56-492-44444</a></li>-->
                        <li><a href="https://mail.google.com/mail/?view=cm&fs=1&to=info@telal-contracting.com" style="color:white"><i
                                    class="fas fa-envelope text-success mr-1"></i>info@telal-contracting.com</a>
                        </li>
                        <li>
                            <a href="https://www.google.com/maps/place/25.26325,55.31559" target="_blank" style="color:white">
                                <i class="fas fa-map-marker-alt text-success mr-1"></i>Al Reem Tower, Office 1301,
                                Dubai-UAE
                            </a>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </div>
    <div class="main-nav secondary-nav hover-success-nav py-2 bg-gray">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 col-lg-12 col-md-12 col-sm-12">
                    <nav class="navbar navbar-expand-lg navbar-light p-0"> <a class="navbar-brand" href="https://telal-contracting.com/"><img
                                class="nav-logo" style="width:250px; height: 70px;" src="images/logo/telal-logo.png"
                                alt=""></a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation"> <span
                                class="navbar-toggler-icon"></span> </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav mr-auto">
                                <li class="nav-item dropdown"> <a style="color:gray" class="nav-link"
                                        href="https://telal-contracting.com/" role="button" aria-haspopup="true"
                                        aria-expanded="false">Home</a></li>
                                <li class="nav-item"> <a style="color:gray" class="nav-link"
                                        href="about.php">About</a> </li>
                                <li class="nav-item"> <a style="color:gray" class="nav-link"
                                        href="contact.php">Contact Us</a> </li>
                                <li class="nav-item dropdown">
                                    <a style="color:gray" class="nav-link dropdown-toggle"
                                        href="mainservices.php" id="navbarDarkDropdownMenuLink" role="button"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        Our Services

                                    </a>
                                    <ul class="dropdown-menu dropdown-menu-dark"
                                        aria-labelledby="navbarDarkDropdownMenuLink">
                                        <li><a class="dropdown-item" href="hvac.php">HVAC
                                                Installation & Maintenance</a></li>
                                        <li><a class="dropdown-item" href="electrical.php">Electrical System
                                                Installation & Maintenance</a></li>
                                        <li><a class="dropdown-item" href="automatication.php">Home
                                                Automatication
                                                System</a></li>
                                        <li><a class="dropdown-item" href="plumbing.php">Plumbing</a></li>
                                        <li><a class="dropdown-item" href="fitout.php">Fit Out</a></li>
                                        <li><a class="dropdown-item" href="renovation.php">Renovation</a></li>
                                        <li><a class="dropdown-item" href="woodwork.php">Wood Works</a></li>
                                        <li><a class="dropdown-item" href="tiling.php">Tiling Works</a></li>
                                        <li><a class="dropdown-item" href="ceiling.php">Ceiling Work</a></li>
                                        <li><a class="dropdown-item" href="steel.php">Steel Works</a>
                                        </li>
                                        <li><a class="dropdown-item" href="glass.php">Glass & Aluminium
                                                Works</a></li>
                                        <li><a class="dropdown-item" href="cleaning.php">Home & Office
                                                Cleaning</a></li>
                                        <li><a class="dropdown-item" href="waterproof.php">Water-Proofing</a></li>
                                        <li><a class="dropdown-item" href="light.php">Lighting on Furniture & High Level
                                                Finishing</a></li>
                                    </ul>
                                </li>
                                <li class="nav-item"> <a style="color:gray" class="nav-link"
                                        href="ourteam.php">Our Team</a>
                                </li>
                                <?php if(isset($_SESSION['open']) && $_SESSION['open'] == 1){?>
                                <li class="nav-item"> <a style="color:gray" class="nav-link"
                                        href="detail.php">Incoming message</a>
                                </li>
                                <?php }?>
                                <!-- <li class="nav-item"> <a class="nav-link" href="login.php">Login/Register</a> </li> -->
                            </ul>
                            <!-- Button trigger modal -->
                            <a href="contact" class="btn btn-success d-xl-block d-xxl-block d-lg-block d-md-block d-none"style="border-radius:30px;" >   Get a Free Quote</a>
                         
                            <!-- Modal -->
                            <!--<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static"-->
                            <!--    data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel"-->
                            <!--    aria-hidden="true">-->
                            <!--    <div class="modal-dialog">-->
                            <!--        <div class="modal-content">-->
                            <!--            <form method="post" action="">-->
                            <!--                <div class="modal-header">-->
                            <!--                    <h5 class="modal-title" id="staticBackdropLabel">Quotation</h5>-->
                            <!--                    <button type="button" class="btn-close" data-bs-dismiss="modal"-->
                            <!--                        aria-label="Close"></button>-->
                            <!--                </div>-->
                            <!--                <div class="modal-body">-->
                            <!--                    <div class="mb-3">-->
                            <!--                        <label for="exampleInputEmail0" class="form-label">Name*</label>-->
                            <!--                        <input style="border:1px solid lightgrey" type="text"-->
                            <!--                            class="form-control" required name="name"-->
                            <!--                            id="exampleInputEmail0" aria-describedby="" maxlength="50">-->
                            <!--                    </div>-->
                            <!--                    <div class="mb-3">-->
                            <!--                        <label for="exampleInputEmail1" class="form-label">Email-->
                            <!--                            address*</label>-->
                            <!--                        <input style="border:1px solid lightgrey" type="email" maxlength="50" required-->
                            <!--                            class="form-control" name="email" id="exampleInputEmail1"-->
                            <!--                            aria-describedby="emailHelp">-->
                            <!--                    </div>-->
                            <!--                    <div class="mb-3">-->

                            <!--                        <label for="exampleInputEmail2" class="form-label">Phone*</label>-->

                            <!--                        <input style="border:1px solid lightgrey" type="tel" maxlength="16"-->
                            <!--                            class="form-control" required name="phone" value="+971"-->
                            <!--                            id="exampleInputEmail2" aria-describedby="emailHelp">-->
                            <!--                    </div>-->
                            <!--                    <div class="mb-3">-->
                            <!--                        <label for="exampleInputEmail3" class="form-label">Services*</label>-->
                            <!--                        <select style="border:1px solid lightgrey" name="services" id=""-->
                            <!--                            required class="form-control" id="exampleInputEmail3">-->
                            <!--                            <option value="HVAC Installation & Maintenance">HVAC-->
                            <!--                                Installation & Maintenance</option>-->
                            <!--                            <option value="Electrical System Installation & Maintenance">-->
                            <!--                                Electrical System Installation & Maintenance</option>-->
                            <!--                            <option value="Home Automatication System">Home Automatication-->
                            <!--                                System</option>-->
                            <!--                            <option value="Plumbing">Plumbing</option>-->
                            <!--                            <option value="Fit Out">Fit Out</option>-->
                            <!--                            <option value="Renovation">Renovation</option>-->
                            <!--                            <option value="Wood Work">Wood Works</option>-->
                            <!--                            <option value="Tiling Works">Tiling Works</option>-->
                            <!--                            <option value="Ceiling Work">Ceiling Work</option>-->
                            <!--                            <option value="Carpentry Works">Carpentry Works</option>-->
                            <!--                            <option value="Glass & Aluminium Works">Glass & Aluminium Works-->
                            <!--                            </option>-->
                            <!--                            <option value="Home & Office Cleaning">Home & Office Cleaning-->
                            <!--                            </option>-->
                            <!--                        </select>-->
                            <!--                    </div>-->
                                                
                            <!--                </div>-->
                            <!--                <div class="g-recaptcha"-->
                            <!--                     data-sitekey="6Ldph5ssAAAAABLk-qllvm7kjNXig3ZUceG-hij7"-->
                            <!--                     data-callback="enableSubmit">-->
                            <!--                </div>-->
                            <!--                <div class="modal-footer">-->
                            <!--                    <button type="button" class="btn btn-secondary"-->
                            <!--                        data-bs-dismiss="modal">Close</button>-->
                            <!--                    <button type="submit" name="quote" class="btn btn-primary " disabled id="submitBtn">Get Free-->
                            <!--                        Quote</button>-->
                            <!--                </div>-->
                            <!--                <script src="https://www.google.com/recaptcha/api.js" async defer></script>-->
                            <!--                <script>-->
                            <!--                  function enableSubmit() {-->
                            <!--                    document.getElementById('submitBtn').disabled = false;-->
                            <!--                  }-->
                            <!--                 </script>-->
                                              

                            <!--            </form>-->
                            <!--        </div>-->
                            <!--    </div>-->
                            <!--</div>-->
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</header>
<style>
/* Mobile-first responsive headings */
h1 {
    font-size: clamp(1.4rem, 5vw, 2.2rem);
}
h2 {
    font-size: clamp(1.25rem, 4.5vw, 1.8rem);
}
h3 {
    font-size: clamp(1.15rem, 4vw, 1.6rem);
}
h4 {
    font-size: clamp(1.05rem, 3.5vw, 1.3rem);
}
h5 {
    font-size: clamp(0.95rem, 3vw, 1.15rem);
}
h6 {
    font-size: clamp(0.85rem, 2.5vw, 1rem);
}

/* Better spacing for mobile readability */
h1, h2, h3, h4, h5, h6 {
    margin-bottom: 0.4em;
}

/* Extra fine-tuning for very small devices */
@media (max-width: 480px) {
    h1 { font-size: 1.5rem; }
    h2 { font-size: 1.3rem; }
    h3 { font-size: 1.15rem; }
}
</style>