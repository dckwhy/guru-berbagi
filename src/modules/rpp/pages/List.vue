<template>
  <v-container grid-list-xl class="pa-0">
    <v-row wrap>
      <v-col cols="12">
        <m-alert :show="current_user && !current_user.no_hp">
          <template v-slot:default>
            <h3>
              Untuk dapat menambahkan RPP Anda harus melengkapi nomor selular Anda
              terlebih dahulu
            </h3>
            <p>Untuk melengkapi nomor selular, silakan klik tombol berikut</p>
            <v-btn
              label
              :small="$vuetify.breakpoint.xs"
              color="blue white--text"
              @click="updateProfil(current_user)"
              >Tambahkan Nomor Selular</v-btn
            >
          </template>
        </m-alert>
      </v-col>
      <v-col cols="12">
        <m-grid
          :gridConfig="grid"
          title="Daftar RPP"
          add
          search
          id-key
          refresh
          @refresh="load"
          filter
          filterModa
          filterStatus
          @filter="filter"
          :filterBy="this.moda || this.status ?  [moda, status] : null"
          @remove-filter-by="removeFilterBy"
          :items="items"
          :itemStatuses="itemStatuses"
          addText="Tambah RPP"
          noDataText="Anda belum menambahkan Rencana Pembelajaran"
          footerLabel="Daftar Berkas Berbagi RPP"
          @toAction="ajukan"
          :disableAdd="
            current_user && current_user.no_hp && isCan('rpp_write')
              ? false
              : true
          "
          @search="
            search => {
              textSearch = search;
              load();
            }
          "
          :page="page"
          @change:page="
            pg => {
              cp = pg;
              load();
            }
          "
          @add="add"
          footer
        >
        </m-grid>
      </v-col>
      <ChangeDlg ref="dlg" />
      <DetailDlg ref="detailDlg" />
      <ProfilDlg ref="dlgProfil" />
      <Info ref="dlgInfo" />
    </v-row>
  </v-container>
</template>

<script>
import { isCan } from "@/tools";
import ProfilDlg from "../../user/components/Form.vue";
import ChangeDlg from "../components/Form.vue";
import DetailDlg from "../pages/Detail.vue";
import Info from "../../artikel/components/Info.vue";

export default {
  components: {
    ChangeDlg,
    DetailDlg,
    ProfilDlg,
    Info
  },
  data() {
    return {
      noData: false,
      items: [],
      moda: null,
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
          title: "Tautan RPP",
          click: (i, o) => this.link(o),
          check: (i, o) => o.status.id == 2
        },
        {
          title: "Batal Tayang",
          click: (i, o) => this.batalSetujui(o),
          check: (i, o) => o.status.id == 2 && isCan("rpp_approve")
        },
        {
          title: "Ubah",
          click: (i, o) => this.edit(o),
          check: (i, o) => o.status.id == 1 && isCan("rpp_write")
        },
        {
          title: "Hapus",
          click: (i, o) => this.hapus(o),
          check: (i, o) => o.status.id == 1 && isCan("rpp_write")
        }
      ]
    };
  },
  computed: {
    grid() {
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
                lazySrc: "https://guruberbagi.simpkb.id/wp-content/uploads/2020/03/Icon-1-3.png",
                alt: "avatar"
              },
              src: (o) =>  o.cover && o.cover.new_url
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
          grid: {cols: 12, sm: 6, md: 6, lg: 6},
          class: 'my-1 py-0',
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
              component: 'i',
              properties: {
                small: true
              },
              class: 'caption red--text mdi mdi-file-pdf'
            },
            {
              component: 'a',
              name: 'file.origin_filename',
              href: 'file.url_lampiran',
              target: "_blank",
              class: "caption mb-1"
            },
            {
              component: 'p',
              name: 'deskripsi',
              class: 'grey--text',
              filter: 'truncate',
              len: 55,
              conditional: {
                cond: this.$vuetify.breakpoint.smAndUp
              }
            },
            {
              component: 'p',
              name: 'deskripsi',
              class: 'grey--text',
              filter: 'truncate',
              len: 34,
              conditional: {
                cond: this.$vuetify.breakpoint.xsOnly
              }
            },
            {
              component: 'VChip',
              properties: {
                label: true,
                small: true
              },
              class: 'orange white--text mb-2',
              text: 'PPG',
              conditional: {
                vIf: (o) => o.author.is_ppg
              }
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
          grid: {cols: 12, sm: 2, md: 2, lg: 2},
          header: 'Jenis',
          contents: [
            {
              component: 'p',
              name: 'moda',
              class: 'font-weight-bold info--text mr-2',
              filter: 'toUppercase'
            }
          ]
        },
        {
          grid: {cols: 12, sm: 2, md: 2, lg: 2},
          header: 'Status',
          contents: [
            {
              component: 'p',
              name: 'status.keterangan',
              statusColor: this.$rpp,
              statusName: 'status.id'
            },
            {
              component: 'i',
              class: 'mdi mdi-alert error--text',
              conditional: {
                vIf: (o) => o.lapor_count > 0 && o.status.id == 2
              }
            },
            {
              component: 'span',
              text: 'RPP Anda dalam Pengawasan',
              conditional: {
                vIf: (o) => o.lapor_count > 0 && o.status.id == 2
              }
            },
            {
              component: 'm-button',
              properties:{
                appendIcon: true,
                icon: 'mdi mdi-send',
                textButton: 'Publikasi',
              },
              conditional: {
                vIf: (o) => o.status.id == 1 && isCan('rpp_approve')
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
        .dispatch("rpp/get", {
          params: {
            post_type_id: 1,
            page: this.cp,
            s: this.textSearch,
            moda: this.moda ? this.moda.id : null,
            status: this.status ? this.status.id : null
          }
        })
        .then(res => {
          if (res && res.data.length <= 0) {
            this.noData = true;
          } else {
            this.noData = false;
          }
          this.page = res;
          this.items = res.data;
        })
        .catch(e => e);
    },
    filter(data) {
      console.log(data.moda);
      if (data.moda) {
        this.moda = data.moda;
        this.moda.type = 'moda'
      }else{
        this.moda = null
      }

      console.log(this.moda);

      if (data.status) {
        this.status = data.status;
        this.status.type = 'status'
      }else{
        this.status = null
      }

      this.load();
    },
    removeFilterBy(item){
      if (item == 'moda') {
        this.moda = null
      }else if (item == 'status') {
        this.status = null
      }
      this.load()
    },
    updateProfil(item) {
      this.$refs.dlgProfil.open(item);
    },
    ajukan(item) {
      this.$confirm(
        `Apakah Anda yakin akan mengajukan RPP ini ?<br>
        <div class="mt-2 title grow text-center">
           ${item.judul} <br>
        </div>
      `
      )
        .then(() =>
          this.$store
            .dispatch("rpp/ajukan", { obj: item })
            .then(res => {
              if (res.error) {
                this.$info("RPP gagal diajukan");
              } else {
                this.$info("RPP berhasil diajukan");
              }
            })
            .then(() => this.load())
            .catch(e => e)
        )
        .catch(e => e);
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
            .dispatch("rpp/batalSetujui", { obj: item })
            .then(res => {
              if (res.error) {
                this.$info("RPP gagal dibatalkan");
              } else {
                this.$info("RPP berhasil dibatalkan");
              }
            })
            .then(() => this.load())
            .catch(e => e)
        )
        .catch(e => e);
    },
    detail(item) {
      this.$refs.detailDlg.open(item);
    },
    add() {
      if (this.current_user && !this.current_user.no_hp) {
        this.$error(
          "Untuk dapat menambahkan RPP Anda harus melengkapi nomor selular Anda terlebih dahulu"
        );
      } else {
        this.$refs.dlgInfo.open().then(() => {
          this.$refs.dlg.open().then(() => {
            this.load();
          });
        });
      }
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
        .then(() => this.$store.dispatch("rpp/drop", item))
        .then(res => {
          if (res.error) {
            this.$info("RPP gagal dihapus");
          } else {
            this.$info("RPP berhasil dihapus");
          }
        })
        .then(() => this.load())
        .catch(e => e);
    }
  },
  watch: {}
};
</script>
