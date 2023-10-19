<template>
  <label v-bind:style="[{ maxWidth: '80%' }, computeStyle]" v-bind:class="computeClasses">
    {{ chatMessage }}
  </label>
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
        "text-bg-primary": this.amITheSender,
        "text-bg-info ": !this.amITheSender,
        "p-2": true,
        "rounded-3": true,
        "mt-2": true,
      }
    },
  },
  props: {
    chatMessage: String,
    amITheSender: Boolean,
  },
}
</script>
