// import "./assets/main.css"

// Import all of Bootstrap's JS and CSS
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap"
// Import our custom CSS
import "./scss/custom.scss"

import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"

const app = createApp(App)

app.use(store).use(router)

app.mount("#app")
