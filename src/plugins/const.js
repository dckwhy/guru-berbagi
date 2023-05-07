import {
  API,
  BASE_API,
  LOGO,
  GMAP_KEY,
  COPYRIGHT,
  ROLE_ADMIN,
  ROLE_GURU,
  ROLE_KOMUNITAS,
  SOP_RPP,
  SOP_ARTIKEL
} from "@/const";

const Consts = {
  install(Vue) {
    // 4. add an instance method
    Vue.prototype.$consts = {
      API,
      BASE_API,
      GMAP_KEY,
      LOGO,
      COPYRIGHT,
      ROLE_ADMIN,
      ROLE_GURU,
      ROLE_KOMUNITAS,
      SOP_RPP,
      SOP_ARTIKEL
    };
  }
};

export default Consts;
