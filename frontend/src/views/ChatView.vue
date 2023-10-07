<template>
  <p>{{ isConnected }}</p>
  <div v-if="isConnected">
    <label>Your message:</label>
    <input type="text" v-model="chatText" v-on:keyup.enter="submitChat()" />

    <label>targetUsername:</label>
    <input type="text" v-model="targetUsername" />
    <h2>Your Chat</h2>
    <div class="messages">
      <p v-for="messageDetails in myChatHistory[Object.keys(myChatHistory)[0]]">
        {{ messageDetails.senderUsername }}: {{ messageDetails.message }}
      </p>
    </div>
  </div>
  <div v-else>
    <input type="text" v-model="myUsername" />
    <button v-on:click="a_InitializeSocket({ URL, myUsername })">Connect!</button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex"

export default {
  data() {
    return {
      // Define the Server URL
      URL: process.env.NODE_ENV === "production" ? "YOUR SERVER URL HERE" : "http://localhost:3000",
      chatText: "",

      // TMP
      myUsername: "",
      targetUsername: "",
    }
  },
  computed: {
    ...mapState("socket", {
      isConnected: (state) => state.connected,
      myChatHistory: (state) => state.chatHistory,
    }),
  },
  methods: {
    ...mapMutations("socket", ["m_SetSocket", "m_SetConnected", "m_SendMessageToServer"]),
    ...mapActions("socket", ["a_InitializeSocket"]),

    submitChat() {
      console.log("Submitting:", this.chatText)

      this.m_SendMessageToServer({
        message: this.chatText,
        senderUsername: this.myUsername,
        targetUsername: this.targetUsername,
      })
      this.chatText = ""
    },
  },
}
</script>
