import { reactive } from "vue"
import { io } from "socket.io-client"

// Define the Server URL
const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000"

export const socketState = reactive({
  socketObject: io(URL, {
    autoConnect: false,
  }),
  connected: false,

  fooEvents: [],
  barEvents: [],
})

/** Socket Events **/
socketState.socketObject.on("connect", () => {
  socketState.connected = true
  console.log("New connect")
})

socketState.socketObject.on("disconnect", () => {
  socketState.connected = false
})

socketState.socketObject.on("foo", (...args) => {
  socketState.fooEvents.push(args)
})

socketState.socketObject.on("bar", (...args) => {
  socketState.barEvents.push(args)
})
