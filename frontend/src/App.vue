<template>
  <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

  <!-- <div class="container-fluid">
    <div class="row bg-dark-subtle">
      <div class="col">
        IsLoggedIn: {{ getIsLoggedIn }}
        <div v-if="getIsLoggedIn"></div>
      </div>
    </div>
  </div> -->

  <!-- Organisation Navbar -->
  <!-- <div v-if="!getIsVolunteer">
            <div class="row">
              <div class="col">
                <RouterLink to="/organiser/events">events</RouterLink>
              </div>
              <div class="col">
                <RouterLink to="/organiser/donations">donations</RouterLink>
              </div>
            </div>
          </div> -->

  <!-- Volunteer Navbar -->
  <!-- <div v-else>
            <UserNavBar />
          </div>
        </div>
      </div>
    </div>
  </div> -->

  <RouterView />

  <div v-if="getIsLoggedIn">
    <NavBar />
    <MainChatWindow />
  </div>
</template>

<script>
import { RouterLink, RouterView } from "vue-router"
import { mapGetters, mapMutations, mapActions, mapState } from "vuex"
import { signInWithEmailAndPassword, signOut } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { firebase_firestore, firebase_auth } from "./firebase"
import MainChatWindow from "./components/chat/MainChatWindow.vue"
import NavBar from "./components/NavBar.vue"

export default {
  computed: {
    ...mapGetters("auth", ["getIsLoggedIn", "getIsVolunteer"]),
  },
  components: {
    MainChatWindow,
    NavBar,
  },

  methods: {
    ...mapMutations("auth", ["m_Login", "m_Logout"]),
    ...mapMutations("chat", ["m_initChats"]),
    ...mapActions("socket", ["a_InitializeSocket"]),

    async firebaseLoginFromCookies() {
      const email = this.$cookies.get("wadt1_email")
      const password = this.$cookies.get("wadt1_password")
      const isvol = this.$cookies.get("wadt1_isvol")
      // console.log("Email:", email, "Password:", password, "isvol", isvol)

      try {
        // Call Firebase and verify
        const userCredential = await signInWithEmailAndPassword(firebase_auth, email, password)
        // Signed in Success
        const user = userCredential.user

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
          isVolunteer: accountDetails.type === "volunteer",
          authDetails: user,
          accountDetails,
          accountRef: docRef,
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
        // Update Vuex store
        this.m_initChats(newChats)

        // Register SocketIO
        this.a_InitializeSocket({ myUsername: accountDetails.username })

        // // redirect to home page if no other page
        // let pagename = accountDetails.type === "volunteer" ? "home" : "orgdashboard"
        // if (this.$cookies.isKey("wadt1_lastpage")) {
        //   pagename = this.$cookies.get("wadt1_lastpage")
        //   // reset the redirect
        //   this.$cookies.set(
        //     "wadt1_lastpage",
        //     accountDetails.type === "volunteer" ? "home" : "orgdashboard",
        //     -1,
        //   )
        // }
        // //redirect USING NAME
        // this.$router.replace({ name: pagename })

        // Go back to same page to trigger rerouting
        // const currentpagename = this.$router.currentRoute.value.name
        // const isv = accountDetails.type === "volunteer"
        // console.log("ROUTErr:", this.$router)
        // console.log("APP ROUTE:", currentpagename)
        // if (
        //   !isv &&
        //   (currentpagename == "home" ||
        //     currentpagename == "volunteer" ||
        //     currentpagename == "myevents" ||
        //     currentpagename == "eventdetail")
        // ) {
        //   this.$router.replace({ name: "orgdashboard" })
        // }
      } catch (error) {
        const errorCode = error.code
        const errorMessage = error.message
        console.log("Failed to sign in, ErrorCode:", errorCode, "Message:", errorMessage)
      }
    },
  },
  beforeMount() {
    if (this.$cookies.isKey("wadt1_email")) {
      this.firebaseLoginFromCookies()
    }
  },
}
</script>

<!-- <style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style> -->
