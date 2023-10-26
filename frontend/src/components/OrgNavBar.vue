<template>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
<div v-if="!getIsVolunteer">
    <nav class="navbar navbar-expand-lg navbar-light bs-side-navbar justify-content-start" style="background-color:#69D8cD;" id="navbarContainer">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand" href="#"><img src="/ecoconnect-logo.ico" style="width: 3rem;"><h3 style="color: white;">EcoConnect</h3></a>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link to="/orgdashboard" class="item"><i class="bi bi-speedometer me-1"></i> Dashboard</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/organiser/events" class="item"><i class="bi bi-calendar3 me-1"></i> Events</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/viewdonation" class="item"><i class="bi bi-piggy-bank me-1"></i> Donations</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/chat" class="item"><i class="bi bi-chat-dots me-1"></i> Chats</router-link>
                </li>
                <li class="nav-item">
                    <a class="item" @click="logOut"><i class="bi bi-box-arrow-left me-1"></i> Logout</a>
                </li>
            </ul>
        </div>
        <img class="profile-photo" src="/ran-profile-photo.png" alt="">
    </nav>
</div>

</template>

<script>
import { mapMutations, mapActions, mapState } from "vuex"
import {signOut } from "firebase/auth"
import { firebase_auth } from "../firebase"
import router from "../router"
import { mapGetters } from "vuex"


export default {
    data() {
        return {
        }
    },
    computed: {
        ...mapGetters("auth", ["getIsVolunteer"]),
    },
    components: {

    },
    methods: {
        ...mapMutations("auth", ["m_Login", "m_Logout"]),
        async logOut() {
            await signOut(firebase_auth)
            this.m_Logout()
            router.push("/login")
            return
        },
    }

}

</script>

<style>
body{
 background: #eee;
 padding: 0px;
}

.navbar {
    position: fixed;
    width: 100%;
    z-index: 1;
}
.navbar-nav {
    margin-left: 1rem;
}
.nav-item {
    margin: 1rem;
}
nav li .item {
    color: white;
    text-decoration: none;
}
.navbar-brand > * {
    margin-right: 0.5rem;
    display: inline;
    vertical-align: middle;
}

.profile-photo {
    width: 3rem;
    margin-right: 2rem;
    margin-left: auto;
}

@media (min-width: 992px) {
    .navbar,
    .navbar-collapse {
        flex-direction: column;
        padding: 0.5rem;
        position: fixed;
        z-index: 1;
    }
    .nav-item {
        margin-top: 2rem;
    }
    nav li .item {
        color: white;
        text-decoration: none;
    }
    .navbar-expand-lg .navbar-nav {
        flex-direction: column;
    }
    .navbar {
        width: 250px;
        height: 100%;
        align-items: flex-start;
    }
    .navbar-brand {
        margin: 0.5em;
        padding-bottom: 0;
    }
    .profile-photo {
        width: 3rem;
        margin-top: 47rem;
        margin-left: 2rem;
    }
    #navbarSupportedContent {
        top: 4rem;
    }
}

.navbar-toggler {
    margin: 0.5rem;
}
</style>