import router from './router'
import store from './store'

export {
  router,
  store
}

import Vue from 'vue'
import {
  STATUS_NEW,
  STATUS_IN_PROGRESS,
  STATUS_RESOLVED,
  STATUS_CLOSED,
  STATUS_REJECTED,
  STATUS_ACTIVE,
  STATUS_NON_ACTIVE,
} from './const'

const plugin = {
  install(Vue) {
    // 4. add an instance method
    Vue.prototype.$home = {
      statusColor: (status) => {
        switch (+status) {
          case STATUS_NEW:
            return 'blue';
          case STATUS_IN_PROGRESS:
            return 'orange';
          case STATUS_RESOLVED:
            return 'green'
          case STATUS_CLOSED:
            return 'red darken-2'
          case STATUS_REJECTED:
            return 'black red--text'
          case STATUS_ACTIVE:
            return 'green darken-2'
          case STATUS_NON_ACTIVE:
            return 'grey'
          default:
            return 'default'
        }
      },
      STATUS_NEW,
      STATUS_IN_PROGRESS,
      STATUS_RESOLVED,
      STATUS_CLOSED,
      STATUS_REJECTED,
      STATUS_ACTIVE,
      STATUS_NON_ACTIVE,
    }
  }
}

Vue.use(plugin)
