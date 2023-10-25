<template>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <nav class="navbar navbar-expand-lg navbar-light bs-side-navbar justify-content-start" style="background-color:#69D8cD;" id="navbarContainer">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand" href="#"><img src="/ecoconnect-logo.ico" style="width: 3rem;"><h3 style="color: white;">EcoConnect</h3></a>

        <!-- not sure if this navbar should be swapped out for the users version of the navbar -->
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link to="/orgdashboard" class="item"><i class="bi bi-speedometer me-1"></i> Dashboard</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/orgevents" class="item"><i class="bi bi-calendar3 me-1"></i> Events</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/orgdonations" class="item"><i class="bi bi-piggy-bank me-1"></i> Donations</router-link>
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
        <!-- volunteer organisations near you -->
        <div class="row">
            <h3>Volunteer Organisations Near You</h3>
        </div>
        
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
            <!-- card 1 -->
            <div v-for="org in orgs" class="col">
                <div class="card h-100">
                    <!-- idk how to make the src take the pathname from json -->
                <img src="" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title"> {{ org.orgName }} </h5>
                    <p class="card-text"> {{ org.desc }} </p>
                    
                </div>
                </div>
            </div>
        </div>

        <!-- popular volunteer organisations -->
        <div class="row"></div>
    </div>
</template>

<script>
import orgs from "../volunteerOrgs.json"

export default {
    data() {
        return {
            orgs,
        }
    },
    components: {

    },
    methods: {
        
    }

}
</script>

<style>


</style>