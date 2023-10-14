import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import ChatView from "../views/ChatView.vue"
import LoginView from "../views/LoginView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginView,
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
router.beforeEach((to, from, next) => {
  next()
  return

  if (to.name !== "login" && to.name !== "register" && !this.isloggedin) {
    next({
      path: "login",
      replace: true,
    })
  } else {
    next()
  }
})

export default router
