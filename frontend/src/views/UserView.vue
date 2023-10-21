<template>
    <!DOCTYPE html>
        <html lang='en'>
            <head>
                <meta charset='UTF-8' />
                <meta name='viewport' content='width=device-width, initial-scale=1.0' />
                <title>User Dashboard</title>
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

                    <!-- Motto section start -->
                    <div class="row">
                        <h3 id="motto">Green Together <span>CHANGE FOREVER</span></h3>
                    </div>
                    <!-- Motto section end -->

                    <!-- Subheader 1 start -->
                    <div class="row">
                        <div class="col">
                            <h5>Browse By Category</h5>
                        </div>
                        <div class="col">
                            <h6 style="text-align: right;">View All (10)</h6>
                        </div>
                    </div>
                    <!-- Subheader 1 end -->

                    <!-- Category start -->
                    <div class="row">
                        <div class="col-3">
                            <div class="card">
                            <img src="https://d1hy6t2xeg0mdl.cloudfront.net/image/393830/5a21cb3b4e/standard" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">Food Waste Composting</h5>
                            </div>
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="card">
                            <img src="https://d1hy6t2xeg0mdl.cloudfront.net/image/393830/5a21cb3b4e/standard" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">Food Waste Composting</h5>
                            </div>
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="card">
                            <img src="https://d1hy6t2xeg0mdl.cloudfront.net/image/393830/5a21cb3b4e/standard" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">Food Waste Composting</h5>
                            </div>
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="card">
                            <img src="https://d1hy6t2xeg0mdl.cloudfront.net/image/393830/5a21cb3b4e/standard" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">Food Waste Composting</h5>
                            </div>
                            </div>
                        </div>
                    </div>
                    <!-- Category end -->

                    <!-- Pagination start -->
                    <div class="row pt-3">
                        <nav aria-label="Page navigation example">
                            <ul class="pagination justify-content-center">
                            <li class="page-item disabled">
                                <a class="page-link" href="#" tabindex="-1">Previous</a>
                            </li>
                            <li class="page-item"><a class="page-link" href="#">1</a></li>
                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                            <li class="page-item">
                                <a class="page-link" href="#">Next</a>
                            </li>
                            </ul>
                        </nav>
                    </div>
                    <!-- Pagination end -->
                </div>
            </body>
        </html>
</template>

<style>
   .bg-maincolor{
    background-color: #69D8CD;
    }
    #motto{
        text-align: center;
        padding: 2rem;
    }
    span{
        color: #69D8CD;
    }
</style>

<!-- <script
            src='https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js'
            integrity='sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL'
            crossorigin='anonymous'
></script> -->
