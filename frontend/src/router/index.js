import { createRouter, createWebHistory } from "vue-router"
import store from "../store"
import HomeView from "../views/HomeView.vue"
import ChatView from "../views/ChatView.vue"
import LoginView from "../views/LoginView.vue"
import RegisterView from "../views/RegisterView.vue"
import UserView from "../views/UserView.vue"
import volunteer from "../views/Volunteer.vue"
import events from "../views/Events.vue"
import AddEventView from "../views/AddEvent.vue"
import ViewDonation from "../views/ViewDonation.vue"
import ViewEvent from "../views/ViewEvent.vue"

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
    {
      path: "/events",
      name: "events",
      component: events,
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
      path: "/addEvent",
      name: "addEvent",
      component: AddEventView,
    },
    {
      path: "/viewDonation",
      name: "viewDonation",
      component: ViewDonation,
    },
    {
      path: "/viewEvent",
      name: "viewEvent",
      component: ViewEvent,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
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
  //   console.log("AREDD")
  //   // explicitly return false to cancel the navigation
  //   return false
  // }
  /** Proceed as normal */
  // ...
})

export default router
