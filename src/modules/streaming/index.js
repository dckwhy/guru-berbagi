import Vue from "vue";
import { STATUS_BERAKHIR, STATUS_MULAI, STATUS_TERBIT } from "./const";

const plugin = {
  install(Vue) {
    //// 4. add an instance method
    Vue.prototype.$streaming = {
      statusColor: status => {
        switch (status) {
          case STATUS_BERAKHIR:
            return "error";
          case STATUS_MULAI:
            return "success";
          case STATUS_TERBIT:
            return "info";
          default:
            return "default";
        }
      },
      STATUS_BERAKHIR,
      STATUS_MULAI,
      STATUS_TERBIT
    };
  }
};

Vue.use(plugin);
