<template>
  <v-dialog ref="detailDlg" v-model="dialog" max-width="850">
    <v-card v-if="media">
      <v-card-title class="title black--text font-weight-bold">{{pVal(media,'judul')}}</v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pb-0 mb-0">
        <v-row>
          <v-col :cols="$vuetify.breakpoint.smAndUp?3:12" class="text-center">
            <v-img
              max-width="220"
              :src="media.cover?media.cover.url:'https://cdn.siap.id/s3/asset illustrasi/Illustrasi/bg-default.png'"
              lazy-src="https://cdn.siap.id/s3/asset illustrasi/Illustrasi/bg-default.png"
            />
          </v-col>
          <v-col :cols="$vuetify.breakpoint.smAndUp?9:12" class="text-left py-0">
            <v-row>
              <v-col cols="12">
                <div v-html="media.deskripsi"></div>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12">
            <v-chip
              v-for="tag in media.tags"
              :key="tag.index"
              class="mr-2 mt-1"
              color="grey lighten-1"
              label
              small
            >#{{pVal(tag,'nama')}}</v-chip>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <!-- <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="mr-2 my-2" depressed color="error" @click="tolak(media)">Di Tolak</v-btn>
        <v-btn class="mr-2 my-2" depressed color="success" @click="setujui(media)">Di Setujui</v-btn>&nbsp;
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
      media: null,
      items: [],
      page: null,
      cp: 1
    };
  },
  computed: {},
  methods: {
    // eslint-disable-next-line
    open(obj) {
      this.media = { ...obj };
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
          return this.$store.dispatch("media/approve", {
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
          return this.$store.dispatch("media/reject", {
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
</style>
