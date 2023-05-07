<template>
  <v-dialog ref="detailDlg" v-model="dialog" max-width="850">
    <v-card v-if="rpp">
      <v-card-title class="title black--text font-weight-bold"
        >Detail RPP</v-card-title
      >
      <v-card-text class="pb-0 mb-0">
        <v-row>
          <v-col cols="12">
            <p class="caption my-2">
              Sumber:
              <span class="black--text">{{
                pVal(rpp, "sumber_penulis") | toTitleCase
              }}</span
              >,
              <span class="black--text">{{
                pVal(rpp, "created_at") | toDT
              }}</span>
            </p>
            <p>
              <span>
                <v-icon color="red">mdi-cards-heart</v-icon>
                Disukai {{ rpp.suka }}x
              </span>
              &nbsp;
              <span>
                <v-icon color="grey">mdi-download</v-icon>
                Diunduh {{ rpp.unduh }}x
              </span>
              <span>
                <v-icon color="blue">mdi-eye</v-icon>
                Dilihat {{ rpp.lihat }}x
              </span>
            </p>
          </v-col>
          <v-col cols="12" class="text-center">
            <v-img
              position="bottom center"
              :src="
                rpp.cover && rpp.cover.new_url
                  ? rpp.cover.new_url.thumbnail
                  : 'https://guruberbagi.simpkb.id/wp-content/uploads/2020/03/Icon-1-3.png'
              "
              lazy-src="https://guruberbagi.simpkb.id/wp-content/uploads/2020/03/Icon-1-3.png"
            />
          </v-col>
          <v-col
            :cols="$vuetify.breakpoint.smAndUp ? 9 : 12"
            class="text-left py-0"
          >
            <v-row>
              <v-col cols="12" v-if="rpp.lapor_count > 0">
                <br />Detail Pelaporan:
                <span
                  class="red--text font-weight-bold"
                  v-for="i in rpp.lapor"
                  :key="i.index"
                  >{{ i.mlapor.deskripsi }}</span
                >
                <br />
              </v-col>
              <v-col class="py-1 font-weight-bold" cols="3">Status</v-col>
              <v-col class="py-1" cols="9">
                :
                <v-chip
                  text-color="white"
                  dark
                  small
                  label
                  :color="$rpp.statusColor(rpp.status.id)"
                  >{{ pVal(rpp.status, "keterangan") }}</v-chip
                >
              </v-col>
              <v-col class="py-1 font-weight-bold" cols="3">Keterangan Tolak</v-col>
              <v-col class="py-1" cols="9">:
                <span>
                  {{ pVal(rpp, "keterangan_tolak") }}</span>
              </v-col>
              <v-col class="py-1 font-weight-bold" cols="3">Moda</v-col>
              <v-col class="py-1" cols="9">
                :
                <v-chip
                  text-color="white"
                  dark
                  small
                  label
                  color="light-blue darken-4 white--text mr-2"
                  >{{ pVal(rpp, "moda") }}</v-chip
                >
              </v-col>
              <!-- <v-chip
              label
              small
              class="orange white--text mr-2"
            >{{rpp.moda}}</v-chip> -->
              <v-col class="py-1 font-weight-bold" cols="3">Penulis</v-col>
              <v-col class="py-1" cols="9"
                >: {{ pVal(rpp.author, "name") }}</v-col
              >
              <v-col class="py-1 font-weight-bold" cols="3">Diunggah</v-col>
              <v-col class="py-1" cols="9"
                >: {{ pVal(rpp, "created_at") | toDT }}</v-col
              >
              <!-- <v-col class="py-1 font-weight-bold" cols="3">Total Halaman</v-col>
              <v-col class="py-1" cols="9">:</v-col>
              <v-col class="py-1 font-weight-bold" cols="3">Besar File</v-col>
              <v-col class="py-1" cols="9">:</v-col>-->
              <v-col class="py-1 font-weight-bold" cols="3">Jenjang</v-col>
              <v-col class="py-1" cols="9"
                >: {{ pVal(rpp.mapel[0].term, "nama") }}</v-col
              >
              <v-col class="py-1 font-weight-bold" cols="3">Kelas</v-col>
              <v-col class="py-1" cols="9"
                >: {{ pVal(rpp.mapel[1].term, "nama") }}</v-col
              >
              <v-col class="py-1 font-weight-bold" cols="3"
                >Mata Pelajaran</v-col
              >
              <v-col class="py-1" cols="9"
                >: {{ pVal(rpp.mapel[2].term, "nama") }}</v-col
              >
            </v-row>
            <v-row>
              <v-col cols="12">
                <span class="font-weight-bold">Deskripsi</span>
                <p class="text-justify">{{ pVal(rpp, "deskripsi") }}</p>
              </v-col>
              <v-col cols="12">
                <v-chip
                  v-if="!rpp.is_ppg"
                  label
                  small
                  class="orange white--text mr-2"
                  >PPG</v-chip
                >
                <v-chip
                  v-for="tag in rpp.tags"
                  :key="tag.index"
                  class="mr-2"
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
      <!-- <v-divider></v-divider>
      <v-card-actions>

      </v-card-actions>-->
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
      rpp: null,
      items: [],
      page: null,
      cp: 1
    };
  },
  computed: {},
  methods: {
    // eslint-disable-next-line
    open(obj) {
      this.rpp = { ...obj };
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
          return this.$store.dispatch("rpp/approve", {
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
          return this.$store.dispatch("rpp/reject", {
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
