<template>
  <h1>Register</h1>

  <form v-on:submit.prevent="handleSubmit">
    <div class="mb-3">
      <label for="email" class="form-label">Email address</label>
      <input
        type="email"
        autocomplete="email"
        class="form-control"
        id="email"
        aria-describedby="emailHelp"
        v-model="email"
      />
      <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div class="mb-3">
      <label for="name" class="form-label">Name</label>
      <input type="text" autocomplete="name" class="form-control" id="name" v-model="name" />
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Password</label>
      <input
        type="password"
        autocomplete="new-password"
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
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { firebase_firestore, firebase_auth } from "../firebase"

export default {
  data() {
    return {
      email: "",
      password: "",
      name: "",
      isVolunteer: true,
    }
  },

  methods: {
    ...mapMutations("auth", ["m_Login", "m_Logout"]),

    async handleSubmit() {
      console.log("Email:", this.email, "Password:", this.password, "Name:", this.name)

      console.log("Paused Registration!")
      return

      try {
        // Call Firebase to sign up
        const userCredential = await createUserWithEmailAndPassword(
          firebase_auth,
          this.email,
          this.password,
        )
        // Registered and Signed in
        const user = userCredential.user

        // Send new account's data to firestore
        const accountDetails = {
          email: this.email,
          name: this.name,
          type: this.isVolunteer ? "volunteer" : "organisation",
        }
        // Add a new account document in collection "accounts"
        await setDoc(doc(firebase_firestore, "accounts", user.uid), accountDetails)
        console.log("New Account Registered!")

        // update Vuex store
        this.m_Login({
          isVolunteer: this.isVolunteer,
          authDetails: user,
          accountDetails,
        })
        // redirect to home page
        // this.$router.replace({ path: "/" })
        this.$router.push({ path: "/" })
      } catch (error) {
        const errorCode = error.code
        const errorMessage = error.message
        console.log("Failed to register, ErrorCode:", errorCode, "Message:", errorMessage)
        // do some user feedback
      }
    },
  },
}
</script>
