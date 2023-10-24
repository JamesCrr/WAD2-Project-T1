<template>
  <div class="container-fluid">
    <div class="row">
      <div
        class="d-none d-sm-flex col-5 bg-primary min-vh-100 justify-content-center align-items-center"
      >
        <SVGIconVue name="loginImage" />
      </div>

      <div class="col-sm-7 p-5">
        <div class="row g-0">
          <div class="col-12">
            <h2 class="text-primary fw-bold mb-0">Welcome Back</h2>
            <p>Enter your email and password to sign in</p>
          </div>
        </div>

        <div class="row">
          <div class="col mt-4">
            <form
              class="needs-validation"
              v-bind:class="{ 'was-validated': !formValid }"
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
                <button type="submit" class="btn btn-primary">Login</button>
              </div>
              <div class="row">
                <div class="col text-center mt-1">
                  <p class="fs-6">
                    Don't have an account?
                    <label
                      class="text-primary"
                      v-on:click="$router.push({ path: '/register' })"
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

    <!-- <div class="row g-0 justify-content-center">
      <div class="col-6">
        <h1>Login</h1>

        <form v-on:submit.prevent="handleFirebaseLogin">
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
    </div> -->
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from "vuex"
import { signInWithEmailAndPassword } from "firebase/auth"
import { collection, doc, getDoc } from "firebase/firestore"
import { firebase_firestore, firebase_auth } from "../firebase"
import SVGIconVue from "../components/SVGIcon.vue"

export default {
  data() {
    return {
      email: "",
      password: "",
      isVolunteer: true,

      formValid: true,
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
      console.log("Email:", this.email, "Password:", this.password)

      this.formValid = this.$refs.formRef.checkValidity()
      if (!this.formValid) {
        console.log("Form not submitted!")
        return
      }

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
