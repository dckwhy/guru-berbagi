import { pVal, obj2KeyVal, deltaDTW, deltaDTWN, wordCount } from "@/tools";

const Consts = {
  install(Vue) {
    // 4. add an instance method
    Vue.prototype.$tools = {
      pVal,
      obj2KeyVal,
      deltaDTW,
      deltaDTWN,
      wordCount
    };
  }
};

export default Consts;
