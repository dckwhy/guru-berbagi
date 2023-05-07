<template>
  <v-container container--fluid>
    <v-row align="center" justify="center">
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
                      <div
                        class="
                          text-center
                          font-weight-bold
                          headline
                          black--text
                          my-2
                        "
                      >
                        Pilih Peran Kontributor
                      </div>
                    </v-col>
                  </v-row>

                  <v-row justify="center" align="center">
                    <v-col md="10" lg="10">
                      <v-alert text type="info">
                        Kontributor dibagi menjadi dua yaitu
                        <b> Kontributor Personal </b> dan
                        <b> Kontributor Komunitas. </b> Silahkan pilih peran
                        Anda untuk mendaftar
                      </v-alert>
                    </v-col>
                  </v-row>

                  <v-row justify="center" align="center">
                    <v-col md="8" lg="10">
                      <v-row>
                        <v-col md="6" lg="6">
                          <v-hover v-slot="{ hover }" close-delay="100">
                            <v-card
                              class="mx-auto text-center rounded-xl"
                              @click="toPersonal"
                              :elevation="hover ? 20 : 0"
                              :class="{ 'on-hover': hover }"
                            >
                              <v-img
                                src="https://cdn.siap.id/s3/simpkb/asset%20img/Guru-Berbagi/illustrasi/Personal-kontributor.png"
                                height="200px"
                                class="rounded-xl"
                              ></v-img>

                              <v-card-title class="justify-center"
                                >Personal</v-card-title
                              >

                              <v-card-subtitle>
                                User mendaftar dan berkontibusi secara personal
                                pada aplikasi guru berbagi
                              </v-card-subtitle>

                              <v-card-subtitle>
                                <v-btn block color="success">PILIH PERAN</v-btn>
                              </v-card-subtitle>
                            </v-card>
                          </v-hover>
                        </v-col>

                        <v-col md="6" lg="6">
                          <v-hover v-slot="{ hover }" close-delay="100">
                            <v-card
                              class="mx-auto text-center rounded-xl"
                              @click="toKomunitas"
                              :elevation="hover ? 20 : 0"
                              :class="{ 'on-hover': hover }"
                            >
                              <v-img
                                src="https://cdn.siap.id/s3/simpkb/asset%20img/Guru-Berbagi/illustrasi/Komunitas-kontributor.png"
                                height="200px"
                                class="rounded-xl"
                              ></v-img>

                              <v-card-title class="justify-center">
                                Komunitas
                              </v-card-title>

                              <v-card-subtitle>
                                User mendaftar dan berkontibusi secara Tim pada
                                aplikasi guru berbagi
                              </v-card-subtitle>
                              <v-card-subtitle>
                                <v-btn block color="success">PILIH PERAN</v-btn>
                              </v-card-subtitle>
                            </v-card>
                          </v-hover>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" class="py-4 px-3">
                      <v-divider></v-divider>
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
  </v-container>
</template>

<style scoped>
.v-card.on-hover {
  box-shadow: 0px 0px 27px 5px rgba(160, 155, 255, 0.301) !important;
}
</style>

<script>
export default {
  data() {
    return {};
  },

  methods: {
    toPersonal() {
      this.$router.push({
        name: "user.registrasi.personal",
      });
    },
    toKomunitas() {
      this.$router.push({
        name: "user.registrasi.komunitas",
      });
    },
  },
};
</script>
