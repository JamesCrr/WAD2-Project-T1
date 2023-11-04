import { createRouter, createWebHistory } from "vue-router"
import store from "../store"
import HomeView from "../views/HomeView.vue"
import ChatView from "../views/ChatView.vue"
import LoginView from "../views/LoginView.vue"
import RegisterView from "../views/RegisterView.vue"
import UserView from "../views/UserView.vue"
import volunteer from "../views/Volunteer.vue"
import UserEvent from "../views/UserEvent.vue"
import OrganiserAddEvent from "../views/OrganiserAddEvent.vue"
import OrganiserEditEvent from "../views/OrganiserEditEvent.vue"
import OrganiserDonations from "../views/OrganiserDonations.vue"
import OrganiserEvents from "../views/OrganiserEvents.vue"
import OrgDashboardView from "../views/OrgDashboardView.vue"
import UserDonationsView from "../views/UserDonationsView.vue"
import SuccessPage from "../views/SuccessPage.vue"
import ErrorPage from "../views/ErrorPage.vue"
import MyEvents from "../views/MyEvents.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },

    // {
    //   path: "/user",
    //   name: "user",
    //   component: UserView,
    // },
    {
      path: "/volunteer",
      name: "volunteer",
      component: volunteer,
    },
    {
      path: "/myevents",
      name: "myevents",
      component: MyEvents,
    },
    // {
    //   path: "/events",
    //   name: "events",
    //   component: events,
    // },
    {
      path: "/events/:id",
      name: "eventdetail",
      component: UserEvent,
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    // {
    //   path: "/chat",
    //   name: "chat",
    //   component: ChatView,
    // },
    {
      path: "/organiser/addevent",
      name: "organiser_addevent",
      component: OrganiserAddEvent,
    },
    {
      path: "/organiser/editevent/:id",
      name: "organiser_editevent",
      component: OrganiserEditEvent,
    },
    {
      path: "/organiser/donations",
      name: "organiser_donations",
      component: OrganiserDonations,
    },
    {
      path: "/organiser/events",
      name: "organiser_events",
      component: OrganiserEvents,
    },
    {
      path: "/orgdashboard",
      name: "orgdashboard",
      component: OrgDashboardView,
    },
    // // scrap this userdonationsview page
    // {
    //   path: "/userdonations",
    //   name: "userDonations",
    //   component: UserDonationsView,
    // },
    // // donate is a test page
    // {
    //   path: "/donate",
    //   name: "donate",
    //   component: Donate,
    // },
    {
      path: "/success",
      name: "success",
      component: SuccessPage,
    },
    {
      path: "/error",
      name: "error",
      component: ErrorPage,
    },
    // {
    //   path: "/viewEvent",
    //   name: "viewEvent",
    //   component: ViewEvent,
    // },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/AboutView.vue"),
    // },
  ],
})

// Enable Guarded Routes for everything other than Login and Register
router.beforeEach((to, from) => {
  const getIsLoggedIn = store.getters["auth/getIsLoggedIn"]

  // console.log("Router::", getIsLoggedIn, window.$cookies.get("wadt1_isvol"), to.name, from.name)
  // console.log(window.$cookies.isKey("wadt1_email"))
  // console.log(window.$cookies.get("wadt1_isvol"))

  // Has the user Logged in already?
  if (!getIsLoggedIn) {
    // Stripe
    if (to.name === "success" || to.name === "error") {
      return true
    }
    // Stop redirect flow
    if (
      (window.$cookies.get("wadt1_isvol") == "true" && to.name === "home") ||
      (window.$cookies.get("wadt1_isvol") == "false" && to.name === "orgdashboard")
    ) {
      return true
    }

    // Have they already logged in?
    if (window.$cookies.isKey("wadt1_email")) {
      // return true
      if (window.$cookies.get("wadt1_isvol") == "true") {
        return { name: "home", replace: true }
      }
      // console.log("going to orggg")
      return { name: "orgdashboard", replace: true }

      //// Prevent navigation
      // return false
    } else {
      // Go to Login page if not already there
      if (to.name !== "login") return { name: "login", replace: true }
    }
    // // Trying to access other routes
    // if (to.name !== "login" && to.name !== "register") {
    //     let pagename = "home"
    //     if (window.$cookies.isKey("wadt1_lastpage")) {
    //       pagename = window.$cookies.get("wadt1_lastpage")
    //     }

    //   }
  } else {
    const getIsVolunteer = store.getters["auth/getIsVolunteer"]

    // Already logged in but trying to login/register again
    if (to.name === "login" || to.name === "register") {
      // explicitly return false to cancel the navigation
      return false
    }
    // Org accessing user pages?
    if (
      !getIsVolunteer &&
      (to.name === "volunteer" ||
        to.name === "myevents" ||
        to.name === "eventdetail" ||
        to.name === "home")
    ) {
      if (from.name) {
        return false
      } else {
        // Go to org home page
        return { name: "orgdashboard", replace: true }
      }
    }
    // User accesing org pages?
    if (
      getIsVolunteer &&
      (to.name === "organiser_addevent" ||
        to.name === "organiser_editevent" ||
        to.name === "organiser_donations" ||
        to.name === "organiser_events" ||
        to.name === "orgdashboard")
    ) {
      if (from.name) {
        return false
      } else {
        // Go to user home page
        return { name: "home", replace: true }
      }
    }

    // Stripe Redirect
    // if (window.$cookies.isKey("wadt1_donate_amt"))
    // if (to.name === "success" || to.name === "success") {
    //   return false
    // }
  }

  /** Proceed as normal */
  // ...
})

export default router
