<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <!-- <p style="height: 100vh">isConnected: {{ isConnected }}</p> -->
        <!-- <div v-if="isConnected">
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
        </div> -->
      </div>
    </div>

    <MainChatWindow />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex"
import MainChatWindow from "../components/chat/MainChatWindow.vue"

export default {
  data() {
    return {
      // // Define the Server URL
      // URL: process.env.NODE_ENV === "production" ? "YOUR SERVER URL HERE" : "http://localhost:3000",
      // chatText: "",
      // // TMP variables for SocketIO until server is up and running!
      // myUsername: "",
      // targetUsername: "",
    }
  },
  components: {
    MainChatWindow,
  },
}
</script>
