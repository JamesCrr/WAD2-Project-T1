<template>
  <!-- content -->
  <div class="container-fluid p-0">
    <div class="row">
      <router-link v-for="event of events" v-bind:to="'/events/' + event.id" :key="event.id">
        {{ event.id }}
      </router-link>
    </div>
  
    <div class="row">
      <div class="video-wrap">
        <video autoplay="" loop="" muted="" class="custom-video" poster="">
            <source src="../assets/WADII.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
      </div>
      <img src="https://static.wixstatic.com/media/3ecde9_a13d7ce172b6448396516afcfb7a2fa0~mv2.gif" alt="" style="width: 100%; height: 54px; object-fit: cover;" width="980" height="54" fetchpriority="high">
    </div>
    
    <div class="row" style="background-color: white; margin: 0; position: relative;">
      <div class="img-div col-lg-5 col-md-5 col-sm-12">
        <img class="img-info" src="../assets/home/about-us.jpg" alt="">
      </div>
      <div class="col-lg-7 col-md-7 col-sm-12 p-5 about-us">
        <h2> About us</h2>
        <p>At EcoConnect, we are driven by a shared passion for our planet and a collective belief in the power of
          environmental action. In the face of pressing environmental challenges, we bridge the gap between local
          green initiatives and the individuals eager to make a difference.</p>
      </div>
    </div>

    <div class="row mission" style="background-color: pink; margin: 0;">
      <div class="img-div col-lg-5 col-md-5 col-sm-12 order-lg-2 order-md-2">
        <img class="img-info" src="../assets/home/mission.jpg" alt="">
      </div>
      <div class="col-lg-7 col-md-7 col-sm-12 p-5 order-lg-1 order-md-1">
        <h2>Our mission</h2>
        <p>
          Our goal is to empower local organizers and eco-conscious individuals. We provide a platform to boost their impact, 
          reach a wider audience, and create a strong community. At the same time, we connect green-minded people with meaningful 
          opportunities to volunteer, contribute, and embrace eco-friendly actions. Join us for a greener world.
        </p>
      </div>
    </div>

    <div class="row volunteer" style="background-color: white; margin: 0;">
      <div class="img-div col-lg-5 col-md-5 col-sm-12">
        <img class="img-info" src="../assets/home/join-us.jpg" alt="">
      </div>
      <div class="col-lg-7 col-md-7 col-sm-12 p-5">
        <h2>Volunteer now</h2>
        <p>Join EcoConnect in our mission for a greener world. Let's turn passion into action and make a difference. 
          Join us today for a sustainable future.</p>
        <button type="button" class="btn btn-primary">Volunteer Now!</button>
      </div>
    </div>
  </div>
  <!-- <div style="float: right">
    <p v-for="index in 100" :key="index">{{ index }}</p>
  </div> -->
</template>

<script>
import { firebase_firestore, firebase_storage } from "../firebase"
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore"
import { ref, getDownloadURL } from "firebase/storage"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default {
  data() {
    return {
      events: [],
    }
  },
  created() {
    this.fetchEvents()
  },
  computed: {},
  methods: {
    async fetchEvents() {
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
  },
  // mounted() {
  //   this.$nextTick(() => {
  //     gsap.to(".about-us", {
  //       left: '0%',
  //       duration: 5,
  //       scrollTrigger: {
  //         trigger: ".about-us",
  //         markers: true,
  //       },
  //     });
  //   });
  // }
}
</script>

<style scoped>
.video-wrap {
    position: relative;
    overflow: hidden;
    max-width: 100%;
    max-height: 600px;
}

.custom-video {
  width: 100%;
  height: auto;
  display: block;
}

.img-info {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.img-div {
  padding: 0;
}
/* 
.about-us {
  position: absolute;
  left: 100%;
} */
</style>
