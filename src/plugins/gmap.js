import Vue from 'vue'
import * as VueGoogleMaps from "vue2-google-maps";
import {
  GMAP_KEY
} from "../const";

if (GMAP_KEY) {
  Vue.use(VueGoogleMaps, {
    load: {
      key: GMAP_KEY,
      libraries: 'places'
    }
  })
}
