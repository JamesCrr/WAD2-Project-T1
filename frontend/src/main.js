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
import { BootstrapIconsPlugin } from "bootstrap-icons-vue"

// IMport cookies
import VueCookies from "vue-cookies"

// IMport google Maps
import VueGoogleMaps from "@fawmi/vue-google-maps"
import { StripeCheckout } from "@vue-stripe/vue-stripe"

const app = createApp(App)
app
  .use(VueCookies)
  .use(store)
  .use(router)
  .use(BootstrapIconsPlugin)
  .use(StripeCheckout)
  .use(VueGoogleMaps, {
    load: {
      key: import.meta.env.VITE_GOOGLEMAPS_apiKey,
      libraries: "places",
    },
  })

app.mount("#app")
