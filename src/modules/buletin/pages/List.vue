<template>
  <v-container grid-list-xl class="pa-0">
    <v-row wrap>
      <v-col cols="12">
        <m-grid
          :gridConfig="grid"
          title="Daftar Buletin"
          add
          search
          id-key
          filter
          filterStatus
          @filter="filter"
          :filterBy="this.status ?  [status] : null"
          @remove-filter-by="removeFilterBy"
          refresh
          addText="Tambah Buletin"
          @refresh="load"
          footerLabel="Daftar Buletin"
          :items="items"
          :itemStatuses="itemStatuses"
          :page="page"
          footer
          @toAction="submit"
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
          @add="add"
        >
        </m-grid>
      </v-col>
    </v-row>
    <ChangeDlg ref="dlg" />
    <ProfilDlg ref="dlgProfil" />
    <DetailDlg ref="detailDlg" />
  </v-container>
</template>

<script>
import { isCan } from "@/tools";
import ChangeDlg from "../components/Form.vue";
import ProfilDlg from "../../user/components/Form.vue";
import DetailDlg from "../pages/Detail.vue";
import MGrid from '../../../components/MGrid.vue';

export default {
  components: {
    ChangeDlg,
    DetailDlg,
    ProfilDlg,
    MGrid
  },
  data() {
    return {
      items: [],
      jenis: null,
      status: null,
      textSearch: null,
      page: null,
      cp: 1,
      more_menu: [
        // eslint-disable-next-line
        {
          title: "Pratinjau",
          click: (i, o) => this.detail(o)
        },
        {
          title: "Ubah",
          click: (i, o) => this.edit(o),
          check: (i, o) => o.status.id == 1 && isCan("newsletter_write")
        },
        {
          title: "Hapus",
          click: (i, o) => this.hapus(o),
          check: () => isCan("newsletter_write")
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
            justify: 'center'
          },
          contents: [
            {
              component: 'VImg',
              properties: {
                maxWidth: 120,
                lazySrc:"https://cdn.siap.id/s3/simpkb/asset img/Guru-Berbagi/revisi-portal/thumb-default.jpg",
                alt:"avatar"
              },
              src: (o) => o.cover ? o.cover.new_url.thumbnail : ''
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
          grid:{cols: 12, sm: 6, md: 6, lg: 6},
          class: 'py-0',
          contents: [
            {
              component: 'p',
              class: 'subtitle-1 my-0 py-0"',
              name: 'judul',
              filter: 'toTitleCase'
            },
            {
              component: 'span',
              class: 'caption light-blue--text text--darken-4 mdi mdi-account',
              name: 'author.name'
            },
            {
              component: 'p',
              class: 'caption',
              name: 'created_at',
              filter: 'toDT'
            }
          ]
        },
        {
          grid: {cols: 12, sm: 4, md: 4, lg: 4},
          header: 'Status',
          contents: [
            {
              component: 'p',
              name: 'status.keterangan',
              statusColor: this.$buletin,
              statusName: 'status.id'
            },
            {
              component: 'm-button',
              properties:{
                appendIcon: true,
                icon: 'mdi mdi-send',
                textButton: 'Kirim',
              },
              conditional: {
                vIf: (o) => o.status.id == 1
              }
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
    },
    itemStatuses(){
      return [
        {
          id: 1,
          nama: 'Draf'
        },
        {
          id: 2,
          nama: 'Terbit'
        }
      ]
    }
  },
  activated() {
    this.load();
  },
  methods: {
    load() {
      return this.$store
        .dispatch("buletin/get", {
          params: {
            post_type_id: 4,
            page: this.cp,
            s: this.textSearch,
            status: this.status ? this.status.id : null,
          }
        })
        .then(res => {
          this.page = res;
          this.items = res.data;
        })
        .catch(e => e);
    },
    filter(data) {

      if (data.status) {
        this.status = data.status;
        this.status.type = 'status'
      }else{
        this.status = null
      }
      this.load();
    },
    removeFilterBy(item){
      if (item == 'status') {
        this.status = null
      }
      this.load()
    },
    submit(item) {
      this.$confirm(
        `Apakah Anda yakin akan <b> mengirim </b> Buletin ini ke seluruh Surel Pengguna Guru Berbagi dan <b> mempublikasikan </b>  di portal Guru Berbagi ?<br>
        <div class="mt-2 title grow text-center">
           ${item.judul} <br>
        </div>
      `
      )
        .then(() =>
          this.$store
            .dispatch("buletin/ajukan", { obj: item })
            .then(() => {
              this.$info("Buletin berhasil diajukan");
            })
            .then(() => this.load())
            .catch(e => e)
        )
        .catch(e => e);
    },
    ajukan(item) {
      this.$confirm(
        `Apakah Anda yakin akan mempublikasikan Buletin ini ?<br>
        <div class="mt-2 title grow text-center">
           ${item.judul} <br>
        </div>
      `
      )
        .then(() =>
          this.$store
            .dispatch("buletin/ajukan", { obj: item })
            .then(() => {
              this.$info("Buletin berhasil dipublikasi");
            })
            .then(() => this.load())
            .catch(e => e)
        )
        .catch(e => e);
    },
    batalSetujui(item) {
      this.$confirm(
        `Apakah Anda yakin akan batal menayangkan Buletin ini ?<br>
        <div class="mt-2 title grow text-center">
          ${item.judul} <br>
        </div>
      `
      )
        .then(() =>
          this.$store
            .dispatch("buletin/batalSetujui", { obj: item })
            .then(() => {
              this.$info("Batal tayang berhasil");
            })
            .then(() => this.load())
            .catch(e => e)
        )
        .catch(e => e);
    },
    detail(item) {
      this.$refs.detailDlg.open(item);
    },
    updateProfil(item) {
      this.$refs.dlgProfil.open(item);
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
        .then(() => this.$store.dispatch("buletin/drop", item))
        .then(() => {
          this.$info("Buletin " + item.judul + " berhasil dihapus");
        })
        .then(() => this.load())
        .catch(e => e);
    }
  },
  watch: {}
};
</script>
