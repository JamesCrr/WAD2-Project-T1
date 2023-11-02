<template>
  <!-- Organiser Dashboard -->
  <div v-if="!getIsVolunteer">
    <!-- Navbar (Desktop Navbar) -->
    <nav class="navbar bg-primary d-none d-lg-block min-vh-100 fixed-top sidebar">
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
              <ul class="nav flex-column w-100">
                <li class="nav-item">
                  <router-link
                    to="/orgdashboard"
                    class="text-decoration-none d-flex align-items-center text-light mb-3"
                    v-bind:style="getOrgNavbarStyles('orgdashboard', 'li')"
                  >
                    <BIconGrid1x2Fill
                      class="fs-5"
                      v-bind:style="getOrgNavbarStyles('orgdashboard', 'svg')"
                    />
                    <label
                      class="ms-2 fs-5"
                      style="cursor: pointer"
                      v-bind:style="getOrgNavbarStyles('orgdashboard', '')"
                      >Dashboard</label
                    >
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link
                    to="/organiser/events"
                    class="text-decoration-none d-flex align-items-center text-light mb-3"
                    v-bind:style="getOrgNavbarStyles('organiser_events', 'li')"
                  >
                    <BIconCalendarEventFill
                      class="fs-5"
                      v-bind:style="getOrgNavbarStyles('organiser_events', 'svg')"
                    />
                    <label
                      class="ms-2 fs-5"
                      style="cursor: pointer"
                      v-bind:style="getOrgNavbarStyles('organiser_events', '')"
                      >Events</label
                    >
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link
                    to="/organiser/donations"
                    class="text-decoration-none d-flex align-items-center text-light mb-3"
                    v-bind:style="getOrgNavbarStyles('organiser_donations', 'li')"
                  >
                    <BIconPiggyBankFill
                      class="fs-5"
                      v-bind:style="getOrgNavbarStyles('organiser_donations', 'svg')"
                    />
                    <label
                      class="ms-2 fs-5"
                      style="cursor: pointer"
                      v-bind:style="getOrgNavbarStyles('organiser_donations', '')"
                      >Donations</label
                    >
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

    <!-- Navbar (Mobile Navbar) -->
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
          <div class="offcanvas-body d-flex flex-column justify-content-between">
            <ul class="navbar-nav justify-content-start flex-grow-1 pe-3">
              <li class="nav-item">
                <router-link
                  to="/orgdashboard"
                  class="text-decoration-none d-flex align-items-center text-light mb-3"
                  v-bind:style="getOrgNavbarStyles('orgdashboard', 'li')"
                >
                  <BIconGrid1x2Fill
                    class="fs-5"
                    v-bind:style="getOrgNavbarStyles('orgdashboard', 'svg')"
                  />
                  <label
                    class="ms-2 fs-5"
                    style="cursor: pointer"
                    v-bind:style="getOrgNavbarStyles('orgdashboard', '')"
                    >Dashboard</label
                  >
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/organiser/events"
                  class="text-decoration-none d-flex align-items-center text-light mb-3"
                  v-bind:style="getOrgNavbarStyles('organiser_events', 'li')"
                >
                  <BIconCalendarEventFill
                    class="fs-5"
                    v-bind:style="getOrgNavbarStyles('organiser_events', 'svg')"
                  />
                  <label
                    class="ms-2 fs-5"
                    style="cursor: pointer"
                    v-bind:style="getOrgNavbarStyles('organiser_events', '')"
                    >Events</label
                  >
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/organiser/donations"
                  class="text-decoration-none d-flex align-items-center text-light mb-3"
                  v-bind:style="getOrgNavbarStyles('organiser_donations', 'li')"
                >
                  <BIconPiggyBankFill
                    class="fs-5"
                    v-bind:style="getOrgNavbarStyles('organiser_donations', 'svg')"
                  />
                  <label
                    class="ms-2 fs-5"
                    style="cursor: pointer"
                    v-bind:style="getOrgNavbarStyles('organiser_donations', '')"
                    >Donations</label
                  >
                </router-link>
              </li>
            </ul>
            <button style="cursor: pointer" class="btn btn-danger w-100" @click="logOut">
              <label class="fs-6">Logout</label>
            </button>
          </div>
        </div>
      </div>
    </nav>
  </div>
  <!-- Volunteer Dashboard -->
  <div v-else>
    <nav
      class="volnavbar navbar navbar-expand-md fixed-top"
      v-bind:class="{
        'bg-primary': this.getCurrentRouteName != 'home' && this.getCurrentRouteName != 'login',
      }"
    >
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
                v-bind:style="getUserNavbarStyles('home')"
              >
                <BIconGrid1x2Fill class="fs-5" />
                <label style="cursor: pointer" class="ms-2 fs-5">Home</label>
              </router-link>
            </li>
            <li class="nav-item ms-md-4">
              <router-link
                to="/volunteer"
                class="text-decoration-none d-flex align-items-center text-light mb-3 mb-md-0"
                v-bind:style="getUserNavbarStyles('volunteer')"
              >
                <BIconHeartFill class="fs-5" />
                <label style="cursor: pointer" class="ms-2 fs-5">Volunteer</label>
              </router-link>
            </li>
            <li class="nav-item ms-md-4">
              <router-link
                to="/myevents"
                class="text-decoration-none d-flex align-items-center text-light mb-3 mb-md-0"
                v-bind:style="getUserNavbarStyles('myevents')"
              >
                <BIconCalendarEventFill class="fs-5" />
                <label style="cursor: pointer" class="ms-2 fs-5">My Events</label>
              </router-link>
            </li>
            <button class="btn btn-danger ms-md-3" @click="logOut">
              <!-- <label class="fs-6">Logout</label> -->
              Logout
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
import {
  BIconGrid1x2Fill,
  BIconPiggyBankFill,
  BIconCalendarEventFill,
  BIconBoxArrowRight,
  BIconHeartFill,
} from "bootstrap-icons-vue"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

export default {
  data() {
    return {
      gsapNavbar: null,
    }
  },
  computed: {
    ...mapGetters("auth", ["getIsVolunteer"]),
    getCurrentRouteName() {
      // console.log(this.$router)
      return this.$router.currentRoute.value.name
    },
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
      try {
        await signOut(firebase_auth)
        this.m_Logout()
        this.$cookies.remove("wadt1_email")
        this.$cookies.remove("wadt1_password")
        this.$cookies.remove("wadt1_isvol")
        // this.$cookies.remove("wadt1_lastpage")

        this.$router.replace({ name: "login" })
      } catch (error) {
        console.log(error)
      }
    },

    getUserNavbarStyles(pageName) {
      if (pageName == this.getCurrentRouteName) {
        return {
          "border-bottom": "solid 3px",
        }
      }
      return {}
    },
    getOrgNavbarStyles(pageNames, component) {
      if (pageNames.includes(this.getCurrentRouteName)) {
        if (component == "li") {
          return { "background-color": "white", padding: "6px", "border-radius": "10px" }
        } else if (component == "svg") {
          return { color: "var(--bs-primary)" }
        } else {
          return { color: "var(--bs-primary)" }
        }
      }
      return {}
    },

    /**
     * When the window width gets resized
     */
    onResize() {
      if (!this.gsapNavbar) return

      // console.log(window.innerWidth)
      // console.log(this.gsapNavbar.isActive())
      // Animate the Navbar depending on window width
      // if (window.innerWidth > 768) {
      //   if (!this.gsapactive) {
      //     console.log("RESTARTING")
      //     this.gsapNavbar.restart()
      //     this.gsapactive = true
      //   }
      // } else {
      //   if (this.gsapactive) {
      //     console.log("REVERINGG")
      //     this.gsapNavbar.revert()
      //     this.gsapactive = false
      //   }
      // }
    },
  },
  mounted() {
    // window.addEventListener("resize", this.onResize)

    if (this.getIsVolunteer) {
      this.$nextTick(() => {
        this.gsapNavbar = gsap.to(".volnavbar", {
          backgroundColor: "var(--bs-primary)",
          duration: 0.2,
          ease: "power1.inOut",
          scrollTrigger: {
            start: "600 center",
            end: "700 center",
            toggleActions: "play none none reverse",
            scrub: true,
            markers: false,
          },
        })
        // this.gsapNavbar = gsap.fromTo(
        //   ".volnavbar",
        //   { backgroundColor: "transparent" },
        //   {
        //     // autoAlpha: 1,
        //     backgroundColor: "var(--bs-primary)",
        //     duration: 0.2,
        //     ease: "power1.inOut",
        //     scrollTrigger: {
        //       start: 300,
        //       end: 3,
        //       toggleActions: "play none none reverse",
        //       scrub: true,
        //       markers: false,
        //     },
        //   },
        // )
        // console.log(this.gsapNavbar)
        // this.gsapNavbar.pause()
        // this.onResize()
      })
    }
  },
  beforeUnmount() {
    if (this.gsapNavbar) this.gsapNavbar.revert()
    // window.removeEventListener("resize", this.onResize)
  },
}
</script>

<style scoped>
.sidebar {
  width: 17rem;
}

.volnavbar {
  background-color: transparent;
  transition: background-color 200ms linear;
}
@media (max-width: 768px) {
  .volnavbar {
    transition: none;
    background-color: var(--bs-primary) !important;
  }
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
