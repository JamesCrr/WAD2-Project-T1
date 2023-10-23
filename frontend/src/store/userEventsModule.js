import { collection, doc, getDoc } from "firebase/firestore"
import { firebase_firestore, firebase_auth } from "../firebase"

const state = {
    eventDetails: {},
}

const mutations = {
    // put all the functions you want to use here
    m_InitEvents(state, payload) {
        state.eventDetails = payload
      },
    addEvents_Locally(state, payload){
        const {
            eventName, 
            eventDate,
            eventLocation,
            eventSuitable,
        } = payload
    }
}

