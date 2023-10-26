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
import ViewDonation from "../views/viewDonation.vue"
import OrgDashboardView from "../views/OrgDashboardView.vue"
import UserDonationsView from "../views/UserDonationsView.vue"
import Donate from "../views/Donate.vue"
import SuccessPage from "../views/SuccessPage.vue"
import ErrorPage from "../views/ErrorPage.vue"

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

    {
      path: "/user",
      name: "user",
      component: UserView,
    },
    {
      path: "/volunteer",
      name: "volunteer",
      component: volunteer,
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
    {
      path: "/chat",
      name: "chat",
      component: ChatView,
    },
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
    // scrap this userdonationsview page
    {
      path: "/userdonations",
      name: "userDonations",
      component: UserDonationsView,
    },
    {
      path: "/viewDonation",
      name: "viewDonation",
      component: ViewDonation,
    },
    // donate is a test page
    {
      path: "/donate",
      name: "donate",
      component: Donate, 
    },
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
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/orgdashboard",
      name: "orgdashboard",
      component: OrgDashboardView,
    },
  ],
})

// Enable Guarded Routes for everything other than Login and Register
router.beforeEach((to, from) => {
  // const getIsLoggedIn = store.getters["auth/getIsLoggedIn"]
  // // Not logged in but trying to access other routes
  // if (to.name !== "login" && to.name !== "register" && !getIsLoggedIn) {
  //   return { name: "login", replace: true }
  // }
  // // Already logged in but trying to login/register again
  // else if ((to.name === "login" || to.name === "register") && getIsLoggedIn) {
  //   // console.log("AREDD")
  //   // explicitly return false to cancel the navigation
  //   return false
  // }
  /** Proceed as normal */
  // ...
})

export default router
