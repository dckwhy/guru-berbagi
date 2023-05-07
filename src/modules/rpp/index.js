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
    Vue.prototype.$rpp = {
      statusColor: status => {
        switch (+status) {
          case STATUS_DRAFT:
            return "grey";
          case STATUS_APPROVED:
            return "success";
          case STATUS_PENDING:
            return "orange";
          case STATUS_REJECT:
            return "error";
          case STATUS_MODERASI:
            return "info";
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
