import { doc, updateDoc } from "firebase/firestore"
import { firebase_firestore } from "../firebase"

const state = {
  chatDetails: {},
}

const mutations = {
  m_initChats(state, payload) {
    state.chatDetails = payload
  },
}

const actions = {
  async a_UpdateFirestoreChat(payload) {
    console.log("Update chat", payload)
    const { chatID, messageList } = payload

    messageList = [
      { content: "Hello yo, Bob here", senderID: "ClwxrKQVQJhRPpUgDjWWhOqHzFK2" },
      { content: "Hi Bob, what can we do for you?", senderID: "XWRfwZJPwmbQGrsEukW6C1fuaYo1" },
    ]

    // Update firestore
    const userRef = doc(firebase_firestore, "chats", chatID)
    await updateDoc(userRef, {
      chats: messageList,
    })
  },
}

const getters = {
  getIsLoggedIn: (state) => state.isLoggedIn,
  getIsVolunteer: (state) => state.isVolunteer,
  getAuthDetails: (state) => state.authDetails,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
