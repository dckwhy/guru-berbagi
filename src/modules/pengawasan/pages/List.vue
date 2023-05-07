<template>
  <v-row wrap>
    <v-col cols="12">
      <m-grid
        :gridConfig="grid"
        two-line
        title="Daftar Laporan Konten"
        footerLabel="Daftar Laporan Konten"
        search
        filter
        filterData
        @filter="filter"
        :filterBy="this.jenisData  ?  [jenisData] : null"
        @remove-filter-by="removeFilterBy"
        id-key
        :items="items"
        refresh
        @refresh="load"
        :page="page"
        footer
        @toAction="detail"
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
      noData: false,
      jenisData: null,
      items: [],
      textSearch: null,
      page: null,
      cp: 1,
      more_menu: [
        // eslint-disable-next-line
        {
          title: "Tautan Artikel",
          click: (i, o) => this.link(o),
          check: (i, o) => o.status.id != 1
        },
        {
          title: "Detail Laporan",
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
            align: 'center',
            justify: 'center',
          },
          contents: [
            {
              component: 'VImg',
              properties: {
                maxWidth: 120,
                lazySrc: 'https://guruberbagi.simpkb.id/wp-content/uploads/2020/03/Icon-1-3.png',
                alt: 'avatar'
              },
              src: (o) => o.cover && o.cover.new_url
                          ? o.cover.new_url.thumbnail
                          : 'https://guruberbagi.simpkb.id/wp-content/uploads/2020/03/Icon-1-3.png'
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
              filter: 'toD'
            },
            {
              component: 'span',
              class: 'mb-0 caption grey--text',
              text: 'Moderator:'
            },
            {
              component: 'p',
              textFunc: (o) => o.lapor[0].admin.name,
              conditional: {
                vIf: (o) => o.lapor.length > 0 && o.lapor[0].admin
              }
            },
            {
              component: 'p',
              text: '-',
              conditional: {
                vIf: (o) => o.lapor.length > 0 && !o.lapor[0].admin
              }
            },
            {
              component: 'p',
              class: 'mb-0 caption grey--text',
              text: 'Waktu Moderasi:'
            },
            {
              component: 'p',
              class: 'caption',
              textFunc: (o) => o.lapor[0].updated_at,
              conditional: {
                vIf: (o) => o.lapor.length > 0 && o.lapor[0].admin
              },
              filter: 'toDT'
            },
            {
              component: 'p',
              text: '-',
              conditional: {
                vIf: (o) => o.lapor.length > 0 && !o.lapor[0].admin
              }
            },
            {
              component: 'p',
              type: 'laporan',
              textItems: 'mlapor.deskripsi',
              items: 'lapor'
            },
            {
              component: 'p',
              subContents: [
                {
                  component: 'VChip',
                  name: 'mapel',
                  textName: 'term.nama',
                  type: 'tags',
                  properties: {
                    label: true,
                    small: true,
                    color: 'grey lighten-2'
                  },
                  class: 'mr-2 mb-1',
                }
              ]
            }
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
              conditional: {
                vIf: (o) => o.post_type_id == 6
              }
            },
            {
              component: 'p',
              text: 'RPP',
              class: 'font-weight-bold info--text mr-2',
              conditional: {
                vIf: (o) => o.post_type_id != 6
              }
            }
          ]
        },
        {
          grid: {cols: 12, sm: 3, md: 3, lg: 3},
          header: 'Status',
          contents: [
            {
              component: 'p',
              text: 'DISETUJUI',
              class: 'success--text mr-',
              conditional: {
                vIf: (o) => o.lapor[0].status == 9
              }
            },
            {
              component: 'p',
              text: 'TOLAK',
              class: 'font-weight-bold error--text mr-',
              conditional: {
                vIf: (o) => o.lapor[0].status != 9
              }
            },
            {
              component: 'm-button',
              class: 'mt-2 white--text',
              properties:{
                appendIcon: true,
                icon: 'mdi mdi-check-bold',
                textButton: 'Moderasi',
                color: 'orange'
              },
              conditional: {
                vIf: (o) => o.lapor[0].status == 0
              }
            },
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
        { text: "", sortable: false }
      ];
      return a;
    }
  },
  activated() {
    this.load();
  },
  mounted() {
    this.checkQuery();
  },
  methods: {
    checkQuery() {
      if (this.$route.query.id) {
        const lapor_id = this.$route.query.id;
        return this.$store
          .dispatch("pengawasan/detail", lapor_id)
          .then(res => {
            const item = res;
            if (item.id && item.status.id == 2) {
              this.detail(item);
            } else {
              this.$error("Konten Laporan Tidak ditemukan");
            }
          })
          .catch(e => e);
      }
    },
    load() {
      return this.$store
        .dispatch("pengawasan/get", {
          params: {
            post_type_id: this.jenisData ? this.jenisData.id : null,
            page: this.cp,
            pengawasan: true,
            s: this.textSearch
          }
        })
        .then(res => {
          if (res && res.data.length <= 0) {
            this.noData = true;
          }
          this.page = res;
          this.items = res.data;
        })
        .catch(e => e);
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
    batalSetujui(item) {
      this.$confirm(
        `Apakah Anda yakin akan batal menayangkan RPP ini ?<br>
        <div class="mt-2 title grow text-center">
          ${item.judul} <br>
        </div>
      `
      )
        .then(() =>
          this.$store
            .dispatch("pengawasan/batalSetujui", { obj: item })
            .then(() => {
              this.$info("Batal laporan berhasil");
            })
            .then(() => this.load())
            .catch(e => e)
        )
        .catch(e => e);
    },
    detail(item, val) {
      this.$refs.detailDlg.open(item, val).then(() => {
        this.load();
      });
    },
    add() {
      this.$refs.dlg.open().then(() => {
        this.load();
      });
    },
    edit(item) {
      this.$refs.dlg.open(item).then(() => {
        this.load();
      });
    },
    link(item) {
      window.open(item.link, "_blank");
    },
    hapus(item) {
      this.$confirm(
        `Apakah Anda yakin akan menghapus data ini ?<br>
        <div class="mt-2 title grow text-center">
          ${item.judul}<br>
        </div>`,
        {
          cancelOnly: item.laporan_accepted_count > 0 ? true : false
        }
      )
        .then(() => this.$store.dispatch("pengawasan/drop", item))
        .then(() => {
          this.$info("RPP " + item.judul + " berhasil dihapus");
        })
        .then(() => this.load())
        .catch(e => e);
    }
  },
  watch: {}
};
</script>
