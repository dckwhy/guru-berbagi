<template>
  <v-dialog scrollable ref="historyDlg" v-model="dialog" max-width="850">
    <v-card v-if="artikel">
      <v-toolbar color="primary" dark flat>
        <v-col cols="2"></v-col>
        <v-col class="d-flex justify-space-around">
          <v-toolbar-title class="white--text"
            >Detail Kurasi Artikel</v-toolbar-title
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
                  pVal(artikel, "judul")
                }}</span>
              </v-col>
              <v-col cols="12" sm="12" md="3" v-if="artikel.created_at">
                <span class="black--text caption">{{
                  pVal(artikel, "created_at") | toDT
                }}</span>
              </v-col>
              <v-col cols="12" sm="12" md="3">
                <span class="black--text caption"
                  ><v-icon small color="blue">mdi-account</v-icon>
                  {{ pVal(artikel.author, "name") | toTitleCase }}</span
                >
              </v-col>
              <v-col cols="12" sm="12" md="3">
                <span class="black--text caption"
                  ><v-icon small color="red">mdi-book</v-icon>Sumber:
                  {{ pVal(artikel, "sumber_penulis") | toTitleCase }}</span
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
                    artikel.cover && artikel.cover.new_url
                      ? artikel.cover.new_url.medium
                      : 'https://cdn.siap.id/s3/simpkb/asset%20img/Guru-Berbagi/revisi-portal/thumb-default.jpg'
                  "
                  lazy-src="https://cdn.siap.id/s3/simpkb/asset%20img/Guru-Berbagi/revisi-portal/thumb-default.jpg"
                />
                <span class="font-italic caption"
                  >Sumber Ilustrasi :
                  {{ pVal(artikel.cover, "sumber_file") }}</span
                >
              </v-col>
              <v-col cols="12">
                <p class="mb-0 font-weight-bold black--text">Kategori</p>
                <p>
                  <v-chip
                    v-if="artikel.author.is_ppg"
                    label
                    small
                    class="orange white--text mr-2"
                    >PPG</v-chip
                  >
                  <v-chip
                    label
                    small
                    class="light-blue darken-4 white--text mr-2"
                    >{{ pVal(artikel, "jenis") | toUppercase }}</v-chip
                  >

                  <v-chip
                    v-for="tag in artikel.tags"
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
                        <strong v-if="artikel.statuskurasi">{{
                          artikel.statuskurasi.created_at | toDT
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
                    v-if="artikel.statuskurasiplagiat"
                  >
                    <v-row no-gutters>
                      <v-col cols="12" sm="12" md="3">
                        <strong>{{
                          artikel.statuskurasiplagiat.updated_at | toDT
                        }}</strong>
                      </v-col>
                      <v-col cols="12" sm="12" md="3">
                        <strong>Status Plagiasi</strong>
                        <div class="text-caption mb-2">
                          <p
                            class="ma-0 error--text"
                            v-if="
                              artikel.statuskurasiplagiat &&
                                artikel.statuskurasiplagiat.post_plagiat_id == 2
                            "
                          >
                            Plagiat
                          </p>
                          <p
                            class="ma-0 success--text"
                            v-else-if="
                              artikel.statuskurasiplagiat &&
                                artikel.statuskurasiplagiat.post_plagiat_id == 1
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
                          v-if="artikel.statuskurasiplagiat.user"
                        >
                          {{ artikel.statuskurasiplagiat.user.name }}
                        </p>
                      </v-col>
                    </v-row>
                  </v-timeline-item>

                  <v-timeline-item
                    color="pink"
                    small
                    v-if="artikel.statuskurasi"
                  >
                    <v-row no-gutters>
                      <v-col cols="12" sm="12" md="3">
                        <strong>{{
                          artikel.statuskurasi.updated_at | toDT
                        }}</strong>
                      </v-col>
                      <v-col cols="12" sm="12" md="3">
                        <strong>Status Konten</strong>
                        <p v-if="artikel.status && artikel.status.id">
                          <i
                            class="mdi mdi-circle caption"
                            :class="
                              `${$artikel.statusColor(artikel.status.id)}--text`
                            "
                          ></i>
                          {{ pVal(artikel.status, "keterangan") }}
                        </p>
                      </v-col>
                      <v-col cols="12" sm="12" md="3">
                        <strong>Nilai</strong>
                        <p class="ma-0 font-weight-bold black--text">
                          {{ artikel.nilai ? artikel.nilai : "Belum dinilai" }}
                        </p>
                      </v-col>
                      <v-col cols="12" sm="12" md="3">
                        <strong>Nama Kurator Substansi</strong>
                        <p
                          class="ma-0 font-weight-bold black--text"
                          v-if="artikel.statuskurasi.user"
                        >
                          {{ artikel.statuskurasi.user.name }}
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
      artikel: null,
      items: [],
      page: null,
      cp: 1
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
    open(obj) {
      this.artikel = { ...obj };
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
          return this.$store.dispatch("artikel/approve", {
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
          return this.$store.dispatch("artikel/reject", {
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
