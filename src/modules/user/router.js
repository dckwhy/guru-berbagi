import store from "../../store";
// import { BASE_API } from '@/const'
const router = [
  {
    path: "/login",
    name: "login",
    meta: {
      analyticsIgnore: true
    },
    component: () => import("./pages/Login"),
    beforeEnter: (to, from, next) => {
      if (to.query.token) {
        // cleanup flag/info/user
        store.commit("user/logout");
        store.commit("user/setToken", to.query);
        // if (store.getters['user/lastURL']) {
        //   // window.location.href = `${window.location.origin}${store.commit('user/popLastURL')}`
        //   const u = store.getters['user/lastURL']
        //   store.commit('user/delLastURL')
        //   next({ path: u })
        //   return
        // }
        next({
          name: "home"
        });
      }
      // jika sudah login, maka redirect ke home
      if (to.name == "login" && store.getters["user/check"]) {
        next({
          name: "home"
        });
      } else {
        // window.location.href = BASE_API
        // redirect ke halaman login api
        next();
      }
    }
  },
  {
    path: "/user",
    name: "user",
    meta: {
      auth: true
    },
    component: () => import("./pages/List.vue")
  },
  {
    path: "/verifikasi",
    name: "user.activation",
    meta: {
      auth: false
    },
    component: () => import("./pages/Activation.vue")
  },
  {
    path: "/verifikasisurelalternatif",
    name: "user.activationemail",
    meta: {
      auth: false
    },
    component: () => import("./pages/ActivationEmail.vue")
  },
  {
    path: "/profil",
    name: "profil",
    meta: {
      auth: true
    },
    component: () => import("./pages/Profile.vue")
  },
  {
    path: "/registrasi",
    name: "user.registrasi",
    meta: {
      auth: false
    },
    component: () => import("./pages/Registrasi.vue")
  },
  {
    path: "/registrasi-personal",
    name: "user.registrasi.personal",
    meta: {
      auth: false
    },
    component: () => import("./components/RegistrasiPersonal.vue")
  },
  {
    path: "/registrasi-komunitas",
    name: "user.registrasi.komunitas",
    meta: {
      auth: false
    },
    component: () => import("./components/RegistrasiKomunitas.vue")
  },
  {
    path: "/aktivasi",
    name: "user.aktivasi",
    meta: {
      auth: false
    },
    component: () => import("./components/Aktivasi.vue")
  }
];

export default router;
