<template>
  <div class="container-fluid navbarspace">
    <div class="row g-0">
      <div class="col g-1 px-4">
        <div class="row">
          <h1 class="mb-3">Donations</h1>
        </div>
        <div class="row">
          <table class="table table-light table-hover">
            <thead class="table-primary">
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
                  <h4>
                    ${{ totalDonations(event)
                    }}<span style="font-size: medium; color: black"
                      >, raised from {{ event.donations.length }} donors</span
                    >
                  </h4>
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
import { collection, getDocs } from "firebase/firestore"
import { firebase_firestore } from "../firebase"

export default {
  data() {
    return {
      events: [],
    }
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

          if (eventData.selectedDonation == true) {
            // Append the event data with the downloadedURL to the events array
            events.push({ ...eventData, id: doc.id })
          }
        }

        // Set the events data in your component's data
        this.events = events
        // console.log(events)
      } catch (error) {
        console.error("Error getting documents: ", error)
      }
    },
    totalDonations(event) {
      let sum = 0
      if (Array.isArray(event.donations)) {
        sum += event.donations.reduce((acc, donation) => acc + donation.amount, 0)
      }
      return sum
    },
    getProgressStatus(event) {
      if (event.budget <= 0) {
        return "0% completed"
      }

      const percentage = (this.totalDonations(event) / event.budget) * 100
      return percentage >= 100 ? "100% Completed" : `${percentage}% completed`
    },
    progressBarWidth(event) {
      if (event.budget <= 0) {
        return "0%"
      }
      const percentage = (this.totalDonations(event) / event.budget) * 100
      return percentage >= 100 ? "100%" : `${percentage}%`
    },
  },
  mounted() {
    this.fetchEventData()
  },
}
</script>

<style scoped>
.navbarspace {
  padding: 0;
  padding-left: 17rem;
}

@media (max-width: 992px) {
  .navbarspace {
    padding: 0;
    margin-top: 10vh;
  }
}
</style>
