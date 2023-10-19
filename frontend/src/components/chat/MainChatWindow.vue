<template>
  <div class="row">
    <div class="col-6 text-bg-primary position-fixed bottom-0 end-0 p-2">
      <h4>Chat</h4>
      <div class="chat-content-container text-bg-light d-flex flex-row">
        <div class="col-4 p-1 overflow-y-scroll border-end border-primary border-2">
          <ChatRoomName
            v-for="(value, key) in getChatDetails"
            :key="key"
            :roomName="key"
            :isNewMessages="false"
            :isSelected="selectedRoomIndex == key"
            v-on:click="changeSelectedRoomIndex(key)"
          />
          <!-- <p v-for="(value, key) in getChatDetails" :key="key" :roomName="key">{{ key }}</p> -->
        </div>
        <div class="col">
          <div
            v-if="selectedRoomIndex != ''"
            class="d-flex flex-column justify-content-center h-100"
          >
            <div class="chat-messages-container overflow-y-scroll">
              <ChatRoomMessage
                v-for="(value, key) in getChatDetails[selectedRoomIndex].chats"
                :key="key"
                :chatMessage="value['content']"
                :amITheSender="value['senderID'] == getAuthDetails.uid"
              />
            </div>
            <div>
              <form v-on:submit.prevent="submitChat">
                <input type="text" v-model="newMessage" class="form-control w-100" />
              </form>
            </div>
          </div>
          <div
            v-else
            style="height: 100%; display: flex; justify-content: center; align-items: center"
          >
            <h2>Nothing</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex"
import ChatRoomName from "./ChatRoomName.vue"
import ChatRoomMessage from "./ChatRoomMessage.vue"

export default {
  data() {
    return {
      newMessage: "",
      selectedRoomIndex: "",
    }
  },
  components: {
    ChatRoomName,
    ChatRoomMessage,
  },
  computed: {
    ...mapState("socket", {
      isConnected: (state) => state.connected,
    }),
    ...mapState("chat", {
      getChatDetails: (state) => state.chatDetails,
    }),
    ...mapGetters("auth", ["getAuthDetails"]),
  },
  methods: {
    ...mapMutations("socket", ["m_SetSocket", "m_SetConnected", "m_SendMessageToServer"]),

    changeSelectedRoomIndex(newIndex) {
      if (newIndex == this.selectedRoomIndex) return

      this.selectedRoomIndex = newIndex
      // console.log(getAuthDetails)
      // console.log(this.getChatDetails)
      // console.log(this.selectedRoomIndex, this.getChatDetails[this.selectedRoomIndex])
    },

    submitChat() {
      console.log("Submitting:", this.newMessage)

      this.m_SendMessageToServer({
        message: this.newMessage,
      })
      this.newMessage = ""
    },
  },
}
</script>

<style scoped>
.chat-content-container {
  height: 250px;
}
.chat-messages-container {
  height: 90%;
}
</style>
