<template>
  <div class="content">
    <div class="dashboard-content p-3">
      <h2 class="fs-5">Dashboard</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, totam? Sequi alias eveniet
        ut quas ullam delectus et quasi incidunt rem deserunt asperiores reiciendis assumenda
        doloremque provident, dolores aspernatur neque.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {},
}
</script>

<style scoped>
/* content */

.content {
  position: absolute;
  width: 100%;
  padding-left: 3rem;
  padding-right: 3rem;
  top: 5rem;
}

@media (min-width: 992px) {
  .content {
    position: absolute;
    max-width: 76%;
    left: 16rem;
    top: 2rem;
  }
}
</style>
