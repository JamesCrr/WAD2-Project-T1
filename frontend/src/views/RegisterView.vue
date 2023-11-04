<template>
  <div class="container-fluid mb-5">
    <div class="row g-0 justify-content-center">
      <div class="col-11 position-absolute bg-primary h-75 z-n1 rounded mt-3"></div>
    </div>
    <div class="row g-0 justify-content-center mt-5">
      <div class="text-container text-light fw-bold h2 mb-4 d-flex justify-content-center">
        <span class="letter">R</span>
        <span class="letter">e</span>
        <span class="letter">g</span>
        <span class="letter">i</span>
        <span class="letter">s</span>
        <span class="letter">t</span>
        <span class="letter">e</span>
        <span class="letter">r</span>&nbsp
        <span class="letter">N</span>
        <span class="letter">o</span>
        <span class="letter">w</span>
      </div>
      <!-- <h2 class="text-light text-center mb-4">Sign up with us!</h2> -->
    </div>
    <div class="row g-0 justify-content-center">
      <div class="col-10 col-md-6 p-4 bg-light rounded">
        <form
          class="needs-validation"
          v-bind:class="{ 'was-validated': !formValidInputs }"
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

          <!-- Age & Phone Number -->
          <div v-if="isVolunteer">
            <div class="mb-3">
              <div class="row">
                <div class="col-4">
                  <label for="age" class="form-label">Age</label>
                  <input
                    type="number"
                    class="form-control"
                    id="age"
                    v-model="age"
                    placeholder="23"
                    style="font-size: 0.8rem"
                    required
                  />
                  <div class="invalid-feedback">Please provide your age.</div>
                </div>
                <div class="col">
                  <label for="contactnumber" class="form-label">Contact Number</label>
                  <input
                    type="tel"
                    class="form-control"
                    id="contactnumber"
                    v-model="contactNumber"
                    style="font-size: 0.8rem"
                    required
                    placeholder="12345678"
                    pattern="[0-9]{8}"
                  />
                  <div class="invalid-feedback">Please provide a contact number.</div>
                </div>
              </div>
            </div>
            <!-- Education Level -->
            <div class="mb-3">
              <label for="password" class="form-label">Highest Education</label>
              <select class="form-select" aria-label="Default select example" v-model="education">
                <!-- <option disabled value="" selected>Select Here</option> -->
                <option selected value="secondary">Secondary</option>
                <option value="diploma">Diploma</option>
                <option value="bachelors">Bachelors</option>
                <option value="masters">Masters</option>
                <option value="phd">PhD</option>
              </select>
              <div class="invalid-feedback">Please select a level</div>
            </div>
          </div>
          <div v-else>
            <!-- Organisation Contact Number -->
            <div class="mb-3">
              <label for="contactnumber" class="form-label">Contact Number</label>
              <input
                type="tel"
                class="form-control"
                id="contactnumber"
                v-model="contactNumber"
                style="font-size: 0.8rem"
                required
                placeholder="12345678"
                pattern="[0-9]{8}"
              />
              <div class="invalid-feedback">Please provide a contact number.</div>
            </div>
          </div>

          <div class="d-flex justify-content-center mt-3">
            <label
              class="form-check-label switch-transition"
              :class="{ 'text-body-secondary': isVolunteer }"
              :style="!isVolunteer ? { opacity: 1 } : { opacity: 0.2 }"
              >Organisation</label
            >
            <div class="form-check form-switch" style="padding-left: 3em">
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                v-model="isVolunteer"
                checked
              />
            </div>
            <label
              class="form-check-label switch-transition"
              :class="{ 'text-body-secondary': !isVolunteer }"
              :style="isVolunteer ? { opacity: 1 } : { opacity: 0.2 }"
              >Volunteer</label
            >
          </div>

          <div class="d-grid mt-5">
            <button type="submit" class="btn btn-primary">
              <span
                class="spinner-border spinner-border-sm text-light"
                v-bind:class="{ 'd-none': !submitting }"
                aria-hidden="true"
              ></span>
              <span role="status" class="text-light" v-bind:class="{ 'd-none': submitting }"
                >Register</span
              >
            </button>
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
import { gsap } from "gsap"

export default {
  data() {
    return {
      email: "",
      password: "",
      username: "",
      age: 0,
      contactNumber: "",
      education: "secondary",
      isVolunteer: true,

      formValidInputs: true,
      formError: false,
      formErrorMessage: "",
      submitting: false,
    }
  },

  methods: {
    ...mapMutations("auth", ["m_Login", "m_Logout"]),

    /**
     * Sends Registration Reques to Firebase and if successful, redirect to home page
     */
    async handleFirebaseRegistration(event) {
      // console.log(
      //   "Email:",
      //   this.email,
      //   "Password:",
      //   this.password,
      //   "Username:",
      //   this.username,
      //   "Age:",
      //   this.age,
      //   "contactNumber:",
      //   this.contactNumber,
      //   "education:",
      //   this.education,
      // )

      // console.log(event, this.$refs.formRef.checkValidity())
      this.formValidInputs = this.$refs.formRef.checkValidity()
      if (!this.formValidInputs) {
        console.log("Form not submitted!")
        this.submitting = false
        return
      }
      this.submitting = true
      this.formError = false

      console.error("Paused Registration!")
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
          age: this.age,
          contactNumber: this.contactNumber,
          education: this.education,
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
        this.formError = true
        this.formErrorMessage = "Unable to register!"
        this.submitting = false
      }
    },
  },

  mounted() {
    const animation = gsap.timeline({ repeat: -1 })
    const letters = document.querySelectorAll(".letter")

    letters.forEach((letter, index) => {
      // Animate "W" differently
      animation
        .to(letter, {
          y: -5, // Move "W" up
          duration: 0.2,
          ease: "power1.inOut",
        })
        .to(letter, {
          y: 0, // Move "W" back down
          duration: 0.2,
          ease: "power1.inOut",
        })
    })
  },
}
</script>
