<template>
  <v-row wrap>
    <v-col cols="12">
      <v-card class="mt-5" outlined tile>
        <div class="primary">
          <v-card-title
            class="headline white--text"
            style="word-break: break-word;"
          >
            Pencarian Berkas RPP
          </v-card-title>
        </div>
        <v-card-text>
          <v-row no-gutters>
            <v-col cols="12"
              ><span class=" body-1 font-weight-bold black--text"
                >Silakan cari berkas RPP dengan menggunakan judul RPP, nama
                berkas atau menggunakan url RPP</span
              ></v-col
            >
            <v-col class="grow">
              <v-text-field
                autofocus
                class="mx-1"
                v-model="s"
                append-outer-icon="mdi-magnify"
                placeholder="Cari Berkas RPP disini"
                persistent-hint
                data-vv-name="judul"
                data-vv-as="Judul"
                @click:append-outer="search"
                @keyup.enter="search"
              ></v-text-field
            ></v-col>
            <v-col class="shrink mt-5"
              ><v-icon @click="reset">mdi-refresh</v-icon></v-col
            >
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" v-if="items.length > 0">
      <span class="font-weight-bold"
        >{{ items.length }} Berkas RPP ditemukan</span
      >
      <m-card-list
        cover="https://cdn.siap.id/s3/simpkb/asset img/Guru-Berbagi/illustrasi/banner-rpp.png"
        two-line
        title="Daftar RPP"
        footerLabel="Daftar Berkas Berbagi RPP"
        id-key
        :items="items"
        :headers="headers"
        :page="page"
        :showCard="false"
        :showToolbar="false"
        footer
      >
        <template v-slot:items="{ item }">
          <tr v-if="$vuetify.breakpoint.mdAndUp">
            <td style="width: 67%">
              <v-row wrap class="my-5">
                <v-col cols="2" align="center" justify="center">
                  <v-img
                    max-width="120"
                    :src="
                      item.cover && item.cover.new_url
                        ? item.cover.new_url.thumbnail
                        : 'https://guruberbagi.simpkb.id/wp-content/upsearchs/2020/03/Icon-1-3.png'
                    "
                    lazy-src="https://guruberbagi.simpkb.id/wp-content/upsearchs/2020/03/Icon-1-3.png"
                    alt="avatar"
                  />
                </v-col>
                <v-col cols="10" class="my-1 py-0">
                  <p class="subtitle-1 my-0 py-0">
                    {{ pVal(item, "judul") | toTitleCase }}
                  </p>
                  <p class="caption">
                    {{ pVal(item, "created_at") | toD }}
                    <span
                      v-if="current_user && current_user.peran.id != 2"
                      class="light-blue--text text--darken-4"
                    >
                      <i class="mdi mdi-account"></i>
                      {{ pVal(item.author, "name") }}
                    </span>
                  </p>
                  <p class="body-2 grey--text">
                    {{ pVal(item, "deskripsi") | truncate(50) }}
                  </p>
                  <p class="caption">
                    <v-icon color="red" small>mdi-file-pdf</v-icon>&ensp;
                    <a :href="item.file.url_lampiran" target="_blank">{{
                      pVal(item.file, "origin_filename")
                    }}</a>
                  </p>
                  <p>
                    <v-chip
                      v-if="item.author.is_ppg"
                      label
                      small
                      class="orange white--text mr-2"
                      >PPG</v-chip
                    >
                    <v-chip
                      label
                      small
                      class="light-blue darken-4 white--text mr-2"
                      >{{ pVal(item, "moda") | toUppercase }}</v-chip
                    >
                    <v-chip
                      v-for="tag in item.mapel"
                      :key="tag.index"
                      class="mr-2"
                      color="grey lighten-2"
                      label
                      small
                      >{{ pVal(tag.term, "nama") }}</v-chip
                    >
                  </p>
                </v-col>
              </v-row>
            </td>
            <td width="100px">
              <p class="grey--text mb-0 caption">Status</p>
              <span>
                <i
                  class="mdi mdi-circle caption"
                  :class="`${$rpp.statusColor(item.status.id)}--text`"
                ></i>
                {{ pVal(item.status, "keterangan") }}
              </span>
            </td>
            <td>
              <m-menu
                left
                style="float:right"
                :items="more_menu"
                :object="item"
              />
            </td>
          </tr>
          <tr v-else>
            <td class="v-data-table__mobile-row">
              <div class="v-data-table__mobile-row__header">Nama</div>
              <div class="v-data-table__mobile-row__cell font-weight-bold">
                <span class="mr-2">{{
                  pVal(item, "judul") | truncate(20)
                }}</span>
              </div>
            </td>
            <td class="v-data-table__mobile-row">
              <div class="v-data-table__mobile-row__header">Moda</div>
              <div class="v-data-table__mobile-row__cell font-weight-bold">
                <v-chip
                  label
                  small
                  class="light-blue darken-4 white--text mr-2"
                  >{{ pVal(item, "moda") | toUppercase }}</v-chip
                >
              </div>
            </td>
            <td class="v-data-table__mobile-row">
              <div class="v-data-table__mobile-row__header">Label</div>
              <div class="v-data-table__mobile-row__cell">
                <v-chip
                  v-for="tag in item.mapel"
                  :key="tag.index"
                  class="mr-2 mt-1"
                  color="primary"
                  outlined
                  label
                  small
                  >{{ pVal(tag.term, "nama") }}</v-chip
                >
              </div>
            </td>
            <td class="v-data-table__mobile-row">
              <div class="v-data-table__mobile-row__header">Kata Kunci</div>
              <div class="v-data-table__mobile-row__cell">
                <v-chip
                  v-if="item.author.is_ppg"
                  label
                  small
                  class="orange white--text mr-2"
                  >PPG</v-chip
                >
                <v-chip
                  v-for="tag in item.tags"
                  :key="tag.index"
                  class="mr-2"
                  color="grey lighten-1"
                  label
                  small
                  >#{{ pVal(tag, "nama") }}</v-chip
                >
              </div>
            </td>
            <td class="v-data-table__mobile-row">
              <div class="v-data-table__mobile-row__header">Berkas</div>
              <div class="v-data-table__mobile-row__cell">
                <a
                  class="mr-2"
                  :href="item.file.url_lampiran"
                  target="_blank"
                  >{{ pVal(item.file, "origin_filename") | truncate(25) }}</a
                >
              </div>
            </td>
            <td class="v-data-table__mobile-row">
              <div class="v-data-table__mobile-row__header">Status</div>
              <div class="v-data-table__mobile-row__cell">
                <v-chip
                  class="mt-n5 mr-1"
                  text-color="white"
                  dark
                  :color="$rpp.statusColor(item.status.id)"
                  >{{ pVal(item.status, "keterangan") }}</v-chip
                >
              </div>
            </td>

            <td class="v-data-table__mobile-row">
              <div class="v-data-table__mobile-row__header"></div>
              <div class="v-data-table__mobile-row__cell">
                <m-menu
                  left
                  style="float:right"
                  :items="more_menu"
                  :object="item"
                />
              </div>
            </td>
          </tr>
        </template>
      </m-card-list>
    </v-col>
    <v-col
      cols="12"
      v-else-if="isSearch && items.length == 0"
      class="mt-0 pt-0"
    >
      <v-card outlined>
        <v-card-text>
          <p class="font-weight-bold black--text font-italic">
            Berkas RPP tidak ditemukan
          </p>
        </v-card-text>
      </v-card>
    </v-col>
    <DetailDlg ref="detailDlg" />
  </v-row>
</template>

<script>
import DetailDlg from "../pages/Detail.vue";

export default {
  components: {
    DetailDlg
  },
  data() {
    return {
      items: [],
      page: null,
      cp: 1,
      s: null,
      isSearch: false,
      more_menu: [
        // eslint-disable-next-line
        {
          title: "Pratinjau",
          click: (i, o) => this.detail(o)
        },
        {
          title: "Tautan RPP",
          click: (i, o) => this.link(o),
          check: (i, o) => o.status.id == 2
        }
      ]
    };
  },
  computed: {
    user() {
      return this.current_user;
    },
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
  methods: {
    search() {
      return this.$store
        .dispatch("rpp/search", this.s)
        .then(res => {
          this.isSearch = true;
          this.page = res;
          this.items = res.data;
        })
        .catch(e => e);
    },
    reset() {
      this.isSearch = false;
      this.s = null;
      this.items = [];
    },
    detail(item) {
      this.$refs.detailDlg.open(item);
    }
  }
};
</script>
