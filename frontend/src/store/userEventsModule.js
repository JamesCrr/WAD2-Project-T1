import { collection, doc, getDocs } from "firebase/firestore"
import { firebase_firestore } from "../firebase"

const state = {
  eventDetails: {},
}

const mutations = {
  m_InitEvents(state, payload) {
    state.eventDetails = payload
  },
  addEvents_Locally(state, payload) {
    const { title, imageUrl, location, date, suitability } = payload
    // Implement logic to add events locally if needed
  },
}

// const actions = {
  
// }

export default {
  state,
  mutations,
  actions,
}