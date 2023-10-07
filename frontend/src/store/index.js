import counterModule from "./counterModule"
import socketModule from "./socketModule"
import { createStore } from "vuex"

/**
import { io } from "socket.io-client"
// Define the Server URL
const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000"
const socketObject = io(URL, {
  autoConnect: false,
})
// Socket Events
socketObject.on("connect", () => {
  socketConnected = true
  console.log("New connect")
})

socketObject.on("disconnect", () => {
  socketConnected = false
})

socketObject.on("foo", (...args) => {
  fooEvents.push(args)
})

socketObject.on("bar", (...args) => {
  barEvents.push(args)
})
*/

// Create a new store instance.
const store = createStore({
  modules: {
    socket: socketModule,
    counter: counterModule,
  },

  // state() {
  //   return {
  //     count: 0,
  //     // socketObject,
  //     // socketConnected: false,
  //   }
  // },
  // mutations: {
  //   increment(state) {
  //     state.count++
  //     console.log("INCREMENT")
  //   },
  //   incrementBy(state, n) {
  //     state.count += n
  //     console.log("INCREMENT_BY")
  //   },
  //   decrement(state) {
  //     state.count--
  //     console.log("DECREMENT")
  //   },
  // },
  // actions: {
  //   incrementAsync({ commit }) {
  //     setTimeout(() => {
  //       commit("increment")
  //     }, 1000)
  //   },
  // },
  // getters: {
  //   getCount: (state) => state.count,
  // },
})

export default store
