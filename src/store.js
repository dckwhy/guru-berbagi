import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import menu from "./menu";
import user from "./modules/user/store";
import rpp from "./modules/rpp/store";
import bantuan from "./modules/bantuan/store";
import artikel from "./modules/artikel/store";
import aksi from "./modules/aksi/store";
import tagging from "./modules/tagging/store";
import pengawasan from "./modules/pengawasan/store";
import media from "./modules/media/store";
import log from "./modules/log/store";
import kurasiArtikel from "./modules/kurasiArtikel/store";
import kurasiVideo from "./modules/kurasiVideo/store";
import kurasiAksi from "./modules/kurasiAksi/store";
import buletin from "./modules/buletin/store";
import video from "./modules/video/store";
import riwayatKurasi from "./modules/riwayatKurasi/store";
import streaming from "./modules/streaming/store";

const main = {
  namespaced: true,
  state: {
    is_403: false,
    progress: 0, // counter progress,
    lDrawer: false,
    rDrawer: false,
    hSidebar: false
  },
  getters: {
    403(state) {
      return state.is_403;
    },
    isAnyProgress(state) {
      return state.progress > 0;
    },
    lDrawer(state) {
      return state.lDrawer;
    },
    rDrawer(state) {
      return state.rDrawer;
    },
    hSidebar(state) {
      return state.hSidebar;
    }
  },
  mutations: {
    cleanFlag(state) {
      state.is_403 = false;
    },
    403(state, val) {
      state.is_403 = val;
    },
    pStart(state) {
      state.progress++;
    },
    pEnd(state) {
      state.progress--;
      if (state.progress < 0) state.progress = 0;
    },
    rToggle(state) {
      state.rDrawer = !state.rDrawer;
    },
    lToggle(state) {
      state.lDrawer = !state.lDrawer;
    },
    setLDrawer(state, val) {
      state.lDrawer = val;
    },
    setHsidebar(state, val) {
      state.lDrawer = val;
    },
    setRDrawer(state, val) {
      state.rDrawer = val;
    },
    lToggleSidebar(state) {
      state.hSidebar = !state.hSidebar;
    }
  },
  actions: {}
};
const store = new Vuex.Store({
  modules: {
    main,
    menu,
    user,
    rpp,
    bantuan,
    artikel,
    aksi,
    tagging,
    pengawasan,
    media,
    log,
    kurasiArtikel,
    kurasiVideo,
    kurasiAksi,
    buletin,
    video,
    riwayatKurasi,
    streaming
  }
});

export default store;
