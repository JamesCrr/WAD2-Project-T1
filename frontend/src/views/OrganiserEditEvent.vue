<template>
  <div class="container-fluid p-0">
    <div class="row m-0">
      <div class="col-md-9 my-3 ms-lg-5 ms-md-5 ms-sm-5" style="min-height: 100vh">
        <div class="row">
          <h1 class="mb-5">Edit Event</h1>
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
            /> -->
            <GMapAutocomplete
              id="location"
              ref="locationRef"
              placeholder="Search for a location"
              v-bind:value="locationSearchText"
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
              ref="fileSelect"
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
              Edit Event
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { updateDoc, getDoc, doc } from "firebase/firestore"
import { firebase_firestore, firebase_storage } from "../firebase"
import { ref, uploadBytes, deleteObject } from "firebase/storage"
import { mapGetters } from "vuex"

export default {
  data() {
    return {
      title: "",
      date: "",
      startTime: "",
      endTime: "",
      location: null,
      desc: "",
      suitability: "",
      category: "",
      openings: 0,
      selectedFile: null,
      selectedDonation: false,
      budget: 0,
      organiserRef: null,
      signups: [],
      donations: [],

      oldImageURL: "",

      locationSearchInput: null,
      locationSearchText: "",
    }
  },
  computed: {
    ...mapGetters("auth", ["getAuthDetails", "getAccountDetails"]),
  },
  methods: {
    async async_FetchDetails() {
      const eventID = this.$route.params.id
      // console.log(eventID)

      // Fetch from firebase
      const docRef = doc(firebase_firestore, "events", eventID)
      const docSnap = await getDoc(docRef)
      let data = null
      if (docSnap.exists()) {
        data = docSnap.data()
        // console.log("Document data:", docSnap.data())
      } else {
        // docSnap.data() will be undefined in this case
        console.error("No such document!")
      }

      // Update local fields to reflect data
      this.title = data.title
      this.date = data.date
      this.startTime = data.startTime
      this.endTime = data.endTime
      this.location = data.location
      this.desc = data.desc
      this.suitability = data.suitability
      this.category = data.category
      this.openings = data.openings
      this.selectedDonation = data.selectedDonation
      this.budget = data.budget
      this.signups = data.signups
      this.donations = data.donations

      // Update local location field
      this.locationSearchText = data.location.searchValue
      // console.log(this.locationSearchText)
      // console.log(this.$refs.locationRef)

      // To delete the old image if needed
      this.oldImageURL = data.imageUrl
    },

    setNewLocation(place) {
      this.location.lat = place.geometry.location.lat()
      this.location.lng = place.geometry.location.lng()
      this.location.address = place.formatted_address
      this.location.searchValue = this.locationSearchInput.target.value
      this.location.googleUrl = place.url
      //   console.log(place)
      //   console.log(this.coords, this.locationDetails)
      //   console.log(this.locationSearchInput)
      //   console.log(place.formatted_address)
    },

    handleFileSelect(event) {
      const fileInput = event.target
      if (fileInput.files.length > 0) {
        this.selectedFile = fileInput.files[0]
        console.log("File selected:", this.selectedFile.name)
      } else {
        this.selectedFile = null
      }
    },

    async updateEvent(eventDetails) {
      const eventRef = doc(firebase_firestore, "events", this.$route.params.id)
      // console.log(eventDetails)
      try {
        await updateDoc(eventRef, eventDetails)
      } catch (error) {
        console.log(error)
      }
    },

    async uploadFileAndCreateEvent() {
      // Check if a file has been selected
      if (this.selectedFile) {
        // Delete old Image stored in Firebase Storage, Create a reference to the file to delete
        const imageRef = ref(firebase_storage, `posts/${this.oldImageURL}`)

        // Delete the file
        try {
          await deleteObject(imageRef)
        } catch (error) {
          console.log(error)
        }

        // Generate a unique filename
        const fileName = Date.now() + "_" + this.selectedFile.name
        const newImageRef = ref(firebase_storage, "posts/" + fileName)

        try {
          //// Upload the file to Firebase Storage
          await uploadBytes(newImageRef, this.selectedFile)
          //// The image has been successfully uploaded
          // console.log("Image uploaded:", fileName)

          // Prepare the event data from the form inputs
          const eventData = {
            title: this.title,
            date: this.date,
            startTime: this.startTime,
            endTime: this.endTime,
            location: this.location,
            desc: this.desc,
            suitability: this.suitability,
            category: this.category,
            openings: this.openings,
            selectedDonation: this.selectedDonation,
            budget: this.budget,
            imageUrl: fileName, // Add the image filename to event data
            // organiserRef: this.organiserRef,
            // signups: this.signups,
          }

          // update the event with the image filename
          await this.updateEvent(eventData)
          console.log("Event Updated.")

          // Navigate back to events
          this.$router.replace({ name: "organiser_events" })
        } catch (error) {
          console.error("Error updating event: ", error)
        }
      } else {
        console.error("No file selected.")
      }
    },
  },

  created() {
    // this.$nextTick() function to ensure that the GMapAutocomplete component is fully initialized before setting the initial value.
    this.$nextTick(() => {
      this.async_FetchDetails()
    })
  },
}
</script>
