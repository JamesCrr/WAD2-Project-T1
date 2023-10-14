<template>
  <div>
    <h2>About</h2>
    <p>Count: {{ count }}</p>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex"

export default {
  computed: mapState("counter", {
    // arrow functions can make the code very compact!
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
