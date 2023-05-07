<template>
  <div ref="subscribe" class="text-center" fill-height fluid>
    <v-dialog persistent v-model="dialog" width="700">
      <template v-slot:activator="{}"></template>
      <v-stepper v-model="step" class="ra-2">
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card class="pa-5 text-center rounded-lg">
              <div class="center" align="center" justify="center">
                <img
                  height="125"
                  src="https://cdn.siap.id/s3/simpkb/asset%20img/Guru-Berbagi/illustrasi/ilustrasi-verifikasi-email.png"
                  alt
                />
              </div>
              <p class="title mt-5">
                Verifikasi Alamat Surel Aktif
              </p>
              <p class="black--text mb-0 pb-0">
                Untuk menikmati layanan dan informasi terbaru kami, dimohon
                untuk mengisikan alamat surel (email) yang masih aktif dan biasa
                Anda gunakan. <br />Terima kasih
              </p>
              <v-card-text class="my-0 pb-2"> </v-card-text>
              <v-form
                autocomplete="false"
                @submit.prevent
                data-vv-scope="form"
                lazy-validation
              >
                <v-row no-gutters>
                  <v-col cols="12">
                    <v-text-field
                      class="mx-1"
                      id="surel"
                      outlined
                      dense
                      autocomplete="false"
                      name="Surel"
                      placeholder="Masukkan alamat surel aktif"
                      label="Surel"
                      v-model="email"
                      persistent-hint
                      data-vv-name="email"
                      data-vv-as="Surel"
                      v-validate="'required|email'"
                      :error-messages="errors.collect('form.email')"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-form>
              <div align="center">
                <m-button
                  class="mx-1"
                  :small="$vuetify.breakpoint.smAndDown ? true : false"
                  textButton="Subscribe"
                  icon=""
                  action="setAlternatifEmail"
                  @setAlternatifEmail="setAlternatifEmail"
                ></m-button>
              </div>
            </v-card>
          </v-stepper-content>
          <v-stepper-content step="2">
            <v-card class="pa-5 text-center rounded-lg">
              <div class="center" align="center" justify="center">
                <img
                  height="125"
                  src="https://cdn.siap.id/s3/simpkb/asset%20img/Guru-Berbagi/illustrasi/ilustrasi-verifikasi-email.png"
                  alt
                />
              </div>
              <p class="title mt-5">
                Verifikasi Alamat Surel Berhasil
              </p>
              <p class="black--text mb-0 pb-0">
                Silakan cek surel (email) Anda untuk melakukan aktivasi.
              </p>
              <v-card-text class="my-0 pb-2"> </v-card-text>

              <div align="center">
                <m-button
                  class="mx-1"
                  :small="$vuetify.breakpoint.smAndDown ? true : false"
                  textButton="Oke"
                  icon=""
                  action="close"
                  @close="(dialog = false), (step = 1)"
                ></m-button>
              </div>
            </v-card>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      step: 1,
      dialog: false,
      email: null
    };
  },
  methods: {
    open() {
      this.dialog = false;
      // this.dialog =
      //  this.user.alt_email && this.user.alt_email_verified_at ? false : true;
    },
    setAlternatifEmail() {
      var user = { ...this.user };
      user.alt_email = this.email;
      this.$validator
        .validateAll("form")
        .then(res => {
          if (!res) return Promise.reject();
          return res;
        })
        .then(() => {
          return this.$store
            .dispatch("user/update", user)
            .then(res => {
              this.step = 2;
              if (res.error) {
                this.$error("Profil gagal diperbarui");
              } else {
                this.$info("Profil berhasil diperbarui");
              }
            })
            .catch(e => e);
        });
    }
  },
  computed: {
    user() {
      return this.$store.getters["user/user"];
    }
  }
};
</script>
