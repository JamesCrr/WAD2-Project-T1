<!-- <div class="row mt-4 mb-5">
      <div class="col d-flex justify-content-center align-items-center">
        <GMapMap
          :center="mapcenter"
          :options="mapoptions"
          :zoom="16"
          map-type-id="terrain"
          id="gmap"
          style="width: 30vw; height: 20rem"
        >
          <GMapMarker
            :position="mapmarker.position"
            :clickable="false"
            :draggable="false"
            @click="center = mapmarker.position"
          >
          </GMapMarker>
        </GMapMap>
<GMapInfoWindow>
              <div>I am in info window <MyComponent /></div>
            </GMapInfoWindow> 
</div>
</div> -->
<template>
  <div>
    <!-- volunteer modal -->
    <div class="modal fade" id="volunteerModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5 signup-title">Confirm Sign Up for event?</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-footer signup-footer">
            <button type="button" class="btn btn-secondary cancel" data-bs-dismiss="modal">
              Cancel
            </button>
            <!-- <button type="button" class="btn btn-primary" @click="signup()">
              Confirm Signup
            </button> -->
            <button
              type="button"
              @click="signup()"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#confirmationModal"
            >
              Confirm Signup
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- confirmation modal -->
    <div class="modal fade" id="confirmationModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5 confirm-title">Signup Successful !</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-footer confirm-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="this.$router.replace({ name: 'myevents' })"
            >
              Okay
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- donate modal -->
    <div
      class="modal fade"
      id="exampleModalCenteredScrollable"
      tabindex="-1"
      aria-labelledby="exampleModalCenteredScrollableTitle"
      style="display: none"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalCenteredScrollableTitle">
              {{ organiserDetails.username }}
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <h4 class="donate-text">Choose an amount to donate:</h4>
            <div class="grid-container donation-btn-container">
              <Donate2
                :username="getAuthDetails ? getAuthDetails.uid : ''"
                :eventid="this.eventid"
                class="donate-btn"
              />
              <Donate5
                :username="getAuthDetails ? getAuthDetails.uid : ''"
                :eventid="this.eventid"
                class="donate-btn"
              />
              <Donate10
                :username="getAuthDetails ? getAuthDetails.uid : ''"
                :eventid="this.eventid"
                class="donate-btn"
              />
              <Donate50
                :username="getAuthDetails ? getAuthDetails.uid : ''"
                :eventid="this.eventid"
                class="donate-btn"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Events -->
  <div class="container-fluid px-md-4 px-4" style="margin-top: 5rem; margin-bottom: 5rem">
    <div class="row d-flex justify-content-center mb-3">
      <div class="col-md-6 col-sm-10">
        <img v-bind:src="downloadedUrl" class="w-100 object-fit-contain" alt="" />
      </div>
    </div>

    <!-- First ROw -->
    <div class="row">
      <div class="col-12 col-md-9">
        <!-- Title and Org -->
        <div class="row">
          <div class="col">
            <h3 class="mb-0" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis">
              {{ eventDetails.title }}
            </h3>
            <p class="fs-5">
              by
              <span style="display: inline-block" class="text-primary">{{
                organiserDetails.username
              }}</span>
            </p>
          </div>
        </div>

        <!-- About -->
        <div class="row">
          <div class="col">
            <p>
              {{ eventDetails.desc }}
            </p>
          </div>
        </div>

        <!-- Map -->
        <div class="row mb-3 mb-md-0">
          <div class="col d-flex justify-content-center align-items-center w-100">
            <GMapMap
              :center="mapcenter"
              :options="mapoptions"
              :zoom="16"
              map-type-id="terrain"
              id="gmap"
              class="w-100"
              style="height: 55vh"
            >
              <GMapMarker
                :position="mapmarker.position"
                :clickable="false"
                :draggable="false"
                @click="center = mapmarker.position"
              >
              </GMapMarker>
            </GMapMap>
          </div>
        </div>
      </div>
      <div class="col">
        <h3 class="text-primary">Event Details</h3>
        <div class="row pt-2 pb-3 g-3">
          <div class="p-0 col-1 col-md-2 d-flex justify-content-center align-items-center">
            <BIconCalendar3 class="fs-5" />
          </div>
          <div class="col">
            <p class="mb-0">{{ eventDates.startDateString }}</p>
          </div>
        </div>
        <div class="row pb-3 g-3 d-flex justtify-content-center align-items-center">
          <div class="p-0 col-1 col-md-2 d-flex justify-content-center align-items-center">
            <BIconClock class="fs-5" />
          </div>
          <div class="col">
            <p class="mb-0">{{ eventDates.starTime }} to {{ eventDates.endTime }}</p>
          </div>
        </div>
        <div class="row pb-3 g-3 d-flex justify-content-center align-items-center">
          <div class="p-0 col-1 col-md-2 d-flex justify-content-center align-items-center">
            <BIconPersonFill class="fs-5" />
          </div>
          <div class="col">
            <p class="mb-0">Suitable for: {{ eventDetails.suitability }}</p>
          </div>
        </div>
        <div class="row pb-3 g-3 d-flex justify-content-center align-items-center">
          <div class="p-0 col-1 col-md-2 d-flex justify-content-center align-items-center">
            <BIconGeoAltFill class="fs-5" />
          </div>
          <div class="col">
            <p class="mb-0">
              {{ eventDetails.location ? eventDetails.location.address : "" }}
            </p>
          </div>
        </div>
        <h3 class="mt-2 mb-3 text-primary">Contact</h3>
        <div class="row pb-3 g-3 d-flex justify-content-center align-items-center">
          <div class="p-0 col-1 col-md-2 d-flex justify-content-center align-items-center">
            <BIconTelephoneFill class="fs-5" />
          </div>
          <div class="col">
            <p class="mb-0">{{ organiserDetails.contactNumber }}</p>
          </div>
        </div>
        <div class="row pb-3 g-3 d-flex justify-content-center align-items-center">
          <div class="p-0 col-1 col-md-2 d-flex justify-content-center align-items-center">
            <BIconEnvelopeFill class="fs-5" />
          </div>
          <div class="col">
            <p class="mb-0">{{ organiserDetails.email }}</p>
          </div>
        </div>
        <div class="row pb-2">
          <div class="col">
            <button class="btn btn-primary" v-on:click="chatWithOrg">Chat with Us</button>
          </div>
        </div>

        <h3 class="mt-3 mb-2 text-primary">Take Action!</h3>
        <div class="row pb-0" v-if="!signedUpAlready">
          <div class="col">
            <p class="text-center fs-7 m-0">
              Sign up before {{ eventDates.startDateString }} {{ eventDates.starTime }}
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <button
              type="button"
              class="btn w-100"
              :class="{ 'btn-primary': !signedUpAlready, 'btn-secondary': signedUpAlready }"
              data-bs-toggle="modal"
              data-bs-target="#volunteerModal"
              v-bind:disabled="signedUpAlready"
            >
              {{ this.signedUpAlready ? "Already Signed Up" : "Volunteer Now!" }}
            </button>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col">
            <button
              type="button"
              class="btn btn-warning modal-button w-100"
              data-bs-toggle="modal"
              data-bs-target="#exampleModalCenteredScrollable"
              v-if="this.eventDetails.selectedDonation"
            >
              Donate!
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Second Row when Mobile -->
    <div class="row d-block d-md-none mt-3">
      <div class="col-12 col-md-8">
        <!-- Map -->
        <!-- <div class="col d-flex justify-content-center align-items-center w-100">
          <GMapMap
            :center="mapcenter"
            :options="mapoptions"
            :zoom="16"
            map-type-id="terrain"
            id="gmap"
            class="w-100"
            style="height: 50vh"
          >
            <GMapMarker
              :position="mapmarker.position"
              :clickable="false"
              :draggable="false"
              @click="center = mapmarker.position"
            >
            </GMapMarker>
          </GMapMap>
        </div> -->
      </div>
      <div class="col"></div>
    </div>
  </div>

  <!-- <div class="container-fluid" style="margin-top: 74px">
    <div class="row">
      <div class="col-md-8 col-sm-12" style="padding: 0">
        <img v-bind:src="downloadedUrl" class="w-100 object-fit-fill" alt="" />
      </div>
      <div class="col-md-4 col-sm-12">
        <h3 class="mb-0" style="font-weight: bold; padding-top: 13px; padding-bottom: 10px">
          {{ eventDetails.title }}
        </h3>
        <p class="fs-5">
          by
          <span style="display: inline-block" class="text-primary">{{
            organiserDetails.username
          }}</span>
        </p>

        <div
          class="header mb-3"
          style="background-color: pink; padding-left: 5px; padding-top: 10px; padding-bottom: 2px"
        >
          <h4>Details</h4>
        </div>
        <div class="row pt-3 g-3 pb-3">
          <div class="col-2 d-flex justify-content-center align-items-center">
            <BIconCalendar3 class="fs-5" />
          </div>
          <div class="col" style="font-size: larger">{{ eventDates.startDateString }}</div>
        </div>
        <div class="row pt-3 g-3 pb-3">
          <div class="col-2 d-flex justify-content-center align-items-center">
            <BIconClock class="fs-5" />
          </div>
          <div class="col" style="font-size: larger">
            {{ eventDates.starTime }} to {{ eventDates.endTime }}
          </div>
        </div>
        <div class="row pt-3 g-3 pb-3">
          <div class="col-2 d-flex justify-content-center align-items-center">
            <BIconPersonFill class="fs-5" />
          </div>
          <div class="col" style="font-size: larger">
            Suitable for: {{ eventDetails.suitability }}
          </div>
        </div>
        <div class="row pt-3 g-3">
          <div class="col-2 d-flex justify-content-center align-items-center">
            <BIconGeoAltFill class="fs-5" />
          </div>
          <div class="col">
            <div class="row">
              <p class="col-12 mb-0" style="font-size: larger">
                {{ eventDetails.location ? eventDetails.location.address : "" }}
              </p>
            </div>
          </div>
        </div>

        <div class="row mt-4 mb-4">
          <div class="col d-flex justify-content-center align-items-center">
            <GMapMap
              :center="mapcenter"
              :options="mapoptions"
              :zoom="16"
              map-type-id="terrain"
              id="gmap"
              style="width: 30vw; height: 20rem"
            >
              <GMapMarker
                :position="mapmarker.position"
                :clickable="false"
                :draggable="false"
                @click="center = mapmarker.position"
              >
              </GMapMarker>
            </GMapMap>
          </div>
        </div>

        <div class="row pt-2 pb-0">
          <p class="fw-bold text-center mb-1 fs-7">
            Sign up before {{ eventDates.startDateString }} {{ eventDates.starTime }}
          </p>
        </div>
        <div class="d-grid gap-2 m-4">
          <button
            type="button"
            class="btn"
            :class="{ 'btn-primary': !signedUpAlready, 'btn-secondary': signedUpAlready }"
            data-bs-toggle="modal"
            data-bs-target="#volunteerModal"
            v-bind:disabled="signedUpAlready"
          >
            {{ this.signedUpAlready ? "Already Signed Up" : "Volunteer Now!" }}
          </button>
          <button
            type="button"
            class="btn btn-warning modal-button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModalCenteredScrollable"
            v-if="this.eventDetails.selectedDonation"
          >
            Donate!
          </button>
        </div>
      </div>
    </div>

    <div class="row mt-4" style="margin-bottom: 20vh">
      <div class="col-md-8 col-sm-12">
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
          <div class="col" style="font-size: larger">{{ organiserDetails.contactNumber }}</div>
        </div>
        <div class="row pt-3">
          <div class="col-2">
            <BIconEnvelopeFill />
          </div>
          <div class="col" style="font-size: larger">{{ organiserDetails.email }}</div>
        </div>
        <div class="row pt-3">
          <div class="col">
            <button class="btn btn-primary" v-on:click="chatWithOrg">Chat with Us</button>
          </div>
        </div>
      </div>
    </div>
  </div> -->
</template>

<script>
import {
  BIconCalendar3,
  BIconClock,
  BIconPersonFill,
  BIconGeoAltFill,
  BIconTelephoneFill,
  BIconEnvelopeFill,
} from "bootstrap-icons-vue"
import { mapState, mapMutations, mapActions, mapGetters } from "vuex"
import { firebase_firestore, firebase_storage, firebase_auth } from "../firebase"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { Firestore, doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore"
import { ref, getDownloadURL } from "firebase/storage"
import Donate2 from "../components/Donate2.vue"
import Donate5 from "../components/Donate5.vue"
import Donate10 from "../components/Donate10.vue"
import Donate50 from "../components/Donate50.vue"

export default {
  data() {
    return {
      eventid: "",
      eventDetails: {},
      eventDates: {},
      organiserRef: null,
      organiserDetails: {},
      downloadedUrl: null,

      // Google Map API
      mapmarker: {
        position: {
          lat: 51.093048,
          lng: 6.84212,
        },
      },
      mapcenter: { lat: 51.093048, lng: 6.84212 },
      mapoptions: {
        styles: [],
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: false,
        fullscreenControl: false,
      },
    }
  },
  components: {
    BIconCalendar3,
    BIconClock,
    BIconPersonFill,
    BIconGeoAltFill,
    BIconTelephoneFill,
    BIconEnvelopeFill,
    Donate2,
    Donate5,
    Donate10,
    Donate50,
  },

  computed: {
    ...mapGetters("auth", ["getAccountRef", "getAccountDetails", "getAuthDetails"]),
    ...mapGetters("chat", ["getChatWindowOpenRequest"]),

    /**
     * Helper function to check if the user has already signed up for the event
     */
    signedUpAlready() {
      if (!this.eventDetails.signups || !this.getAuthDetails) return true
      return this.eventDetails.signups.includes(this.getAuthDetails.uid)
    },
  },
  methods: {
    ...mapMutations("chat", ["m_AddNewChat_Locally", "m_SetChatWindowRequest"]),

    /**
     * Prepares new chat with org
     * - Updates Local Vuex store only
     * - Updating of Firebase is only done once message is sent
     */
    chatWithOrg() {
      const payload = {
        organisationDocRef: this.organiserRef,
        organisationUsername: this.organiserDetails.username,
        volunteerDocRef: this.getAccountRef,
        volunteerUsername: this.getAccountDetails.username,
        chatID: `${this.organiserDetails.username}-${this.getAccountDetails.username}`,
      }
      // console.log(this.organiserDetails)
      // console.log(payload)
      this.m_SetChatWindowRequest(true)
      this.m_AddNewChat_Locally(payload)
    },

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

    /**
     * Fetches details from Firebase Firestore
     */
    async async_FetchDetails() {
      // Fetch the Event data from firebase
      let docRef = doc(firebase_firestore, "events", this.$route.params.id)
      try {
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          this.eventid = docSnap.id
          this.eventDetails = { id: docSnap.id, ...docSnap.data() }
        } else {
          console.log("No such document!")
        }
      } catch (error) {
        console.log("Event Doc Fetch Error!", error)
      }

      // console.log(this.eventDetails)
      // console.log(this.$route.params.id)
      // console.log(fakeData.data)

      // Convert the date into an object
      let dateObj = new Date(this.eventDetails.date)
      let options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
      this.eventDates = {
        startDateString: dateObj.toLocaleDateString("en-US", options),
        starTime: this.convertTo12HourFormat(this.eventDetails.startTime),
        endTime: this.convertTo12HourFormat(this.eventDetails.endTime),
      }

      // Update the map marker
      this.mapmarker.position.lat = this.eventDetails.location.lat
      this.mapmarker.position.lng = this.eventDetails.location.lng
      this.mapcenter.lat = this.eventDetails.location.lat
      this.mapcenter.lng = this.eventDetails.location.lng

      // Fetch the image from firestore
      const imageRef = ref(firebase_storage, `posts/${this.eventDetails.imageUrl}`)
      const downloadedUrl = await getDownloadURL(imageRef)
      this.downloadedUrl = downloadedUrl

      // Fetch the Organiser data from firebase
      try {
        let docSnap = await getDoc(this.eventDetails.organiserRef)
        if (docSnap.exists()) {
          this.organiserRef = this.eventDetails.organiserRef
          this.organiserDetails = { id: docSnap.id, ...docSnap.data() }
        } else {
          console.log("No such document!")
        }
      } catch (error) {
        console.log("Organiser Doc Fetch Error!", error)
      }
    },

    async signup() {
      const eventRef = doc(firebase_firestore, "events", this.$route.params.id)

      // Atomically add a new userID to the "signups" array field.
      await updateDoc(eventRef, {
        signups: arrayUnion(this.getAuthDetails.uid),
      })
    },

    // async getUserID() {
    //   const auth = getAuth()
    //   onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //       this.userID = user.uid
    //     }
    //   })
    // },
  },

  mounted() {
    this.async_FetchDetails()
    // this.getUserID()
  },
}
</script>

<style scoped>
/* @media (min-width: 576px) { 
    .gmap{
      padding: 0;
    }
  } */

/* content */

.content {
  position: absolute;
  width: 100%;
  padding-left: 3rem;
  padding-right: 3rem;
  top: 7rem;
}

/* modal */
.signup-title,
.confirm-title {
  width: 100%;
  text-align: center;
  padding-left: 1.5rem;
}
.signup-footer {
  display: grid;
  grid-template-columns: 180px 180px;
  gap: 1.5rem;
  justify-content: center;
}
.confirm-footer {
  display: grid;
  justify-content: center;
}

.donation-btn-container {
  display: grid;
  grid-template-columns: 4rem 4rem 4rem 4rem;
  gap: 2rem;
  justify-content: center;
  padding: 2rem;
}
.modal-title {
  width: 100%;
  text-align: center;
}
.modal-body {
  text-align: center;
}
</style>
