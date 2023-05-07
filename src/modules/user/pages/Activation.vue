<template>
  <v-layout class="primary" row fill-height align-center justify-center>
    <v-flex xl5 lg6 md8 sm8>
      <v-stepper v-model="st" class="ra-2">
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card text>
              <v-card-title primary-title>
                <span class="display-1 font-weight-light d-block">Aktivasi Akun</span>
              </v-card-title>
              <v-card-text>
                <v-form data-vv-scope="form-1" lazy-validation>
                  <v-layout column wrap>
                    <v-flex>
                      <v-text-field
                        label="Kode Verifikasi"
                        v-model="kode_verifikasi"
                        hint="Silakan masukkan kode verifikasi Anda*"
                        persistent-hint
                        data-vv-name="kode_verifikasi"
                        data-vv-as="Kode Verifikasi"
                        v-validate="'required'"
                        :error-messages="errors.collect('form-1.kode_verifikasi')"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :loading="loading" text color="success" @click="verify">Aktivasi</v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>
          <v-stepper-content step="2">
            <v-card>
              <v-card-text>
                <span class="display-1 font-weight-light d-block">Aktivasi berhasil</span>
                <p class="mt-3 mb-0">
                  <span class="title">Selamat, akun Anda telah aktif</span>
                  <br />Selanjutnya, silahkan login ke dalam aplikasi dengan cara menekan tombol Login di bawah ini
                </p>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-layout class="mt-2" justify-end>
                  <v-btn @click="login" text color="success">Login</v-btn>
                  <v-spacer></v-spacer>
                </v-layout>
              </v-card-actions>
            </v-card>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-flex>
  </v-layout>
</template>


<script>
import { BASE_API } from "@/const";
import MLoginBtn from "@/components/MLoginBtn";

export default {
  $_veeValidate: {
    validator: "new"
  },
  components: {
    MLoginBtn
  },
  data() {
    return {
      st: 1,
      kode_verifikasi: "",
      akun: {},
      loading: false
    };
  },
  mounted() {
    this.checkQuery();
  },
  methods: {
    login() {
      window.location.href = BASE_API;
    },
    verify() {
      this.$validator
        .validateAll("form-1")
        .then(res => {
          if (!res) return Promise.reject();
        })
        .then(() => {
          this.loading = true;
          this.$store
            .dispatch("user/verify", { kode_verifikasi: this.kode_verifikasi })
            .then(res => {
              this.loading = false;
              res.id ? this.st++ : Promise.reject;
            })
            .catch(() => {
              this.loading = false;
            });
        })
        .catch(e => e);
    },
    checkQuery() {
      if (this.$route.query.kode) {
        this.kode_verifikasi = this.$route.query.kode;
        // clean query
        window.history.replaceState({}, document.title, "/verifikasi");
        // langsung lakukan verifikasi
        this.$nextTick(() => {
          this.verify();
        });
      } else {
        this.kode_verifikasi = null;
      }
    }
  }
};
</script>
