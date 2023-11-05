<template>
  <div class="container-fluid navbarspace">
    <div class="row g-0 ms-3 mt-5 neweventrow">
      <div class="col">
        <h3>{{ eventData ? eventData.title : "" }}</h3>
      </div>
    </div>

    <div v-if="isLoading" class="ms-3">
      <div class="row pt-2">
        <div class="col" v-for="index in placeholderCount" :key="index"></div>
      </div>
    </div>
    <div v-else class="ms-4">
      <div
        class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 pt-1 mw-100"
        style="margin-bottom: 10vh"
      >
        <table class="table table-light table-hover">
          <thead class="table-primary">
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Contact Number</th>
              <th scope="col">Age</th>
              <th scope="col">Email</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-if="eventParticipants.length > 0"
              v-for="(person, index) in eventParticipants"
              :key="person.id"
            >
              <td>{{ person.username }}</td>
              <td>{{ person.contactNumber }}</td>
              <td>{{ person.age }}</td>
              <td>{{ person.email }}</td>
              <td>
                <button v-on:click="async_RemoveParticipant(person.id)" class="btn btn-danger">
                  Remove
                </button>
              </td>
            </tr>
            <tr v-else>
              <td colspan="5" class="text-center" style="color: gray; opacity: 0.9">
                No participants yet :(
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router"
import { collection, query, where, updateDoc, doc, getDoc, getDocs } from "firebase/firestore"
import { firebase_firestore } from "../firebase"
import { mapGetters } from "vuex"
import { gsap } from "gsap"

export default {
  data() {
    return {
      isLoading: false,
      eventData: null,
      eventParticipants: [],
      eventRef: null,
    }
  },
  created() {
    this.$nextTick(() => {
      this.async_FetchEventDetails()
    })
  },
  computed: {
    ...mapGetters("auth", ["getAuthDetails", "getAccountDetails"]),
  },
  methods: {
    async async_FetchEventDetails() {
      const eventID = this.$route.params.id
      // console.log(eventID)

      // Fetch from firebase
      const docRef = doc(firebase_firestore, "events", eventID)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data())
        // Update local fields to reflect data
        this.eventData = docSnap.data()
        this.eventRef = docRef
      } else {
        // docSnap.data() will be undefined in this case
        console.error("No such document!")
        return
      }
      // console.log(this.eventData)

      // Get all the participants that belong to this event
      const accRef = collection(firebase_firestore, "accounts")
      const accQuery = query(accRef, where("type", "==", "volunteer"))
      const querySnapshot = await getDocs(accQuery)
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data())
        if (this.eventData.signups.includes(doc.id)) {
          this.eventParticipants.push({ id: doc.id, ...doc.data() })
        }
      })
    },

    async async_RemoveParticipant(idToRemove) {
      if (!this.eventRef) return

      const newParticipants = this.eventParticipants.filter((obj) => {
        return obj.id !== idToRemove
      })

      // remove from firestore
      try {
        await updateDoc(this.eventRef, {
          signups: newParticipants.map((obj) => {
            return obj.id
          }),
        })
      } catch (error) {
        console.log(error)
        return
      }

      // remove locally
      this.eventParticipants = newParticipants
    },
  },
}
</script>

<style scoped>
@media (max-width: 992px) {
  .neweventrow {
    margin-top: 110px !important;
  }
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

.link-text {
  text-decoration: none;
  color: white;
}
.bi-plus-circle {
  font-size: 1rem;
  margin-left: 0.5rem;
  margin-right: 0.25rem;
}
/* .grid-container {
  display: grid;
  justify-content: space-evenly;
  grid-template-columns: 45% 45%;
  gap: 1rem;
  vertical-align: bottom;
} 
 .card {
  height: 100%;
} */

.card-text {
  height: 72px;
  overflow: hidden;
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
