<template>
  <v-dialog scrollable ref="detailDlg" v-model="dialog" max-width="850">
    <v-card v-if="streaming">
      <v-toolbar color="primary" dark flat>
        <v-col cols="2"></v-col>
        <v-col class="d-flex justify-space-around">
          <v-toolbar-title class="white--text">Detil streaming</v-toolbar-title>
        </v-col>
        <v-col cols="2" class="d-flex justify-end"></v-col>
      </v-toolbar>
      <v-card-title class="title black--text font-weight-bold"
        >{{ pVal(streaming, "judul") }}
      </v-card-title>
      <v-card-text class="pb-0 mb-0">
        <v-row>
          <v-col cols="12"></v-col>
          <v-col cols="12" class="text-center">
            <streaming-embed
              v-if="isYoutube"
              css="embed-responsive-21by9"
              :src="streaming.urlstreaming"
            ></streaming-embed>
            <iframe
              v-if="isTiktok"
              style="width: 100%; height: 729px; display: block; visibility: unset; max-height: 729px;border:noneborder:none"
              :src="`https://www.tiktok.com/embed/v2/` + tiktokCode"
            ></iframe>
          </v-col>
          <v-col
            :cols="$vuetify.breakpoint.smAndUp ? 9 : 12"
            class="text-left py-0"
          >
            <v-row>
              <v-col cols="12" v-if="streaming.lapor_count > 0">
                <span
                  class="red--text font-weight-bold"
                  v-for="i in streaming.lapor"
                  :key="i.index"
                  >{{ i.deskripsi }}</span
                >
                <br />Detail Pelaporan:
                <br />
                <span class="black--text font-weight-medium">{{
                  pVal(streaming, "keterangan_tolak")
                }}</span>
              </v-col>
              <v-col class="py-1 font-weight-bold" cols="3">Status</v-col>
              <v-col class="py-1" cols="9">
                :
                <v-chip
                  text-color="white"
                  dark
                  small
                  label
                  :color="$streaming.statusColor(streaming.status.id)"
                  >{{ pVal(streaming.status, "keterangan") }}
                </v-chip>
              </v-col>
              <v-col class="py-1 font-weight-bold" cols="3">Penulis</v-col>
              <v-col class="py-1" cols="9"
                >: {{ pVal(streaming.author, "name") }}
              </v-col>
              <v-col class="py-1 font-weight-bold" cols="3">Diunggah</v-col>
              <v-col class="py-1" cols="9"
                >: {{ pVal(streaming, "created_at") | toDT }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <span class="font-weight-bold">Deskripsi</span>
                <p class="text-justify" v-html="streaming.deskripsi"></p>
              </v-col>
              <v-col cols="12">
                <v-chip
                  v-for="tag in streaming.tags"
                  :key="tag.index"
                  class="mr-2 mt-1"
                  color="grey lighten-1"
                  label
                  small
                  >#{{ pVal(tag, "nama") }}
                </v-chip>
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
// import { isCan } from "@/tools";
export default {
  components: {},
  data() {
    return {
      dialog: false,
      streaming: null,
      items: [],
      page: null,
      cp: 1,
      isTiktok: false,
      tiktokCode: 0,
      isYoutube: false
    };
  },
  computed: {},
  methods: {
    // eslint-disable-next-line
    open(obj) {
      this.streaming = { ...obj };
      this.dialog = true;
    },
    show(item) {
      window.open(item.file.url_lampiran, "_blank");
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
          return this.$store.dispatch("streaming/approve", {
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
          return this.$store.dispatch("streaming/reject", {
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
  },
  watch: {
    "streaming.urlstreaming": function(n) {
      var tiktokstreaming = n.match(/.tiktok.*/);
      var youtubestreaming1 = n.match(/.youtube.*/);
      var youtubestreaming2 = n.match(/.youtu.be.*/);

      this.isYoutube = youtubestreaming1
        ? true
        : youtubestreaming2
        ? true
        : false;
      this.isTiktok = tiktokstreaming ? true : false;

      if (tiktokstreaming) {
        var explode = n.split("/streaming/");
        this.tiktokCode = explode[1];
      }
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
