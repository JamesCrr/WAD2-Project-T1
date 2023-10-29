<template>
  <p v-bind:class="computeClasses" style="cursor: pointer">
    {{ roomName }}
  </p>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    computeStyle() {
      return this.amITheSender ? { float: "right" } : { float: "left" }
    },
    computeClasses() {
      return {
        "text-bg-primary": this.isSelected,
        "fw-bold": this.isSelected,
        "text-white": this.isSelected,
        "text-center": true,
      }
    },
  },
  props: {
    roomName: String,
    isNewMessages: Boolean,
    isSelected: Boolean,
  },
}
</script>
