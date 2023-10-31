import { doc, updateDoc, setDoc, getDoc } from "firebase/firestore"
import { firebase_firestore } from "../firebase"

const state = {
  chatDetails: {},
  chatWindowOpenRequest: false,
  newChatName: "",
}

const mutations = {
  m_SetChatWindowRequest(state, payload) {
    state.chatWindowOpenRequest = payload
  },

  m_initChats(state, payload) {
    state.chatDetails = payload
  },

  m_AddNewChat_Locally(state, payload) {
    const { volunteerDocRef, organisationDocRef, volunteerUsername, organisationUsername, chatID } =
      payload

    // Does chat exist yet?
    if (chatID in state.chatDetails) {
      // console.log("Chat with Org already Exists!")
      return
    }

    state.newChatName = chatID
    state.chatDetails[chatID] = {
      chats: [],
      organisationDocRef,
      organisationUsername,
      volunteerDocRef,
      volunteerUsername,
    }
  },

  m_AddNewMessage_Locally(state, payload) {
    const {
      volunteerDocRef,
      organisationDocRef,
      volunteerUsername,
      organisationUsername,
      chatID,
      messageObj,
    } = payload

    // Does chat exist here locally?
    // Not created yet, so just update the entire object
    if (!chatID in state.chatDetails) {
      state.newChatName = chatID
      state.chatDetails[chatID] = {
        chats: [messageObj],
        organisationDocRef,
        organisationUsername,
        volunteerDocRef,
        volunteerUsername,
      }
    } else {
      // Update chats list
      state.chatDetails[chatID].chats.push(messageObj)
    }
  },

  m_ReplaceMessageList_Locally(state, payload) {
    const {
      volunteerDocRef,
      organisationDocRef,
      volunteerUsername,
      organisationUsername,
      chatID,
      messageList,
    } = payload

    // Does chat exist here locally?
    // Not created yet, so just update the entire object
    if (!chatID in state.chatDetails) {
      state.newChatName = chatID
      state.chatDetails[chatID] = {
        chats: messageList,
        organisationDocRef,
        organisationUsername,
        volunteerDocRef,
        volunteerUsername,
      }
    } else {
      // Update chats list
      state.chatDetails[chatID].chats = messageList
    }
  },
}

const actions = {
  async a_UpdateFirestoreChat(state, payload) {
    console.log("Update firestore from chat message", payload)
    const {
      volunteerDocRef,
      organisationDocRef,
      volunteerUsername,
      organisationUsername,
      chatID,
      messageList,
    } = payload

    let chatRef = doc(firebase_firestore, "chats", chatID)
    let chatDocSnap = await getDoc(chatRef)
    try {
      // Does ChatID exist yet in firestore?
      if (!chatDocSnap.exists()) {
        // Send to chat doc in Firebase
        await setDoc(doc(firebase_firestore, "chats", chatID), {
          chats: messageList,
          organisationUsername,
          organisationDocRef,
          volunteerUsername,
          volunteerDocRef,
        })
        // Update accounts doc in Firebase for BOTH PARTIES, SENDER AND TARGET
        const newChatKey = organisationUsername + "-" + volunteerUsername
        // Organisation
        let accountDocSnap = await getDoc(organisationDocRef)
        let accountDocData = accountDocSnap.data()
        // console.log(accountDocData)
        await updateDoc(organisationDocRef, {
          chats: [...accountDocData.chats, newChatKey],
        })
        // Volunteer
        accountDocSnap = await getDoc(volunteerDocRef)
        accountDocData = accountDocSnap.data()
        // console.log(accountDocData)
        await updateDoc(volunteerDocRef, {
          chats: [...accountDocData.chats, newChatKey],
        })
      } else {
        /** const newmessageList = [
         { content: "Hello yo, Bob here", senderID: "ClwxrKQVQJhRPpUgDjWWhOqHzFK2" },
         { content: "Hi Bob, what can we do for you?", senderID: "XWRfwZJPwmbQGrsEukW6C1fuaYo1" },
       ]       */

        // Creation of local copy is done after SocketIO... NOT HERE

        // Update chats doc in firestore
        await updateDoc(chatRef, {
          chats: messageList,
        })
      }
    } catch (error) {
      console.log(error)
    }
  },
}

const getters = {
  getIsLoggedIn: (state) => state.isLoggedIn,
  getIsVolunteer: (state) => state.isVolunteer,
  getAuthDetails: (state) => state.authDetails,
  getChatWindowOpenRequest: (state) => state.chatWindowOpenRequest,
  getNewChatName: (state) => state.newChatName,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
