<template>
  <v-dialog scrollable ref="historyDlg" v-model="dialog" max-width="850">
    <v-card v-if="video">
      <v-toolbar color="primary" dark flat>
        <v-col cols="2"></v-col>
        <v-col class="d-flex justify-space-around">
          <v-toolbar-title class="white--text"
            >Detail Kurasi video</v-toolbar-title
          >
        </v-col>
        <v-col cols="2" class="d-flex justify-end"></v-col>
      </v-toolbar>
      <v-card-text>
        <v-row no-gutters>
          <v-col cols="12" class="text-left py-0">
            <v-row no-gutters>
              <v-col cols="12">
                <span class="title font-weight-bold">{{
                  pVal(video, "judul")
                }}</span>
              </v-col>
              <v-col cols="12" sm="12" md="3">
                <span class="black--text caption">{{
                  pVal(video, "created_at") | toDT
                }}</span>
              </v-col>
              <v-col cols="12" sm="12" md="3">
                <span class="black--text caption"
                  ><v-icon small color="blue">mdi-account</v-icon>
                  {{ pVal(video.author, "name") | toTitleCase }}</span
                >
              </v-col>
              <v-col cols="12" sm="12" md="3">
                <span class="black--text caption"
                  ><v-icon small color="red">mdi-book</v-icon>Sumber:
                  {{ pVal(video, "sumber_penulis") | toTitleCase }}</span
                >
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-img
                  position="bottom center"
                  contain
                  max-height="200"
                  :src="
                    video.cover && video.cover.new_url
                      ? video.cover.new_url.medium
                      : 'https://cdn.siap.id/s3/simpkb/asset%20img/Guru-Berbagi/revisi-portal/thumb-default.jpg'
                  "
                  lazy-src="https://cdn.siap.id/s3/simpkb/asset%20img/Guru-Berbagi/revisi-portal/thumb-default.jpg"
                />
                <span class="font-italic caption"
                  >Sumber Ilustrasi :
                  {{ pVal(video.cover, "sumber_file") }}</span
                >
              </v-col>
              <v-col cols="12">
                <p class="mb-0 font-weight-bold black--text">Kategori</p>
                <p>
                  <v-chip
                    v-if="video.author.is_ppg"
                    label
                    small
                    class="orange white--text mr-2"
                    >PPG</v-chip
                  >
                  <v-chip
                    label
                    small
                    class="light-blue darken-4 white--text mr-2"
                    >{{ pVal(video, "jenis") | toUppercase }}</v-chip
                  >

                  <v-chip
                    v-for="tag in video.tags"
                    :key="tag.index"
                    class="mr-2"
                    color="grey lighten-2"
                    label
                    small
                    >#{{ pVal(tag, "nama") }}</v-chip
                  >
                </p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-timeline align-top dense>
                  <v-timeline-item color="red" small>
                    <v-row no-gutters>
                      <v-col cols="12" sm="12" md="3">
                        <strong v-if="video.statuskurasi">{{
                          video.statuskurasi.created_at | toD
                        }}</strong>
                        <span v-else>-</span>
                      </v-col>
                      <v-col>
                        <strong>Status </strong>
                        <div class="text-caption mb-2">
                          <i class="mdi mdi-circle caption orange--text"></i>
                          Ajukan
                        </div>
                      </v-col>
                    </v-row>
                  </v-timeline-item>

                  <v-timeline-item
                    color="green"
                    small
                    v-if="video.statuskurasiplagiat"
                  >
                    <v-row no-gutters>
                      <v-col cols="12" sm="12" md="3">
                        <strong>{{
                          video.statuskurasiplagiat.updated_at | toD
                        }}</strong>
                      </v-col>
                      <v-col cols="12" sm="12" md="3">
                        <strong>Status Plagiasi</strong>
                        <div class="text-caption mb-2">
                          <p
                            class="ma-0 error--text"
                            v-if="
                              video.statuskurasiplagiat &&
                                video.statuskurasiplagiat.post_plagiat_id == 2
                            "
                          >
                            Plagiat
                          </p>
                          <p
                            class="ma-0 success--text"
                            v-else-if="
                              video.statuskurasiplagiat &&
                                video.statuskurasiplagiat.post_plagiat_id == 1
                            "
                          >
                            Lulus Plagiat
                          </p>
                          <p class="ma-0 info--text" v-else>
                            Belum dikurasi plagiarisme
                          </p>
                        </div>
                      </v-col>
                      <v-col cols="12" sm="12" md="3"> </v-col>
                      <v-col cols="12" sm="12" md="3">
                        <strong>Nama Kurator Plagiasi</strong>
                        <p
                          class="ma-0 font-weight-bold black--text"
                          v-if="video.statuskurasiplagiat.user"
                        >
                          {{ video.statuskurasiplagiat.user.name }}
                        </p>
                      </v-col>
                    </v-row>
                  </v-timeline-item>

                  <v-timeline-item color="pink" small v-if="video.statuskurasi">
                    <v-row no-gutters>
                      <v-col cols="12" sm="12" md="3">
                        <strong>{{
                          video.statuskurasi.updated_at | toD
                        }}</strong>
                      </v-col>
                      <v-col cols="12" sm="12" md="3">
                        <strong>Status Konten</strong>
                        <p v-if="video.status && video.status.id">
                          <i
                            class="mdi mdi-circle caption"
                            :class="
                              `${$video.statusColor(video.status.id)}--text`
                            "
                          ></i>
                          {{ pVal(video.status, "keterangan") }}
                        </p>
                      </v-col>
                      <v-col cols="12" sm="12" md="3">
                        <strong>Nilai</strong>
                        <p class="ma-0 font-weight-bold black--text">
                          {{ video.nilai ? video.nilai : "Belum dinilai" }}
                        </p>
                      </v-col>
                      <v-col cols="12" sm="12" md="3">
                        <strong>Nama Kurator Substansi</strong>
                        <p
                          class="ma-0 font-weight-bold black--text"
                          v-if="video.statuskurasi.user"
                        >
                          {{ video.statuskurasi.user.name }}
                        </p>
                      </v-col>
                    </v-row>
                  </v-timeline-item>
                </v-timeline>
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
      video: null,
      items: [],
      page: null,
      cp: 1
    };
  },
  computed: {
    konten() {
      return this.video && this.video.deskripsi
        ? this.video.deskripsi.replace(/<br>\\*/g, "</p><p>")
        : "";
    }
  },
  methods: {
    // eslint-disable-next-line
    open(obj) {
      this.video = { ...obj };
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
          return this.$store.dispatch("video/approve", {
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
          return this.$store.dispatch("video/reject", {
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
