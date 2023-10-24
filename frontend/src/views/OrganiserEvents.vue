<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <button class="btn btn-primary">
          <RouterLink to="/organiser/addevent">Create new Event</RouterLink>
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-3" v-for="event in events" :key="event.id">
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
            <div class="">
              <button type="button" class="btn btn-primary">
                <router-link v-bind:to="'/organiser/editevent/' + event.id" :key="event.id">
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

  <!-- Edit Event Modal -->
  <!-- <div class="modal" id="editEventModal" tabindex="-1" role="dialog">
    <div class="modal-dialog custom-modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Event</h5>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <h1 class="mb-5">Create Event</h1>
            <div class="row">
              <div class="col-lg-12 col-md-12 col-sm-12">
                <label for="title" class="form-label">Event Title</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  v-model="title"
                  placeholder="Enter Event Name"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-lg-6 col-md-6 col-sm-6">
                <label for="startDate" class="form-label">Start Date</label>
                <input type="date" class="form-control" id="startDate" v-model="startDate" />
              </div>
              <div class="col-lg-6 col-md-6 col-sm-6">
                <label for="startTime" class="form-label">Start Time</label>
                <input type="time" class="form-control" id="startTime" v-model="startTime" />
              </div>
            </div>
            <div class="row">
              <div class="col-lg-6 col-md-6 col-sm-6">
                <label for="endDate" class="form-label">End Date</label>
                <input type="date" class="form-control" id="endDate" v-model="endDate" />
              </div>
              <div class="col-lg-6 col-md-6 col-sm-6">
                <label for="endTime" class="form-label">End Time</label>
                <input type="time" class="form-control" id="endTime" v-model="endTime" />
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12 col-md-12 col-sm-12">
                <label for="location" class="form-label">Location</label>
                <input
                  type="text"
                  class="form-control"
                  id="location"
                  v-model="location"
                  placeholder="Enter Event Location"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12 col-md-12 col-sm-12">
                <label for="desc" class="form-label">Event Description</label>
                <textarea
                  type="text"
                  class="form-control"
                  id="desc"
                  v-model="desc"
                  placeholder="Enter Event Description"
                ></textarea>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-6 col-md-6 col-sm-6">
                <label for="openings" class="form-label">Number of Openings</label>
                <input
                  type="number"
                  class="form-control"
                  id="openings"
                  v-model="openings"
                  min="0"
                />
              </div>
              <div class="col-lg-6 col-md-6 col-sm-6 mt-4">
                <input
                  type="file"
                  accept="image/*"
                  id="filename"
                  name="filename"
                  @change="handleFileSelect"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-lg-6 col-md-6 col-sm-6">
                <label for="donation" class="form-label">Ask for Donation</label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  id="donation"
                  v-model="selectedDonation"
                >
                  <option selected value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-6">
                <label for="budget" class="form-label">Budget</label>
                <input
                  type="number"
                  class="form-control"
                  id="budget"
                  v-model="budget"
                  min="1"
                  placeholder="Enter the Budget"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12 col-md-12 col-sm-12">
                <button
                  type="submit"
                  class="btn btn-primary w-100"
                  @click="uploadFileAndCreateEvent"
                >
                  Create Event
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            @click="closeEditModal()"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary">Save Changes</button>
        </div>
      </div>
    </div>
  </div> -->
</template>

<script>
import { RouterLink } from "vue-router"
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore" // Import Firestore functions
import { deleteObject, ref, getDownloadURL } from "firebase/storage"
import { firebase_firestore, firebase_storage } from "../firebase"

export default {
  data() {
    return {
      events: [], // Array to store retrieved events
    }
  },
  created() {
    // Call the fetchEventData method when the component is created
    this.fetchEventData()
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
    // openEditModal(event) {
    //   // Here, you can set up the data and logic to populate the modal
    //   // based on the event that was clicked.

    //   // For example, you can set up data properties in your component
    //   // to hold the data for the currently edited event.

    //   // Then, you can trigger the modal to open:
    //   $("#editEventModal").modal("show")
    // },
    // closeEditModal() {
    //   // Here, you can set up the data and logic to populate the modal
    //   // based on the event that was clicked.

    //   // For example, you can set up data properties in your component
    //   // to hold the data for the currently edited event.

    //   // Then, you can trigger the modal to open:
    //   $("#editEventModal").modal("hide")
    // },
  },
}
</script>

<!-- <style scoped>
.btn {
  margin-top: 0px;
}

.card {
  background-color: white;
}

.custom-modal-dialog {
  max-width: 800px; /* Adjust the width as needed */
}
</style> -->
