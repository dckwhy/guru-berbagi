import Vue from "vue";
import {
  STATUS_DRAFT,
  STATUS_APPROVED,
  STATUS_PENDING,
  STATUS_REJECT,
  STATUS_MODERASI
} from "./const";

const plugin = {
  install(Vue) {
    // 4. add an instance method
    Vue.prototype.$artikel = {
      statusColor: status => {
        switch (+status) {
          case STATUS_DRAFT:
            return "grey";
          case STATUS_APPROVED:
            return "success";
          case STATUS_PENDING:
            return "orange";
          case STATUS_REJECT:
            return "danger";
          case STATUS_MODERASI:
            return "blue white--text";
          default:
            return "default";
        }
      },
      STATUS_DRAFT,
      STATUS_APPROVED,
      STATUS_PENDING,
      STATUS_REJECT,
      STATUS_MODERASI
    };
  }
};

Vue.use(plugin);
