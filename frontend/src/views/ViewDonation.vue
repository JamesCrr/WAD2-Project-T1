<template>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
  
    <div>
        <div class="container-fluid p-0">
        <div class="row m-0">
            <div class="d-flex flex-column flex-shrink-0 p-3 text-white" style="width: 280px; background-color: #69D8cD;">
                <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
                <span class="fs-4">EcoConnect</span>
                </a>
                <hr>
                <ul class="nav nav-pills flex-column mb-auto">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link text-white"><span class="fa fa-line-chart pe-2"></span>Dashboard</router-link>
                    </li>
                    <li>
                        <router-link to="/addEvent" class="nav-link text-white"><span class="fa fa-calendar pe-2"></span>Event</router-link>
                    </li>
                    <li>
                        <router-link to="/viewDonation" class="nav-link text-white active"><span class="fa fa-dollar pe-2"></span>Donation</router-link>
                    </li>
                    <li>
                        <router-link to="/chat" class="nav-link text-white"><span class="fa fa-paper-plane pe-2"></span>Chat</router-link>
                    </li>
                </ul>
                <hr>
                <div class="dropdown">
                <ul class="nav nav-pills flex-column mb-auto">
                    <li><router-link to="/chat" class="nav-link text-white"><span class="fa fa-sign-out pe-2"></span>Log Out</router-link></li>
                </ul>
                </div>
            </div>
            <div class="col-md-9 my-3 ms-lg-5 ms-md-5 ms-sm-5" style="min-height: 100vh; position: relative;">
                <a href="#" class="d-flex align-items-center text-dark text-decoration-none" style="position: absolute; right: 10px;">
                    <img src="https://cf.shopee.com.my/file/2668a8d450d82d38574d01f51694f714" alt="" width="50" height="50" class="rounded-circle me-2">
                    <strong>Takahashi</strong>
                </a>
                <div class="row">
                    <h1 class="mb-5">Donations</h1>
                    <table class="table table-light">
                        <thead>
                            <tr>
                                <th scope="col">Events</th>
                                <th scope="col">Budget</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Plant a Tree</td>
                                <td>$14,000</td>
                                <td scope="col">
                                    <p>In Progress</p>
                                    <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                                        <div class="progress-bar" style="width: 50%"></div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </div>
    </div>
  </template>
  
  <script>

  </script>
  
  <style>
    body {
        padding: 0;
        margin: 0;
        background-color: white;
    }
  
    .active {
        background-color: #44BAAE !important;
    }
  
    .row {
        margin-bottom: 30px;
    }
  
    .btn-primary, .btn-primary:hover, .btn-primary:active, .btn-primary:visited {
        margin-top: 10px;
        background-color: #69D8cD;
        border-color: #69D8cD;
    }
  </style>