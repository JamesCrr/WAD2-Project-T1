<template>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <nav class="navbar navbar-expand-lg navbar-light bs-side-navbar" style="background-color:#69D8cD;" id="navbarContainer">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand" href="#">
            <img src="/ecoconnect-logo.ico" style="width: 3rem;">
            <h3 style="color: white;">EcoConnect</h3>
        </a>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link to="/orgdashboard" class="item"><i class="bi bi-speedometer me-1"></i> Dashboard</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/orgevents" class="item"><i class="bi bi-calendar3 me-1"></i> Events</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/viewdonation" class="item"><i class="bi bi-piggy-bank me-1"></i> Donations</router-link>
                </li>
                <li class="nav-item">
                    <!-- change the router link -->
                    <router-link to="/orgchats" class="item"><i class="bi bi-chat-dots me-1"></i> Chats</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/" class="item logout"><i class="bi bi-box-arrow-left me-1"></i> Logout</router-link>
                </li>
            </ul>
        </div>
        <img class="profile-photo" src="/ran-profile-photo.png" alt="">
    </nav>
   
    <div class="content">
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

    
  
  </template>
  
  <script>

  </script>
  
  <style>
    .active {
        background-color: #44BAAE !important;
    }

    .row {
        margin-top: 1rem;
    }
 
  </style>