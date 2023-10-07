<template>
  <main>
    <!-- <TheWelcome /> -->
    <p style="color: aqua">Count: {{ count }}</p>
    <button v-on:click="increment()">Increment</button>
    <button v-on:click="decrement()">Decrement</button>
  </main>
</template>

<script>
import { mapState, mapMutations } from "vuex"

export default {
  data() {
    return {
      localCount: 3,
    }
  },
  computed: mapState("counter", {
    // arrow functions can make the code very succinct!
    count: (state) => state.count,

    // to access local state with `this`
    countPlusLocalState(state) {
      return state.count + this.localCount
    },
  }),
  methods: {
    ...mapMutations("counter", [
      // map `this.increment()` to `this.$store.counter.commit('increment')`
      "increment",
      "decrement",

      // `mapMutations` also supports payloads:
      // map `this.incrementBy(amount)` to `this.$store.counter.commit('incrementBy', amount)`
      "incrementBy",
    ]),
    ...mapMutations("counter", {
      // map `this.add()` to `this.$store.counter.commit('increment')`
      add: "increment",
    }),
  },
}
</script>
