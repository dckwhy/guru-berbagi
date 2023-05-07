<template>
  <v-container grid-list-xl class="pa-0">
    <v-row wrap>
      <v-col cols="12">
        <m-grid
          :gridConfig="grid"
          title="Daftar Aksi"
          two-line
          add
          search
          id-key
          :itemJenisAksis="jenisAksis"
          filter
          filterJenisAksi
          filterTanggal
          @filter="filter"
          :filterBy="this.jenisAksi || this.tanggal ?  [jenisAksi, tanggal] : null"
          @remove-filter-by="removeFilterBy"
          refresh
          addText="Tambah Aksi"
          @refresh="load"
          footerLabel="Daftar Aksi"
          :items="items"
          noDataText="Anda belum menambahkan Aksi"
          @toAction="submit"
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
    <DetailDlg ref="detailDlg" />
  </v-container>
</template>

<script>
// import { isCan } from "@/tools";
import moment from "moment";
import ChangeDlg from "../components/Form.vue";
import DetailDlg from "../pages/Detail.vue";

export default {
  components: {
    ChangeDlg,
    DetailDlg
  },
  data() {
    return {
      items: [],
      textSearch: null,
      jenisAksi: null,
      tanggal: null,
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
          check: (i, o) => o.status
        },
        {
          title: "Hapus",
          click: (i, o) => this.hapus(o),
          check: (i, o) => o.status
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
          grid: {cols: 12, sm: 4, md: 4, lg: 4},
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
              name: 'author.name'
            },
             {
              component: 'i',
              properties: {
                small: true
              },
              class: 'caption red--text mdi mdi-file-pdf',
              conditional: {
                vIf: (o) => o.brosur
              }
            },
            {
              component: 'a',
              name: 'brosur.origin_filename',
              href: 'brosur.url',
              target: "_blank",
              class: "caption mb-1",
              filter: 'truncate',
              len: 34,
              conditional: {
                vIf: (o) => o.brosur
              }
            },
          ]
        },
        {
          grid: {cols: 12, sm: 2, md: 2, lg: 2},
          header: 'Jenis',
          contents: [
            {
              component: 'p',
              name: 'jenis_aksi',
              class: 'font-weight-bold info--text mr-2',
              filter: 'toUppercase'
            }
          ]
        },
        {
          grid: {cols: 12, sm: 2, md: 2, lg: 2},
          header: 'Waktu Pelaksanaan',
          contents: [
            {
              component: 'p',
              text: '-',
              conditional: {
                vIf: (o) => o.waktu == null
              }
            },
            {
              component: 'span',
              name: 'waktu',
              class: 'my-0 py-0 caption',
              filter: 'toDT',
              conditional: {
                vIf: (o) => o.jenis_aksi != 'Dokumen'
              }
            },
            {
              component: 'p',
              text: 's/d',
              class: 'my-0 py-0',
              conditional: {
                vIf: (o) => o.jenis_aksi != 'Dokumen'
              }
            },
            {
              component: 'span',
              name: 'waktu_selesai',
              class: 'my-0 py-0 caption',
              filter: 'toDT',
              conditional: {
                vIf: (o) => o.jenis_aksi != 'Dokumen'
              }
            },
          ]
        },
        {
          grid: {cols: 12, sm: 2, md: 2, lg: 2},
          header: 'Status',
          contents: [
            {
              component: 'p',
              name: 'status.keterangan',
              statusColor: this.$aksi,
              statusName: 'status.id'
            },
            {
              component: 'i',
              class: 'mdi mdi-alert error--text',
              conditional: {
                vIf: (o) => o.lapor_count > 0 && o.status.id != 3
              }
            },
            {
              component: 'span',
              text: 'Video Anda dalam Pengawasan',
              conditional: {
                vIf: (o) => o.lapor_count > 0 && o.status.id != 3
              }
            },
            {
              component: 'm-button',
              properties:{
                appendIcon: true,
                icon: 'mdi mdi-send',
                textButton: 'Ajukan',
                color: 'orange white--text'
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
    jenisAksis() {
      if (this.current_user.peran.id == 1) {
        return [
          {
            id: 'webinargtk',
            nama: "Webinar GTK"
          },
          {
            id: 'dokumen',
            nama: "Dokumen"
          },
          {
            id: "webinar",
            nama: "Webinar"
          }
        ];
      } else {
        return [
          {
            id: 'dokumen',
            nama: "Dokumen"
          },
          {
            id: "webinar",
            nama: "Webinar"
          }
        ];
      }
    }
  },
  activated() {
    this.load();
  },
  methods: {
    load() {
      return this.$store
        .dispatch("aksi/get", {
          params: {
            post_type_id: 3,
            page: this.cp,
            s: this.textSearch,
            jenis_aksi: this.jenisAksi ? this.jenisAksi.id : null,
            tanggal: this.tanggal ? this.tanggal.id : null
          }
        })
        .then(res => {
          this.page = res;
          this.items = res.data;
        })
        .catch(e => e);
    },
    convertDate(t1, t2) {
      var current = moment(new Date(), "YYYY-MM-DD HH:mm");
      var start = moment(t1, "YYYY-MM-DD HH:mm");
      var end = moment(t2, "YYYY-MM-DD HH:mm");

      var ago = end.diff(current, "days");

      var range = moment(current).isBetween(start, end);

      // waktu selesai kurang dari sekarang
      if (end < current) {
        return "Sudah berakhir";
      }
      // waktu sekarang berada dalam range waktu mulai dan waktu selesai
      else if (range) {
        return range ? "Sedang berlangsung" : ago + " hari lagi";
      } else {
        // waktu akan dimulai kurang dari 1 hari
        if (ago == 0) {
          var time = moment
            .duration(end.diff(current))
            .asHours()
            .toFixed(2)
            .toString();
          var splitTime = time.split(".");
          return (
            "Dimulai " +
            splitTime[0] +
            " Jam " +
            ((splitTime[1] * 60) / 100).toFixed(0) +
            " Menit lagi"
          );
        }
        // waktu dimulai lebih dari 1 hari
        else {
          return "Dimulai " + ago + " Hari lagi";
        }
      }

      // return end.diff(start, "days");
    },
    filter(data) {
      if (data.jenisAksi) {
        this.jenisAksi = data.jenisAksi;
        this.jenisAksi.type = 'jenis aksi';
      }else{
        this.jenisAksi = null
      }
      
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
      }else {
        this.jenisAksi = null
      }
      this.load()
    },
    submit(item) {
      this.$confirm(
        `Apakah Anda yakin akan mengajukan Aksi ini ? Anda tidak dapat mengubah Aksi ini setelah diajukan.<br>
        <div class="mt-2 title grow text-center">
           ${item.judul} <br>
        </div>
      `
      )
        .then(() =>
          this.$store
            .dispatch("aksi/submit", { obj: item })
            .then(res => {
              if (res.error) {
                this.$info("Aksi gagal diajukan");
              } else {
                this.$info("Aksi berhasil diajukan");
              }
            })
            .then(() => this.load())
            .catch(e => e)
        )
        .catch(e => e);
    },
    ajukan(item) {
      this.$confirm(
        `Apakah Anda yakin akan mempublikasikan Aksi ini ?<br>
        <div class="mt-2 title grow text-center">
           ${item.judul} <br>
        </div>
      `
      )
        .then(() =>
          this.$store
            .dispatch("aksi/ajukan", { obj: item })
            .then(() => {
              this.$info("Data berhasil diajukan");
            })
            .then(() => this.load())
            .catch(e => e)
        )
        .catch(e => e);
    },
    batalSetujui(item) {
      this.$confirm(
        `Apakah Anda yakin akan batal menayangkan Aksi ini ?<br>
        <div class="mt-2 title grow text-center">
          ${item.judul} <br>
        </div>
      `
      )
        .then(() =>
          this.$store
            .dispatch("aksi/batalSetujui", { obj: item })
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
        .then(() => this.$store.dispatch("aksi/drop", item))
        .then(() => {
          this.$info("Aksi " + item.judul + " berhasil dihapus");
        })
        .then(() => this.load())
        .catch(e => e);
    }
  },
  watch: {}
};
</script>
