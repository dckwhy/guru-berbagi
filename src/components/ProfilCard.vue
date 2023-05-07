<template>
  <v-expansion-panels v-model="panel">
    <v-expansion-panel class="elevation-0">
      <v-expansion-panel-header class="title">{{title}}</v-expansion-panel-header>
      <v-expansion-panel-content>
        <!-- <v-card color="white" tile class="pa-2"> -->
        <v-list-item two-line>
          <v-list-item-content class="align-self-start">
            <v-list-item-subtitle class="subtitle font-italic my-2" v-if="progress">
              <span class="ma-2">Pencapaian Target :</span>
              <v-progress-linear
                height="25"
                :value="pencapaian"
                :color="pencapaian>0?'success':'white'"
                class="ma-2"
              >
                <template v-slot="{ value }">
                  <strong class="blact--text font-italic">{{ pencapaian }}%</strong>
                </template>
              </v-progress-linear>
            </v-list-item-subtitle>
            <v-list-item-subtitle class="white--text ml-2 subjudul--text">Deskripsi</v-list-item-subtitle>
            <p class="subtitle text-justify ml-2">{{deskripsi}}</p>
          </v-list-item-content>
        </v-list-item>
        <v-row v-if="detailKegiatan">
          <v-col cols="12" sm="3" md="3" lg="3" class="pa-0 ml-5">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-subtitle>Lokasi</v-list-item-subtitle>
                <v-list-item-title class="font-weight-bold">{{pVal(object,'lokasi')}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="12" sm="3" md="3" lg="3" class="pa-0 ml-5">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-subtitle>Volume</v-list-item-subtitle>
                <v-list-item-title class="font-weight-bold">{{pVal(object,'volume')}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="12" sm="3" md="3" lg="3" class="pa-0 ml-5">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-subtitle>Total Dana</v-list-item-subtitle>
                <v-list-item-title class="font-weight-bold">Rp {{pVal(object,'total_dana') | toC}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="12" sm="3" md="3" lg="3" class="pa-0 ml-5">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-subtitle>Sumber Dana</v-list-item-subtitle>
                <v-list-item-title class="font-weight-bold">{{pVal(object,'sumber_dana')}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="12" sm="3" md="3" lg="3" class="pa-0 ml-5">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-subtitle>Pelaksana</v-list-item-subtitle>
                <v-list-item-title class="font-weight-bold">{{pVal(object,'pelaksana')}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
        <v-row v-if="meta.length>0">
          <v-col cols="12" sm="3" md="3" lg="3" class="pa-0 ml-5" v-for="n in meta" :key="n.index">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-subtitle>{{pVal(n,'key')}}</v-list-item-subtitle>
                <v-list-item-title class="font-weight-bold">{{pVal(n,'value')}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
        <v-row v-if="object && target">
          <v-col cols="12" sm="3" md="3" lg="3" class="pa-0 ml-5">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-subtitle>Target</v-list-item-subtitle>
                <v-list-item-title class="font-weight-bold">{{object.target}} %</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="12" sm="3" md="3" lg="3" class="pa-0 ml-5">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-subtitle>Status Periode</v-list-item-subtitle>
                <v-list-item-title class="font-weight-bold">
                  <v-chip
                    class="ma-0"
                    outlined
                    :color="object.is_completed==true?'success':'error'"
                  >{{object.is_completed==true?'Tercapai':'Tidak Tercapai'}}</v-chip>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="12" sm="3" md="3" lg="3" class="pa-0 ml-5">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-subtitle>Jumlah Laporan Masuk</v-list-item-subtitle>
                <v-list-item-title class="font-weight-bold">{{object.jumlah_laporan}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="12" sm="3" md="3" lg="3" class="pa-0 ml-5">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-subtitle>Jumlah Belum Diproses</v-list-item-subtitle>
                <v-list-item-title class="font-weight-bold">{{object.diajukan || 0}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="12" sm="3" md="3" lg="3" class="pa-0 ml-5">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-subtitle>Jumlah Diterima</v-list-item-subtitle>
                <v-list-item-title class="font-weight-bold">{{object.jumlah_disetujui}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="12" sm="3" md="3" lg="3" class="pa-0 ml-5">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-subtitle>Jumlah Laporan Ditolak</v-list-item-subtitle>
                <v-list-item-title class="font-weight-bold">{{object.jumlah_ditolak}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
        <!-- </v-card> -->
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import AvatarCropper from "vue-avatar-cropper";
export default {
  components: {
    AvatarCropper
  },
  inheritAttrs: false,
  data() {
    return {
      allow: false,
      panel: 0,
      message: "",
      token: {
        Authorization: `Bearer ${window.localStorage.getItem("gbtoken")}`
      }
    };
  },
  props: {
    title: {
      type: String,
      default: "Title"
    },
    deskripsi: {
      type: String,
      default: ""
    },
    object: {
      type: Object,
      default: () => {}
    },
    meta: {
      type: Array,
      default: () => []
    },
    name: {
      type: String,
      default: "Total"
    },
    color: {
      type: String,
      default: "primary"
    },
    value: {
      type: Number,
      default: null
    },
    uploadIconKegiatan: {
      type: Boolean,
      default: false
    },
    uploadIconGrup: {
      type: Boolean,
      default: false
    },
    progress: {
      type: Boolean,
      default: false
    },
    target: {
      type: Number,
      default: 0
    },
    pencapaian: {
      type: Number,
      default: 0
    },
    tercapai: {
      type: Boolean,
      default: false
    },
    detailKegiatan: {
      type: Boolean,
      default: false
    },
    logo: {
      type: String,
      default: null
    },
    urlUploadKegiatan: {
      type: String,
      default: null
    },
    uploadDataKegiatan: {
      type: Object,
      default: () => {}
    },
    urlUploadGroup: {
      type: String,
      default: null
    },
    uploadDataGroup: {
      type: Object,
      default: () => {}
    },
    labelGroup: {
      type: String,
      default: "Grup"
    }
  },
  methods: {
    // eslint-disable-next-line
    handleUploaded(response) {
      if (response.status) {
        // this.message = "Load photo..";
      }
    },
    // eslint-disable-next-line
    handleUploading(form, xhr) {
      this.message = "uploading...";
    },
    // eslint-disable-next-line
    handleCompleted(commit, response, form, xhr) {
      if (commit.error !== "55") {
        this.$info("Perbarui Foto Berhasil");
        this.$emit("changeIcon");
      } else {
        this.$error("Perbarui Foto Gagal");
      }
      this.message = "";
    },
    // eslint-disable-next-line
    handlerError(message, type, xhr) {
      // this.$error("Perbarui Foto Gagal");
      this.message = "Oops! Something went wrong...";
    }
  }
};
</script>