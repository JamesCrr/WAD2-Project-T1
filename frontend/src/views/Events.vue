<template>
  <div class="container-fluid">
    <!-- Navbar start -->
    <!-- <div class="row">
      <nav class="navbar navbar-expand-md bg-maincolor">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">EcoConnect</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" href="/volunteer">Volunteer Now!</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="#">Login</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="#">Sign Up</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div> -->
    <!-- Navbar end -->

    <!-- Events description start -->
    <div class="row pt-3">
      <div class="col-md-8 col-sm-12">
        <img v-bind:src="eventDetails.imageUrl" class="h-100 w-100 object-fit-contain" alt="" />
      </div>
      <div class="col-md-4 col-sm-12">
        <h3 class="mb-0">{{ eventDetails.title }}</h3>
        <p>
          by <span style="display: inline-block">{{ organiserDetails.username }}</span>
        </p>

        <div class="row pt-3 g-3">
          <div class="col-2 d-flex justify-content-center align-items-center">
            <BIconCalendar3 class="fs-5" />
          </div>
          <div class="col">{{ eventDates.startDateString }}</div>
        </div>
        <div class="row pt-3 g-3">
          <div class="col-2 d-flex justify-content-center align-items-center">
            <BIconClock class="fs-5" />
          </div>
          <div class="col">{{ eventDates.starTime }} to {{ eventDates.endTime }}</div>
        </div>
        <div class="row pt-3 g-3">
          <div class="col-2 d-flex justify-content-center align-items-center">
            <BIconGeoAltFill class="fs-5" />
          </div>
          <div class="col">
            <div class="row">
              <!-- <div class="col-12">East Coast Park</div> -->
              <p class="col-12 fw-light mb-0" style="font-size: smaller">
                {{ eventDetails.location }}
              </p>
            </div>
          </div>
        </div>
        <div class="row pt-3 g-3">
          <div class="col-2 d-flex justify-content-center align-items-center">
            <BIconPersonFill class="fs-5" />
          </div>
          <div class="col">Suitable for: XXXXX</div>
        </div>

        <div class="row pt-5 pb-0">
          <p class="fw-bold text-center mb-1 fs-7">Sign up before XXXXXX, XXXpm</p>
        </div>
        <div class="d-grid gap-2">
          <button type="button" class="btn btn-primary">Volunteer Now!</button>
          <button type="button" class="btn btn-secondary">Donate</button>
        </div>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-md-8 col-sm-12" style="min-height: 40vh">
        <h2>About the Activity</h2>
        <p>
          {{ eventDetails.desc }}
        </p>
      </div>
      <div class="col-md-4 col-sm-12">
        <div class="row">
          <h2>Contact Us</h2>
        </div>
        <div class="row">
          <div class="col-2">
            <BIconTelephoneFill />
          </div>
          <div class="col">{{ organiserDetails.contactnumber }}</div>
        </div>
        <div class="row">
          <div class="col-2">
            <BIconEnvelopeFill />
          </div>
          <div class="col">{{ organiserDetails.email }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fakeData from "../store/fake.json"
import {
  BIconCalendar3,
  BIconClock,
  BIconPersonFill,
  BIconGeoAltFill,
  BIconTelephoneFill,
  BIconEnvelopeFill,
} from "bootstrap-icons-vue"
import { doc, updateDoc, setDoc, getDoc } from "firebase/firestore"
import { firebase_firestore } from "../firebase"

export default {
  data() {
    return {
      eventID: "",
      eventDetails: {},
      eventDates: {},
      organiserDetails: {},
    }
  },
  methods: {
    convertTo12HourFormat(time24) {
      // Split the time string into hours and minutes
      const [hours, minutes] = time24.split(":").map(Number)

      // Determine if it's AM or PM
      const period = hours < 12 ? "AM" : "PM"

      // Convert hours to 12-hour format
      const hours12 = hours % 12 || 12 // 0 should be converted to 12

      // Create the 12-hour formatted string
      const time12 = `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`

      // console.log(hours, minutes, hours12, time12)
      return time12
    },

    async async_FetchDetails() {
      // Fetch the Event data from firebase
      this.eventDetails = fakeData.data[this.eventID / 1000 - 1]
      // console.log(this.eventDetails)
      // console.log(this.eventID)
      // console.log(fakeData.data)

      // Convert the date into an object
      let dateObj = new Date(this.eventDetails.date)
      let options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
      this.eventDates = {
        startDateString: dateObj.toLocaleDateString("en-US", options),
        starTime: this.convertTo12HourFormat(this.eventDetails.startTime),
        endTime: this.convertTo12HourFormat(this.eventDetails.endTime),
      }

      // Fetch the Organiser data from firebase
      const refArray = this.eventDetails.organiserRef.split("/")
      const TEMPREFID = refArray[refArray.length - 1]

      // console.log(refArray, TEMPREFID)
      let docRef = await doc(firebase_firestore, "accounts", TEMPREFID)
      let docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        let data = docSnap.data()
        // console.log(data)
        this.organiserDetails = data
      } else {
        console.log("No such document!")
      }
    },
  },
  components: {
    BIconCalendar3,
    BIconClock,
    BIconPersonFill,
    BIconGeoAltFill,

    BIconTelephoneFill,
    BIconEnvelopeFill,
  },

  created() {
    this.eventID = this.$route.params.id
    this.async_FetchDetails()
  },
}
</script>
