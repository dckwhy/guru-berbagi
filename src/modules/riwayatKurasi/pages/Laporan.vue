<template>
  <v-container grid-list-xl class="pa-0">
    <v-row wrap>
      <v-col cols="12" class="pb-0">
        <m-alert :show="true">
          <template v-slot:default>
            <p>
              Dibawah ini merupakan daftar
              <strong>riwayat kurasi Laporan Konten</strong> yang telah Anda
              lakukan melalui menu Laporan Konten
            </p>
          </template>
        </m-alert>
      </v-col>
      <v-col cols="12">
        <m-grid
          :gridConfig="grid"
          two-line
          title="Riwayat Kurasi Laporan Konten"
          footerLabel="Daftar Artikel"
          search
          filter
          filterData
          customFilter
          dateRange
          @filter="filter"
          :filterBy="this.jenisData  ?  [jenisData] : null"
          @remove-filter-by="removeFilterBy"
          id-key
          :items="items"
          @process="process"
          refresh
          @refresh="load"
          :page="page"
          footer
          @search="
            search => {
              textSearch = search;
              load();
            }
          "
          @change:page="
            pg => {
              cp = pg;
              load();
            }
          "
        >
        </m-grid>
      </v-col>
    </v-row>
    <DetailDlg ref="detailDlg" />
  </v-container>
</template>

<script>
import DetailDlg from "../pages/Detail.vue";

export default {
  components: {
    DetailDlg
  },
  data() {
    return {
      noData: false,
      jenisData: null,
      items: [],
      textSearch: null,
      page: null,
      cp: 1,
      tanggal_mulai: null,
      tanggal_selesai: null,
      more_menu: [
        // eslint-disable-next-line
        {
          title: "Tautan Artikel",
          click: (i, o) => this.link(o),
          check: (i, o) => o.status.id != 1
        },
        {
          title: "Detail Artikel",
          click: (i, o) => this.detail(o, "detail"),
          check: (i, o) => o.status.id != 1
        }
      ]
    };
  },
  computed: {
    grid(){
      const conf = [
        {
          grid: {cols: this.$vuetify.breakpoint.smAndUp ? 12 : 10, sm: 1, md: 1, lg: 1},
          properties: {
            alig:"center", 
            justify:"center"
          },
          contents: [
            {
              component: 'VAvatar',
              properties: {
                size: 45, 
                width: 50,
                height: 50,
                color:"secondary2"
              },
              subContents: [
                {
                  component: 'VImg',
                  properties: {
                    alt: 'avatar',
                  },
                  src: (o) =>   o.cover && o.cover.new_url
                        ? o.cover.new_url.thumbnail
                        : 'https://cdn.siap.id/s3/simpkb/asset%20img/Guru-Berbagi/revisi-portal/thumb-default.jpg'
                }
              ]
            }
          ]
        },
        {
          grid: {cols: 2},
          contents: [
            {
              component: 'p',
              type: "more",
              more: this.more_menu,
              conditional: {
                cond:this.$vuetify.breakpoint.xsOnly
              }
            }
          ],
          vShow: {
            cond: this.$vuetify.breakpoint.xsOnly
          }
        },
        {
          grid: {cols: 12, sm: 4, md: 4, lg: 4},
          class: 'py-0 my-1',
          contents: [
            {
              component: 'p',
              class: 'subtitle-1 my-0 py-0',
              name: 'judul',
              filter: 'toTitleCase'
            },
            {
              component: 'p',
              class: 'caption light-blue--text text--darken-4 my-0 py-0 mdi mdi-account',
              name: 'author.name',
              conditional: {
                cond : this.current_user && this.current_user.peran.id != 2
              }
            },
            {
              component: 'p',
              class: 'text--secondary caption',
              name: 'created_at',
              filter: 'toDT'
            },
            {
              component: 'p',
              type: 'laporan',
              textItems: 'mlapor.deskripsi',
              items: 'lapor'
            },
          ]
        },
        {
          grid: {cols: 12, sm: 3, md: 3, lg: 3},
          header: 'Jenis',
          contents: [
            {
              component: 'p',
              text: 'Catatan Guru Penggerak',
              class: 'font-weight-bold info--text mr-2',
              filter: 'toUppercase',
              conditional: {
                vIf: (o) => o.post_type_id == 6
              }
            },
            {
              component: 'p',
              text: 'RPP',
              class: 'font-weight-bold info--text mr-2',
              filter: 'toUppercase',
              conditional: {
                vIf: (o) => o.post_type_id != 6
              }
            }
          ]
        },
        {
          grid: {cols: 12, sm: 3, md: 3, lg: 3},
          header: 'Tanggal Kurasi',
          contents: [
            {
              component: 'p',
              name: 'created_at',
              class: 'caption mr-2',
              filter: 'toDT'
            }
          ]
        },
        {
          grid: {cols: 12 , sm: 1, md: 1, lg: 1},
          header: "Aksi",
          contents: [
            {
              component: 'p',
              type: "more",
              more: this.more_menu,
              conditional: {
                cond:this.$vuetify.breakpoint.smAndUp
              }
            }
          ],
          conditional: {
            cond:this.$vuetify.breakpoint.smAndUp
          }
        }
      ]
      return conf
    },
    headers() {
      const a = [
        { text: "", align: "left", value: "" },
        { text: "", align: "left", value: "" },
        { text: "", align: "left", value: "" },
        { text: "", align: "left", value: "" },
        { text: "", align: "left", value: "" },
        { text: "", sortable: false }
      ];
      return a;
    }
  },
  activated() {
    this.load();
  },
  methods: {
    load() {
      return this.$store
        .dispatch("riwayatKurasi/getLaporan", {
          params: {
            post_type_id: this.jenisData ? this.jenisData.id : null,
            page: this.cp,
            pengawasan: true,
            tanggal_mulai: this.tanggal_mulai,
            tanggal_selesai: this.tanggal_selesai,
            s: this.textSearch
          }
        })
        .then(res => {
          this.page = res;
          this.items = res.data;
        })
        .catch(e => e);
    },
    link(item) {
      window.open(item.link, "_blank");
    },

    process(data) {
      this.tanggal_mulai = data.from;
      this.tanggal_selesai = data.to;
      this.load();
    },
    filter(data) {
      if (data.jenisData) {
        this.jenisData = data.jenisData;
        this.jenisData.type = 'jenis data';
      }else{
        this.jenisData = null
      }
      this.load();
    },
    removeFilterBy(item){
      if (item == 'jenis data') {
        this.jenisData = null
      }
      this.load()
    },
    detail(item) {
      this.$refs.detailDlg.open(item);
    }
  },
  watch: {}
};
</script>
