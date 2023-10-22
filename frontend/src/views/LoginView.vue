<template>
  <div class="container-fluid">
    <div class="row g-0 justify-content-center">
      <div class="col-11 position-absolute bg-primary h-50 z-n1 rounded"></div>
    </div>
    <div class="row g-0 justify-content-center">
      <div class="col-6">
        <h1>Login</h1>

        <form v-on:submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input
              type="email"
              class="form-control"
              autocomplete="email"
              id="email"
              aria-describedby="emailHelp"
              v-model="email"
            />
            <div id="emailHelp" class="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              autocomplete="current-password"
              class="form-control"
              id="password"
              v-model="password"
            />
          </div>
          <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
              checked
              v-model="isVolunteer"
            />
            <label class="form-check-label" for="exampleCheck1">Volunteer</label>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from "vuex"
import { signInWithEmailAndPassword } from "firebase/auth"
import { collection, doc, getDoc } from "firebase/firestore"
import { firebase_firestore, firebase_auth } from "../firebase"

export default {
  data() {
    return {
      email: "",
      password: "",
      isVolunteer: true,
    }
  },

  methods: {
    ...mapMutations("auth", ["m_Login", "m_Logout"]),
    ...mapMutations("chat", ["m_initChats"]),
    ...mapActions("socket", ["a_InitializeSocket"]),

    async handleSubmit() {
      console.log("Email:", this.email, "Password:", this.password)

      try {
        // Call Firebase and verify
        const userCredential = await signInWithEmailAndPassword(
          firebase_auth,
          this.email,
          this.password,
        )
        // Signed in Success
        const user = userCredential.user
        // console.log("USER:", user)

        // Fetch all the account's data from firestore
        let docRef = doc(firebase_firestore, "accounts", user.uid)
        let docSnap = await getDoc(docRef)
        let accountDetails = null
        if (docSnap.exists()) {
          // console.log("Account data:", docSnap.data())
          accountDetails = docSnap.data()
        } else {
          console.log("Account Doc Fetch: No such account document!")
          return
        }

        // update Vuex store
        this.m_Login({
          isVolunteer: this.isVolunteer,
          authDetails: user,
          accountDetails,
        })

        // Fetch all the chats related to this account
        const newChats = {}
        for (let chatID of accountDetails.chats) {
          docRef = doc(firebase_firestore, "chats", chatID)
          docSnap = await getDoc(docRef)

          if (docSnap.exists()) {
            const data = docSnap.data()
            // console.log("Document data:", data)
            newChats[chatID] = data
          } else {
            console.log("Chat Doc Fetch: No such document!")
          }
        }
        // update Vuex store
        this.m_initChats(newChats)
        // console.log(newChats)

        // Register SocketIO
        const URL =
          process.env.NODE_ENV === "production" ? "YOUR SERVER URL HERE" : "http://localhost:3000"
        this.a_InitializeSocket({ URL, myUsername: accountDetails.username })

        //// redirect to home page
        // this.$router.replace({ path: "/" })
        this.$router.push({ path: "/" })
      } catch (error) {
        const errorCode = error.code
        const errorMessage = error.message
        console.log("Failed to sign in, ErrorCode:", errorCode, "Message:", errorMessage)
        // do some user feedback
      }
    },
  },
}
</script>
