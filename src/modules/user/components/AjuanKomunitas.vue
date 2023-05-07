<template>
  <div class="text-center" fill-height fluid>
    <v-dialog v-model="dialog" width="700">
      <template v-slot:activator="{ on, attrs }"></template>

      <v-card class="pa-5 text-center rounded-lg" v-if="this.isAjuan">
        <div class="center" align="center" justify="center">
          <v-img
            style=" width : 300px"
            src="https://cdn.siap.id/s3/simpkb/asset%20img/Guru-Berbagi/illustrasi/ilustrasi-verifikasi-email.png"
          ></v-img>
        </div>
        <p class="title mt-5">
          Sistem kami mendeteksi bahwa email Anda didaftarkan sebagai
          <br /><span class="success-info">Akun Komunitas</span>
        </p>
        <v-card-text class="my-0 pb-2">
          <p class="text-center black--text">
            Silakan melakukan persetujuan dibawah ini apakah akan menerima Ajuan
            tersebut atau tidak. Akun akan berubah perannya menjadi komunitas
            jika ajuan berikut Anda terima
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="mr-2 mb-2" depressed color="success" @click="setujui()">
            <v-icon>mdi-check</v-icon>Setujui </v-btn
          >&nbsp;
          <v-btn class="mr-2 mb-2" depressed color="error" @click="tolak()">
            <v-icon>mdi-close</v-icon>Tolak
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card class="rounded-lg" v-else>
        <v-card-title class="primary white--text">
          Informasi Update
        </v-card-title>
        <div class="center" align="center" justify="center">
          <v-img
            class="ma-5"
            src="https://cdn.siap.id/s3/simpkb/asset%20img/Guru-Berbagi/illustrasi/thumb-kontributor.jpg"
          ></v-img>
        </div>
        <v-card-text class=" pb-2 mt-3">
          <p class="title black--text font-weight-bold mb-0 pb-0">
            Segera Update Profil
          </p>
          <p class="black--text mt-0 pt-0">
            Silakan melengkapi data komunitas Anda
          </p>
          <v-divider></v-divider>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="mr-2 mb-2"
            text
            depressed
            color="grey"
            @click="isTutup = true"
          >
            Nanti Saja </v-btn
          >&nbsp;
          <v-btn
            class="mr-2 mb-2"
            depressed
            color="blue darken-3 white--text"
            @click="editKomunitas()"
          >
            Update Profil
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <ChangeKomunitasDlg ref="komunitasDlg" />
  </div>
</template>

<script>
import { PORTAL } from "@/const";
import ChangeKomunitasDlg from "../components/FormKomunitasUpdate.vue";

export default {
  components: {
    PORTAL,
    ChangeKomunitasDlg
  },
  data() {
    return {
      isAjuan: false,
      isLengkap: false,
      isTutup: false
    };
  },

  computed: {
    dialog() {
      if (this.$store.getters["user/user"]) {
        var user = this.$store.getters["user/user"];

        if (user.komunitas && user.komunitas.is_ajuan_komunitas) {
          // eslint-disable-next-line
          this.isAjuan = true;
          return true;
        } else if (user.peran.id == 4 && !user.komunitas && !this.isTutup) {
          // eslint-disable-next-line
          this.isAjuan = false;
          return true;
        } else if (
          user.peran.id == 4 &&
          user.komunitas &&
          !user.komunitas.propinsi_id &&
          !this.isTutup
        ) {
          // eslint-disable-next-line
          this.isAjuan = false;
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  },

  methods: {
    editKomunitas() {
      this.isTutup = true;
      this.$refs.komunitasDlg.open(this.current_user);
    },
    // eslint-disable-next-line
    setujui(item) {
      this.$successDlg(
        `Apakah Anda yakin akan menyetujui ajuan komunitas?<br><br>
        <div class="mt-2 title grow text-center">
        </div>
      `,
        "Setujui Ajuan Akun Komunitas"
      )
        .then(() => {
          return this.$store.dispatch("user/verifyKomunitas", {
            is_approve: 1
          });
        })
        .then(res => {
          this.dialog = false;
          location.reload();
          return this.resolve(res);
        })
        .catch(e => e);
    },
    tolak() {
      this.$confirmDanger(
        `Apakah Anda yakin akan menolak ajuan Komunitas ini ?<br><br>
        <div class="mt-2 title grow text-center">
        </div>
      `,

        "Tolak Ajuan Komunitas"
      )
        .then(() => {
          return this.$store.dispatch("user/verifyKomunitas", {
            is_approve: 0
          });
        })
        .then(res => {
          this.dialog = false;
          location.reload();
          return this.resolve(res);
        })
        .catch(e => e);
    }
  }
};
</script>
