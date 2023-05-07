<template>
  <v-container container--fluid>
    <v-row align="center" justify="center" v-if="isRegistered">
      <v-col cols="12" sm="10" md="10" lg="10" xl="7">
        <v-row style="margin: 6% 0;">
          <v-col
            cols="12"
            sm="4"
            md="4"
            lg="4"
            class="pa-0 ma-0"
            style="background-color:#086baf"
          >
            <v-card
              width="100%"
              tile
              flat
              img="https://cdn.siap.id/s3/simpkb/asset%20img/Guru-Berbagi/illustrasi/bg-register1.png"
            >
              <v-card-text>
                <div class="text-center title white--text pt-5">Ayo Mulai</div>
                <div class="text-center display-1 font-weight-bold white--text">
                  Mendaftar
                </div>

                <div>
                  <blockquote class="blockquote font-italic ma-2 white--text">
                    " Setiap orang menjadi guru, setiap rumah menjadi sekolah.
                    Pendidikan tak berhenti di bangunan sekolah saja, tapi juga
                    di rumah, di jalan & di mana-mana "
                  </blockquote>
                  <v-divider class="mx-5 my-2"></v-divider>
                  <p class="font-weight-bold text-center white--text">
                    Ki Hajar Dewantara
                  </p>
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
                      >
                        Pendaftaran Akun Berhasil!
                      </p>
                      <v-divider></v-divider>
                    </v-col>
                    <v-col cols="12">
                      <p class="headline green--text">Selamat!</p>
                      <p class="text-justify black--text">
                        Akun Anda sudah terdaftar Program Guru Berbagi
                        Kemendikbud. Silakan lakukan langkah berikut untuk
                        mengaktivasi akun Anda:
                      </p>
                      <ol class="black--text">
                        <li>
                          Lakukan pengecekan surel balasan dari kami untuk
                          sesuai dengan alamat surel Anda
                          <span class="font-weight-bold indigo--text">{{
                            pVal(user, "email")
                          }}</span
                          >, pastikan untuk cek di kotak masuk atau bagian spam.
                        </li>
                        <li>
                          Kemudian ikuti petunjuk dalam surel untuk aktivasi.
                        </li>
                        <li>
                          Setelah proses Aktivasi berhasil, kemudian masuk ke
                          halaman situs
                          <a
                            href=" https://guruberbagi.kemdikbud.go.id/"
                            class="indigo--text"
                            >https://guruberbagi.simpkb.id/</a
                          >
                          untuk segera melengkapi Profil Anda
                        </li>
                      </ol>
                      <br />
                      <p class="black--text">
                        Terima Kasih sudah ikut menjadi bagian dalam Program
                        Guru Berbagi
                      </p>
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
                          @click="toAktivasi()"
                          color="indigo--text"
                          >Belum menerima Surel Aktivasi? Kirim ulang</v-btn
                        >&nbsp;
                        <v-btn
                          depressed
                          name="login"
                          @click="login()"
                          color="amber lighten-1 black--text"
                          >Masuk</v-btn
                        >
                      </div>
                    </v-col>
                  </v-row>
                </div>
              </v-card-text>
              <v-card-actions></v-card-actions>
            </v-card>
            <v-card
              class="divanim rounded-card elevation-0 px-3"
              color="rgb(0, 0, 0, 0.0)"
            >
              <v-card-text></v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row align="center" justify="center" v-else>
      <v-col cols="12" sm="10" md="10" lg="10" xl="7">
        <v-row style="margin: 6% 0;">
          <v-col
            cols="12"
            sm="4"
            md="4"
            lg="4"
            class="pa-0 ma-0"
            style="background-color:#086baf"
          >
            <v-card
              dark
              width="100%"
              tile
              flat
              img="https://cdn.siap.id/s3/simpkb/asset%20img/Guru-Berbagi/illustrasi/bg-register1.png"
            >
              <v-card-text>
                <div class="text-center title white--text pt-5">Ayo Mulai</div>
                <div class="text-center display-1 font-weight-bold white--text">
                  Mendaftar
                </div>

                <div>
                  <blockquote class="blockquote font-italic ma-2 white--text">
                    " Setiap orang menjadi guru, setiap rumah menjadi sekolah.
                    Pendidikan tak berhenti di bangunan sekolah saja, tapi juga
                    di rumah, di jalan & di mana-mana "
                  </blockquote>
                  <v-divider class="mx-5 my-2"></v-divider>
                  <p class="font-weight-bold text-center white--text">
                    Ki Hajar Dewantara
                  </p>
                </div>
              </v-card-text>
              <div class="d-flex align-end"></div>
            </v-card>
          </v-col>
          <v-col cols="12" sm="8" md="8" lg="8" class="pa-0 ma-0">
            <v-card height="100%" tile flat>
              <v-card-text>
                <div
                  id="daftar"
                  :class="$vuetify.breakpoint.smAndUp ? 'px-5' : ''"
                >
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
                      >
                        Daftar Akun Guru Berbagi
                      </p>
                      <v-divider></v-divider>
                    </v-col>
                    <v-col cols="12">
                      <v-alert class="amber--text" text prominent>
                        <template>
                          <v-row align="center">
                            <v-col class="shrink">
                              <v-avatar size="55" color="orange lighten-4">
                                <v-icon color="orange" size="30"
                                  >mdi-book-open-variant</v-icon
                                >
                              </v-avatar>
                            </v-col>
                            <v-col class="grow">
                              <p class="font-weight-bold my-0 py-0 black--text">
                                SOP Registrasi dan Aktivasi Akun
                              </p>
                              <span class="black--text caption mt-0 pt-0"
                                >Bagi yang mempunyai akun SIMPKB bisa login ke
                                aplikasi tanpa melakukan pendaftaran</span
                              >
                            </v-col>
                            <v-col class="shrink">
                              <m-button
                                small
                                class="my-2 white--text"
                                depressed
                                color="orange darken-1"
                                textButton="Lihat SOP"
                                action="lihatSOP"
                                @lihatSOP="lihatSOP"
                              ></m-button>
                            </v-col>
                          </v-row>
                        </template>
                      </v-alert>
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
                            <span class="font-weight-bold black--text"
                              >Nama</span
                            >
                            <span class="error--text">&nbsp;*</span>
                            <v-text-field
                              outlined
                              dense
                              name="nama"
                              type="text"
                              persistent-hint
                              hint="Nama sesuai dengan identitas Anda"
                              color="primary"
                              background-color="white"
                              v-model="model.name"
                              data-vv-name="nama"
                              data-vv-as="Nama"
                              v-validate="'required'"
                              :error-messages="errors.collect('form.nama')"
                            ></v-text-field>
                            <span class="font-weight-bold black--text"
                              >Surel</span
                            >
                            <span class="error--text">&nbsp;*</span>
                            <v-text-field
                              outlined
                              dense
                              name="email"
                              type="text"
                              persistent-hint
                              hint="Pastikan Surel Aktif dan tidak diizinkan menggunakan Surel @guruku.id atau @siap.id"
                              color="primary"
                              background-color="white"
                              v-model="model.email"
                              data-vv-name="email"
                              data-vv-as="Surel"
                              v-validate="'required|email|notguruku'"
                              :error-messages="errors.collect('form.email')"
                            ></v-text-field>
                            <span class="font-weight-bold black--text"
                              >Kata Sandi</span
                            >
                            <span class="error--text">&nbsp;*</span>
                            <v-text-field
                              outlined
                              dense
                              :append-icon="appendIcon"
                              @click:append="switchVisibility"
                              ref="password"
                              :type="passwordFieldType"
                              placeholder="Kata Sandi"
                              v-model="model.password"
                              hint="Kata Sandi"
                              data-vv-name="password"
                              data-vv-as="Kata Sandi"
                              v-validate="'required|min:6'"
                              :error-messages="errors.collect('form.password')"
                            ></v-text-field>
                            <span class="font-weight-bold black--text"
                              >Konfirmasi Kata Sandi</span
                            >
                            <span class="error--text">&nbsp;*</span>
                            <v-text-field
                              outlined
                              dense
                              :append-icon="appendIcon"
                              @click:append="switchVisibility"
                              :type="passwordFieldType"
                              placeholder="Konfirmasi Kata Sandi"
                              v-model="model.password_confirmation"
                              hint="Konfirmasi Kata Sandi"
                              data-vv-name="password_confirmation"
                              data-vv-as="Konfirmasi Kata Sandi"
                              v-validate="'required|min:6|confirmed:password'"
                              :error-messages="
                                errors.collect('form.password_confirmation')
                              "
                            ></v-text-field>
                            <span class="font-weight-bold black--text"
                              >Pekerjaan / Profesi</span
                            >
                            <span class="error--text">&nbsp;*</span>
                            <v-select
                              v-model="model.profesi"
                              :items="itemsProfesis"
                              outlined
                              dense
                              name="pekerjaan"
                              placeholder="Pilih Pekerjaan / Profesi"
                              persistent-hint
                              hint="Pilih Pekerjaan / Profesi Anda"
                              data-vv-name="profesi"
                              data-vv-as="Pekerjaan dan Profesi"
                              v-validate="'required'"
                              :error-messages="errors.collect('form.profesi')"
                            ></v-select>
                            <span class="font-weight-bold black--text"
                              >Organisasi / Instansi</span
                            >
                            <span class="error--text">&nbsp;*</span>
                            <v-text-field
                              outlined
                              dense
                              name="organisasi"
                              type="text"
                              persistent-hint
                              placeholder="Masukkan organisasi Anda"
                              hint="Maksimal 50 karakter"
                              color="primary"
                              background-color="white"
                              v-model="model.organisasi"
                              data-vv-name="organisasi"
                              data-vv-as="Organisasi"
                              v-validate="'required:max:50'"
                              :error-messages="
                                errors.collect('form.organisasi')
                              "
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <div>
                              <vue-recaptcha
                                @verify="markRecaptchaAsVerified"
                                :sitekey="sitekey"
                              ></vue-recaptcha>
                            </div>
                            <div>
                              <p class="error--text">
                                {{ registerForm.pleaseTickRecaptchaMessage }}
                              </p>
                            </div>
                            <div class="text-right">
                              <m-button
                                text
                                class="my-2 mr-2"
                                depressed
                                color="grey"
                                textButton="Kembali"
                                action="toPilihPeran"
                                @toPilihPeran="toPilihPeran"
                              ></m-button>
                              <m-button
                                class="my-2 white--text"
                                depressed
                                color="blue"
                                textButton="Daftar Sekarang"
                                action="save"
                                @save="save"
                              ></m-button>
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
            <v-card
              class="divanim rounded-card elevation-0 px-3"
              color="rgb(0, 0, 0, 0.0)"
            >
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
import { SITE_KEY, BASE_API, SOP_REGISTRASI } from "@/const";
import { Validator } from "vee-validate";
Validator.extend("notguruku", {
  getMessage: field =>
    "Tidak diizinkan menggunakan " + field + " @guruku.id atau @siap.id.",
  validate: value => {
    var strongRegex = new RegExp("^((?!guruku.id|siap.id).)*$");
    return strongRegex.test(value);
  }
});
export default {
  components: { VueRecaptcha },
  $_veeValidate: {
    validator: "new"
  },

  data() {
    return {
      loading: false,
      isRegistered: false,
      appendIcon: "mdi-eye-off",
      passwordFieldType: "password",
      itemsProfesis: [
        "Praktisi Pendidikan",
        "Widyaiswara",
        "Dosen",
        "Relawan Pendidikan"
      ],
      user: null,
      linkSop: SOP_REGISTRASI,
      model: {
        name: null,
        email: null,
        password: null,
        profesi: null,
        organisasi: null,
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
    // this.model.setuju = null;
    this.user = null;
    this.isRegistered = false;
  },
  methods: {
    login() {
      // this.model.setuju = null;
      //this.isRegistered = false;
      window.location.href = BASE_API;
    },
    lihatSOP() {
      window.open(this.linkSop, "_blank");
    },
    toPilihPeran() {
      this.$router.push({
        name: "user.registrasi"
      });
    },
    toAktivasi() {
      this.$router.push({
        name: "user.aktivasi"
      });
    },
    switchVisibility() {
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
      this.passwordFieldType === "password"
        ? (this.appendIcon = "mdi-eye-off")
        : (this.appendIcon = "mdi-eye");
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
          if (
            this.registerForm.recaptchaVerified
            // this.model.setuju == true
          ) {
            return this.$store
              .dispatch("user/register", { obj: this.model })
              .then(res => {
                // this.model.setuju = null;
                this.isRegistered = true;
                this.user = res;
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
