<template>
  <p v-bind:class="computeClasses">
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
