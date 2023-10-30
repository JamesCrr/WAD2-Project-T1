<template>
  <div class="container-fluid">
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
              <Donate2 class="donate-btn" />
              <Donate5 class="donate-btn" />
              <Donate10 class="donate-btn" />
              <Donate50 class="donate-btn" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Events description start -->
    <div class="row pt-3">
      <div class="col-md-8 col-sm-12" style="padding: 0;">
        <img v-bind:src="downloadedUrl" class="w-100 object-fit-fill" alt="" />
      </div>
      <div class="col-md-4 col-sm-12" style="background-color: bisque;">
        <h3 class="mb-0" style="font-weight: bold; padding-bottom: 10px;">{{ eventDetails.title }}</h3>
        <p>
          by <span style="display: inline-block">{{ organiserDetails.username }}</span>
        </p>

        <div class="header mb-3" style="background-color: pink; padding-left: 5px; padding-top: 10px; padding-bottom: 2px;">
            <h4>Details</h4>
        </div>
        <div class="row pt-3 g-3 pb-3">
          <div class="col-2 d-flex justify-content-center align-items-center" >
            <BIconCalendar3 class="fs-5" />
          </div>
          <div class="col" style="font-size: larger">{{ eventDates.startDateString }}</div>
        </div>
        <div class="row pt-3 g-3 pb-3">
          <div class="col-2 d-flex justify-content-center align-items-center">
            <BIconClock class="fs-5" />
          </div>
          <div class="col" style="font-size: larger">{{ eventDates.starTime }} to {{ eventDates.endTime }}</div>
        </div>
        <div class="row pt-3 g-3 pb-3">
          <div class="col-2 d-flex justify-content-center align-items-center">
            <BIconPersonFill class="fs-5" />
          </div>
          <div class="col" style="font-size: larger">Suitable for: {{ eventDetails.suitability }}</div>
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
        

        <!-- <div class="header" style="background-color: pink; padding-left: 5px; padding-top: 10px; padding-bottom: 2px;">
            <h4>Venue</h4>
        </div> -->
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
            <!-- <GMapInfoWindow>
                  <div>I am in info window <MyComponent /></div>
                </GMapInfoWindow> -->
          </div>
        </div>

        <div class="row pt-2 pb-0">
          <p class="fw-bold text-center mb-1 fs-7" >Sign up before {{ eventDates.startDateString }} {{ eventDates.starTime }}</p>
        </div>
        <div class="d-grid gap-2">
          <button type="button" class="btn btn-primary">Volunteer Now!</button>
          <button
            type="button"
            class="btn btn-warning modal-button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModalCenteredScrollable"
          >
            Donate!
          </button>
        </div>
      </div>
    </div>

    <div class="row mt-4">
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
        </GMapMap> -->
        <!-- <GMapInfoWindow>
              <div>I am in info window <MyComponent /></div>
            </GMapInfoWindow> -->
      <!-- </div> -->
    <!-- </div> -->
  </div>
</template>

<style scoped>
  /* @media (min-width: 576px) { 
    .gmap{
      padding: 0;
    }
  } */
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
import { firebase_firestore, firebase_storage } from "../firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { ref, getDownloadURL } from "firebase/storage"
import Donate2 from "../components/Donate2.vue"
import Donate5 from "../components/Donate5.vue"
import Donate10 from "../components/Donate10.vue"
import Donate50 from "../components/Donate50.vue"

export default {
  data() {
    return {
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
    ...mapGetters("auth", ["getAccountRef", "getAccountDetails"]),
    ...mapGetters("chat", ["getChatWindowOpenRequest"]),
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

    async async_FetchDetails() {
      // Fetch the Event data from firebase
      let docRef = doc(firebase_firestore, "events", this.$route.params.id)
      try {
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          this.eventDetails = docSnap.data()
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
  },

  mounted() {
    this.async_FetchDetails()
  },
}
</script>
