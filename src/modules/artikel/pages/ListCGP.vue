<template>
  <v-container grid-list-xl class="pa-0">
    <v-row wrap>
      <v-col cols="12" class="mb-0">
        <m-alert :show="current_user && !current_user.no_hp">
          <template v-slot:default>
            <h3>
              Untuk dapat menambahkan Artikel, Anda harus melengkapi nomor
              selular terlebih dahulu
            </h3>
            <p>Untuk melengkapi nomor selular, silakan klik tombol berikut</p>
            <v-btn
              :small="$vuetify.breakpoint.xs"
              label
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
        title="Daftar Catatan Guru Penggerak"
        add
        search
        id-key
        filter
        filterTanggal
        @filter="filter"
        :filterBy="this.tanggal ?  [tanggal] : null"
        @remove-filter-by="removeFilterBy"
        addText="Tambah Catatan Guru Penggerak"
        refresh
        @refresh="load"
        footerLabel="Daftar Catatan Guru Penggerak"
        :items="items"
        noDataText="Anda belum menambahkan Catatan Guru Penggerak"
        :disableAdd="
            current_user && current_user.no_hp && isCan('cerita_write')
              ? false
              : true
        "
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
        @add="add">
      </m-grid>
      </v-col>
    </v-row>
    <ChangeDlg ref="dlg" />
    <ProfilDlg ref="dlgProfil" />
    <DetailDlg ref="detailDlg" />
    <Info ref="dlgInfo" />
  </v-container>
</template>

<script>
import { isCan } from "@/tools";
import ChangeDlg from "../components/FormCerita.vue";
import ProfilDlg from "../../user/components/Form.vue";
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
      items: [],
      tanggal: null,
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
          check: (i, o) => o.status && isCan("cerita_write")
        },
        {
          title: "Hapus",
          click: (i, o) => this.hapus(o),
          check: (i, o) => o.status && isCan("cerita_write")
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
                lazySrc: "https://cdn.siap.id/s3/asset illustrasi/Illustrasi/bg-default.png",
                alt: "avatar"
              },
              src: (o) =>  o.cover && o.cover.new_url
                          ? o.cover.new_url.thumbnail
                          : 'https://cdn.siap.id/s3/asset illustrasi/Illustrasi/bg-default.png'
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
          grid: {cols: 12, sm: 8, md: 8, lg: 8},
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
              component: 'p',
              class: 'subtitle-2',
              subContents: [
                {
                  component: 'i',
                  properties: {
                    small: true
                  },
                  class: 'caption red--text mdi mdi-book-open-page-variant'
                },
                {
                  component: 'span',
                  text: 'Sumber : ',
                },
                {
                  component: 'span',
                  name: 'sumber_penulis'
                }
              ]
            },
            {
              component: 'p',
              subContents: [
                {
                  component: 'VChip',
                  name: 'tags',
                  textName: 'nama',
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
          header: 'Status',
          contents: [
            {
              component: 'p',
              name: 'status.keterangan',
              statusColor: this.$artikel,
              statusName: 'status.id'
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
      return isCan("artikel_approve");
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
        .dispatch("artikel/getCerita", {
          params: {
            post_type_id: 6,
            page: this.cp,
            s: this.textSearch,
            tanggal: this.tanggal ? this.tanggal.id : null
          }
        })
        .then(res => {
          this.page = res;
          this.items = res.data;
        })
        .catch(e => e);
    },
    filter(data) {
      if (data.tanggal) {
        this.tanggal = data.tanggal;
        this.tanggal.type = 'tanggal'
      }else{
        this.tanggal = null
      }

      this.load();
    },
    removeFilterBy(item){
      if (item == 'tanggal') {
        this.tanggal = null
      }
      this.load()
    },
    submit(item) {
      this.$confirm(
        `Apakah Anda yakin akan mengajukan Artikel ini ? Anda tidak dapat mengubah artikel ini setelah diajukan.<br>
        <div class="mt-2 title grow text-center">
           ${item.judul} <br>
        </div>
      `
      )
        .then(() =>
          this.$store
            .dispatch("artikel/submit", { obj: item })
            .then(res => {
              if (res.error) {
                this.$info("Artikel gagal diajukan");
              } else {
                this.$info("Artikel berhasil diajukan");
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
    updateProfil(item) {
      this.$refs.dlgProfil.open(item);
    },
    add() {
      if (this.current_user && !this.current_user.no_hp) {
        this.$error(
          "Untuk dapat menambahkan Artikel Anda harus melengkapi nomor selular Anda terlebih dahulu"
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
        </div>`
      )
        .then(() => this.$store.dispatch("artikel/drop", item))
        .then(() => {
          this.$info("Artikel " + item.judul + " berhasil dihapus");
        })
        .then(() => this.load())
        .catch(e => e);
    }
  },
  watch: {}
};
</script>
