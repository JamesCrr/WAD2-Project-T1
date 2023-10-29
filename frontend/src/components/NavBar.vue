<template>
  <div v-if="!getIsVolunteer">
    <!-- Organiser Dashboard -->
    <nav class="navbar bg-primary d-none d-lg-block w-25 min-vh-100 fixed-top">
      <div class="container-fluid">
        <div class="row vw-100 vh-100">
          <div class="col-12 d-flex flex-column justify-content-start align-items-start">
            <div class="d-flex justify-content-center align-items-center mb-4">
              <img src="/ecoconnect-logo.ico" style="width: 3rem" />
              <h3 class="d-inline text-light mb-0">EcoConnect</h3>
            </div>

            <div
              class="w-100 h-100 d-flex flex-column justify-content-between align-items-start mb-4"
            >
              <ul class="nav flex-column">
                <li class="nav-item">
                  <router-link
                    to="/orgdashboard"
                    class="text-decoration-none d-flex align-items-center text-light mb-3"
                  >
                    <BIconGrid1x2Fill class="fs-5" />
                    <label class="ms-2 fs-5">Dashboard</label>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link
                    to="/organiser/events"
                    class="text-decoration-none d-flex align-items-center text-light mb-3"
                  >
                    <BIconCalendarEventFill class="fs-5" />
                    <label class="ms-2 fs-5">Events</label>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link
                    to="/viewdonation"
                    class="text-decoration-none d-flex align-items-center text-light mb-3"
                  >
                    <BIconPiggyBankFill class="fs-5" />
                    <label class="ms-2 fs-5">Donations</label>
                  </router-link>
                </li>
              </ul>
              <button style="cursor: pointer" class="btn btn-danger w-100" @click="logOut">
                <label class="fs-6">Logout</label>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Vertical Navbar -->
    <nav class="navbar bg-primary fixed-top d-lg-none">
      <div class="container-fluid justify-content-start">
        <!-- Button to toggle dropdown -->
        <button
          class="navbar-toggler me-3"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Title -->
        <div class="d-flex justify-content-center align-items-center">
          <img src="/ecoconnect-logo.ico" style="width: 3rem" />
          <h3 class="d-inline text-light mb-0">EcoConnect</h3>
        </div>

        <!-- Dropdown Offcanvas Content -->
        <div
          class="offcanvas offcanvas-start bg-primary"
          tabindex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div class="offcanvas-header d-flex justify-content-end">
            <!-- <div class="d-flex justify-content-center align-items-center navbar-brand">
              <img src="/ecoconnect-logo.ico" style="width: 3rem" />
              <h3 class="d-inline text-light mb-0">EcoConnect</h3>
            </div> -->
            <button
              type="button"
              class="btn-close fs-5"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li class="nav-item">
                <router-link
                  to="/orgdashboard"
                  class="text-decoration-none d-flex align-items-center text-light mb-3"
                >
                  <BIconGrid1x2Fill class="fs-5" />
                  <label class="ms-2 fs-5">Dashboard</label>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/organiser/events"
                  class="text-decoration-none d-flex align-items-center text-light mb-3"
                >
                  <BIconCalendarEventFill class="fs-5" />
                  <label class="ms-2 fs-5">Events</label>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/viewdonation"
                  class="text-decoration-none d-flex align-items-center text-light mb-3"
                >
                  <BIconPiggyBankFill class="fs-5" />
                  <label class="ms-2 fs-5">Donations</label>
                </router-link>
              </li>
              <button style="cursor: pointer" class="btn btn-danger" @click="logOut">
                <label class="fs-6">Logout</label>
              </button>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
  <div v-else>
    <!-- Volunteer Dashboard -->
    <nav class="navbar navbar-expand-md bg-primary fixed-top">
      <div class="container-fluid">
        <div class="d-flex justify-content-center align-items-center navbar-brand">
          <img src="/ecoconnect-logo.ico" style="width: 3rem" />
          <h3 class="d-inline text-light mb-0">EcoConnect</h3>
        </div>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="ms-auto navbar-nav mb-2 mb-md-0 d-md-flex align-items-center">
            <li class="nav-item">
              <router-link
                to="/"
                class="text-decoration-none d-flex align-items-center text-light mb-3 mb-md-0"
              >
                <BIconGrid1x2Fill class="fs-5" />
                <label class="ms-2 fs-5">Home</label>
              </router-link>
            </li>
            <li class="nav-item ms-md-4">
              <router-link
                to="/volunteer"
                class="text-decoration-none d-flex align-items-center text-light mb-3 mb-md-0"
              >
                <BIconHeartFill class="fs-5" />
                <label class="ms-2 fs-5">Volunteer</label>
              </router-link>
            </li>
            <li class="nav-item ms-md-4">
              <router-link
                to=""
                class="text-decoration-none d-flex align-items-center text-light mb-3 mb-md-0"
              >
                <BIconCalendarEventFill class="fs-5" />
                <label class="ms-2 fs-5">My Events</label>
              </router-link>
            </li>
            <!-- <li class="nav-item ms-md-3">
              <button style="cursor: pointer" class="btn btn-danger" @click="logOut">Logout</button>
            </li> -->
            <button style="cursor: pointer" class="btn btn-danger ms-md-3" @click="logOut">
              <label class="fs-6">Logout</label>
            </button>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from "vuex"
import { signOut } from "firebase/auth"
import { firebase_auth } from "../firebase"
import { mapGetters } from "vuex"
import router from "../router"
import {
  BIconGrid1x2Fill,
  BIconPiggyBankFill,
  BIconCalendarEventFill,
  BIconBoxArrowRight,
  BIconHeartFill,
} from "bootstrap-icons-vue"

export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters("auth", ["getIsVolunteer"]),
  },
  components: {
    BIconGrid1x2Fill,
    BIconPiggyBankFill,
    BIconCalendarEventFill,
    BIconBoxArrowRight,
    BIconHeartFill,
  },
  methods: {
    ...mapMutations("auth", ["m_Login", "m_Logout"]),
    async logOut() {
      await signOut(firebase_auth)
      this.m_Logout()
      this.$cookies.remove("wadt1_email")
      this.$cookies.remove("wadt1_password")
      router.push("/login")
      return
    },
  },
}
</script>

<style scoped>
.nav-item {
}
</style>

<!-- <style scoped>
body {
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
</style> -->
