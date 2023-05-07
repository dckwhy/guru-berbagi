<template>
  <v-container container--fluid>
    <v-row align="center" justify="center" v-if="isRegistered">
      <v-col cols="12" sm="10" md="10" lg="10" xl="7">
        <v-row style="margin: 6% 0">
          <v-col
            cols="12"
            sm="4"
            md="4"
            lg="4"
            class="pa-0 ma-0"
            style="background-color: #086baf"
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
                        class="
                          text-center
                          font-weight-bold
                          headline
                          black--text
                          my-2
                          py-2
                        "
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
                        <li>
                          Abaikan tahap diatas jika akun Anda sudah terdaftar di
                          SIMPKB atau Program Guru Berbagi
                        </li>
                        <li>
                          Lakukan verifikasi pendaftaran komunitas dengan login
                          menggunakan akun Anda.
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
                          name="login"
                          @click="login()"
                          class="white--text"
                          color="blue darken-2 lighten-1"
                          >Login dan Verifikasi
                          <v-icon>mdi-arrow-right</v-icon></v-btn
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
        <v-row style="margin: 6% 0">
          <v-col
            cols="12"
            sm="12"
            md="4"
            lg="4"
            class="pa-0 ma-0"
            style="background-color: #086baf"
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
          <v-col cols="12" sm="12" md="8" lg="8" class="pa-0 ma-0">
            <v-card height="100%" tile flat>
              <v-card-text>
                <div
                  id="daftar"
                  :class="$vuetify.breakpoint.smAndUp ? 'px-5' : ''"
                >
                  <v-row class="px-5">
                    <!-- Logo dan Judul Halaman -->
                    <v-col cols="12">
                      <v-img
                        height="90"
                        contain
                        src="https://paspor-gtk.belajar.kemdikbud.go.id/casgpo/asset/img/logo-kemdikbud.png"
                        aspect-ratio="1"
                      >
                      </v-img>
                      <p
                        class="
                          text-center
                          font-weight-bold
                          headline
                          black--text
                          my-2
                          py-2
                        "
                      >
                        Daftar Akun Guru Berbagi
                      </p>
                      <v-divider></v-divider>
                    </v-col>

                    <!-- alert SOP Registrasi -->
                    <!-- <v-col cols="12">
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
                                block
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
                    </v-col> -->
                    <v-col cols="12">
                      <v-alert class="amber--text" text prominent>
                        <v-row align="center">
                          <v-col
                            class="d-none d-md-flex"
                            cols="12"
                            sm="12"
                            md="2"
                          >
                            <v-avatar size="55" color="orange lighten-4">
                              <v-icon color="orange" size="30"
                                >mdi-book-open-variant</v-icon
                              >
                            </v-avatar>
                          </v-col>
                          <v-col cols="12" sm="12" md="8">
                            <p class="font-weight-bold my-0 py-0 black--text">
                              SOP Registrasi dan Aktivasi Akun
                            </p>
                            <span class="black--text caption mt-0 pt-0"
                              >Bagi yang mempunyai akun SIMPKB bisa login ke
                              aplikasi tanpa melakukan pendaftaran</span
                            >
                          </v-col>
                          <v-col cols="12" sm="2" md="2">
                            <m-button
                              block
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
                      </v-alert>
                    </v-col>

                    <!-- Form Registrasi -->
                    <v-col cols="12">
                      <v-form
                        autocomplete="off"
                        @submit.prevent
                        data-vv-scope="form"
                        lazy-validation
                      >
                        <v-row>
                          <!-- Registrasi Komunitas -->
                          <v-col cols="12" class="py-0 my-0">
                            <p
                              class="title blue--text text--darken-3 my-0 py-0"
                            >
                              Registrasi Komunitas
                            </p>
                          </v-col>
                          <v-col cols="12" class="py-0 my-0">
                            <span class="font-weight-bold black--text"
                              >Nama Komunitas</span
                            >
                            <span class="error--text">&nbsp;*</span>
                            <v-text-field
                              outlined
                              dense
                              color="primary"
                              background-color="white"
                              v-model="model.nama_komunitas"
                              data-vv-name="nama_komunitas"
                              data-vv-as="Nama Komunitas"
                              v-validate="'required'"
                              single-line
                              :error-messages="
                                errors.collect('form.nama_komunitas')
                              "
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="12"
                            md="6"
                            lg="6"
                            class="py-0 my-0"
                          >
                            <span class="font-weight-bold black--text"
                              >Tipe Komunitas</span
                            >
                            <span class="error--text">&nbsp;*</span>
                            <v-select
                              v-model="model.tipe_komunitas_id"
                              :items="itemTipeKomunitas"
                              outlined
                              dense
                              placeholder="Pilih Tipe Komunitas"
                              persistent-hint
                              hint=""
                              item-text="keterangan"
                              item-value="id"
                              data-vv-name="tipe komunitas"
                              data-vv-as="Tipe Komunitas"
                              v-validate="'required'"
                              :error-messages="
                                errors.collect('form.tipe komunitas')
                              "
                            ></v-select>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="12"
                            md="6"
                            lg="6"
                            class="py-0 my-0"
                          >
                            <span class="font-weight-bold black--text"
                              >Waktu</span
                            >
                            <span class="error--text">&nbsp;*</span>
                            <m-datepicker
                              dense
                              single-line
                              outlined
                              label="Tanggal Berdiri"
                              v-model="model.tanggal_berdiri"
                              hint="Tanggal Berdiri"
                              data-vv-name="tanggal"
                              data-vv-as="Tanggal Berdiri"
                              v-validate.persist="'required'"
                              :error-messages="errors.collect('form.tanggal')"
                            ></m-datepicker>
                          </v-col>
                          <v-col cols="12">
                            <span class="font-weight-bold black--text"
                              >Ruang Lingkup Komunitas</span
                            >
                            <span class="error--text">&nbsp;*</span>
                            <v-row no-gutters class="mt-2">
                              <v-col
                                cols="12"
                                sm="6"
                                md="4"
                                lg="4"
                                v-for="lingkup in itemLingkups"
                                :key="lingkup.index"
                              >
                                <v-checkbox
                                  class="my-0 py-0"
                                  color="green"
                                  v-model="model.lingkup"
                                  :label="lingkup.keterangan"
                                  :value="lingkup"
                                >
                                  <template>aaa</template></v-checkbox
                                >
                              </v-col>
                            </v-row>
                          </v-col>

                          <!-- Narahubung Komunitas -->
                          <v-col cols="12" class="py-0 my-0">
                            <p
                              class="title blue--text text--darken-3 my-0 py-0"
                            >
                              Narahubung Komunitas
                            </p>
                          </v-col>
                          <v-col cols="12" class="py-0 my-0">
                            <span class="font-weight-bold black--text"
                              >Nama Lengkap</span
                            >
                            <span class="error--text">&nbsp;*</span>
                            <v-text-field
                              outlined
                              dense
                              name="nama"
                              type="text"
                              persistent-hint
                              hint=""
                              color="primary"
                              background-color="white"
                              v-model="model.name"
                              data-vv-name="nama"
                              data-vv-as="Nama"
                              v-validate="'required'"
                              single-line
                              :error-messages="errors.collect('form.nama')"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" class="py-0 my-0">
                            <span class="font-weight-bold black--text"
                              >Surel</span
                            >
                            <span class="error--text">&nbsp;*</span>
                            <v-text-field
                              outlined
                              dense
                              name="email"
                              type="text"
                              hint="Pastikan Surel Aktif"
                              color="primary"
                              background-color="white"
                              v-model="model.email"
                              data-vv-name="email"
                              data-vv-as="Surel"
                              v-validate="'required|email'"
                              :error-messages="errors.collect('form.email')"
                            ></v-text-field>
                            <p
                              v-if="statusAkun.status != 9"
                              class="info--text mt-0 pt-0"
                            >
                              <m-alert
                                v-if="statusAkun.status == 1"
                                show
                                color="red red--text body-2"
                              >
                                <template v-slot:default>
                                  Akun Anda telah terdaftar di Guru Berbagi
                                  dengan peran
                                  <b>{{ statusAkun.data.peran.name }}</b
                                  >. <br />
                                  Silakan gunakan email lain atau jika Anda
                                  melanjutkan pendaftaran, peran akun Anda akan
                                  diubah menjadi peran <b>Komunitas</b>
                                </template>
                              </m-alert>
                              <m-alert
                                v-else
                                show
                                color="blue blue--text body-2"
                              >
                                <template v-slot:default>
                                  Akun menggunakan Password Akun SIMPKB Anda
                                </template>
                              </m-alert>
                            </p>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="12"
                            md="6"
                            lg="6"
                            class="py-0 my-0"
                          >
                            <span class="font-weight-bold black--text"
                              >Nomor Ponsel</span
                            >
                            <span class="error--text">&nbsp;*</span>
                            <v-text-field
                              outlined
                              dense
                              name="no_hp"
                              type="text"
                              color="primary"
                              background-color="white"
                              v-model="model.no_hp"
                              data-vv-name="no_hp"
                              data-vv-as="Nomor Ponsel"
                              v-validate="'required|numeric'"
                              :error-messages="errors.collect('form.no_hp')"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="12"
                            md="6"
                            lg="6"
                            class="py-0 my-0"
                          >
                            <span class="font-weight-bold black--text"
                              >Jabatan di Komunitas</span
                            >
                            <span class="error--text">&nbsp;*</span>
                            <v-text-field
                              outlined
                              dense
                              name="jabatan"
                              type="text"
                              color="primary"
                              background-color="white"
                              v-model="model.jabatan"
                              data-vv-name="jabatan"
                              data-vv-as="Jabatan Komunitas"
                              v-validate="'required'"
                              :error-messages="errors.collect('form.jabatan')"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="12"
                            md="6"
                            lg="6"
                            class="py-0 my-0"
                            v-if="statusAkun.status == 9"
                          >
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
                          </v-col>
                          <v-col
                            cols="12"
                            sm="12"
                            md="6"
                            lg="6"
                            class="py-0 my-0"
                            v-if="statusAkun.status == 9"
                          >
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
                            <v-divider></v-divider>
                            <div
                              class="text-center text-md-right text-lg-right"
                            >
                              <m-button
                                text
                                class="my-2 mr-2 order-sm-1"
                                depressed
                                color="grey"
                                textButton="Kembali"
                                action="toPilihPeran"
                                @toPilihPeran="toPilihPeran"
                              ></m-button>
                              <m-button
                                class="my-2 white--text order-sm-0"
                                depressed
                                color="blue"
                                textButton="Daftar Sekarang"
                                action="save"
                                @save="save"
                              ></m-button>
                            </div>
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-col>
                  </v-row>
                </div>
              </v-card-text>
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
import { debounce } from "debounce";

export default {
  components: { VueRecaptcha },
  $_veeValidate: {
    validator: "new",
  },

  data() {
    return {
      loading: false,
      isRegistered: false,
      appendIcon: "mdi-eye-off",
      statusAkun: {
        status: 9,
      },
      passwordFieldType: "password",
      itemsProfesis: [
        "Praktisi Pendidikan",
        "Widyaiswara",
        "Dosen",
        "Relawan Pendidikan",
      ],
      user: null,
      linkSop: SOP_REGISTRASI,
      model: {
        name: null,
        email: null,
        password: null,
        profesi: null,
        organisasi: null,
        setuju: null,
        lingkup: [],
      },
      registerForm: {
        recaptchaVerified: false,
        pleaseTickRecaptchaMessage: "",
      },
      selected: [],
      itemLingkups: [],
      itemTipeKomunitas: [],
    };
  },
  computed: {
    sitekey() {
      return SITE_KEY;
    },
  },
  mounted() {
    this.statusAkun = { status: 9 };
    this.user = null;
    this.isRegistered = false;
    this.loadTipe();
    this.loadLingkup();
  },
  methods: {
    debounceInput: debounce(function () {
      if (this.model.email) {
        if (this.isLoading) return;

        this.isLoading = true;

        return this.$store
          .dispatch("user/cekAkun", this.model.email)
          .then((res) => {
            this.statusAkun = res;
          })
          .catch((e) => e)
          .finally(() => (this.isLoading = false));
      }
    }, 1200),
    loadTipe() {
      return this.$store
        .dispatch("user/getTipe")
        .then((res) => {
          this.itemTipeKomunitas = res;
        })
        .catch((e) => e);
    },
    loadLingkup() {
      return this.$store
        .dispatch("user/getLingkup")
        .then((res) => {
          this.itemLingkups = res;
        })
        .catch((e) => e);
    },
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
        name: "user.registrasi",
      });
    },
    toAktivasi() {
      this.$router.push({
        name: "user.aktivasi",
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
        .then((res) => {
          if (!res) return Promise.reject();
          return res;
        })
        .then(() => {
          if (
            this.registerForm.recaptchaVerified
            // this.model.setuju == true
          ) {
            this.model.role_id = 4;
            return this.$store
              .dispatch("user/registerKomunitas", { obj: this.model })
              .then((res) => {
                // this.model.setuju = null;
                this.isRegistered = true;
                this.user = res;
                return res;
              })
              .catch((e) => e);
          }
        })
        .catch((e) => e);
    },
  },
  watch: {
    "model.email": function (n) {
      if (n.includes("@")) {
        this.debounceInput();
      }
    },
  },
};
</script>
