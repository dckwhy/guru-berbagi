<template>
  <v-container grid-list-xl class="pa-0">
    <v-row wrap>
      <v-col cols="12" class="pb-0">
        <m-alert :show="true">
          <template v-slot:default>
            <p>
              Kurator dapat melakukan
              <b>penilaian</b> sekaligus melakukan
              <b>perbaikan video</b> melalui tombol nilai
            </p>
          </template>
        </m-alert>
      </v-col>
      <v-col cols="12" class="pb-0" v-if="itemKurasi">
        <m-alert color="error" :show="true">
          <template v-slot:default>
            <p>
              Anda masih belum menyelesaikan kurasi
              <strong>{{ pVal(itemKurasi, "judul") }}</strong
              >. Silakan menyelesaikan kurasi Anda melalui tombol berikut
            </p>
            <p>
              <v-btn
                @click="nilai(itemKurasi)"
                color="orange"
                class="white--text"
              >
                Kurasi
                <i class="mdi mdi-eye"></i>
              </v-btn>
            </p>
          </template>
        </m-alert>
      </v-col>
      <v-col cols="12">
        <m-grid
          :gridConfig="grid"
          two-line
          title="Daftar Artikel yang akan di Kurasi"
          footerLabel="Daftar Artikel"
          search
          :disableAdd="current_user && current_user.no_hp ? false : true"
          filter
          filterTanggal
          filterStatus
          filterBobot
          :filterKonten="
            this.current_user.is_super_admin
              ? true
              : this.current_user.peran && this.current_user.peran.id == 1
              ? true
              : false
          "
          @filter="filter"
          :filterBy="this.jenis || this.status || this.bobot || this.tanggal ?  [jenis, status, bobot, tanggal] : null"
          @remove-filter-by="removeFilterBy"
          @kurasi="nilai"
          @publikasi="ajukan"
          @batalTayang="batalTayang"
          @batalKurasi="batalKurasi"
          :itemStatuses="itemStatuses"
          id-key
          :items="items"
          refresh
          @refresh="load"
          :page="page"
          footer
          @toAction="nilai"
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
    <HistoryDlg ref="historyDlg" />
  </v-container>
</template>

<script>
import { isCan } from "@/tools";
import ChangeDlg from "../components/Form.vue";
import ProfilDlg from "../../user/components/Form.vue";
import DetailDlg from "../pages/Detail.vue";
import HistoryDlg from "../pages/History.vue";

export default {
  components: {
    ChangeDlg,
    DetailDlg,
    ProfilDlg,
    HistoryDlg
  },
  data() {
    return {
      items: [],
      itemKurasi: null,
      jenis: null,
      status: {
        id: 3,
        nama: 'Ajukan',
        type: 'status'
      },
      tanggal: null,
      bobot: null,
      textSearch: null,
      page: null,
      cp: 1,
      itemStatuses: [
        {
          id: 3,
          nama: "Ajukan"
        },
        {
          id: 2,
          nama: "Terbit"
        },
        {
          id: 4,
          nama: "Tolak"
        }
      ],
      more_menu: [
        // eslint-disable-next-line
        {
          title: "Pratinjau",
          click: (i, o) => this.detail(o)
        },
        {
          title: "Detail Kurasi",
          click: (i, o) => this.history(o)
        },
        {
          title: "Batal Tayang",
          click: (i, o) => this.batalTayang(o),
          check: (i, o) => o.status.id == 2 && isCan("video_approve")
        },
        {
          title: "Batal Ajuan",
          click: (i, o) => this.batalAjuan(o),
          check: (i, o) =>
            o.status.id == 3 && !o.kurator && isCan("video_approve")
        },
        {
          title: "Batal Kurasi",
          click: (i, o) => this.batalKurasi(o),
          check: (i, o) =>
            o.status.id == 3 && o.kurator && isCan("video_approve")
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
                lazySrc: 'https://cdn.siap.id/s3/simpkb/asset%20img/Guru-Berbagi/revisi-portal/thumb-default.jpg',
                alt: 'avatar'
              },
              src: (o) => o.cover && o.cover.new_url
                          ? o.cover.new_url.thumbnail
                          : 'https://cdn.siap.id/s3/simpkb/asset%20img/Guru-Berbagi/revisi-portal/thumb-default.jpg'
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
                cond: this.$vuetify.breakpoint.xsOnly
              }
            }
          ],
          vShow: {
            cond: this.$vuetify.breakpoint.xsOnly
          }
        },
        {
          grid: {cols: 12, sm: 4, md: 4, lg: 4},
          class: 'py-0',
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
              class: 'caption grey--text my-0 py-0',
              text: 'Kurator: '
            },
            {
              component: 'p',
              class: 'my-0 py-0 caption',
              name: 'kurator.name',
              conditional: {
                vIf: (o) => o.kurator
              }
            },
            {
              component: 'p',
              class: 'my-0 py-0 subtitle-2',
              text: '-',
              conditional: {
                vIf: (o) => !o.kurator
              }
            },
            {
              component: 'p',
              class: 'caption grey--text my-0 py-0',
              text: 'Kesesuaian Konten: '
            },
            {
              component: 'span',
              class: 'my-0 py-0 subtitle-2',
              name: 'similarity',
              filter: 'toF2'
            },
            {
              component: 'span',
              class: 'my-0 py-0 subtitle-2',
              text: '%',
            },
            {
              component: 'p',
              class: 'caption grey--text my-0 py-0',
              text: 'Nilai: '
            },
            {
              component: 'p',
              class: 'mt-0 mb-2 py-0 subtitle-2',
              name: 'nilai',
              conditional: {
                vIf: (o) => o.nilai
              }
            },
            {
              component: 'p',
              class: 'mt-0 mb-2 py-0 subtitle-2',
              text: '-',
              conditional: {
                vIf: (o) => !o.nilai
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
                  class: 'mr-2',
                }
              ]
            }
          ]
        },
        {
          grid: {cols: 12, sm: 2, md: 2, lg: 2},
          header: 'Jenis Aksi',
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
          header: 'Lingkup',
          contents: [
            {
              component: 'p',
              class: 'font-weight-bold info--text mr-2',
              name: 'lingkup',
              filter: 'toUppercase'
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
              statusColor: this.$video,
              statusName: 'status.id',
              class: 'subtitle-2'
            },
            {
              component: 'span',
              text: 'Tindak',
              class: 'caption grey--text'
            },
            {
              component: 'p',
              text: '-',
              conditional: {
                vIf: (o) => !o.kurator && o.statuskurasiplagiat && o.statuskurasiplagiat.post_plagiat_id != 1
              }
            },
            {
              component: 'm-button',
              class: 'mt-2 white--text',
              properties:{
                appendIcon: true,
                icon: 'mdi mdi-eye',
                textButton: 'Kurasi',
                color: 'orange',
                isBlock: true
              },
              conditional: {
                vIf: (o) => !o.kurator && o.status.id == 3
              },
              action: 'kurasi'
            },
            {
              component: 'm-button',
              class: 'mt-2 white--text',
              properties:{
                appendIcon: true,
                icon: 'mdi mdi-cancel',
                textButton: 'Batal Kurasi',
                color: 'error',
                isBlock: true
              },
              conditional: {
                vIf: (o) => o.kurator && this.is_publikasi && o.status.id != 2
              },
              action: 'batalKurasi'
            },
            {
              component: 'm-button',
              class: 'mt-2 white--text',
              properties:{
                appendIcon: true,
                icon: 'mdi mdi-send',
                textButton: 'Publikasi',
                color: 'primary',
                isBlock: true
              },
              conditional: {
                vIf: (o) => o.status.id == 3 && o.nilai >= 6 && this.is_publikasi
              },
              action: 'publikasi'
            },
            {
              component: 'm-button',
              class: 'mt-2 white--text',
              properties:{
                appendIcon: true,
                icon: 'mdi mdi-cancel',
                textButton: 'Batal Tayang',
                color: 'blue-grey',
                isBlock: true
              },
              conditional: {
                vIf: (o) => o.status.id == 2 && this.is_publikasi
              },
              action: 'batalTayang'
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
      return isCan("video_approve");
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
    history(item) {
      this.$refs.historyDlg.open(item);
    },
    load() {
      return this.$store
        .dispatch("kurasiVideo/get", {
          params: {
            post_type_id: 5,
            page: this.cp,
            s: this.textSearch,
            jenis: this.jenis ? this.jenis.id : null,
            status: this.status ? this.status.id : null,
            is_similarity: this.bobot ? this.bobot.id : null,
            tanggal: (this.tanggal) ? this.tanggal.id : null,
          }
        })
        .then(res => {
          this.page = res;
          this.items = res.data;
          this.cekLock();
        })
        .catch(e => e);
    },
    cekLock() {
      return this.$store
        .dispatch("kurasiVideo/get", {
          params: {
            post_type_id: 5,
            is_kurasiku: 1
          }
        })
        .then(res => {
          if (res.data.length > 0) {
            this.itemKurasi = res.data[0];
          } else {
            this.itemKurasi = null;
          }
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

      if (data.bobot) {
        this.bobot = data.bobot;
        this.bobot.type = 'bobot'
      }else{
        this.bobot = null
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
      if (item == 'jenis') {
        this.jenis = null
      }else if (item == 'status') {
        this.status = null
      }else if (item == 'bobot') {
        this.bobot = null
      }else if (item == 'tanggal') {
        this.tanggal = null
      }
      this.load()
    },
    ajukan(item) {
      this.$confirm(
        `Apakah Anda yakin akan mempublikasikan Video ini ?<br>
        <div class="mt-2 title grow text-center">
           ${item.judul} <br>
        </div>
      `
      )
        .then(() =>
          this.$store
            .dispatch("kurasiVideo/ajukan", { obj: item })
            .then(res => {
              if (res.error) {
                this.$info("Video gagal dipublikasikan");
              } else {
                this.$info("Video berhasil dipublikasikan");
              }
            })
            .then(() => this.load())
            .catch(e => e)
        )
        .catch(e => e);
    },
    batalAjuan(item) {
      this.$confirm(
        `Apakah Anda yakin akan membatalkan Ajuan ini ? Untuk dapat dikurasi kembali, Kontributor harus melakukan pengajuan video kembali.<br>
        <div class="mt-2 title grow text-center">
           ${item.judul} <br>
        </div>
      `
      )
        .then(() =>
          this.$store
            .dispatch("kurasiVideo/batalAjuan", { obj: item })
            .then(res => {
              if (res.error) {
                this.$error("Batal Ajuan Video Gagal");
              } else {
                this.$info(
                  "Ajuan Video dibatalkan. Video dikembalikan kembali kepada kontributor."
                );
              }
            })
            .then(() => this.load())
            .catch(e => e)
        )
        .catch(e => e);
    },
    batalKurasi(item) {
      this.$confirm(
        `Apakah Anda yakin akan membatalkan Kurasi Anda pada Video ini ?<br>
        <div class="mt-2 title grow text-center">
           ${item.judul} <br>
        </div>
      `
      )
        .then(() =>
          this.$store
            .dispatch("kurasiVideo/batalKurasi", { obj: item })
            .then(res => {
              if (res.error) {
                this.$info("Kurasi gagal dibatalkan");
              } else {
                this.$info("Kurasi berhasil dibatalkan");
              }
            })
            .then(() => this.load())
            .catch(e => e)
        )
        .catch(e => e);
    },
    batalTayang(item) {
      this.$confirm(
        `Apakah Anda yakin akan batal menayangkan Video ini ?<br>
        <div class="mt-2 title grow text-center">
          ${item.judul} <br>
        </div>
      `
      )
        .then(() =>
          this.$store
            .dispatch("kurasiVideo/batalTayang", { obj: item })
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
    detail(item) {
      this.$refs.detailDlg.open(item);
    },
    add() {
      this.$refs.dlg.open().then(() => {
        this.load();
      });
    },
    nilai(item) {
      this.$store
        .dispatch("kurasiVideo/getLock", item.id)
        .then(() => {
          this.$refs.dlg.open(item).then(() => {
            this.load();
          });
        })
        .catch(e => e);
    },
    updateProfil(item) {
      this.$refs.dlgProfil.open(item);
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
        .then(() => this.$store.dispatch("video/drop", item))
        .then(() => {
          this.$info("Video " + item.judul + " berhasil dihapus");
        })
        .then(() => this.load())
        .catch(e => e);
    }
  },
  watch: {}
};
</script>
