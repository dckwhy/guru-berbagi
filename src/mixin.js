import Vue from "vue";
import { isCan } from "./tools";
import { ENV } from "@/const";

// const M_API = API + '/user'
// const lc = window.localStorage
// const INST_ACTIVE = 'monev_mt_inst'

Vue.mixin({
  methods: {
    isCan(perm) {
      return isCan(perm);
    },
    pVal(obj, a, b = undefined, c = undefined) {
      let r = "-";
      if (!obj) return r;
      if (!obj[a]) return "-";
      r = obj[a];
      if (typeof b == "undefined") return r;
      if (!r[b]) return "-";
      r = r[b];
      if (typeof c == "undefined") return r;
      if (!r[c]) return "-";
      r = r[c];
      return r;
    },
    wordCount(str) {
      var replaceNewline = str.replace(/<p\s*\/?>/gi, " ");
      var replaceHTML = replaceNewline.replace(/(<([^>]+)>)/gi, "");
      var trimMultiSpace = replaceHTML.replace(/ +(?= )/g, "");
      var c = trimMultiSpace.trim();
      return c == "" ? 0 : c.split(" ").length;
    }
  },
  computed: {
    current_user() {
      return this.$store.getters["user/user"];
    },
    current_kegiatan() {
      return this.$store.getters["rpp/rpp"];
    },
    CONFIG() {
      return this.$store.getters["main/CONFIG"];
    },
    user_id() {
      return this.$route.params.user_id;
    },
    taxonomy_id() {
      return this.$route.params.taxonomy_id;
    },
    hiddenFeature() {
      return ENV == "PRODUCTION" ? false : true;
    }
  }
});
