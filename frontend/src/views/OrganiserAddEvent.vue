<template>
  <div class="container-fluid p-0">
    <div class="row m-0">
      <div class="col-md-9 my-3 ms-lg-5 ms-md-5 ms-sm-5" style="min-height: 100vh">
        <div class="row">
          <h1 class="mb-5">Create Event</h1>
          <div class="col-lg-10 col-md-10 col-sm-10">
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
          <div class="col-lg-10 col-md-10 col-sm-10">
            <label for="date" class="form-label">Date</label>
            <input type="date" class="form-control" id="date" v-model="date" />
          </div>
        </div>
        <div class="row">
          <div class="col-lg-5 col-md-5 col-sm-5">
            <label for="startTime" class="form-label">Start Time</label>
            <input type="time" class="form-control" id="startTime" v-model="startTime" />
          </div>
          <div class="col-lg-5 col-md-5 col-sm-5">
            <label for="endTime" class="form-label">End Time</label>
            <input type="time" class="form-control" id="endTime" v-model="endTime" />
          </div>
        </div>
        <div class="row">
          <div class="col-lg-10 col-md-10 col-sm-10">
            <label for="location" class="form-label">Location</label>
            <!-- <input
              type="text"
              class="form-control"
              id="location"
              v-model="location"
              placeholder="Enter Event Location"
              ref="locationRef"
            /> -->
            <GMapAutocomplete
              id="location"
              ref="locationRef"
              placeholder="Search for a location"
              @place_changed="setNewLocation"
              @input="locationSearchInput = $event"
              style="font-size: medium"
              class="form-control"
              v-bind:options="{
                componentRestrictions: { country: 'sg' },
                strictBounds: true,
              }"
            >
            </GMapAutocomplete>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-10 col-md-10 col-sm-10">
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
          <div class="col-lg-5 col-md-5 col-sm-5">
            <label for="suitability" class="form-label">Suitability</label>
            <select
              class="form-select"
              aria-label="Default select example"
              id="suitability"
              v-model="suitability"
            >
              <option selected value="First Timers">First Timers</option>
              <option value="Seniors">Seniors</option>
              <option value="Family Friendly">Family Friendly</option>
              <option value="Open to All">Open to All</option>
              <option value="Organisations">Organisations</option>
              <option value="Group">Group</option>
            </select>
          </div>
          <div class="col-lg-5 col-md-5 col-sm-5">
            <label for="category" class="form-label">Category</label>
            <select
              class="form-select"
              aria-label="Default select example"
              id="category"
              v-model="category"
            >
              <option selected value="Tree Planting">Tree Planting</option>
              <option value="Beach Cleanups">Beach Cleanups</option>
              <option value="Community Composting">Community Composting</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-5 col-md-5 col-sm-5">
            <label for="openings" class="form-label">Number of Openings</label>
            <input type="number" class="form-control" id="openings" v-model="openings" min="0" />
          </div>
          <div class="col-lg-5 col-md-5 col-sm-5 mt-4">
            <input
              type="file"
              accept="image/*"
              id="filename"
              name="filename"
              @change="handleFileSelect"
              ref="fileSelectRef"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-lg-5 col-md-5 col-sm-5">
            <label for="donation" class="form-label">Ask for Donation</label>
            <select
              class="form-select"
              aria-label="Default select example"
              id="donation"
              v-model="selectedDonation"
            >
              <option selected :value="true">Yes</option>
              <option :value="false">No</option>
            </select>
          </div>
          <div class="col-lg-5 col-md-5 col-sm-5">
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
          <div class="col-lg-10 col-md-10 col-sm-10">
            <button type="submit" class="btn btn-primary w-100" @click="uploadFileAndCreateEvent">
              Create Event
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, addDoc, doc } from "firebase/firestore"
import { firebase_firestore, firebase_storage } from "../firebase"
import { ref, uploadBytes } from "firebase/storage"
import { mapGetters } from "vuex"

export default {
  data() {
    return {
      title: "",
      date: "",
      startTime: "",
      endTime: "",
      desc: "",
      suitability: "",
      category: "",
      openings: 0,
      selectedFile: null,
      selectedDonation: false,
      budget: 0,

      locationSearchInput: null,
      coords: { lat: 51.5072, lng: 0.1276 },
      locationDetails: {
        address: "",
        url: "",
      },
    }
  },
  computed: {
    ...mapGetters("auth", ["getAuthDetails", "getAccountDetails"]),
  },
  methods: {
    handleFileSelect(event) {
      const fileInput = event.target
      if (fileInput.files.length > 0) {
        this.selectedFile = fileInput.files[0]
        console.log("File selected:", this.selectedFile.name)
      } else {
        this.selectedFile = null
      }
    },
    setNewLocation(place) {
      this.coords.lat = place.geometry.location.lat()
      this.coords.lng = place.geometry.location.lng()
      this.locationDetails.address = place.formatted_address
      this.locationDetails.searchValue = this.locationSearchInput.target.value
      this.locationDetails.url = place.url
      //   console.log(place)
      //   console.log(this.coords, this.locationDetails)
      //   console.log(this.locationSearchInput)
      //   console.log(place.formatted_address)
    },

    async createEvent(eventData) {
      try {
        // Add into firebase
        const docRef = await addDoc(collection(firebase_firestore, "events"), eventData)

        // Reset the form fields after successful submission
        this.title = ""
        this.date = ""
        this.startTime = ""
        this.endTime = ""
        this.desc = ""
        this.suitability = ""
        this.category = ""
        this.openings = 0
        this.selectedDonation = false
        this.budget = 0

        this.$refs.fileSelectRef.value = null

        console.log("Document written with ID: ", docRef.id)
      } catch (error) {
        console.error("Error adding document: ", error)
      }
    },
    async uploadFileAndCreateEvent() {
      //   console.log(this.date)
      //   console.log(this.startTime)
      //   console.log(this.endTime)
      // console.log(this.getAuthDetails.uid)

      // Check if a file has been selected
      if (this.selectedFile) {
        // Generate a unique filename
        const fileName = Date.now() + "_" + this.selectedFile.name
        const storageRef = ref(firebase_storage, "posts/" + fileName)

        try {
          // Upload the file to Firebase Storage
          await uploadBytes(storageRef, this.selectedFile)

          // The image has been successfully uploaded
          console.log("Image uploaded:", fileName)

          //// Create organiser ref
          // const targetDocumentRef = doc(firebase_firestore, "accounts", getAuthDetails.uid)
          const targetDocumentRef = doc(firebase_firestore, "accounts", this.getAuthDetails.uid)

          // Prepare the event data from the form inputs
          const eventData = {
            title: this.title,
            date: this.date,
            startTime: this.startTime,
            endTime: this.endTime,
            location: {
              address: this.locationDetails.address,
              googleUrl: this.locationDetails.url,
              searchValue: this.locationDetails.searchValue,
              lat: this.coords.lat,
              lng: this.coords.lng,
            },
            desc: this.desc,
            suitability: this.suitability,
            category: this.category,
            openings: this.openings,
            selectedDonation: this.selectedDonation,
            budget: this.budget,
            imageUrl: fileName, // Add the image filename to event data
            organiserRef: targetDocumentRef,
            signups: [],
            donations: [],
          }

          // Create the event with the image filename
          await this.createEvent(eventData)

          // The file and event have been successfully uploaded and created
          //   alert("Event Created Successfully!")
          console.log("File and event created.")

          //   Navigate back to events
          this.$router.replace({ name: "organiser_events" })
        } catch (error) {
          console.error("Error uploading file or creating event: ", error)
        }
      } else {
        console.error("No file selected.")
      }
    },
  },
}
</script>
