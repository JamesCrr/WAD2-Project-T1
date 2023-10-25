<template>
  <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

  <!-- <div class="container-fluid">
    <div class="row bg-dark-subtle">
      <div class="col">
        IsLoggedIn: {{ getIsLoggedIn }}
        <div v-if="getIsLoggedIn">
          <!-- Organisation Navbar -->
          <div v-if="!getIsVolunteer">
            <div class="row">
              <div class="col">
                <RouterLink to="/organiser/events">events</RouterLink>
              </div>
              <div class="col">
                <RouterLink to="/organiser/donations">donations</RouterLink>
              </div>
              <!-- <RouterLink to="/organiser/events">events</RouterLink>
        <RouterLink to="/organiser/donations">donations</RouterLink> -->
              <!-- <RouterLink to="/organiser/addevent">addevent</RouterLink>
        <RouterLink to="/organiser/editevent">Editevent</RouterLink> -->
            </div>
          </div>
          <!-- Volunteer Navbar -->
          <div v-else>
            <UserNavBar />
          </div>
        </div>
      </div>
    </div>
  </div> -->

  <RouterView />
</template>

<script>
import UserNavBar from "./components/UserNavBar.vue"
import { RouterLink, RouterView } from "vue-router"
import { mapGetters } from "vuex"

export default {
  computed: {
    ...mapGetters("auth", ["getIsLoggedIn", "getIsVolunteer"]),
  },
  components: {
    UserNavBar,
  },
  // beforeMount() {
  //   // console.log(this.getIsLoggedIn)
  //   // Has the user logined yet?
  //   if (!this.getIsLoggedIn) {
  //     this.$router.replace({ path: "/login" })
  //   }
  // },
}
</script>

<!-- <style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style> -->
