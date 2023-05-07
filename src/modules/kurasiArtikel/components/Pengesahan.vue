<template>
  <v-dialog
    v-if="artikel"
    v-model="dialog"
    scrollable
    max-width="700"
    @keydown.esc="cancel()"
  >
    <v-card tile>
      <v-toolbar dark color="primary" dense>
        <v-toolbar-title class="white--text">{{
          artikel.judul
        }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-row class="mt-4">
          <v-col cols="12" class="text-left py-0">
            <v-row>
              <v-col cols="12">
                <p class="caption my-2">
                  Sumber:
                  <span class="black--text">{{
                    pVal(artikel, "sumber_penulis") | toTitleCase
                  }}</span
                  >,
                  <span class="black--text">{{
                    pVal(artikel, "created_at") | toDT
                  }}</span>
                </p>
                <p>
                  <span>
                    <v-icon color="red">mdi-cards-heart</v-icon>
                    Disukai {{ artikel.suka }}x
                  </span>
                  &nbsp;
                  <span>
                    <v-icon color="blue">mdi-eye</v-icon>
                    Dilihat {{ artikel.lihat }}x
                  </span>
                </p>
              </v-col>
              <v-col cols="12">
                <v-img
                  position="bottom center"
                  :src="
                    artikel.cover && artikel.cover.new_url
                      ? artikel.cover.new_url.medium
                      : 'https://cdn.siap.id/s3/asset illustrasi/Illustrasi/bg-default.png'
                  "
                  lazy-src="https://cdn.siap.id/s3/asset illustrasi/Illustrasi/bg-default.png"
                />
                <span
                  >Sumber Ilustrasi :
                  {{ pVal(artikel.cover, "sumber_file") }}</span
                >
                <br />
                <br />
                <v-row v-if="artikel.mapel.length > 0">
                  <v-col
                    class="py-1 font-weight-bold"
                    cols="12"
                    sm="12"
                    md="3"
                    lg="3"
                  >
                    Jenjang:</v-col
                  >
                  <v-col class="py-1" cols="12" sm="12" md="9" lg="9">
                    {{ pVal(artikel.mapel[0].term, "nama") }}</v-col
                  >
                  <v-col
                    class="py-1 font-weight-bold"
                    cols="12"
                    sm="12"
                    md="3"
                    lg="3"
                    >Kelas:</v-col
                  >
                  <v-col class="py-1" cols="12" sm="12" md="9" lg="9">
                    {{ pVal(artikel.mapel[1].term, "nama") }}</v-col
                  >
                  <v-col
                    class="py-1 font-weight-bold"
                    cols="12"
                    sm="12"
                    md="3"
                    lg="3"
                    >Mata Pelajaran:</v-col
                  >
                  <v-col class="py-1" cols="12" sm="12" md="9" lg="9">
                    {{ pVal(artikel.mapel[2].term, "nama") }}</v-col
                  >
                </v-row>
              </v-col>
              <v-col cols="12">
                <span class="font-weight-bold">Konten</span>
                <div v-html="konten"></div>
              </v-col>
              <v-col cols="12">
                <v-chip
                  v-for="tag in artikel.tags"
                  :key="tag.index"
                  class="mr-2 mt-1"
                  color="grey lighten-1"
                  label
                  small
                  >#{{ pVal(tag, "nama") }}</v-chip
                >
              </v-col>
            </v-row>
          </v-col>
        </v-row></v-card-text
      >
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          outlined
          class="mr-2 mb-2"
          depressed
          color="error"
          @click="plagiat(artikel)"
        >
          Plagiat
        </v-btn>
        &nbsp;
        <v-btn
          outlined
          class="mr-2 mb-2"
          depressed
          color="success"
          @click="lulus(artikel)"
        >
          Lulus Plagiarisme
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      dialog: false,
      status: null,
      resolve: null,
      reject: null,
      message: null,
      title: null,
      keterangan: null,
      organisasi: null,
      role: null,
      options: {},
      artikel: null,
      items: [],
      textSearch: null,
      page: null,
      cp: 1,
      headers: [
        { text: "Nama", align: "left", value: "nama" },
        { text: "", align: "left", sortable: false }
      ]
    };
  },
  computed: {
    konten() {
      return this.artikel && this.artikel.deskripsi
        ? this.artikel.deskripsi.replace(/<br>\\*/g, "</p><p>")
        : "";
    }
  },
  methods: {
    // eslint-disable-next-line
    open(item, title, message, status) {
      this.artikel = item;
      this.status = status;
      this.organisasi = [];
      this.role = [];
      this.keterangan = null;
      this.title = title || "Konfirmasi";
      this.message = message;

      this.dialog = true;
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    lulus(item) {
      this.$successDlg(
        `Apakah Anda yakin akan menandai Artikel ini sebagai artikel yang lulus plagiarisme?<br>
        <div class="mt-2 title grow text-center">
        </div>
      `,
        "Lulus Plagiarisme"
      )
        .then(res => {
          item.keterangan = res.keterangan;
        })
        .then(() => {
          this.$info("Artikel berhasil dikurasi");
          return this.$store.dispatch("kurasiArtikel/setNonPlagiat", {
            obj: item
          });
        })
        .then(res => {
          this.dialog = false;
          return this.resolve(res);
        })
        .catch(e => e);
    },
    plagiat(item) {
      this.$confirmDanger(
        `Apakah Anda yakin akan menandai Artikel ini sebagai Artikel yang terdeteksi Plagiat?<br>
        <div class="mt-2 title grow text-center">
        </div>
      `,
        {
          keterangan: {
            label: "Silakan Tulis Alasan Anda di Sini"
          }
        },
        "Tidak Lulus Plagiarisme"
      )
        .then(res => {
          item.keterangan = res.keterangan;
        })
        .then(() => {
          this.$info("Artikel berhasil dikurasi");
          return this.$store.dispatch("kurasiArtikel/setPlagiat", {
            obj: item
          });
        })
        .then(res => {
          this.$info("Artikel berhasil dikurasi");
          this.dialog = false;
          return this.resolve(res);
        })
        .catch(e => e);
    }
  }
};
</script>
<style>
.vue-map-container,
.vue-map-container .vue-map {
  width: 100%;
  height: 95%;
}
</style>
