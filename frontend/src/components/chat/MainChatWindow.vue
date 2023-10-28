<template>
  <div class="row">
    <div
      class="col-lg-4 col-6 text-bg-primary position-fixed bottom-0 end-0"
      ref="chat-main-window"
    >
      <div class="row g-0" v-on:click="windowClosed ? animateOpenWindow() : animateCloseWindow()">
        <h4 class="col-11">Chat</h4>
        <div class="col d-flex justify-content-center align-items-center">
          <BIconXCircleFill
            v-on:click="windowClosed ? animateOpenWindow() : animateCloseWindow()"
            class="fs-4"
            v-if="!windowClosed"
          />
          <BIconArrowUpCircleFill
            v-on:click="windowClosed ? animateOpenWindow() : animateCloseWindow()"
            class="fs-4"
            v-else
          />
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
            :roomName="key"
            :isNewMessages="false"
            :isSelected="selectedRoomKey == key"
            v-on:click="changeSelectedRoomIndex(key)"
          />
          <!-- <p v-for="(value, key) in getChatDetails" :key="key" :roomName="key">{{ key }}</p> -->
        </div>
        <div class="col">
          <div v-if="selectedRoomKey != ''" class="d-flex flex-column justify-content-center h-100">
            <div class="chat-messages-container overflow-y-scroll d-flex flex-column">
              <ChatRoomMessage
                v-for="(value, key) in getChatDetails[selectedRoomKey].chats"
                :key="key"
                :chatMessage="value['content']"
                :amITheSender="value['senderID'] == getAuthDetails.uid"
              />
            </div>
            <div>
              <form v-on:submit.prevent="submitMessageToChat">
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
      windowClosed: true,
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
    ...mapGetters("auth", ["getAuthDetails", "getAccountDetails"]),
  },
  methods: {
    ...mapMutations("socket", ["m_EmitMessage"]),
    ...mapMutations("chat", ["m_ReplaceMessageList_Locally"]),
    ...mapActions("chat", ["a_UpdateFirestoreChat"]),

    changeSelectedRoomIndex(newKeyIndex) {
      if (newKeyIndex == this.selectedRoomKey) return

      this.selectedRoomKey = newKeyIndex
      // console.log(getAuthDetails)
      // console.log(this.getChatDetails)
      // console.log(this.selectedRoomKey, this.getChatDetails[this.selectedRoomKey])
    },

    /**
     * Submits the message to chat
     */
    async submitMessageToChat() {
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
    animateOpenWindow() {
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

  mounted() {
    this.animateCloseWindow()
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
