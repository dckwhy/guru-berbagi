<template>
  <v-container container--fluid fill-height class="primary">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="12" md="4" lg="4" xl="4">
        <v-stepper v-model="st" class="ra-2">
          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card text class="rounded-lg">
                <div align="center" justify="center">
                  <v-img
                    src="https://cdn.siap.id/s3/simpkb/asset%20img/Guru-Berbagi/illustrasi/ilustrasi-verifikasi-email.png"
                    width="200px"
                  ></v-img>
                </div>
                <v-card-title
                  primary-title
                  class="justify-space-around mb-0 pb-0"
                >
                  <h3 class="tittle primary--text d-block text-center">
                    Kode Aktivasi
                  </h3>
                </v-card-title>
                <v-card-text>
                  <v-form data-vv-scope="form" lazy-validation>
                    <v-row column wrap>
                      <v-col cols="12" class="justify-space-around text-center"
                        >Silakan memasukkan kode aktivasi yang dikirim ke surel
                        Anda</v-col
                      >
                      <v-col cols="12" class="my-3 py-0">
                        <v-text-field
                          label="Kode Aktivasi"
                          v-model="kode_aktivasi"
                          hint="Silakan masukkan Kode Aktivasi Anda*"
                          outlined
                          dense
                          persistent-hint
                          data-vv-name="kode_aktivasi"
                          data-vv-as="Kode Aktivasi"
                          v-validate="'required'"
                          :error-is_ssos="errors.collect('form.kode_aktivasi')"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        class="justify-space-around text-center pt-0 mt-0"
                      >
                        <v-btn
                          :loading="loading"
                          medium
                          block
                          class="black--text"
                          color="primary"
                          @click="cekkode_aktivasi"
                          style=" webkit-box-shadow: 0px 2px 7px 5px #D3D3D3;"
                          >AKTIVASI</v-btn
                        >
                        <router-link class="ok" :to="{ name: 'login' }">
                          <p class="mt-4 mb-0">Kembali ke halaman Login</p>
                        </router-link>
                      </v-col>
                      <br />
                    </v-row>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-stepper-content>
            <v-stepper-content step="2">
              <v-card>
                <div align="center" justify="center">
                  <v-img
                    width="200px"
                    src="https://cdn.siap.id/s3/simpkb/asset%20img/Guru-Berbagi/illustrasi/ilustrasi-verifikasi-email.png"
                  ></v-img>
                </div>
                <v-card-title
                  primary-title
                  class="justify-space-around mb-0 pb-0"
                >
                  <h3 class="tittle primary--text d-block text-center">
                    Aktivasi Surel Berhasil
                  </h3>
                </v-card-title>
                <v-card-text>
                  <p class="mt-2">
                    Informasi yang berkaitan dengan konten Guru Berbagi akan
                    diinfokan ke surel yang telah Anda daftarkan
                  </p>
                  <router-link class="ok" :to="{ name: 'login' }">
                    <p class="mt-4 mb-0">Kembali ke halaman Login</p>
                  </router-link>
                </v-card-text>
              </v-card>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VueRecaptcha from "vue-recaptcha";
export default {
  components: { VueRecaptcha },
  $_veeValidate: {
    validator: "new"
  },

  data() {
    return {
      st: 1,
      dialog: false,
      loading: false,
      kode_aktivasi: null
    };
  },
  activated() {
    this.dialog = false;
  },
  mounted() {
    this.checkQuery();
  },
  methods: {
    checkQuery() {
      if (this.$route.query.kode) {
        this.st = 1;
        this.kode_aktivasi = this.$route.query.kode;
        this.$nextTick(() => {
          this.aktivasi();
        });
      }
    },
    toLogin() {
      this.dialog = false;
      this.$router.push({
        name: "login"
      });
    },
    aktivasi() {
      this.$validator
        .validateAll("form")
        .then(res => {
          if (!res) return Promise.reject();
          return res;
        })
        .then(() => {
          return this.$store
            .dispatch("user/verifyEmail", {
              kode_verifikasi: this.kode_aktivasi
            })
            .then(res => {
              this.st = 2;
              return res;
            })
            .catch(e => e);
        })
        .catch(e => e);
    }
  }
};
</script>
