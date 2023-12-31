<template>
  <div class="container-fluid">
    <div class="row mt-0">
      <div
        class="d-none d-sm-flex col-5 bg-primary min-vh-100 justify-content-center align-items-center"
      >
        <SVGIconVue name="loginImage" style="width: 400" />
      </div>

      <div class="col-sm-7 p-5">
        <div class="row g-0">
          <div class="col-12">
            <div class="text-container text-primary fw-bold h2 mb-0 d-flex">
              <span class="letter">W</span>
              <span class="letter">e</span>
              <span class="letter">l</span>
              <span class="letter">c</span>
              <span class="letter">o</span>
              <span class="letter">m</span>
              <span class="letter">e</span>&nbsp
              <span class="letter">B</span>
              <span class="letter">a</span>
              <span class="letter">c</span>
              <span class="letter">k</span>
            </div>
            <!-- <h2 class="text-primary fw-bold mb-0">Welcome Back</h2> -->
            <p>Enter your email and password to sign in</p>
          </div>
        </div>

        <div class="row">
          <div class="col mt-4">
            <form
              class="needs-validation"
              v-bind:class="{ 'was-validated': !formValidInputs }"
              v-on:submit.prevent="handleFirebaseLogin"
              novalidate=""
              ref="formRef"
            >
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
                <div class="invalid-feedback">Please enter a email.</div>
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
                />
                <div class="invalid-feedback">Please enter a password.</div>
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

              <div v-if="formError" class="row">
                <div class="col mt-3">
                  <p class="rounded p-2 bg-danger-subtle border border-danger text-center">
                    {{ formErrorMessage }}
                  </p>
                </div>
              </div>

              <div class="d-grid mt-3">
                <button type="submit" class="btn btn-primary" v-bind:disabled="submitting">
                  <span
                    class="spinner-border spinner-border-sm text-light"
                    v-bind:class="{ 'd-none': !submitting }"
                    aria-hidden="true"
                  ></span>
                  <span role="status" class="text-light" v-bind:class="{ 'd-none': submitting }"
                    >Login</span
                  >
                </button>
              </div>

              <div class="row">
                <div class="col text-center mt-1">
                  <p class="fs-6">
                    Don't have an account?
                    <label
                      class="text-primary"
                      v-on:click="this.$router.push({ path: '/register' })"
                      style="cursor: pointer"
                      >Sign Up</label
                    >
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from "vuex"
import { signInWithEmailAndPassword, signOut } from "firebase/auth"
import { collection, doc, getDoc } from "firebase/firestore"
import { firebase_firestore, firebase_auth } from "../firebase"
import SVGIconVue from "../components/SVGIcon.vue"
import { gsap } from "gsap"

export default {
  data() {
    return {
      email: "",
      password: "",
      isVolunteer: true,

      formValidInputs: true,
      formError: false,
      formErrorMessage: "",
      submitting: false,
    }
  },

  components: {
    SVGIconVue,
  },

  methods: {
    ...mapMutations("auth", ["m_Login", "m_Logout"]),
    ...mapMutations("chat", ["m_initChats"]),
    ...mapActions("socket", ["a_InitializeSocket"]),

    async handleFirebaseLogin(event) {
      // console.log("Email:", this.email, "Password:", this.password)
      this.formValidInputs = this.$refs.formRef.checkValidity()
      if (!this.formValidInputs) {
        // console.log("Form not submitted!")
        this.submitting = false
        return
      }
      this.submitting = true
      this.formError = false

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
          this.submitting = false
          return
        }

        // DOes it belong to volunteer or organisation?
        // console.log(accountDetails.type, this.isVolunteer)
        if (
          (accountDetails.type === "volunteer" && !this.isVolunteer) ||
          (accountDetails.type === "organisation" && this.isVolunteer)
        ) {
          console.log("SIGNING OUT")
          await signOut(firebase_auth)
          this.formError = true
          this.formErrorMessage = "No Such Account!"
          this.submitting = false
          return
        }

        // update Vuex store
        this.m_Login({
          isVolunteer: this.isVolunteer,
          authDetails: user,
          accountDetails,
          accountRef: docRef,
        })
        // update login cookies never expire , only -1, other negative Numbers are invalid
        this.$cookies.set("wadt1_email", this.email, -1)
        this.$cookies.set("wadt1_password", this.password, -1)
        this.$cookies.set("wadt1_isvol", this.isVolunteer, -1)
        // By right need to hash before setting as cookie, but we no time...

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
        this.a_InitializeSocket({ myUsername: accountDetails.username })

        // Reset form
        this.submitting = false
        this.formError = false

        // redirect to home page depending on volunteer or org
        if (this.isVolunteer) {
          this.$router.replace({ path: "/" })
        } else {
          this.$router.replace({ path: "/orgdashboard" })
        }
      } catch (error) {
        const errorCode = error.code
        const errorMessage = error.message
        // console.log("Failed to sign in, ErrorCode:", errorCode, "Message:", errorMessage)

        // do some user feedback
        this.formError = true
        this.formErrorMessage = "Invalid Email or Password!"
        this.submitting = false
      }
    },
  },

  created() {
    // check if auth cookie exist
    if (this.$cookies.isKey("wadt1_email")) {
      if (this.$cookies.get("wadt1_isvol") == "true") {
        this.$router.replace({ path: "/" })
      } else {
        this.$router.replace({ path: "/orgdashboard" })
      }
    }
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

<style scoped>
.switch-transition {
  transition: all 0.5s ease;
}
</style>
