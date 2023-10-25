<template>
  <div class="container-fluid">
    <div class="row">
      <router-link v-for="event of events" v-bind:to="'/events/' + event.id" :key="event.id">
        {{ event.id }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex"
import { firebase_firestore, firebase_storage } from "../firebase"
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore"
import { deleteObject, ref, getDownloadURL } from "firebase/storage"

export default {
  data() {
    return {
      events: [],
    }
  },
  computed: {},
  methods: {
    async fetchEvents() {
      const eventsCollection = collection(firebase_firestore, "events") // Reference to the 'events' collection

      try {
        const querySnapshot = await getDocs(eventsCollection) // Get all documents in the collection
        const events = []

        for (const doc of querySnapshot.docs) {
          // Access the data from each document
          const eventData = doc.data()

          // Fetch the image URL from Firebase Storage
          const imageRef = ref(firebase_storage, `posts/${eventData.imageUrl}`)
          const downloadedURL = await getDownloadURL(imageRef)

          // Append the event data with the downloadedURL to the events array
          events.push({ ...eventData, downloadedURL, id: doc.id })
        }

        // Set the events data in your component's data
        this.events = events
        console.log(events)
      } catch (error) {
        console.error("Error getting documents: ", error)
      }
    },
  },

  created() {
    this.fetchEvents()
  },
}
</script>
