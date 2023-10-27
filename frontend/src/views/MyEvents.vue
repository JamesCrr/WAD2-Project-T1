<template>
    <NavBar/>
    <div class="content">
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
                        <router-link class="link-text" v-bind:to="'/organiser/editevent/' + event.id" :key="event.id">
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
import { mapState, mapMutations } from "vuex"
import { firebase_firestore, firebase_storage, firebase_auth } from "../firebase"
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore"
import { deleteObject, ref, getDownloadURL } from "firebase/storage"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import NavBar from "../components/NavBar.vue"

// const auth = getAuth()
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/auth.user
//     const uid = user.uid;
//     // ...
//   } else {
//     // User is signed out
//     // ...
//   }
// });

export default {
  data() {
    return {
      events: [],
      userID: ''
    }
  },
  components: {
    NavBar,
  },
    computed: {
    },
    methods: {
        async getUserID() {
            const auth = getAuth()
            onAuthStateChanged(auth, (user) => {
            if (user) {
                this.userID = user.uid
            }})
        },
        async fetchEvents() {
        const eventsCollection = collection(firebase_firestore, "events") // Reference to the 'events' collection
        try {
            const querySnapshot = await getDocs(eventsCollection) // Get all documents in the collection
            const events = []

            for (const doc of querySnapshot.docs) {
            // Access the data from each document
            const eventsData = doc.data()
            // checks signups array in each event
            let signups = eventsData.signups
            if (signups.includes(this.userID)) {
                // Fetch the image URL from Firebase Storage
                const imageRef = ref(firebase_storage, `posts/${eventsData.imageUrl}`)
                const downloadedURL = await getDownloadURL(imageRef)

                // Append the event data with the downloadedURL to the events array
                events.push({ ...eventsData, downloadedURL, id: doc.id })
            }
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
    this.getUserID(),
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
