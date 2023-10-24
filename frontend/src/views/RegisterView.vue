<template>
  <div class="container-fluid">
    <div class="row g-0 justify-content-center">
      <div class="col-11 position-absolute bg-primary h-50 z-n1 rounded"></div>
    </div>
    <div class="row g-0 justify-content-center mt-4">
      <h2 class="text-light text-center mb-4">Sign up with us!</h2>
    </div>
    <div class="row g-0 justify-content-center">
      <div class="col-11 col-sm-6 p-4 bg-light rounded">
        <form
          class="needs-validation"
          v-bind:class="{ 'was-validated': !formValid }"
          v-on:submit.prevent="handleFirebaseRegistration"
          novalidate=""
          ref="formRef"
        >
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input
              type="text"
              autocomplete="name"
              class="form-control"
              id="username"
              v-model="username"
              placeholder="Username"
              style="font-size: 0.8rem"
              required
            />
            <div class="invalid-feedback">Please enter a username.</div>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input
              type="email"
              autocomplete="email"
              class="form-control"
              id="email"
              aria-describedby="emailHelp"
              v-model="email"
              placeholder="@mail.com"
              style="font-size: 0.8rem"
              required
            />
            <div class="invalid-feedback">Please provide a valid email.</div>
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              autocomplete="new-password"
              class="form-control"
              id="password"
              v-model="password"
              placeholder="Password"
              style="font-size: 0.8rem"
              required
              minlength="6"
            />
            <div class="invalid-feedback">Please provide password with at least 6 characters.</div>
          </div>

          <div class="d-flex justify-content-center mt-3">
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                v-model="isVolunteer"
                checked
              />
              <label class="form-check-label" for="flexSwitchCheckDefault">Volunteer</label>
            </div>
          </div>

          <div class="d-grid mt-5">
            <button type="submit" class="btn btn-primary">Register</button>
          </div>
          <div class="row">
            <div class="col text-center mt-1">
              <p class="fs-6">
                Already have an account?
                <label
                  class="text-primary"
                  v-on:click="$router.push({ path: '/login' })"
                  style="cursor: pointer"
                  >Sign In</label
                >
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
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
      username: "",
      isVolunteer: true,

      formValid: true,
    }
  },

  methods: {
    ...mapMutations("auth", ["m_Login", "m_Logout"]),

    /**
     * Sends Registration Reques to Firebase and if successful, redirect to home page
     */
    async handleFirebaseRegistration(event) {
      console.log("Email:", this.email, "Password:", this.password, "Username:", this.username)

      // console.log(event, this.$refs.formRef.checkValidity())
      this.formValid = this.$refs.formRef.checkValidity()
      if (!this.formValid) {
        console.log("Form not submitted!")
        return
      }

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
          username: this.username,
          type: this.isVolunteer ? "volunteer" : "organisation",
          chats: [],
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
