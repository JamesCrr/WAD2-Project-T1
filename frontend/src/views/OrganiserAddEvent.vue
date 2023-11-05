<template>
  <div class="container-fluid navbarspace">
    <form
      class="row m-0 needs-validation form-container"
      ref="formRef"
      v-on:submit.prevent="uploadFileAndCreateEvent"
    >
      <div class="col-md-9 mt-3 px-5 px-md-0" style="min-height: 100vh; margin-bottom: 100px">
        <!-- Name -->
        <div class="row">
          <h1 class="mb-5 mt-4 text-primary">Create Event</h1>
          <div class="col-lg-12 col-md-12 col-sm-12">
            <label for="title" class="form-label"><h5>Event Name</h5></label>
            <input
              type="text"
              class="form-control"
              id="title"
              v-model="title"
              placeholder="Enter Event Name"
              required
            />
            <div class="invalid-feedback">Please provide a name.</div>
          </div>
        </div>
        <!-- Date -->
        <div class="row mt-3">
          <div class="col-lg-12 col-md-12 col-sm-12">
            <label for="date" class="form-label"><h5>Date</h5></label>
            <input type="date" class="form-control" id="date" v-model="date" required />
            <div class="invalid-feedback">Please provide a date.</div>
          </div>
        </div>
        <!-- Start time -->
        <div class="row mt-3">
          <div class="col-lg-6 col-md-6 col-sm-6">
            <label for="startTime" class="form-label"><h5>Start Time</h5></label>
            <input type="time" class="form-control" id="startTime" v-model="startTime" required />
            <div class="invalid-feedback">Please provide a start time.</div>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6">
            <label for="endTime" class="form-label"><h5>End Time</h5></label>
            <input type="time" class="form-control" id="endTime" v-model="endTime" required />
            <div class="invalid-feedback">Please provide an end time.</div>
          </div>
        </div>
        <!-- Location -->
        <div class="row mt-3">
          <div class="col-lg-12 col-md-12 col-sm-12">
            <label for="location" class="form-label"><h5>Location</h5></label>
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
              required
            >
            </GMapAutocomplete>
            <div class="invalid-feedback">Please select a location.</div>
          </div>
        </div>
        <!-- Description -->
        <div class="row mt-3">
          <div class="col-lg-12 col-md-12 col-sm-12">
            <label for="desc" class="form-label"><h5>Event Description</h5></label>
            <textarea
              type="text"
              class="form-control"
              id="desc"
              v-model="desc"
              placeholder="Enter Event Description"
            ></textarea>
          </div>
        </div>
        <!-- Suitability & Category -->
        <div class="row mt-3">
          <div class="col-lg-6 col-md-6 col-sm-6">
            <label for="suitability" class="form-label"><h5>Suitability</h5></label>
            <select
              class="form-select"
              aria-label="Default select example"
              id="suitability"
              v-model="suitability"
              required
            >
              <option selected value="First Timers">First Timers</option>
              <option value="Seniors">Seniors</option>
              <option value="Family Friendly">Family Friendly</option>
              <option value="Open to All">Open to All</option>
              <option value="Organisations">Organisations</option>
              <option value="Group">Group</option>
            </select>
            <div class="invalid-feedback">Please select a suitability.</div>
          </div>
          <!-- Category -->
          <div class="col-lg-6 col-md-6 col-sm-6">
            <label for="category" class="form-label"><h5>Category</h5></label>
            <select
              class="form-select"
              aria-label="Default select example"
              id="category"
              v-model="category"
              required
            >
              <option selected value="Tree Planting">Tree Planting</option>
              <option value="Beach Cleanups">Beach Cleanups</option>
              <option value="Community Composting">Community Composting</option>
            </select>
            <div class="invalid-feedback">Please select a category.</div>
          </div>
        </div>
        <!-- Num of Openings & File -->
        <div class="row mt-3">
          <div class="col-lg-6 col-md-6 col-sm-6">
            <label for="openings" class="form-label"><h5>Number of Openings</h5></label>
            <input type="number" class="form-control" id="openings" v-model="openings" min="0" />
            <div class="invalid-feedback">Please declare the openings.</div>
          </div>
          <!-- File -->
          <div class="col-lg-6 col-md-6 col-sm-6">
            <label for="formFileSm" class="form-label"><h5>Thumbnail</h5></label>
            <input
              type="file"
              accept="image/*"
              id="filename"
              name="filename"
              @change="handleFileSelect"
              ref="fileSelectRef"
              class="form-control form-control-sm"
              required
            />
            <div class="invalid-feedback">Please select a thumbnail.</div>
          </div>
        </div>
        <!-- Donations & Budget -->
        <div class="row mt-3">
          <div class="col-lg-6 col-md-6 col-sm-6">
            <label for="donation" class="form-label"><h5>Accept Donations?</h5></label>
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
          <!-- Budget -->
          <div class="col-lg-6 col-md-6 col-sm-6">
            <label for="budget" class="form-label"><h5>Budget</h5></label>
            <input
              type="number"
              class="form-control"
              id="budget"
              v-model="budget"
              min="0"
              placeholder="Enter the Budget"
            />
          </div>
        </div>
        <!-- Submit -->
        <div class="row mt-5">
          <div class="col-lg-12 col-md-12 col-sm-12">
            <button type="submit" class="btn btn-primary w-100">
              <h5 class="m-0">Create Event</h5>
            </button>
          </div>
        </div>
      </div>
    </form>
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

      // Form
      formValidInputs: null,
      formSubmitting: false,
      formError: false,
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
        // console.log("File selected:", this.selectedFile.name)
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

        // console.log("Document written with ID: ", docRef.id)
      } catch (error) {
        console.error("Error adding document: ", error)
      }
    },
    async uploadFileAndCreateEvent() {
      //   console.log(this.date)
      //   console.log(this.startTime)
      //   console.log(this.endTime)
      // console.log(this.getAuthDetails.uid)

      // console.log("Email:", this.email, "Password:", this.password)
      this.formValidInputs = this.$refs.formRef.checkValidity()
      // console.log(this.formValidInputs)
      if (!this.formValidInputs) {
        console.log("Form not submitted!")
        this.formSubmitting = false
        return
      }
      this.formSubmitting = true
      this.formError = false

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

<style scoped>
.form-container {
  width: 100%;
  justify-content: center;
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
</style>
