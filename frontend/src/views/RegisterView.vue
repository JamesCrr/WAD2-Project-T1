<template>
  <h1>Register</h1>

  <form v-on:submit.prevent="handleSubmit">
    <div class="mb-3">
      <label for="email" class="form-label">Email address</label>
      <input
        type="email"
        class="form-control"
        id="email"
        aria-describedby="emailHelp"
        v-model="email"
      />
      <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Password</label>
      <input type="password" class="form-control" id="password" v-model="password" />
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
import { firebase_auth } from "../firebase"

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

    handleSubmit() {
      console.log("Email:", this.email, "Password:", this.password)

      // Call Firebase to sign up
      createUserWithEmailAndPassword(firebase_auth, this.email, this.password)
        .then((userCredential) => {
          // Registered and Signed in
          const user = userCredential.user
          // update Vuex store
          this.m_Login({
            isVolunteer: this.isVolunteer,
            authDetails: user,
          })
          // redirect to home page
          // this.$router.replace({ path: "/" })
          this.$router.push({ path: "/" })
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log("Failed to register, ErrorCode:", errorCode, "Message:", errorMessage)
          // do some user feedback
        })
    },
  },
}
</script>
