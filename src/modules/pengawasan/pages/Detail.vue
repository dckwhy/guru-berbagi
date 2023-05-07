<template>
  <v-dialog ref="detailDlg" v-model="dialog" max-width="850">
    <v-card v-if="pengawasan">
      <v-card-title class="title black--text font-weight-bold"
        >Detail
        {{
          pengawasan.post_type_id == 6 ? "Cerita Guru Penggerak" : "RPP"
        }}</v-card-title
      >
      <v-divider></v-divider>
      <v-card-text class="py-2 my-2">
        <v-row>
          <v-col
            :cols="$vuetify.breakpoint.smAndUp ? 3 : 12"
            class="text-center"
          >
            <v-img
              max-width="220"
              :src="
                pengawasan.cover && pengawasan.cover.new_url
                  ? pengawasan.cover.new_url.thumbnail
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
              <v-col cols="12">
                <span class="title font-weight-bold">{{
                  pVal(pengawasan, "judul")
                }}</span>
                <br />
                <v-icon color="yellow">mdi-star</v-icon>
                <span class="ma-2">0.0 / 5</span>
              </v-col>
              <v-col cols="12">
                Kategori Laporan
                <p
                  class="error--text my-0 py-0"
                  v-for="i in pengawasan.lapor"
                  :key="i.index"
                >
                  {{ pVal(i.mlapor, "deskripsi") }} ({{ i.total }} pelapor)
                </p>
              </v-col>
              <v-col class="py-1 font-weight-bold" cols="3">Status</v-col>
              <v-col class="py-1" cols="9">
                :
                <v-chip
                  text-color="white"
                  dark
                  small
                  label
                  :color="$pengawasan.statusColor(pengawasan.status.id)"
                  >{{ pVal(pengawasan.status, "keterangan") }}</v-chip
                >
              </v-col>
              <v-col class="py-1 font-weight-bold" cols="3">Penulis</v-col>
              <v-col class="py-1" cols="9"
                >: {{ pVal(pengawasan.author, "name") }}</v-col
              >
              <v-col class="py-1 font-weight-bold" cols="3">Diunggah</v-col>
              <v-col class="py-1" cols="9"
                >: {{ pVal(pengawasan, "created_at") | toDT }}
              </v-col>
              <v-col
                v-if="pengawasan.file"
                class="py-1 font-weight-bold"
                cols="3"
              ></v-col>
              <v-col v-if="pengawasan.file" class="py-1" cols="9">
                <v-btn
                  small
                  color="success"
                  @click="unduhBerkas(pengawasan.file.url_lampiran)"
                  >Unduh Berkas</v-btn
                >
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <p class="font-weight-bold mb-0">Deskripsi</p>
                <p class="text-justify" v-html="pengawasan.deskripsi"></p>
              </v-col>
              <v-col cols="12">
                <v-chip
                  v-for="tag in pengawasan.tags"
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
          <v-col
            cols="12"
            class="grey lighten-3 ma-2 "
            v-if="pengawasan.lapor.length > 0 && pengawasan.lapor[0].admin"
          >
            <p class="mb-0 black--text">Status Laporan</p>
            <span
              :class="
                pengawasan.lapor[0].status == 9
                  ? 'success--text'
                  : 'error--text'
              "
            >
              {{
                pengawasan.lapor[0].status == 9
                  ? "Laporan disetujui"
                  : "Laporan ditolak"
              }}
            </span>
            <br />
            <br />
            <p class="mb-0 black--text">Keterangan Kurasi</p>
            <p class="text-justify" v-html="pengawasan.keterangan_tolak"></p>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions v-if="!isDetail">
        <v-spacer></v-spacer>
        <v-btn
          :small="$vuetify.breakpoint.xsOnly"
          color="success"
          @click="validReport = true"
          >Setujui Laporan
        </v-btn>
        <v-btn
          :small="$vuetify.breakpoint.xsOnly"
          class="mr-2"
          color="error"
          @click="batal"
          >Batalkan Laporan</v-btn
        >
      </v-card-actions>
      <v-card-text v-if="validReport">
        <v-form
          autocomplete="off"
          @submit.prevent
          data-vv-scope="form"
          lazy-validation
        >
          <v-row>
            <v-col cols="12">
              <v-textarea
                outlined
                dense
                background-color="grey lighten-3"
                autofocus
                hint="Isikan kenapa RPP ini ditolak secara detail"
                persistent-hint
                v-model="pengawasan.keterangan"
                data-vv-name="deskripsi"
                data-vv-as="Keterangan"
                v-validate="'required'"
                :error-messages="errors.collect('form.deskripsi')"
              ></v-textarea>
            </v-col>
            <v-col cols="12" align="right">
              <v-btn class="mr-4 mb-4" color="primary" @click="save"
                >SIMPAN</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
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
      pengawasan: null,
      items: [],
      page: null,
      cp: 1,
      validReport: false,
      res: null,
      rej: null,
      isDetail: false
    };
  },
  computed: {},
  methods: {
    // eslint-disable-next-line
    open(obj, mode) {
      this.isDetail = mode == "detail" ? true : false;
      this.pengawasan = { ...obj };
      this.dialog = true;
      this.validReport = false;
      return new Promise((resolve, reject) => {
        this.res = resolve;
        this.rej = reject;

        this.dialog = true;
      });
    },
    reject() {
      this.dialog = false;
    },
    resolve(res) {
      this.rej = null;
      this.res(res);
      this.dialog = false;
    },
    show(item) {
      window.open(item.file.url_lampiran, "_blank");
    },
    unduhBerkas(url) {
      window.open(url, "_blank");
    },
    save() {
      this.$validator
        .validateAll("form")
        .then(res => {
          if (!res) return Promise.reject();
          return res;
        })
        .then(() => {
          return this.$store
            .dispatch("pengawasan/tolak", {
              obj: this.pengawasan
            })
            .then(res => {
              this.resolve();
              return res;
            })
            .catch(e => e);
        });
    },
    batal() {
      return this.$store
        .dispatch("pengawasan/batal", {
          obj: this.pengawasan
        })
        .then(res => {
          this.resolve();
          return res;
        })
        .catch(e => e);
    }
  },
  watch: {
    dialog(n) {
      if (!n && this.rej) {
        //this.rej(null)
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
