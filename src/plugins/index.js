import Vue from "vue";
import Consts from "./const";
import Tools from "./tools";
import "./vuetify";
// import "./gmap";

import VeeValidate, { Validator } from "vee-validate";
import id from "vee-validate/dist/locale/id";

import { GA } from "../const";
import VueAnalytics from "vue-analytics";
import router from "../router";

if (GA) {
  Vue.use(VueAnalytics, {
    id: GA,
    router
  });
}

import "../modules/streaming/index";
import "../modules/video/index";
import "../modules/rpp/index";
import "../modules/pengawasan/index";
import "../modules/artikel/index";
import "../modules/buletin/index";
import "../modules/aksi/index";
import "../modules/user/index";
import "../modules/home/index";

Vue.use(VeeValidate);
Validator.localize("id", id);

Vue.use(Consts);
Vue.use(Tools);
