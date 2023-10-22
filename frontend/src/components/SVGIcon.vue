<script>
import { defineAsyncComponent, markRaw } from "vue"

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      icon: null,
    }
  },
  //   mounted() {
  //     import(`../assets/${this.name}.svg`).then((iconModule) => {
  //       this.icon = iconModule.default
  //     })
  //   },
  mounted() {
    this.icon = markRaw(defineAsyncComponent(() => import(`../assets/${this.name}.svg`)))
  },
}
</script>

<template>
  <component :is="icon" class="fill-current" />
</template>
