<template>

  <OrgNavBar/>

  <!-- content -->
  <div class="content">
      <div class="container-fluid">
        <div class="row">
          <router-link v-for="event of events" v-bind:to="'/events/' + event.id" :key="event.id">
            {{ event.id }}
          </router-link>
        </div>
    </div>
    <div class="dashboard-content p-3">
        <h2 class="fs-5"> Dashboard</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, totam? Sequi alias eveniet ut quas
            ullam delectus et quasi incidunt rem deserunt asperiores reiciendis assumenda doloremque provident,
            dolores aspernatur neque.</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex"
import { firebase_firestore, firebase_storage } from "../firebase"
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore"
import { deleteObject, ref, getDownloadURL } from "firebase/storage"
import OrgNavBar from "../components/OrgNavBar.vue"

export default {
  data() {
    return {
      events: [],
    }
  },
  components: {
    OrgNavBar,
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

<style>

/* content */

.content {
    position: absolute;
    width: 100%;
    padding-left: 3rem;
    padding-right: 3rem;
    top: 5rem;
}

@media (min-width: 992px) {
    .content {
        position: absolute;
        max-width: 76%;
        left: 16rem;
        top: 2rem;
    }
}
</style>
