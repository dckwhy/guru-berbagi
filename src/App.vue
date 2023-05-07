<template>
  <v-app id="app">
    <v-main class="primary py-0">
      <!-- <v-overlay :z-index="1000" :value="isLoading"> -->
      <progress-c :loading="isLoading" />
      <!-- </v-overlay> -->
      <v-fade-transition mode="out-in">
        <component :is="comp"></component>
      </v-fade-transition>
    </v-main>
    <confirm ref="confirm" />
    <MSnackbar ref="snack" />
    <VAjuanKomunitas />
  </v-app>
</template>
<style>
html {
  overflow: auto;
}
</style>

<script>
import Vue from "vue";
import Confirm from "./components/Confirm";
import VHome from "./views/Home";
import V403 from "./modules/404/pages/403";
import VNoInstansi from "./modules/404/pages/NoInstansi";
import VNoKegiatan from "./modules/404/pages/NoKegiatan";
import VAjuanKomunitas from "./modules/user/components/AjuanKomunitas";
import VNoGrup from "./modules/404/pages/NoGrup";
// import VSubscribe from "./modules/home/components/subscribe";

import MSnackbar from "./components//MSnackbar";
export default {
  name: "App",
  components: {
    VHome,
    V403,
    VNoInstansi,
    VNoKegiatan,
    VNoGrup,
    Confirm,
    MSnackbar,
    VAjuanKomunitas
  },
  data() {
    return {
      is_show: false,
      is_show_footer: false,

      is_mounted: false,
      loading: false,
      clipped: false,
      drawer: true,
      fixed: false,

      miniVariant: false,
      right: true,
      rightDrawer: false
    };
  },
  mounted() {
    Vue.prototype.$confirm = this.$refs.confirm.open;
    Vue.prototype.$confirmDanger = (message, op, title) => {
      return this.$refs.confirm.open(message, { ...op, color: "red" }, title);
    };
    Vue.prototype.$infoDlg = (message, op = {}, title = "Info") => {
      return this.$refs.confirm.open(message, { ...op, okOnly: true }, title);
    };
    Vue.prototype.$successDlg = (message, op, title = "Pengesahan") => {
      return this.$refs.confirm.open(
        message,
        { ...op, color: "success" },
        title
      );
    };
    Vue.prototype.$warningDlg = (message, op = {}, title = "Info") => {
      return this.$refs.confirm.open(
        message,
        { ...op, color: "orange", okOnly: true },
        title
      );
    };

    // eslint-disable-next-line
    Vue.prototype.$snack = this.$refs.snack.open;
    Vue.prototype.$error = this.$refs.snack.error;
    Vue.prototype.$info = this.$refs.snack.info;
    Vue.prototype.$success = this.$refs.snack.success;
    Vue.prototype.$warning = this.$refs.snack.warning;
    Vue.prototype.$reload = this.$refs.snack.reload;
  },
  computed: {
    isLoading() {
      return this.loading || this.$store.getters["main/isAnyProgress"];
    },

    user() {
      if (this.$store.getters["user/user"]) {
        // this.$refs.subscribe.open();
      }
      return this.$store.getters["user/user"];
    },
    403() {
      return this.$store.getters["main/403"];
    },
    comp() {
      if (this.$store.getters["main/403"]) return "V403";
      else if (this.$store.getters["main/noInstansi"]) return "VNoInstansi";
      else if (this.$store.getters["main/noKegiatan"]) return "VNoKegiatan";
      else if (this.$store.getters["main/noGrup"]) return "VNoGrup";
      else if (this.$route.meta.auth && this.user) return "VHome";
      else return "router-view";
    }
  },
  watch: {
    $route() {
      this.is_show =
        this.$route.name !== "login" &&
        this.$route.name !== "404" &&
        this.$route.name !== "verify" &&
        this.$route.name.indexOf("home") < 0;

      this.is_show_footer =
        this.$route.name.indexOf("login") < 0 &&
        this.$route.name !== "activation";
    }
  }
};
</script>
