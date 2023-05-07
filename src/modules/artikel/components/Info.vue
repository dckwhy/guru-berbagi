<template>
  <div class="text-center">
    <v-dialog
      scrollable
      content-class="custom-dialog"
      persistent
      v-model="dialog"
      ref="dlgInfo"
      width="750"
    >
      <template v-slot:activator="{}"></template>

      <v-card>
        <v-card-title class="primary headline white--text"
          >Informasi Penting</v-card-title
        >

        <v-card-text class="my-0 py-0">
          <v-row>
            <v-col cols="12" sm="12" md="12" lg="12" xl="12" class="my-0 py-0">
              <p class="black--text title mt-2">
                Apakah Anda sudah membaca SOP?
              </p>
              <m-alert show color="red red--text body-2">
                <template v-slot:default>
                  Mohon baca informasi berikut ini untuk menjadi perhatian
                  sebelum Anda membuat Konten
                </template>
              </m-alert>
              <br />
              <div class="text-left black--text">
                <ol>
                  <li class="body-1">
                    Pelaku plagiarisme dapat dijerat dengan ancaman pidana
                    menurut Pasal 72 ayat (1) UUHC dengan dipidana penjara
                    paling lama 7 (tujuh) tahun dan/atau denda paling banyak
                    Rp5.000.000.000,00 (lima miliar rupiah).
                  </li>
                  <li class="body-1">
                    Setiap Orang yang dengan sengaja dan tanpa hak menyebarkan
                    informasi yang ditujukan untuk menimbulkan rasa kebencian
                    atau permusuhan individu dan/atau kelompok masyarakat
                    tertentu berdasarkan atas suku, agama, ras, dan
                    antargolongan (SARA) sebagaimana dimaksud dalam Pasal 28
                    ayat (2) dipidana dengan pidana penjara paling lama 6 (enam)
                    tahun dan/atau denda paling banyak Rp 1 miliar.
                  </li>
                  <li class="body-1">
                    Tidak menyebarkan ideologi yang bertentangan dengan
                    Pancasila.
                  </li>
                </ol>
                <v-divider class="my-2"></v-divider>
                <p class="black--text">
                  <v-checkbox
                    v-model="setuju"
                    class="mx-2"
                    dense
                    color="teal"
                    name="setuju"
                    label=""
                    data-vv-name="setuju"
                    data-vv-as="Persetujuan"
                    v-validate="'required'"
                    :error-messages="errors.collect('form.setuju')"
                  >
                    <template v-slot:label>
                      <div class="body-2 teal--text">
                        Saya sudah membaca, paham dan menyetujui bahwa konten
                        yang saya buat tidak ada unsur-unsur yang tidak
                        diperbolehkan sesuai informasi diatas.
                      </div>
                    </template></v-checkbox
                  >
                </p>
              </div>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="ma-2"
            color="grey white--text"
            text
            @click="dialog = false"
            >Batal</v-btn
          >
          <v-btn
            class="ma-2"
            :disabled="!setuju"
            color="primary white--text"
            @click="closeGuide"
            >Saya paham dan Setuju</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      setuju: false
    };
  },

  methods: {
    // eslint-disable-next-line
    open(obj) {
      this.dialog = true;
      this.setuju = false;
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
        this.dialog = true;
      });
    },

    closeGuide() {
      this.dialog = false;
      this.resolve();
    }
  }
};
</script>
