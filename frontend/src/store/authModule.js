import { doc, updateDoc } from "firebase/firestore"
import { firebase_firestore } from "../firebase"

const state = {
  isLoggedIn: false,
  isVolunteer: false,
  authDetails: null,
  accountDetails: null,
}

const mutations = {
  // Login as User or Organsiation
  m_Login(state, payload) {
    const { isVolunteer, authDetails, accountDetails } = payload

    state.isLoggedIn = true
    state.isVolunteer = isVolunteer
    state.authDetails = authDetails
    state.accountDetails = accountDetails

    /**
     * Prob need to store in Cookies or Local Storage
     * because when refresh or enter new URL, then all will be gone
     */

    // console.log("LOGIN")
  },
  m_Logout(state) {
    state.isLoggedIn = false
    state.authDetails = null
    state.accountDetails = null
    // console.log("LOGOUT")
  },
}

const actions = {
  async a_UpdateFirestoreChat(payload) {
    console.log("Update chat", payload)
    const { chatID, messageList } = payload

    // messageList = [
    //   { content: "Hello yo, Bob here", senderID: "ClwxrKQVQJhRPpUgDjWWhOqHzFK2" },
    //   { content: "Hi Bob, what can we do for you?", senderID: "XWRfwZJPwmbQGrsEukW6C1fuaYo1" },
    // ]

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
  getAccountDetails: (state) => state.accountDetails,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
