<template>
    <!DOCTYPE html>
    <html lang='en'>
        <head>
            <meta charset='UTF-8' />
            <meta name='viewport' content='width=device-width, initial-scale=1.0' />
            <title>Events</title>
            <!-- Bootstrap CSS -->
            <link
                    href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css'
                    rel='stylesheet'
                    integrity='sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN'
                    crossorigin='anonymous'
            />
        </head>
        <body>
            <div class="container-fluid">
                <!-- Navbar start -->
                <div class="row">
                    <nav class="navbar navbar-expand-md bg-maincolor">
                            <div class="container-fluid">
                            <a class="navbar-brand" href="#">EcoConnect</a>
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                                <ul class="navbar-nav">
                                <li class="nav-item">
                                    <a class="nav-link active" href="/volunteer">Volunteer Now!</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link active" href="#">Login</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link active" href="#">Sign Up</a>
                                </li>
                                </ul>
                            </div>
                            </div>
                    </nav>
                </div>
                <!-- Navbar end -->

                <!-- Events description start -->
                <div class="row pt-3">
                    <div class="col-lg-9 col-sm-12">
                        <img src="https://futr.sg/wp-content/uploads/2022/04/futr-beach-cleanup-session-4-1024x684.jpg" class="img-fluid" alt="">
                    </div>
                    <div class="col-lg-3 col-sm-12">
                        <h3>Beach Clean Up</h3>
                        <p style="display: inline-block;">by</p>&nbsp;<a href=""><span style="display: inline-block;">Ground-Up Initiative (GUI)</span></a>
                        <div class="row pt-3" style="text-align: center;">
                            <img src="https://static.vecteezy.com/system/resources/previews/005/988/959/original/calendar-icon-free-vector.jpg" style="width:70px; height: auto;" alt="">
                            Mon, 14 March 2023
                        </div>
                        <div class="row pt-3">
                            <img src="https://cdn-icons-png.flaticon.com/512/109/109613.png" style="width:60px; height: auto; padding-left: 20px; margin-right: 10px" alt="">
                            8:30 AM to 10:30 AM
                        </div>
                        <div class="row pt-3">
                            <img src="https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg" style="width:70px; height: auto;" alt="">
                            Suitable for: Open to All
                        </div>
                        <div class="row pt-3" style="border: solid orange ">
                            location
                        </div>
                        <div class="row pt-3 pb-0">
                            <p style="margin: 0; text-align: center; font-size: small; font-weight: bold;">Sign up before 14 March 2023, 7:30PM</p>
                        </div>
                        <div class="row pt-0">
                            <button style="background-color: orange; color: white; border-radius: 10px; border: none; height: 50px; font-size: larger; font-weight: bold;">CONNECT NOW</button>
                        </div>
                        <div class="row pt-3">
                            <button style="background-color: purple; color: white; border-radius: 10px; border: none; height: 50px; font-size: larger; font-weight: bold;">DONATE TODAY</button>
                        </div>
                    </div>
                </div>
                <!-- Events description end -->
            </div>
        </body>
    </html>
</template>

<style>
    body {
    margin: 0;
    padding: 0;
    }
</style>