<template>
  <v-card class="mx-auto" max-width="400" @click="$emit('pilih',item)">
    <v-img
      class="white--text align-end"
      height="200px"
      :src="cover || 'img/background-default.jpg'"
    ></v-img>
    <v-progress-linear
      :active="active"
      :background-opacity="opacity"
      :height="heightProgress"
      :value="pencapaian"
      :color="countLaporan==0?'blue':pencapaian<50?'error':pencapaian<70?'warning':'success'"
    >
      <template v-slot="{ value }">
        <strong v-if="countLaporan==0">Belum Ada Laporan</strong>
        <strong v-else-if="pencapaian==100">Selesai</strong>
        <strong v-else-if="(pencapaian>0&&pencapaian<100)">{{ Math.ceil(pencapaian) }}%</strong>
        <strong v-else>Dalam Proses Verifikasi</strong>
      </template>
    </v-progress-linear>
    <v-card-title style="word-break: break-word;">{{title}}</v-card-title>

    <v-card-subtitle class="pb-0"></v-card-subtitle>

    <v-card-text class="text--primary">
      <div>
        <p>
          <v-icon>mdi-calendar</v-icon>
          {{tanggalAwal | toD}} s/d {{tanggalAkhir | toD}}
        </p>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    title: {
      type: String,
      default: "Title"
    },
    pencapaian: {
      type: Number,
      default: 0
    },
    countLaporan: {
      type: Number,
      default: 0
    },
    role: {
      type: String,
      default: "User"
    },
    cover: {
      type: String,
      default: null
    },
    logo: {
      type: String,
      default: null
    },
    height: {
      type: Number,
      default: 110
    },
    count: {
      type: Number,
      default: 0
    },
    tanggalAwal: {
      type: String,
      default: null
    },
    tanggalAkhir: {
      type: String,
      default: null
    },
    desc: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "primary"
    },
    icon: {
      type: String,
      default: null
    },
    iconDesc: {
      type: String,
      default: ""
    },
    progressBar: {
      type: String,
      default: "on"
    },
    progressValue: {
      type: Number,
      default: 10
    },
    showRole: {
      type: Boolean,
      default: false
    },
    detail: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      items: [],
      absolute: false,
      active: true,
      opacity: 0.6,
      bottom: false,
      buffer: 100,
      fixed: false,
      heightProgress: 25,
      indeterminate: false,
      query: false,
      rounded: false,
      stream: false,
      striped: false,
      top: false,
      page: null,
      cp: 1
    };
  }
};
</script>

<style>
</style>
