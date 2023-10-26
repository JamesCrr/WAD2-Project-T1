<template>
  <div class="container-fluid p-0">
    <div class="row">
      <div
        class="col-md-9 my-3 ms-lg-5 ms-md-5 ms-sm-5"
        style="min-height: 100vh; position: relative"
      >
        <div class="row">
          <h1 class="mb-5">Donations</h1>
          <table class="table table-light">
            <thead>
              <tr>
                <th scope="col">Events</th>
                <th scope="col">Date</th>
                <th scope="col">Target</th>
                <th scope="col">Donations Received</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="event in events" :key="event.id">
                <td>{{ event.title }}</td>
                <td>{{ event.date }}</td>
                <td>${{ event.budget }}</td>
                <td scope="col">
                  <p>{{ getProgressStatus(event) }}</p>
                  <div
                    class="progress"
                    role="progressbar"
                    aria-label="Basic example"
                    aria-valuenow="0"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <div class="progress-bar" :style="{ width: progressBarWidth(event) }"></div>
                  </div>
                  <h4>${{ totalDonations }}<span style="font-size: medium; color: black;">, raised from {{ event.donations.length }} donors</span></h4>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore" // Import Firestore functions
import { ref, getDownloadURL } from "firebase/storage"
import { firebase_firestore, firebase_storage } from "../firebase"


export default {
  data() {
    return {
      events: [], // Array to store retrieved events
    }
  },
  computed: {
    totalDonations() {
      let sum = 0;
      for (const event of this.events) {
        if (Array.isArray(event.donations)) {
          sum += event.donations.reduce((acc, donation) => acc + donation.amount, 0);
        }
      }
      return sum;
    }
  },
  methods: {
    async fetchEventData() {
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
    getProgressStatus(event) {
      if (event.budget <= 0) {
        return "In Progress";
      }
      
      const percentage = (this.totalDonations / event.budget) * 100;
      return percentage >= 100 ? "Completed" : "In Progress";
    },
    progressBarWidth(event) {
      if (event.budget <= 0) {
        return "0%";
      }
      const percentage = (this.totalDonations / event.budget) * 100;      
      // Ensure the width is not greater than 100%
      return percentage >= 100 ? "100%" : `${percentage}%`;
    }
  },
  created() {
    // Call the fetchEventData method when the component is created
    this.fetchEventData()
  },
}
</script>
