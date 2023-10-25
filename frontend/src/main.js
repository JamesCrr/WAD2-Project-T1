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

// IMport google Maps
import VueGoogleMaps from "@fawmi/vue-google-maps"

const app = createApp(App)
app
  .use(store)
  .use(router)
  .use(BootstrapIconsPlugin)
  .use(VueGoogleMaps, {
    load: {
      key: import.meta.env.VITE_GOOGLEMAPS_apiKey,
      libraries: "places",
    },
  })

app.mount("#app")
