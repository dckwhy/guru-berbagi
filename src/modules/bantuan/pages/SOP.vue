<template>
  <v-card class="mx-5 mt-5" outlined tile>
    <v-toolbar color="primary" dark flat>
      <v-col cols="12">
        <v-toolbar-title class="headline white--text">PROGRAM GURU BERBAGI</v-toolbar-title>
      </v-col>
    </v-toolbar>
    <v-card flat>
      <v-card-title>Bantuan</v-card-title>
      <v-divider></v-divider>
      <!-- <v-card-subtitle>Berikut adalah media yang Anda unggah dalam pembuatan aksi maupun artikel</v-card-subtitle> -->
      <v-card-text>
        <v-row wrap>
          <v-col cols="12" sm="6" md="4" lg="4" xl="4" v-for="item in items" :key="item.index">
            <v-card flat outlined>
              <v-img
                src="https://cdn.siap.id/s3/simpkb/asset img/Guru-Berbagi/revisi-portal/thumb-default.jpg"
                height="194"
              ></v-img>
              <v-card-text :id="item" class="black--text mt-2 mx-1 text-center caption">
                <v-btn :small="$vuetify.breakpoint.xs" block color="blue" @click="item.click()">
                  <span class="white--text">{{item.title}}</span>
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script>
import { SOP_REGISTRASI, SOP_RPP, SOP_ARTIKEL } from "@/const";
export default {
  data() {
    return {
      textSearch: null,
      page: null,
      cp: 1,
      items: [
        {
          title: "SOP Registrasi dan Aktivasi",
          click: () => this.toSopRegistrasi()
        },
        {
          title: "SOP Berbagi Artikel",
          click: () => this.toSopArtikel()
        },
        {
          title: "SOP Berbagi RPP",
          click: () => this.toSopRpp()
        }
      ]
    };
  },
  computed: {
    headers() {
      const a = [
        { text: "", align: "left", value: "" },
        { text: "", align: "left", value: "" },
        { text: "", align: "left", value: "" },
        { text: "", align: "left", value: "" },
        { text: "", sortable: false }
      ];
      return a;
    }
  },
  activated() {},
  methods: {
    toSopRegistrasi() {
      window.open(SOP_REGISTRASI, "_blank");
    },
    toSopArtikel() {
      window.open(SOP_ARTIKEL, "_blank");
    },
    toSopRpp() {
      window.open(SOP_RPP, "_blank");
    }
  },
  watch: {}
};
</script>
