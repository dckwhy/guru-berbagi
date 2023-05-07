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
      <v-col cols="12" class="pb-0">
        <m-alert :show="true" dismissible>
          <template v-slot:default>
            <p>
              Artikel yang telah Anda buat, akan diterbitkan setelah
              <b>disetujui</b> oleh Admin. Bila dalam waktu 3 bulan belum ada
              informasi artikel telah dikurasi, maka kontributor dapat mencoba
              mengunggah artikel kembali
            </p>
          </template>
        </m-alert>
      </v-col>
      <v-col cols="12">
        <m-grid
          :gridConfig="grid"
          two-line
          title="Daftar Artikel"
          addText="Tambah Artikel"
          footerLabel="Daftar Artikel"
          search
          add
          :disableAdd="
            current_user && current_user.no_hp && isCan('artikel_write')
              ? false
              : true
          "
          filter
          filterJenis
          filterStatus
          @filter="filter"
          :filterBy="this.jenis || this.status ?  [jenis, status] : null"
          @remove-filter-by="removeFilterBy"
          id-key
          :items="items"
          refresh
          @refresh="load"
          @ajukan="submit"
          @batalTayang="batalSetujui"
          @publikasi="ajukan"
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
          @add="add"
        >
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
import ChangeDlg from "../components/Form.vue";
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
      jenis: null,
      status: {
        id: 3,
        nama: 'Ajukan',
        type: 'status'
      },
      textSearch: null,
      page: null,
      cp: 1,
      optFilter: ['toD', 'toDT', 'toUppercase', 'toTitleCase'],
      more_menu: [
        // eslint-disable-next-line
        {
          title: "Pratinjau",
          click: (i, o) => this.detail(o)
        },
        {
          title: "Batal Tayang",
          click: (i, o) => this.batalSetujui(o),
          check: (i, o) => o.status.id == 2 && isCan("artikel_approve")
        },
        {
          title: "Batal Ajuan",
          click: (i, o) => this.batalAjuan(o),
          check: (i, o) =>
            o.status.id == 3 &&
            o.jenis != "refleksi" &&
            isCan("artikel_approve")
        },
        {
          title: "Ubah",
          click: (i, o) => this.edit(o),
          check: (i, o) => o.status.id == 1 && isCan("artikel_write")
        },
        {
          title: "Hapus",
          click: (i, o) => this.hapus(o),
          check: (i, o) => o.status.id == 1 && isCan("artikel_write")
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
                lazySrc: 'https://cdn.siap.id/s3/asset illustrasi/Illustrasi/bg-default.png',
                alt: 'avatar'
              },
              src: (o) => o.cover && o.cover.new_url ? o.cover.new_url.thumbnail : 'https://cdn.siap.id/s3/asset illustrasi/Illustrasi/bg-default.png',
              noImg: 'https://cdn.siap.id/s3/asset illustrasi/Illustrasi/bg-default.png'
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
              component: 'span',
              class: 'caption light-blue--text text--darken-4 my-2 py-0 mdi mdi-account',
              name: 'penulis_asli',
              conditional: {
                vIf: (o) => o.penulis_asli && this.user && this.user.peran.id != 2
              }

            },
            {
              component: 'span',
              class: 'caption light-blue--text text--darken-4 my-2 py-0 mdi mdi-account',
              name: 'author.name',
              conditional: {
                vIf: (o) => !o.penulis_asli && this.user && this.user.peran.id != 2
              }

            },
            {
              component: 'p',
              class: 'caption text--secondary',
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
              component: 'span',
              text: 'RPP Terkait: ',
              conditional: {
                vIf: (o) => o.jenis == 'refleksi'
              }
            },
            {
              component: 'a',
              name: 'rpp.judul',
              href: 'rpp.link',
              target: "_blank",
              conditional: {
                vIf: (o) => o.jenis == 'refleksi' && o.rpp
              }
            },
            {
              component: 'span',
              text: '-',
              href: '-',
              conditional: {
                vIf: (o) => o.jenis == 'refleksi' && !o.rpp
              }
            },
            {
              component: 'VChip',
              properties: {
                label: true,
                small: true
              },
              class: 'orange white--text mb-2 mt-2',
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
                  name: 'tags',
                  textName: 'nama',
                  type: 'tags',
                  properties: {
                    label: true,
                    small: true,
                    color: 'grey lighten-2'
                  },
                  class: 'mr-2 mb-1 mt-2',
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
              name: 'jenis',
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
              statusColor: this.$artikel,
              statusName: 'status.id'
            },
            {
              component: 'm-button',
              class: 'white--text',
              properties:{
                appendIcon: true,
                icon: 'mdi mdi-send',
                textButton: 'Ajukan',
                color: 'orange',
                isBlock: true
              },
              conditional: {
                vIf: (o) => o.status.id == 1 && isCan('artikel_write')
              },
              action: 'ajukan',
            },
            {
              component: 'm-button',
              class: 'white--text',
              properties:{
                appendIcon: true,
                icon: 'mdi mdi-cancel',
                textButton: 'Batal Tayang',
                color: 'blue-grey',
                isBlock: true
              },
              conditional: {
                vIf: (o) => o.status.id == 2 && isCan('artikel_approve')
              },
              action: 'batalTayang',
            },
             {
              component: 'm-button',
              class: 'white--text',
              properties:{
                appendIcon: true,
                icon: 'mdi mdi-send',
                textButton: 'Publikasi',
                color: 'primary',
                isBlock: true
              },
              conditional: {
                vIf: (o) => o.status.id == 3 && o.jenis != 'refleksi' && isCan('artikel_approve')
              },
              action: 'publikasi',
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
        .dispatch("artikel/get", {
          params: {
            post_type_id: 2,
            page: this.cp,
            s: this.textSearch,
            jenis: this.jenis ? this.jenis.id : null,
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
      if (data.jenis) {
        this.jenis = data.jenis;
        this.jenis.type = 'jenis'
      }else{
        this.jenis = null
      }

      if (data.status) {
        this.status = data.status;
        this.status.type = 'status'
      }else{
        this.status = null
      }
      this.load();
    },
    removeFilterBy(item){
      if (item == 'jenis') {
        this.jenis = null
      }else if (item == 'status') {
        this.status = null
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
    ajukan(item) {
      this.$confirm(
        `Apakah Anda yakin akan mempublikasikan Artikel ini ?<br>
        <div class="mt-2 title grow text-center">
           ${item.judul} <br>
        </div>
      `
      )
        .then(() =>
          this.$store
            .dispatch("artikel/ajukan", { obj: item })
            .then(res => {
              if (res.error) {
                this.$info("Artikel gagal dipublikasi");
              } else {
                this.$info("Artikel berhasil dipublikasi");
              }
            })
            .then(() => this.load())
            .catch(e => e)
        )
        .catch(e => e);
    },
    batalSetujui(item) {
      this.$confirm(
        `Apakah Anda yakin akan batal menayangkan Artikel ini ?<br>
        <div class="mt-2 title grow text-center">
          ${item.judul} <br>
        </div>
      `
      )
        .then(() =>
          this.$store
            .dispatch("artikel/batalSetujui", { obj: item })
            .then(res => {
              if (res.error) {
                this.$info("Batal Tayang gagal");
              } else {
                this.$info("Batal Tayang berhasil");
              }
            })
            .then(() => this.load())
            .catch(e => e)
        )
        .catch(e => e);
    },
    batalAjuan(item) {
      this.$confirm(
        `Apakah Anda yakin akan membatalkan Ajuan ini ? Untuk dapat dikurasi kembali, Kontributor harus melakukan pengajuan artikel kembali.<br>
        <div class="mt-2 title grow text-center">
           ${item.judul} <br>
        </div>
      `
      )
        .then(() =>
          this.$store
            .dispatch("artikel/batalAjuan", { obj: item })
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
        </div>`,
        {
          cancelOnly: item.laporan_accepted_count > 0 ? true : false
        }
      )
        .then(() => this.$store.dispatch("artikel/drop", item))
        .then(() => {
          this.$info("Artikel " + item.judul + " berhasil dihapus");
        })
        .then(() => this.load())
        .catch(e => e);
    },
    wrapObj(path, obj) {
      var context = obj || this;
      path = path.split(".");

      for (var i = 0; i < path.length; i++) {
        context = context[path[i]];
      }

      return context;
    },
    filters(optFilter, v){
        var f = this.optFilter.filter(e => e == optFilter)
        return this.$options.filters[f](v)
    },
  },
  watch: {}
};
</script>
