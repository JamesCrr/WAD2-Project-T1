<template>
  <div class="about">
    <!-- <h1>This is an about page</h1> -->
    <p style="color: aqua">Count: {{ count }}</p>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex"

export default {
  computed: mapState("counter", {
    // arrow functions can make the code very succinct!
    count: (state) => state.count,
  }),
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
