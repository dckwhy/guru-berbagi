import Vue from "vue";
import Router from "vue-router";

import home from "./modules/home/router";
import user from "./modules/user/router";
import rpp from "./modules/rpp/router";
import artikel from "./modules/artikel/router";
import aksi from "./modules/aksi/router";
import bantuan from "./modules/bantuan/router";
import tagging from "./modules/tagging/router";
import pengawasan from "./modules/pengawasan/router";
import media from "./modules/media/router";
import log from "./modules/log/router";
import kurasiArtikel from "./modules/kurasiArtikel/router";
import kurasiVideo from "./modules/kurasiVideo/router";
import kurasiAksi from "./modules/kurasiAksi/router";
import buletin from "./modules/buletin/router";
import video from "./modules/video/router";
import riwayatKurasi from "./modules/riwayatKurasi/router";
import streaming from "./modules/streaming/router";

import store from "./store";
import { isCan } from "./tools";

Vue.use(Router);

const other = [
  {
    path: "/",
    name: "root",
    redirect: {
      name: "home"
    },
    meta: {
      analyticsIgnore: true
    }
  },
  {
    path: "*",
    name: "404",
    component: () => import("./modules/404/pages/404")
  }
];

let routers = [
  ...rpp,
  ...artikel,
  ...bantuan,
  ...aksi,
  ...home,
  ...other,
  ...user,
  ...tagging,
  ...pengawasan,
  ...media,
  ...log,
  ...kurasiArtikel,
  ...kurasiVideo,
  ...kurasiAksi,
  ...buletin,
  ...video,
  ...riwayatKurasi,
  ...streaming
];

const router = new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: routers
});

router.beforeResolve((to, from, next) => {
  if (to.name) {
    store.commit("main/pStart");
  }
  next();
});

router.beforeEach((to, from, next) => {
  //cek apakah perlu login
  store.commit("main/cleanFlag");
  if (to.meta && to.meta.auth) {
    // cek apakah sudah login
    if (store.getters["user/check"]) {
      store
        .dispatch("user/fetch")
        .then(() => {
          next();
        })
        .catch(() => {
          // cek apakah dapat mengakses route
          store.commit("main/403", !isCan(to.meta.auth));
        });
    } else {
      next({
        name: "login"
      });
    }
  } else {
    next();
  }
});

router.afterEach(() => {
  store.commit("main/pEnd");
  window.scrollTo(0, 0);
});

export default router;
