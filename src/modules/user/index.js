import Vue from "vue";
import { ROLE_ADMIN, ROLE_KONTRIBUTOR, ROLE_KURATOR } from "./const";
const plugin = {
  install(Vue) {
    // 4. add an instance method
    Vue.prototype.$user = {
      statusColor: status => {
        switch (+status) {
          case ROLE_ADMIN:
            return "red";
          case ROLE_KONTRIBUTOR:
            return "green";
          case ROLE_KURATOR:
            return "primary";
          default:
            return "default";
        }
      },
      ROLE_ADMIN,
      ROLE_KONTRIBUTOR,
      ROLE_KURATOR
    };
  }
};

Vue.use(plugin);
