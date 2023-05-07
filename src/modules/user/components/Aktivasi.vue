<template>
  <v-container container--fluid>
    <v-row align="center" justify="center" v-if="isVerified">
      <v-col cols="12" sm="10" md="10" lg="10" xl="7">
        <v-row style="margin: 6% 0;">
          <v-col cols="12" sm="4" md="4" lg="4" class="pa-0 ma-0" style="background-color:#086baf">
            <v-card
              dark
              width="100%"
              tile
              flat
              img="https://cdn.siap.id/s3/simpkb/asset%20img/Guru-Berbagi/illustrasi/bg-register1.png"
            >
              <v-card-text>
                <div class="text-center title white--text pt-5">Ayo Mulai</div>
                <div class="text-center display-1 font-weight-bold white--text">Mendaftar</div>

                <div>
                  <blockquote
                    class="blockquote font-italic ma-2 white--text"
                  >" Setiap orang menjadi guru, setiap rumah menjadi sekolah. Pendidikan tak berhenti di bangunan sekolah saja, tapi juga di rumah, di jalan & di mana-mana "</blockquote>
                  <v-divider class="mx-5 my-2"></v-divider>
                  <p class="font-weight-bold text-center white--text">Ki Hajar Dewantara</p>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="8" md="8" lg="8" class="pa-0 ma-0">
            <v-card height="100%" tile flat>
              <v-card-text>
                <div id="daftar">
                  <v-row class="px-5">
                    <v-col cols="12">
                      <v-img
                        height="90"
                        contain
                        src="https://paspor-gtk.belajar.kemdikbud.go.id/casgpo/asset/img/logo-kemdikbud.png"
                        aspect-ratio="1"
                      ></v-img>
                      <p
                        class="text-center font-weight-bold headline black--text my-2 py-2"
                      >Tautan Aktivasi berhasil dikirimkan ke email!</p>
                      <v-divider></v-divider>
                    </v-col>
                    <v-col cols="12">
                      <p class="headline green--text">Selamat!</p>
                      <p
                        class="text-justify black--text"
                      >Surel Aktivasi telah Kami kirimkan ke Surel Anda. Silakan cek Surel Aktivasi tersebut di kotak masuk atau bagian spam surel Anda</p>
                      <p
                        class="black--text"
                      >Terima Kasih sudah ikut menjadi bagian dalam Program Guru Berbagi</p>
                      <p class="black--text text-left">
                        Salam Hangat,
                        <br />
                        <span class="font-weight-bold">Admin Guru Berbagi</span>
                      </p>
                      <v-divider></v-divider>
                    </v-col>
                  </v-row>
                  <v-row class="px-5">
                    <v-col cols="12" class="py-4 px-3">
                      <div class="text-right">
                        <v-btn
                          depressed
                          name="tutup"
                          text
                          @click="isVerified==false"
                          color="indigo--text"
                        >Belum menerima Surel Aktivasi? Kirim ulang</v-btn>&nbsp;
                        <v-btn
                          depressed
                          name="login"
                          @click="login()"
                          color="amber lighten-1 black--text"
                        >Masuk</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </div>
              </v-card-text>
              <v-card-actions></v-card-actions>
            </v-card>
            <v-card class="divanim rounded-card elevation-0 px-3" color="rgb(0, 0, 0, 0.0)">
              <v-card-text></v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row align="center" justify="center" v-else>
      <v-col cols="12" sm="10" md="10" lg="10" xl="7">
        <v-row style="margin: 6% 0;">
          <v-col cols="12" sm="4" md="4" lg="4" class="pa-0 ma-0" style="background-color:#086baf">
            <v-card
              dark
              width="100%"
              tile
              flat
              img="https://cdn.siap.id/s3/simpkb/asset%20img/Guru-Berbagi/illustrasi/bg-register1.png"
            >
              <v-card-text>
                <div class="text-center title white--text pt-5">Ayo Mulai</div>
                <div class="text-center display-1 font-weight-bold white--text">Mendaftar</div>

                <div>
                  <blockquote
                    class="blockquote font-italic ma-2 white--text"
                  >" Setiap orang menjadi guru, setiap rumah menjadi sekolah. Pendidikan tak berhenti di bangunan sekolah saja, tapi juga di rumah, di jalan & di mana-mana "</blockquote>
                  <v-divider class="mx-5 my-2"></v-divider>
                  <p class="font-weight-bold text-center white--text">Ki Hajar Dewantara</p>
                </div>
              </v-card-text>
              <div class="d-flex align-end"></div>
            </v-card>
          </v-col>
          <v-col cols="12" sm="8" md="8" lg="8" class="pa-0 ma-0">
            <v-card height="100%" tile flat>
              <v-card-text>
                <div id="daftar" :class="$vuetify.breakpoint.smAndUp?'px-5':''">
                  <v-row class="px-5">
                    <v-col cols="12">
                      <v-img
                        height="90"
                        contain
                        src="https://paspor-gtk.belajar.kemdikbud.go.id/casgpo/asset/img/logo-kemdikbud.png"
                        aspect-ratio="1"
                      ></v-img>
                      <p
                        class="text-center font-weight-bold headline black--text my-2 py-2"
                      >Kirim Ulang Surel Aktivasi</p>
                      <v-divider></v-divider>
                    </v-col>
                    <v-col cols="12">
                      <v-form
                        autocomplete="off"
                        @submit.prevent
                        data-vv-scope="form"
                        lazy-validation
                      >
                        <v-row>
                          <v-col cols="12">
                            <span
                              class="font-weight-bold black--text"
                            >Masukkan alamat surel Anda pada kolom surel di bawah ini dan klik KIRIM ULANG. Kemudian cek Surel Aktivasi di kotak masuk atau bagian spam surel Anda.</span>
                            <span class="error--text">&nbsp;*</span>
                            <v-text-field
                              outlined
                              dense
                              name="email"
                              type="text"
                              persistent-hint
                              hint="Pastikan menggunakan alamat Surel yang aktif"
                              color="primary"
                              background-color="white"
                              v-model="model.email"
                              data-vv-name="email"
                              data-vv-as="Surel"
                              v-validate="'required|email'"
                              :error-messages="errors.collect('form.email')"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <div>
                              <vue-recaptcha @verify="markRecaptchaAsVerified" :sitekey="sitekey"></vue-recaptcha>
                            </div>
                            <div>
                              <p class="error--text">{{ registerForm.pleaseTickRecaptchaMessage }}</p>
                            </div>
                            <div class="text-right">
                              <v-btn
                                depressed
                                name="login"
                                @click="save"
                                color="amber lighten-1  black--text"
                              >Kirim Ulang</v-btn>
                            </div>
                          </v-col>
                          <v-col cols="12"></v-col>
                        </v-row>
                      </v-form>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" class="py-4 px-3"></v-col>
                  </v-row>
                </div>
              </v-card-text>
              <v-card-actions></v-card-actions>
            </v-card>
            <v-card class="divanim rounded-card elevation-0 px-3" color="rgb(0, 0, 0, 0.0)">
              <v-card-text></v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import VueRecaptcha from "vue-recaptcha";
import { SITE_KEY, BASE_API } from "@/const";
export default {
  components: { VueRecaptcha },
  $_veeValidate: {
    validator: "new"
  },

  data() {
    return {
      loading: false,
      isVerified: false,
      model: {
        email: null,
        setuju: null
      },
      registerForm: {
        recaptchaVerified: false,
        pleaseTickRecaptchaMessage: ""
      }
    };
  },
  computed: {
    sitekey() {
      return SITE_KEY;
    }
  },
  mounted() {
    this.isVerified = false;
  },
  methods: {
    login() {
      this.isVerified = false;
      window.location.href = BASE_API;
    },
    // eslint-disable-next-line
    markRecaptchaAsVerified(response) {
      this.registerForm.pleaseTickRecaptchaMessage = "";
      this.registerForm.recaptchaVerified = true;
    },
    // eslint-disable-next-line
    checkIfRecaptchaVerified() {
      if (!this.registerForm.recaptchaVerified) {
        this.registerForm.pleaseTickRecaptchaMessage =
          "Mohon konfirmasi Anda bukan robot.";
        return true; // prevent form from submitting
      }
    },
    save() {
      this.checkIfRecaptchaVerified();
      this.$validator
        .validateAll("form")
        .then(res => {
          if (!res) return Promise.reject();
          return res;
        })
        .then(() => {
          if (this.registerForm.recaptchaVerified) {
            return this.$store
              .dispatch("user/aktivasi", { obj: this.model })
              .then(res => {
                this.isVerified = true;
                return res;
              })
              .catch(e => e);
          }
        })
        .catch(e => e);
    }
  }
};
</script>
