<template>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

  <div>
      <div class="container-fluid p-0">
      <div class="row m-0">
          <div class="d-flex flex-column flex-shrink-0 p-3 text-white" style="width: 280px; background-color: #69D8cD;">
              <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
              <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
              <span class="fs-4">EcoConnect</span>
              </a>
              <hr>
              <ul class="nav nav-pills flex-column mb-auto">
                  <li class="nav-item">
                      <router-link to="/" class="nav-link text-white"><span class="fa fa-line-chart pe-2"></span>Dashboard</router-link>
                  </li>
                  <li>
                      <router-link to="/addEvent" class="nav-link text-white active"><span class="fa fa-calendar pe-2"></span>Event</router-link>
                  </li>
                  <li>
                      <router-link to="/viewDonation" class="nav-link text-white"><span class="fa fa-dollar pe-2"></span>Donation</router-link>
                  </li>
                  <li>
                      <router-link to="/chat" class="nav-link text-white"><span class="fa fa-paper-plane pe-2"></span>Chat</router-link>
                  </li>
              </ul>
              <hr>
              <div class="dropdown">
              <ul class="nav nav-pills flex-column mb-auto">
                  <li><router-link to="/chat" class="nav-link text-white"><span class="fa fa-sign-out pe-2"></span>Log Out</router-link></li>
              </ul>
              </div>
          </div>
          <div class="col-md-9 my-3 ms-lg-5 ms-md-5 ms-sm-5" style="min-height: 100vh;">
              <a href="#" class="d-flex align-items-center text-dark text-decoration-none" style="position: absolute; right: 38px;">
                  <img src="https://cf.shopee.com.my/file/2668a8d450d82d38574d01f51694f714" alt="" width="50" height="50" class="rounded-circle me-2">
                  <strong>Takahashi</strong>
              </a>
              <div class="row">
                <div class="card m-3" style="width: 18rem;" v-for="event in events" :key="event.id">
                  <img :src="event.imageURL" class="card-img-top" alt="Event Image" style="height: 280px; object-fit: fill;">
                  <div class="card-body d-flex flex-column">
                    <h5 class="card-title">{{ event.title }}</h5>
                    <p class="card-text">{{ event.desc }}</p>
                    <div class="mt-auto">
                      <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#editEventModal" @click="openEditModal(event)">Edit</a>
                      <a href="#" class="btn btn-danger m-3" @click="deleteEvent(event.title)">Delete</a>
                    </div>
                  </div>
                </div>
              </div>
          </div>
      </div>
      </div>
  </div>

  <!-- Edit Event Modal -->
  <div class="modal" id="editEventModal" tabindex="-1" role="dialog">
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
                      <input
                          type="date"
                          class="form-control"
                          id="startDate"
                          v-model="startDate"
                      />
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-6">
                      <label for="startTime" class="form-label">Start Time</label>
                      <input
                          type="time"
                          class="form-control"
                          id="startTime"
                          v-model="startTime"
                      />
                  </div>
              </div>
              <div class="row">
                  <div class="col-lg-6 col-md-6 col-sm-6">
                      <label for="endDate" class="form-label">End Date</label>
                      <input
                          type="date"
                          class="form-control"
                          id="endDate"
                          v-model="endDate"
                      />
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-6">
                      <label for="endTime" class="form-label">End Time</label>
                      <input
                          type="time"
                          class="form-control"
                          id="endTime"
                          v-model="endTime"
                      />
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
                      <input type="file" accept="image/*" id="filename" name="filename" @change="handleFileSelect">
                      <!-- <label id="filename-label" for="filename">Insert Image</label> -->
                  </div>
              </div>
              <div class="row">
                  <div class="col-lg-6 col-md-6 col-sm-6">
                      <label for="donation" class="form-label">Ask for Donation</label>
                      <select class="form-select" aria-label="Default select example" id="donation" v-model="selectedDonation">
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
                      <button type="submit" class="btn btn-primary w-100" @click="uploadFileAndCreateEvent">Create Event</button>
                  </div>
              </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="closeEditModal()">Close</button>
          <button type="button" class="btn btn-primary">Save Changes</button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import { getFirestore, collection, doc, getDocs, deleteDoc } from 'firebase/firestore/lite'; // Import Firestore functions
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';

export default {
  data() {
    return {
      events: [], // Array to store retrieved events
    };
  },
  created() {
    // Call the fetchEventData method when the component is created
    this.fetchEventData();
  },
  methods: {
    async fetchEventData() {
      const db = getFirestore(); // Initialize Firestore
      const eventsCollection = collection(db, 'events'); // Reference to the 'events' collection

      try {
        const querySnapshot = await getDocs(eventsCollection); // Get all documents in the collection

        const events = [];

        for (const doc of querySnapshot.docs) {
          // Access the data from each document
          const eventData = doc.data();

          // Fetch the image URL from Firebase Storage
          const storage = getStorage();
          const imageRef = storageRef(storage, `posts/${eventData.imageUrl}`);
          const imageURL = await getDownloadURL(imageRef);

          // Append the event data with the imageURL to the events array
          events.push({ ...eventData, imageURL });
        }

        // Set the events data in your component's data
        this.events = events;
        console.log(events)
      } catch (error) {
        console.error('Error getting documents: ', error);
      }
    },
    async deleteEvent(eventTitle) {
      console.log(eventTitle); // Log the eventTitle to the console to inspect its value

      const db = getFirestore(); // Initialize Firestore
      const eventsCollection = collection(db, 'events'); // Reference to the 'events' collection

      try {
        // Query the Firestore collection to find the document with the matching event title
        const querySnapshot = await getDocs(eventsCollection);
        
        querySnapshot.forEach((doc) => {
          const eventData = doc.data();
          if (eventData.title === eventTitle) {
            // Delete the event document with the matching title
            deleteDoc(doc.ref);
          }
        });
        
        // Re-fetch the event data after the document is deleted
        location.reload();
      } catch (error) {
        console.error('Error deleting document: ', error);
      }
    },
    openEditModal(event) {
      // Here, you can set up the data and logic to populate the modal
      // based on the event that was clicked.
      
      // For example, you can set up data properties in your component
      // to hold the data for the currently edited event.
      
      // Then, you can trigger the modal to open:
      $('#editEventModal').modal('show');
    },
    closeEditModal() {
      // Here, you can set up the data and logic to populate the modal
      // based on the event that was clicked.
      
      // For example, you can set up data properties in your component
      // to hold the data for the currently edited event.
      
      // Then, you can trigger the modal to open:
      $('#editEventModal').modal('hide');
    },
  },
};
</script>

<style scoped>
.btn{
  margin-top: 0px;
}

.card {
  background-color: white;
}

.custom-modal-dialog {
  max-width: 800px; /* Adjust the width as needed */
}
</style>