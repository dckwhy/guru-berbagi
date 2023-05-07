const Tawk = {}
const Tawk_API = {}
let is_loaded = false
let pending = []

const add_pending = (f, obj) => {
  pending.push({
    f: f,
    obj: obj
  })
}

Tawk.install = function (Vue, options) {
  Vue.prototype.$Tawk = {}

  Vue.prototype.$Tawk.$updateChatUser = function (user) {
    if (!user) return
    if (is_loaded) {
      window.Tawk_API.setAttributes(user,
        function () {
          // 
        })
    }
    else
      add_pending(Vue.prototype.$Tawk.$updateChatUser, user)
  }
  Vue.prototype.$Tawk.$endChat = function () {
    if (is_loaded)
      window.Tawk_API.endChat()
    else
      add_pending(Vue.prototype.$Tawk.$endChat)
  }

  Vue.prototype.$Tawk.$isInit = function () {
    if (window.Tawk_API) {
      return true
    }
    return false
  }
  Vue.prototype.$Tawk.$isLoaded = function () {
    return is_loaded
  }
  Vue.prototype.$Tawk.$hideWidget = function () {
    if (is_loaded)
      Tawk_API.hideWidget()
    else
      add_pending(Vue.prototype.$Tawk.$hideWidget)
  }

  Vue.prototype.$Tawk.$showWidget = function () {
    if (is_loaded)
      Tawk_API.showWidget()
    else
      add_pending(Vue.prototype.$Tawk.$showWidget)
  }

  // load tawk
  Tawk_API.onLoad = () => {
    is_loaded = true
    // hide first
    Vue.prototype.$Tawk.$hideWidget();

    // apply pending function
    if (pending) {
      while (pending && pending.length > 0) {
        var { f, o } = pending.pop()
        f(o)
      }
    }
  }
  // let Tawk_LoadStart = new Date()
  let s1 = document.createElement("script")
  let s0 = document.getElementsByTagName("script")[0]
  s1.async = true
  s1.src = options.tawkSrc
  s1.charset = 'UTF-8'
  s1.setAttribute('crossorigin', '*')
  s0.parentNode.insertBefore(s1, s0)
  window.Tawk_API = Tawk_API
}
export default Tawk
