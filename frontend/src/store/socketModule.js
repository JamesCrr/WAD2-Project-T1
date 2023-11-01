import { io } from "socket.io-client"

const state = {
  socketObj: null, // Socket.IO client instance
  connected: false,
  URL: "https://wadt1.onrender.com",
  // URL:"http://localhost:3000",
}

const mutations = {
  m_SetSocket(state, socket) {
    state.socketObj = socket
  },
  m_SetConnected(state, connected) {
    state.connected = connected
  },

  m_EmitMessage(state, payload, rootState, rootGetters) {
    const { eventName, data } = payload
    const newpayload = { ...data, senderSocketID: state.socketObj.id }
    state.socketObj.emit(eventName, newpayload)
  },
}

const actions = {
  async a_InitializeSocket(context, payload) {
    const { dispatch, commit, state } = context
    const { myUsername } = payload
    if (state.socketObj) {
      return
    }

    // Create the new socket instance
    const socket = io(state.URL, {
      autoConnect: true,
    })

    /** Define socket events to listen for**/
    // When we connected to the server
    socket.on("connect", () => {
      commit("m_SetSocket", socket)
      commit("m_SetConnected", true)
      socket.emit("client:connected", { myUsername })
    })

    socket.on("disconnecting", () => {
      socket.emit("client:disconnecting", state.socketObj.id)
    })
    socket.on("disconnect", () => {
      commit("m_SetSocket", null)
      commit("m_SetConnected", false)
    })

    /**
     * New Chat Message, sent from Server
     */
    socket.on("server:send-client-message", (payload) => {
      console.log("Message received!", payload)
      const {
        messageObj,
        chatID,
        senderUsername,
        senderDocRef,
        targetUsername,
        targetDocRef,
        senderIsVolunteer,
      } = payload
      // console.log("RECEIVED!", messageObj)

      // Send to chat Module
      this.commit("chat/m_AddNewMessage_Locally", payload, { root: true })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
