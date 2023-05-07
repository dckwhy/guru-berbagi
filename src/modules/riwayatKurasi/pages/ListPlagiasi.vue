<template>
  <v-container grid-list-xl class="pa-0">
    <v-row wrap>
      <v-col cols="12" class="pb-0">
        <m-alert :show="true">
          <template v-slot:default>
            <p>
              Dibawah ini merupakan daftar
              <strong>riwayat kurasi Plagiasi</strong> yang telah Anda lakukan
              melalui menu Kurasi Plagiasi
            </p>
          </template>
        </m-alert>
      </v-col>
      <v-col cols="12">
        <m-grid
          :gridConfig="grid"
          two-line
          title="Riwayat Kurasi Plagiasi"
          footerLabel="Daftar Artikel"
          search
          filter
          filterStatusPlagiat
          customFilter
          filterTanggal
          dateRange
          filterJenis
          @filter="filter"
          :filterBy="this.jenis || this.tanggal || this.plagiat ?  [jenis, tanggal, plagiat] : null"
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
import { isCan } from "@/tools";
import DetailDlg from "../pages/Detail.vue";

export default {
  components: {
    DetailDlg
  },
  data() {
    return {
      items: [],
      jenis: null,
      tanggal: null,
      plagiat: null,
      textSearch: null,
      page: null,
      cp: 1,
      itemKurasi: null,
      tanggal_mulai: null,
      tanggal_selesai: null,
      more_menu: [
        // eslint-disable-next-line
        {
          title: "Pratinjau",
          click: (i, o) => this.detail(o)
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
              component: 'span',
              class: 'text--secondary caption',
              name: 'created_at',
              filter: 'toDT'
            },
            {
              component: 'p',
              class: 'mt-0 mb-2 subtitle-2 error--text mdi mdi-close',
              text: 'Plagiat',
              conditional: {
                vIf: (o) => o.statuskurasiplagiat && o.statuskurasiplagiat.post_plagiat_id == 2
              }
            },
            {
              component: 'p',
              class: 'mt-0 mb-2 subtitle-2 success--text mdi mdi-check',
              text: 'Lulus Plagiat',
              conditional: {
                vIf: (o) => o.statuskurasiplagiat && o.statuskurasiplagiat.post_plagiat_id == 1
              }
            },
            {
              component: 'p',
              class: 'mt-0 mb-2 subtitle-2 info--text mdi mdi-timer-sand',
              text: 'Belum Dikurasi',
              conditional: {
                vIf: (o) => !o.statuskurasiplagiat || !o.statuskurasiplagiat.post_plagiat_id
              }
            },
            {
              component: 'VChip',
              properties: {
                label: true,
              },
              class: 'success white--text mb-2',
              text: 'SIMPATIKA',
              conditional: {
                vIf: (o) => o.author && o.author.is_simpatika
              }
            },
            {
              component: 'VChip',
              properties: {
                label: true,
              },
              class: 'primary white--text mb-2',
              text: 'GTK',
              conditional: {
                vIf: (o) => o.author && !o.author.is_simpatika
              }
            },
          ]
        },
        {
          grid: {cols: 12, sm: 3, md: 3, lg: 3},
          header: 'Jenis',
          contents: [
            {
              component: 'p',
              name: 'jenis',
              class: 'font-weight-bold info--text mr-2',
              filter: 'toUppercase'
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
    is_publikasi() {
      return isCan("artikel_kurasi");
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
    //set default filter sesuai peran
  },
  methods: {
    load() {
      return this.$store
        .dispatch("riwayatKurasi/get", {
          params: {
            post_type_id: 2,
            page: this.cp,
            s: this.textSearch,
            jenis: this.jenis ? this.jenis.id : null,
            tanggal: this.tanggal ? this.tanggal.id : null,
            status_kurasi_plagiat: this.plagiat ? this.plagiat.id : null,
            jenis_kurasi: "plagiasi",
            tanggal_mulai: this.tanggal_mulai,
            tanggal_selesai: this.tanggal_selesai
          }
        })
        .then(res => {
          this.page = res;
          this.items = res.data;
        })
        .catch(e => e);
    },
    process(data) {
      this.tanggal_mulai = data.from;
      this.tanggal_selesai = data.to;
      this.load();
    },
    filter(data) {
      if (data.jenis) {
        this.jenis = data.jenis;
        this.jenis.type = 'jenis'
      }else{
        this.jenis = null
      }

      if (data.tanggal) {
        this.tanggal = data.tanggal;
        this.tanggal.type = 'tanggal'
      }else{
        this.tanggal = null
      }

      if (data.plagiat) {
        this.plagiat = data.plagiat;
        this.plagiat.type = 'plagiat'
      }else{
        this.plagiat = null
      }
      this.load();
    },
    removeFilterBy(item){
      if (item == 'jenis') {
        this.jenis = null
      }else if (item == 'tanggal') {
        this.tanggal = null
      }else if (item == 'plagiat') {
        this.plagiat = null
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
