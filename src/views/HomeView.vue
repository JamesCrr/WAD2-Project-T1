<script setup>
import TheWelcome from "../components/TheWelcome.vue"
import { ref, computed } from "vue"
import { useStore } from "vuex"

const store = useStore()
console.log(store)
const count = computed(() => store.getters.getCount)

const increment = () => {
  store.commit("increment")
}

const decrement = () => {
  store.commit("decrement")
}
</script>

<template>
  <main>
    <!-- <TheWelcome /> -->
    <p style="color: aqua">Count: {{ count }}</p>
    <button v-on:click="increment">Increment</button>
    <button v-on:click="decrement">Decrement</button>
  </main>
</template>
