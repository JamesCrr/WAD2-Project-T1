import { io } from "socket.io-client"

const state = {
  socketObj: null, // Socket.IO client instance
  connected: false,

  chatHistory: {}, // TEMPORARY Store all your chats
}

const mutations = {
  m_SetSocket(state, socket) {
    state.socketObj = socket
  },
  m_SetConnected(state, connected) {
    state.connected = connected
  },

  m_AddNewChat(state, payload) {
    const { isNewChat, chatKey, messageDetails } = payload
    if (isNewChat) {
      state.chatHistory[chatKey] = []
    }
    state.chatHistory[chatKey].push(messageDetails)

    console.log(state.chatHistory)
  },
  m_SendMessageToServer(state, payload, rootState, rootGetters) {
    const { message, senderUsername, targetUsername, senderID } = payload
    // const data = {
    //   senderSocketID: state.socketObj.id,
    //   message,
    //   senderUsername,
    //   targetUsername,
    //   senderID,
    // }
    // state.socketObj.emit("client:send-message", data)

    // Add into user's chat state in auth Mod
    this.commit("chat/m_addToChat", { newMessage: message }, { root: true })
  },
}

const actions = {
  async a_InitializeSocket(context, payload) {
    const { dispatch, commit, state } = context
    const { URL, myUsername } = payload
    if (state.socketObj) {
      return
    }

    // Create the new socket instance
    const socket = io(URL, {
      autoConnect: true,
    })

    /** Socket Events **/
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

    socket.on("server:send-client-message", (payload) => {
      console.log("Message received!", payload)

      const { message, senderUsername, targetUsername } = payload
      const chatKey =
        senderUsername > targetUsername
          ? senderUsername + targetUsername
          : targetUsername + senderUsername

      // Payload to send to mutation
      const data = { isNewChat: false, chatKey, messageDetails: payload }
      // Create new chat for first time?
      if (!state.chatHistory.hasOwnProperty(chatKey)) {
        data.isNewChat = true
      }
      // Add into chat history
      commit("m_AddNewChat", data)
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
