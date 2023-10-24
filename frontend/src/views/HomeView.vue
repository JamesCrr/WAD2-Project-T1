<template>
  <div>
    <h2>Home</h2>
    <p>Count: {{ count }}</p>
    <button v-on:click="increment()">Increment</button>
    <button v-on:click="decrement()">Decrement</button>

    <div class="container-fluid">
      <div class="row">
        <router-link v-for="obj of fakeData" v-bind:to="'/events/' + obj.budget" :key="obj.budget">
          {{ obj.budget }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex"
import fakeData from "../store/fake.json"

export default {
  data() {
    return {
      localCount: 3,
      fakeData: fakeData.data,
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
