<template>
  <v-dialog ref="detailDlg" v-model="dialog" max-width="850">
    <v-card v-if="bantuan">
      <v-card-title class="title black--text font-weight-bold">Detail Artikel</v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pb-0 mb-0">
        <v-row>
          <v-col :cols="$vuetify.breakpoint.smAndUp?3:12" class="text-center">
            <v-img
              position="bottom center"
              src="https://cdn.siap.id/s3/simpkb/asset img/Guru-Berbagi/illustrasi/default-bantuan.png"
              lazy-src="https://cdn.siap.id/s3/simpkb/asset img/Guru-Berbagi/illustrasi/default-bantuan.png"
            />
          </v-col>
          <v-col :cols="$vuetify.breakpoint.smAndUp?9:12" class="text-left py-0">
            <v-row>
              <v-col cols="12">
                <span class="title font-weight-bold">{{pVal(bantuan,'judul')}}</span>
                <br />
                <v-icon color="yellow">mdi-star</v-icon>
                <span class="ma-2">0.0 / 5</span>
              </v-col>
              <v-col class="py-1 font-weight-bold" cols="3">Penulis</v-col>
              <v-col class="py-1" cols="9">: {{pVal(bantuan.author,'name')}}</v-col>
              <v-col class="py-1 font-weight-bold" cols="3">Diunggah</v-col>
              <v-col class="py-1" cols="9">: {{pVal(bantuan,'created_at')|toDT}}</v-col>
              <v-col class="py-1 font-weight-bold" cols="3">Total Halaman</v-col>
              <v-col class="py-1" cols="9">: {{pVal(bantuan.file,'origin_filename')}}</v-col>
              <v-col class="py-1 font-weight-bold" cols="3">Besar File</v-col>
              <v-col class="py-1" cols="9">: {{pVal(bantuan.file,'origin_filename')}}</v-col>
              <v-col class="py-1 font-weight-bold" cols="3">Jenjang</v-col>
              <v-col class="py-1" cols="9">: {{pVal(bantuan.term_taxonomy[0].term,'nama')}}</v-col>
              <v-col class="py-1 font-weight-bold" cols="3">Kelas</v-col>
              <v-col class="py-1" cols="9">: {{pVal(bantuan.term_taxonomy[1].term,'nama')}}</v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <p class="font-weight-bold mb-0">Deskripsi</p>
                <p class="text-justify">{{pVal(bantuan,'deskripsi')}}</p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <!-- <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="mr-2 my-2" depressed color="primary" @click="show(bantuan)">Lihat Artikel</v-btn>
        <v-btn class="mr-2 my-2" depressed color="error" @click="tolak(bantuan)">Di Tolak</v-btn>
        <v-btn class="mr-2 my-2" depressed color="success" @click="setujui(bantuan)">Di Setujui</v-btn>&nbsp;
      </v-card-actions>-->
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      dialog: false,
      bantuan: null,
      items: [],
      page: null,
      cp: 1
    };
  },
  computed: {},
  methods: {
    // eslint-disable-next-line
    open(obj) {
      this.bantuan = { ...obj };
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
          return this.$store.dispatch("bantuan/approve", {
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
          return this.$store.dispatch("bantuan/reject", {
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
