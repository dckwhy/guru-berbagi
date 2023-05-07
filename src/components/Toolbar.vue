<template>
  <div>
    <v-app-bar color="primary" app dark flat>
      <v-app-bar-nav-icon
        @click.stop="$store.commit('main/lToggle')"
        v-show="isShow"
      ></v-app-bar-nav-icon>

      <v-spacer></v-spacer>
      <!-- <div class="text-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn outlined color="white" dark v-on="on">Download SOP</v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in itemSops" :key="index" @click="item.click()">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>-->
      <v-menu left offset-y :nudge-width="200" max-height="400">
        <template v-slot:activator="{ on, attrs }">
          <v-btn depressed icon v-bind="attrs" v-on="on">
            <v-icon color="white">mdi-apps</v-icon>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item
            class="grey--text"
            v-for="item in layanans"
            :key="item.index"
          >
            <v-list-item-icon class="mx-0 px-0">
              <v-avatar :size="30" class="mr-2">
                <img
                  src="https://cdn.siap.id/s3/simpkb/Aset%20Mobile/app-launcher-simpkb.png"
                  alt="avatar"
              /></v-avatar>
            </v-list-item-icon>
            <v-list-item-content>
              <a
                style="text-decoration: none;"
                :href="item.url"
                target="_self"
                >{{ item.nama }}</a
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-avatar @click.stop="$store.commit('main/rToggle')">
        <a>
          <v-avatar :size="40" color="grey lighten-4">
            <img v-if="user.image" :src="user.image.url.logo" alt="avatar" />
            <img v-else src="img/avatar-default-full.png" alt="avatar" />
          </v-avatar>
        </a>
      </v-avatar>
    </v-app-bar>
  </div>
</template>

<script>
import { SOP_RPP, SOP_ARTIKEL, SOP_REGISTRASI } from "@/const";
// import PilihInstansi from "../modules/instansi/components/PilihInstansiDialog";
export default {
  components: {
    // PilihInstansi
  },
  data() {
    return {
      sidebar: false,
      avatar: null,
      menu: false,
      // message : 'asdasd',
      // fav : false,
      loading: false,
      layanans: [],
      items: [
        { to: { name: "home" }, title: "Halaman Depan" },
        { to: { name: "home" }, title: "Perencanaan" },
        { to: { name: "home" }, title: "Implementasi" },
        { to: { name: "home" }, title: "Laporan" }
      ],
      itemSops: [
        {
          title: "SOP Registrasi dan Aktivasi",
          click: () => this.toSopRegistrasi()
        },
        {
          title: "SOP Berbagi Artikel",
          click: () => this.toSopArtikel()
        },
        {
          title: "SOP Berbagi RPP",
          click: () => this.toSopRpp()
        }
      ]
    };
  },
  computed: {
    // totalInstansi() {
    //   return this.$store.getters["main/totalInstansi"];
    // },
    user() {
      let u = this.$store.getters["user/user"];
      // if(u.file_foto.data==null){
      //   u.file_foto=null
      // }

      // eslint-disable-next-line

      return u ? u : null;
    },
    isShow() {
      return this.$route.name !== "instansi.pilih";
    }
    // instansiTerpilih() {
    //   let i = this.$store.getters["instansi/instansi_aktif"];
    //   if (i && i.roleku && i.roleku.id == 3) {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // }
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      return this.$store
        .dispatch("user/getLayanan", {})
        .then(res => {
          this.layanans = res.data.layanan;
        })
        .catch(e => e);
    },
    toSopRegistrasi() {
      window.open(SOP_REGISTRASI, "_blank");
    },
    toSopArtikel() {
      window.open(SOP_ARTIKEL, "_blank");
    },
    toSopRpp() {
      window.open(SOP_RPP, "_blank");
    },
    toURL(val) {
      window.open(val.url, "_self");
    },
    clickDrawer() {
      this.$emit("dclicked");
    },
    // pilihInstansi() {
    //   this.$refs.dlg
    //     .open()
    //     .then(res => res)
    //     .catch(e => e);
    // },
    logout() {
      this.loading = true;
      this.$store
        .dispatch("user/logout")
        .then(() => {
          this.menu = false;
          this.loading = false;
          this.$router.push({ name: "login" });
        })
        .catch(() => {
          this.loading = false;
        });
    }
  },
  watch: {
    // hSidebar(n) {
    //   this.sidebar = n;
    // }
  }
};
</script>
