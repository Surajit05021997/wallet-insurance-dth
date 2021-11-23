import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueMeta from 'vue-meta'
import "bootstrap/dist/css/bootstrap.min.css"
import "@popperjs/core"
import "bootstrap"
import 'sweetalert2/dist/sweetalert2.min.css';
import axios from 'axios'
import VueAxios from 'vue-axios';

const VueSweetalert2Options = {
  confirmButtonColor: '#007fff',
}

const GOOGLE_MAPS_API_KEY = `AIzaSyAmniXK3tFGb8t4TV1UMGDqQs3A-z8MeRY`;
const GoogleMapsConfigOptions = {
  key: `${GOOGLE_MAPS_API_KEY}`,
  libraries: 'places',
}

Vue.config.productionTip = false

// Added to Use Google Maps to the Project
Vue.use(VueGoogleMaps, {
  load: GoogleMapsConfigOptions
});
Vue.use(VueMeta);
Vue.use(VueSweetalert2, VueSweetalert2Options);
Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
