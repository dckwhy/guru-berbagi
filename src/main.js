// src/main.js

import "babel-polyfill";
import Vue from "vue";
import "./interceptor";
import "./filter";
import "./mixin";
import "./global_components";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import VueClipboard from "vue-clipboard2";

VueClipboard.config.autoSetContainer = true; // add this line
Vue.use(VueClipboard);

import { Datetime } from "vue-datetime";
// You need a specific loader for CSS files
import "vue-datetime/dist/vue-datetime.css";

Vue.use(Datetime);
import { Settings } from "luxon";
//set to display dates for English language
Settings.defaultLocale = "id";

// import plugin
import "./plugins";
import { DSN_SENTRY, GA, MAMOTO, MAMOTO_SITE_ID } from "@/const";

import Embed from "v-video-embed";

// global register
Vue.use(Embed);

// integrasi sentry
import * as Sentry from "@sentry/browser";
import * as Integrations from "@sentry/integrations";

if (DSN_SENTRY) {
  Sentry.init({
    dsn: DSN_SENTRY,
    integrations: [
      new Integrations.Vue({
        Vue,
        attachProps: true,
        logErrors: true
      })
    ]
  });
}

import VueAnalytics from "vue-analytics";
import VueMatomo from "vue-matomo";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./registerServiceWorker";

if (GA) {
  Vue.use(VueAnalytics, {
    id: GA,
    router
  });
}

// Analytics

if (MAMOTO) {
  Vue.use(VueMatomo, {
    host: MAMOTO,
    siteId: MAMOTO_SITE_ID,
    enableLinkTracking: true,
    requireConsent: false,
    trackInitialView: true,
    debug: false
  });
}

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
