<template>
  <div class="row">
    <div
      class="col-lg-5 col-md-8 col-12 text-bg-primary position-fixed bottom-0 end-0 border-top rounded-top"
      ref="chat-main-window"
      style="transform: translateY(250px)"
    >
      <div
        class="row g-0 d-flex justify-content-center align-items-center"
        v-on:click="windowClosed ? animateOpenWindow() : animateCloseWindow()"
        style="cursor: pointer"
      >
        <h4 class="col-11 mb-0 p-2">Your Chat</h4>
        <div class="col d-flex justify-content-center align-items-center">
          <BIconXCircleFill class="fs-4" v-if="!windowClosed" />
          <BIconArrowUpCircleFill class="fs-4" v-else />
        </div>
      </div>
      <div
        class="row g-0 chat-content-container text-bg-light d-flex flex-row"
        ref="chat-content-container"
      >
        <div class="col-4 p-1 overflow-y-scroll border-end border-primary border-2">
          <ChatRoomName
            v-for="(value, key) in getChatDetails"
            :key="key"
            :roomName="getChatName(key)"
            :isNewMessages="false"
            :isSelected="selectedRoomKey == key"
            v-on:click="changeSelectedRoomIndex(key)"
          />
          <!-- <p v-for="(value, key) in getChatDetails" :key="key" :roomName="key">{{ key }}</p> -->
        </div>
        <div class="col">
          <div v-if="selectedRoomKey != ''" class="d-flex flex-column justify-content-center h-100">
            <div
              class="chat-messages-container overflow-y-scroll d-flex flex-column bg-body-secondary"
            >
              <ChatRoomMessage
                v-for="(value, key) in getChatDetails[selectedRoomKey].chats"
                :key="key"
                :chatMessage="value['content']"
                :amITheSender="value['senderID'] == getAuthDetails.uid"
              />
            </div>
            <div>
              <form v-on:submit.prevent="submitMessageToChat">
                <input
                  type="text"
                  v-model="newMessage"
                  class="form-control w-100"
                  placeholder="Your Message"
                />
              </form>
            </div>
          </div>
          <div
            v-else
            style="height: 100%"
            class="d-flex justify-content-center align-items-center bg-secondary"
          >
            <p class="text-white">Select your chat</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex"
import { BIconXCircleFill, BIconArrowUpCircleFill } from "bootstrap-icons-vue"
import { gsap } from "gsap"
import ChatRoomName from "./ChatRoomName.vue"
import ChatRoomMessage from "./ChatRoomMessage.vue"

const animateTime = 0.5

export default {
  data() {
    return {
      newMessage: "",
      selectedRoomKey: "",
      windowClosed: true || !this.getChatWindowOpenRequest,
    }
  },
  components: {
    ChatRoomName,
    ChatRoomMessage,

    // Bootstrap Icons
    BIconXCircleFill,
    BIconArrowUpCircleFill,
  },
  computed: {
    ...mapState("socket", {
      isConnected: (state) => state.connected,
    }),
    ...mapState("chat", {
      getChatDetails: (state) => state.chatDetails,
    }),
    ...mapGetters("chat", ["getChatWindowOpenRequest", "getNewChatName"]),
    ...mapGetters("auth", [
      "getAuthDetails",
      "getAccountDetails",
      "getIsLoggedIn",
      "getIsVolunteer",
    ]),
  },
  methods: {
    ...mapMutations("socket", ["m_EmitMessage"]),
    ...mapMutations("chat", ["m_ReplaceMessageList_Locally", "m_SetChatWindowRequest"]),
    ...mapActions("chat", ["a_UpdateFirestoreChat"]),

    /**
     * Returns the chat name based on whether the account is a volunteer or organisaition
     * @param {string} name
     */
    getChatName(name) {
      let nameArray = name.split("-")
      if (this.getIsVolunteer) {
        return nameArray[0]
      }
      return nameArray[1]
    },

    /**
     * The new array index of the selected room
     * @param {string} newKeyIndex
     */
    changeSelectedRoomIndex(newKeyIndex) {
      if (newKeyIndex == this.selectedRoomKey) return

      this.selectedRoomKey = newKeyIndex
      // console.log(getAuthDetails)
      // console.log(this.getChatDetails)
      // console.log(this.selectedRoomKey, this.getChatDetails[this.selectedRoomKey])
    },

    /**
     * Submits the message,
     * Updates Firestore,
     * Updates Local Vuex Store,
     * Emits to SocketIO,
     */
    async submitMessageToChat() {
      if (this.newMessage.trim().length <= 0) {
        return
      }

      console.log("Submitting:", this.newMessage)

      // Update Firestore
      const selectedObject = this.getChatDetails[this.selectedRoomKey]
      const newMessageObj = { content: this.newMessage, senderID: this.getAuthDetails.uid }
      // Create the payload to send to firestore
      const firestorePayload = {
        volunteerDocRef: selectedObject.volunteerDocRef,
        organisationDocRef: selectedObject.organisationDocRef,
        volunteerUsername: selectedObject.volunteerUsername,
        organisationUsername: selectedObject.organisationUsername,
        chatID: this.selectedRoomKey,
        messageList: [...selectedObject.chats, newMessageObj],
      }
      // Update firestore
      await this.a_UpdateFirestoreChat(firestorePayload)

      // Update Local copy inside chat Vuex module
      this.m_ReplaceMessageList_Locally(firestorePayload)

      // Emit to SocketIO
      const amIVolunteer = this.getAccountDetails.type == "volunteer"
      const socketIOPayload = {
        eventName: "client:send-message",
        data: {
          messageObj: newMessageObj,
          chatID: this.selectedRoomKey,
          senderUsername: this.getAccountDetails.username,
          senderDocRef: amIVolunteer
            ? selectedObject.volunteerDocRef
            : selectedObject.organisationDocRef,
          targetUsername: amIVolunteer
            ? selectedObject.organisationUsername
            : selectedObject.volunteerUsername,
          targetDocRef: amIVolunteer
            ? selectedObject.organisationDocRef
            : selectedObject.volunteerDocRef,
          senderIsVolunteer: amIVolunteer,
        },
      }
      this.m_EmitMessage(socketIOPayload)

      // Reset Input field
      this.newMessage = ""
    },

    /**
     * Closes the Main Chat Window through animation using GSAP
     */
    animateCloseWindow() {
      if (this.windowClosed) return

      gsap.to(this.$refs["chat-content-container"], {
        autoAlpha: 0,
        duration: animateTime,
        // repeat: -1,
      })
      gsap.to(this.$refs["chat-main-window"], {
        y: 250,
        // yPercent: 80,
        duration: animateTime * 0.75,
        // repeat: -1,
      })
      this.windowClosed = true
    },
    /**
     * Opens the Main Chat Window through animation using GSAP
     */
    animateOpenWindow() {
      if (!this.windowClosed) return

      gsap.to(this.$refs["chat-content-container"], {
        autoAlpha: 1,
        duration: animateTime,
      })
      gsap.to(this.$refs["chat-main-window"], {
        y: 0,
        duration: animateTime * 0.75,
      })
      this.windowClosed = false
    },
  },

  updated() {
    // Was there a request to open the chat window?
    if (this.getChatWindowOpenRequest) {
      this.animateOpenWindow()
      this.changeSelectedRoomIndex(this.getNewChatName)
      this.m_SetChatWindowRequest(false)
    }
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
