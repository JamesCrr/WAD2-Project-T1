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
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue'
import { StripeCheckout } from '@vue-stripe/vue-stripe';


const app = createApp(App)

app.use(store).use(router)
app.use(BootstrapIconsPlugin)

app.mount("#app")
