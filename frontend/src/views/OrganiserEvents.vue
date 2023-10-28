<template>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
  />
  <NavBar />
  <div class="content">
    <div class="row">
      <div class="col">
        <button class="btn btn-primary mt-3 ps-4">
          <RouterLink class="link-text" to="/organiser/addevent"
            >Create new Event <i class="bi bi-plus-circle"></i
          ></RouterLink>
        </button>
      </div>
    </div>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
      <div class="col" v-for="event in events" :key="event.id">
        <div class="card">
          <img
            :src="event.downloadedURL"
            class="card-img-top"
            alt="Event Image"
            style="height: 300px; object-fit: cover"
          />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ event.title }}</h5>
            <p class="card-text">{{ event.desc }}</p>
            <div class="grid-container">
              <button type="button" class="btn btn-primary">
                <router-link
                  class="link-text"
                  v-bind:to="'/organiser/editevent/' + event.id"
                  :key="event.id"
                >
                  Edit
                </router-link>
              </button>
              <button type="button" class="btn btn-danger" v-on:click="deleteEvent(event)">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router"
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore"
import { deleteObject, ref, getDownloadURL } from "firebase/storage"
import { firebase_firestore, firebase_storage } from "../firebase"
import NavBar from "../components/NavBar.vue"

export default {
  data() {
    return {
      events: [],
    }
  },
  components: {
    NavBar,
  },
  created() {
    // Call the fetchEventData method when the component is created
    this.fetchEventData()
  },
  methods: {
    async fetchEventData() {
      const eventsCollection = collection(firebase_firestore, "events")

      try {
        const querySnapshot = await getDocs(eventsCollection)
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
    async deleteEvent(eventObj) {
      // console.log(eventObj.id)
      // Delete from firebase
      try {
        await deleteDoc(doc(firebase_firestore, "events", eventObj.id))
      } catch (error) {
        console.log("Delete Event Error:", error)
      }
      // Delete image in firebase storage
      const imageRef = ref(firebase_storage, `posts/${eventObj.imageUrl}`)
      deleteObject(imageRef)
        .then(() => {
          // File deleted successfully
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
          console.log(error)
        })

      // Update local copy
      this.events = this.events.filter((item) => item.id !== eventObj.id)
    },
  },
}
</script>

<style scoped>
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

.link-text {
  text-decoration: none;
  color: white;
}
.bi-plus-circle {
  font-size: 1rem;
  margin-left: 0.5rem;
  margin-right: 0.25rem;
}
.grid-container {
  display: grid;
  justify-content: space-evenly;
  grid-template-columns: 45% 45%;
  gap: 1rem;
}
</style>
