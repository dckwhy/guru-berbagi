import Vue from "vue";
import {
  STATUS_AKTIF,
  STATUS_NONAKTIF,
  STATUS_PENDING,
  STATUS_REJECT,
  STATUS_BLOKIR
} from "./const";
const plugin = {
  install(Vue) {
    // 4. add an instance method
    Vue.prototype.$tagging = {
      statusColor: status => {
        switch (+status) {
          case STATUS_AKTIF:
            return "green";
          case STATUS_NONAKTIF:
            return "grey darken-2";
          case STATUS_PENDING:
            return "orange";
          case STATUS_REJECT:
            return "danger";
          case STATUS_BLOKIR:
            return "black red--text";
          default:
            return "default";
        }
      },
      STATUS_AKTIF,
      STATUS_NONAKTIF,
      STATUS_PENDING,
      STATUS_REJECT,
      STATUS_BLOKIR
    };
  }
};

Vue.use(plugin);
