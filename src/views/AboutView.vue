<template>
  <div class="about">
    <!-- <h1>This is an about page</h1> -->
    <p style="color: aqua">Count: {{ count }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { useStore } from "vuex"
const store = useStore()
const count = computed(() => store.getters.getCount)
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
