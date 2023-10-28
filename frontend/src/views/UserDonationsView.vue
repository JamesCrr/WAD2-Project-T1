<template>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
  />
  <nav
    class="navbar navbar-expand-lg navbar-light bs-side-navbar justify-content-start"
    style="background-color: #69d8cd"
    id="navbarContainer"
  >
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand" href="#"
      ><img src="/ecoconnect-logo.ico" style="width: 3rem" />
      <h3 style="color: white">EcoConnect</h3></a
    >

    <!-- not sure if this navbar should be swapped out for the users version of the navbar -->
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/orgdashboard" class="item"
            ><i class="bi bi-speedometer me-1"></i> Dashboard</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/orgevents" class="item"
            ><i class="bi bi-calendar3 me-1"></i> Events</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/orgdonations" class="item"
            ><i class="bi bi-piggy-bank me-1"></i> Donations</router-link
          >
        </li>
        <li class="nav-item">
          <!-- change the router link -->
          <router-link to="/orgchats" class="item"
            ><i class="bi bi-chat-dots me-1"></i> Chats</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/" class="item logout"
            ><i class="bi bi-box-arrow-left me-1"></i> Logout</router-link
          >
        </li>
      </ul>
    </div>
    <img class="profile-photo" src="/ran-profile-photo.png" alt="" />
  </nav>

  <!-- modal -->
  <div
    v-for="org in orgs"
    class="modal fade"
    id="exampleModalCenteredScrollable"
    tabindex="-1"
    aria-labelledby="exampleModalCenteredScrollableTitle"
    style="display: none"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalCenteredScrollableTitle">
            {{ org.orgName }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <img class="modal-picture" src="../assets/volunteer-orgs/orgA.jpg" alt="" />
          <p>{{ org.desc }}</p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, atque odio facilis aliquam
            officia doloribus sint blanditiis quasi animi modi, nostrum perspiciatis mollitia fuga
            ducimus. Velit optio rem pariatur rerum.
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, atque odio facilis aliquam
            officia doloribus sint blanditiis quasi animi modi, nostrum perspiciatis mollitia fuga
            ducimus. Velit optio rem pariatur rerum.
          </p>
          <br /><br />
          <h4 class="donate-text">Choose an amount to donate:</h4>
          <div class="grid-container donation-btn-container">
            <Donate2 class="donate-btn" />
            <Donate5 class="donate-btn" />
            <Donate10 class="donate-btn" />
            <Donate50 class="donate-btn" />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

  <div class="content">
    <!-- volunteer organisations near you -->
    <div class="row">
      <h3>Popular Volunteer Organisations</h3>
    </div>

    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
      <!-- card 1 -->
      <div v-for="org in orgs" class="col card-container">
        <div class="card h-100">
          <!-- idk how to make the src take the pathname from json -->
          <img src="" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">{{ org.orgName }}</h5>
            <p class="card-text">{{ org.desc }}</p>
            <button
              type="button"
              class="btn btn-primary modal-button"
              data-bs-toggle="modal"
              data-bs-target="#exampleModalCenteredScrollable"
            >
              Learn More !
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import orgs from "../volunteerOrgs.json"
import Donate2 from "../components/Donate2.vue"
import Donate5 from "../components/Donate5.vue"
import Donate10 from "../components/Donate10.vue"
import Donate50 from "../components/Donate50.vue"

export default {
  data() {
    return {
      orgs,
    }
  },
  components: {
    Donate2,
    Donate5,
    Donate10,
    Donate50,
  },
  methods: {},
}
</script>

<style scoped>
/* modal */
.modal-body {
  display: grid;
  justify-content: center;
}
.modal-picture {
  margin-left: auto;
  margin-right: auto;
}
.modal-title {
  width: 100%;
  text-align: center;
  padding-left: 1.5rem;
}
.modal-body > p {
  margin-top: 2rem;
}
.donate-text {
  /* text-decoration: underline; */
  text-align: center;
}
.donation-btn-container {
  display: grid;
  grid-template-columns: auto auto auto auto;
  margin-top: 1rem;
  justify-content: space-evenly;
}

/* card */
.card-title,
.card-text {
  overflow: hidden;
  text-align: center;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.card-text {
  height: 4.5rem;
}
.card-body {
  display: grid;
}

.btn-primary {
  height: 3rem;
}
</style>
