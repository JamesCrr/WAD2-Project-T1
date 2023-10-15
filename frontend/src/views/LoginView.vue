<template>
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
      <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
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
</template>

<script>
import { mapMutations } from "vuex"
import { signInWithEmailAndPassword } from "firebase/auth"
import { collection, doc, setDoc, getDoc } from "firebase/firestore"
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
        console.log("USER:", user)

        // Fetch all the account's data from firestore
        const docRef = doc(firebase_firestore, "accounts", user.uid)
        const docSnap = await getDoc(docRef)
        let accountDetails = null
        if (docSnap.exists()) {
          console.log("Account data:", docSnap.data())
          accountDetails = docSnap.data()
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such account document!")
          return
        }

        // update Vuex store
        this.m_Login({
          isVolunteer: this.isVolunteer,
          authDetails: user,
          accountDetails,
        })
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
