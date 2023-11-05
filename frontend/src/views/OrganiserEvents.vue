<template>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
  />
  <div class="container-fluid navbarspace">
    <div class="row g-0 ms-3 mt-5 neweventrow">
      <div class="col d-flex justify-content-center align-items-center">
        <button
          class="btn ps-4"
          :class="{ 'btn-primary': !isLoading, 'btn-secondary': isLoading }"
          v-bind:disabled="isLoading"
        >
          <RouterLink class="link-text" to="/organiser/addevent"
            ><h5 style="display: inline">New Event</h5>
            <i class="bi bi-plus-circle fs-5 fw-b"></i
          ></RouterLink>
        </button>
      </div>
    </div>
    <div class="row g-0 ms-3 mt-5">
      <div class="col">
        <h3>Your Events</h3>
      </div>
    </div>

    <div v-if="isLoading" class="ms-3">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 pt-2 mw-100">
        <div class="col" v-for="index in placeholderCount" :key="index">
          <div class="card" aria-hidden="true">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/2560px-Placeholder_view_vector.svg.png"
              class="card-img-top"
              style="height: 300px; object-fit: cover"
            />
            <div class="card-body d-flex flex-column">
              <h4 class="card-title placeholder-glow"><span class="placeholder col-6"></span></h4>
              <h4 class="card-title placeholder-glow">
                <span class="placeholder col-7"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-6"></span>
                <span class="placeholder col-8"></span>
              </h4>

              <div class="grid-container pt-5 placeholder-glow d-flex justify-content-between">
                <a
                  class="btn btn-primary disabled placeholder col-6"
                  aria-disabled="true"
                  style="width: 100px"
                ></a>
                <a
                  class="btn btn-primary disabled placeholder col-6"
                  aria-disabled="true"
                  style="width: 100px"
                ></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="ms-3">
      <div
        class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 pt-1 mw-100"
        style="margin-bottom: 10vh"
      >
        <div class="col" v-for="(event, index) in events" :key="event.id">
          <div class="card h-100">
            <img
              :src="event.downloadedURL"
              class="card-img-top"
              alt="Event Image"
              style="height: 300px; object-fit: cover"
            />
            <div class="card-body d-flex flex-column justify-content-between">
              <h5 class="card-title">{{ event.title }}</h5>
              <p class="card-text">{{ event.desc }}</p>
              <div class="row">
                <div class="col">
                  <div class="row d-flex justify-content-between">
                    <div class="col">
                      <button type="button" class="btn btn-primary w-100">
                        <router-link
                          class="link-text"
                          v-bind:to="'/organiser/editevent/' + event.id"
                          :key="event.id"
                        >
                          Edit
                        </router-link>
                      </button>
                    </div>
                    <div class="col">
                      <button type="button" class="btn btn-info w-100">
                        <router-link
                          class="link-text"
                          v-bind:to="'/organiser/viewparticipants/' + event.id"
                          :key="event.id"
                        >
                          Participants
                        </router-link>
                      </button>
                    </div>
                  </div>
                  <div class="row mt-2">
                    <div class="col">
                      <button
                        type="button"
                        class="btn btn-outline-danger w-100"
                        v-on:click="deleteEvent(event)"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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
import { mapGetters } from "vuex"
import { gsap } from "gsap"

export default {
  data() {
    return {
      events: [],
      isLoading: true,
      placeholderCount: 6,
    }
  },
  mounted() {
    setTimeout(() => {
      // Once data is loaded, set isLoading to false
      this.fetchEventData() // Fetch events when the component is mounted
    }, 500)
  },
  computed: {
    ...mapGetters("auth", ["getAuthDetails", "getAccountDetails"]),
  },
  methods: {
    async fetchEventData() {
      const eventsCollection = collection(firebase_firestore, "events")

      try {
        const querySnapshot = await getDocs(eventsCollection)
        let fetchedEvents = []

        for (const doc of querySnapshot.docs) {
          // Access the data from each document
          const eventData = doc.data()

          // Fetch the image URL from Firebase Storage
          const imageRef = ref(firebase_storage, `posts/${eventData.imageUrl}`)
          const downloadedURL = await getDownloadURL(imageRef)

          // Append the event data with the downloadedURL to the fetchedEvents array
          fetchedEvents.push({ ...eventData, downloadedURL, id: doc.id })
          // console.log(eventData)
        }
        // Filter out the events not in my org
        fetchedEvents = fetchedEvents.filter((event) => {
          let segpatharray = event.organiserRef._key.path.segments
          return segpatharray[segpatharray.length - 1] != this.getAccountDetails.username
        })

        // Set the fetchedEvents data in your component's data
        this.events = fetchedEvents
        this.isLoading = false
        // console.log(fetchedEvents)
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
@media (max-width: 992px) {
  .neweventrow {
    margin-top: 110px !important;
  }
}
/* .content {
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
    left: 18rem;
    top: 2rem;
  }
} */

.link-text {
  text-decoration: none;
  color: white;
}
.bi-plus-circle {
  font-size: 1rem;
  margin-left: 0.5rem;
  margin-right: 0.25rem;
}
/* .grid-container {
  display: grid;
  justify-content: space-evenly;
  grid-template-columns: 45% 45%;
  gap: 1rem;
  vertical-align: bottom;
} 
 .card {
  height: 100%;
} */

.card-text {
  height: 72px;
  overflow: hidden;
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
