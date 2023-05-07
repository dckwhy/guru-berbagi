<template>
  <v-dialog scrollable ref="detailDlg" v-model="dialog" max-width="850">
    <v-card v-if="aksi">
      <v-toolbar color="primary" dark flat>
        <v-col cols="2"></v-col>
        <v-col class="d-flex justify-space-around">
          <v-toolbar-title class="white--text">Detil Aksi</v-toolbar-title>
        </v-col>
        <v-col cols="2" class="d-flex justify-end"></v-col>
      </v-toolbar>
      <v-card-title class="title black--text font-weight-bold">{{
        pVal(aksi, "judul")
      }}</v-card-title>
      <v-card-text class="pb-0 mb-0">
        <v-row>
          <v-col cols="12" class="text-left py-0">
            <v-row>
              <v-col cols="12">
                <p class="caption my-2">
                  Sumber:
                  <span class="black--text">{{
                    pVal(aksi.author, "name") | toTitleCase
                  }}</span
                  >,
                  <span class="black--text">{{
                    pVal(aksi, "created_at") | toDT
                  }}</span>
                </p>
              </v-col>
              <v-col cols="12">
                <v-img
                  position="bottom center"
                  contain
                  :src="
                    aksi.cover
                      ? aksi.cover.new_url.medium
                      : 'https://cdn.siap.id/s3/simpkb/asset img/Guru-Berbagi/illustrasi/default-rpp.png'
                  "
                  lazy-src="https://cdn.siap.id/s3/simpkb/asset img/Guru-Berbagi/illustrasi/default-rpp.png"
                />
                <span
                  >Sumber Ilustrasi :
                  {{ pVal(aksi.cover, "sumber_file") }}</span
                >
              </v-col>
              <v-col cols="12">
                <p>
                  Jenis: <strong>{{ aksi.jenis_aksi }}</strong>
                </p>
                <span class="font-weight-bold">Konten</span>
                <div v-html="konten"></div>
              </v-col>
              <v-col cols="12">
                <v-chip
                  v-for="tag in aksi.tags"
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
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="ma-2">
        <v-spacer></v-spacer>
        <v-btn @click="dialog = false" text class="black--text mr-1">
          Tutup
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
      aksi: null,
      items: [],
      page: null,
      cp: 1
    };
  },
  computed: {
    konten() {
      return this.aksi && this.aksi.deskripsi
        ? this.aksi.deskripsi.replace(/<br>\\*/g, "</p><p>")
        : "";
    }
  },
  methods: {
    // eslint-disable-next-line
    open(obj) {
      this.aksi = { ...obj };
      this.dialog = true;
    },
    show(item) {
      window.open(item.file.url, "_blank");
    },
    setujui(item) {
      this.$successDlg(
        `Apakah Anda yakin akan menyetujui data presensi ini?<br>
        <div class="mt-2 title grow text-center">
        </div>
      `
      )
        .then(() => {
          item.keterangan = "Data Presensi disetujui";
          item.k_status = 5;
        })
        .then(() => {
          return this.$store.dispatch("aksi/approve", {
            presensi_manual_id: item.presensi_manual_id,
            organisasi_id: item.organisasi.no_reg,
            obj: item
          });
        })
        .then(res => {
          this.$refs.dlg.resolve();
          return res;
        })
        .catch(e => e);
    },
    tolak(item) {
      this.$confirm(
        `Apakah Anda yakin akan menolak data presensi ini ?<br>
        <div class="mt-2 title grow text-center">
        </div>
      `,
        {
          keterangan: {
            label: "Silakan Tulis Alasan Tolak Presensi di Sini"
          }
        },
        "Tolak Presensi Manual"
      )
        .then(res => {
          item.keterangan = res.keterangan;
          item.k_status = 6;
        })
        .then(() => {
          return this.$store.dispatch("aksi/reject", {
            presensi_manual_id: item.presensi_manual_id,
            organisasi_id: item.organisasi.no_reg,
            obj: item
          });
        })
        .then(res => {
          this.$refs.dlg.resolve();
          return res;
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
img {
  max-width: 230px;
  max-height: 250px;
}
</style>
