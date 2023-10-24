<template>
  <div class="row">
    <div class="col-5">
      <img
        src="../assets/logo-no-background-circle.png"
        alt=""
        class="img-fluid object-fit-scale"
      />
    </div>
  </div>
  <div class="row">
    <div class="col">
      <RouterLink to="/organiser/events">events</RouterLink>
    </div>
    <div class="col">
      <RouterLink to="/organiser/donations">donations</RouterLink>
    </div>
  </div>
</template>

<script>
import { RouterLink, RouterView } from "vue-router"
export default {
  data() {
    return {}
  },
}
</script>
