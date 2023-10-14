<template>
  <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

  <div class="container-fluid">
    <!-- <HelloWorld msg="You did it!" /> -->
    <div class="row bg-dark-subtle">
      IsLoggedIn: {{ getIsLoggedIn }}
      <div class="col align-middle p-3" v-if="getIsLoggedIn">
        <RouterLink to="/"><button class="btn btn-primary me-4">Home</button></RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </div>
    </div>
  </div>

  <RouterView />
</template>

<script>
import { RouterLink, RouterView } from "vue-router"
import { mapGetters } from "vuex"

export default {
  computed: {
    ...mapGetters("auth", ["getIsLoggedIn", "getIsVolunteer"]),
  },
}
</script>

<style scoped>
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
</style>
