<template>
  <v-container grid-list-xl class="pa-0">
    <v-row wrap>
      <v-col cols="12" class="pb-0">
        <m-alert :show="true">
          <template v-slot:default>
            <p>
              Kurator dapat melakukan
              <b>penilaian</b> sekaligus melakukan
              <b>perbaikan artikel</b> melalui tombol nilai
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
          filterJenis
          filterStatus
          filterBobot
          filterMapel
          filterStatusPlagiat
          :filterKonten="
            this.current_user.is_super_admin
              ? true
              : this.current_user.peran && this.current_user.peran.id == 1
              ? true
              : false
          "
          @filter="filter"
          :filterBy="this.jenis || this.mapel || this.status || this.bobot || this.mapel || this.tanggal || this.plagiat || this.is_simpatika ?  [jenis, status, bobot, mapel, tanggal, plagiat, is_simpatika] : null"
          @remove-filter-by="removeFilterBy"
          :itemStatuses="itemStatuses"
          :itemMapels="itemMapels"
          id-key
          :items="items"
          refresh
          @refresh="load"
          :page="page"
          footer
          @kurasi="nilai"
          @publikasi="ajukan"
          @batalTayang="batalTayang"
          @batalKurasi="batalKurasi"
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
    <PengesahanDlg ref="dlgPengesahan" />
  </v-container>
</template>

<script>
import { isCan } from "@/tools";
import ChangeDlg from "../components/Form.vue";
import ProfilDlg from "../../user/components/Form.vue";
import DetailDlg from "../pages/Detail.vue";
import HistoryDlg from "../pages/History.vue";
import PengesahanDlg from "../components/Pengesahan.vue";

export default {
  components: {
    ChangeDlg,
    DetailDlg,
    ProfilDlg,
    PengesahanDlg,
    HistoryDlg
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
      is_simpatika: null,
      bobot: null,
      tanggal: null,
      mapel: null,
      plagiat: null,
      textSearch: null,
      page: null,
      cp: 1,
      itemKurasi: null,
      itemMapels: [],
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
        // eslint-disable-next-line
        {
          title: "Detail Kurasi",
          click: (i, o) => this.history(o)
        },
        {
          title: "Batal Tayang",
          click: (i, o) => this.batalTayang(o),
          check: (i, o) => o.status.id == 2 && isCan("artikel_approve")
        },
        {
          title: "Batal Ajuan",
          click: (i, o) => this.batalAjuan(o),
          check: (i, o) =>
            o.status.id == 3 &&
            !o.kurator &&
            isCan("artikel_approve") &&
            !o.statuskurasiplagiat
        },
        {
          title: "Batal Kurasi",
          click: (i, o) => this.batalKurasi(o),
          check: (i, o) =>
            o.status.id == 3 && o.kurator && isCan("artikel_approve")
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
              component: 'span',
              text: 'Mapel: ',
              class: 'subtitle-2 my-0'
            },
            {
              component: 'span',
              class: 'info--text mb-2',
              textFunc: (o) => o.mapel[2].term.nama,
              conditional: {
                vIf: (o) => o.mapel.length == 3
              }
            },
            {
              component: 'span',
              class: 'black--text mb-2',
              text: '-',
              conditional: {
                vIf: (o) => o.mapel.length < 3
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
                  name: 'sumber_penulis',
                },
                {
                  component: 'span',
                  text: '-',
                  conditional: {
                    vIf: (o) => !o.sumber_penulis
                  }
                }
              ]
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
            {
              component: 'p',
              class: 'error--text mdi mdi-alert',
              text: 'Konten Artikel kurang dari 300 Karakter',
              conditional: {
                vIf: (o) => o.deskripsi && this.$tools.wordCount(o.deskripsi) < 300
              }
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
              statusName: 'status.id',
              class: 'subtitle-2'
            }
          ]
        },
        {
          grid: {cols: 12, sm: 2, md: 2, lg: 2},
          header: 'Status Plagiarisme',
          contents: [
            {
              component: 'p',
              class: 'mt-0 mb-2 subtitle-2 error--text',
              text: 'Plagiat',
              conditional: {
                vIf: (o) => o.statuskurasiplagiat && o.statuskurasiplagiat.post_plagiat_id == 2
              }
            },
            {
              component: 'p',
              class: 'mt-0 mb-2 subtitle-2 success--text',
              text: 'Lulus Plagiat',
              conditional: {
                vIf: (o) => o.statuskurasiplagiat && o.statuskurasiplagiat.post_plagiat_id == 1
              }
            },
            {
              component: 'p',
              class: 'mt-0 mb-2 subtitle-2 info--text',
              text: 'Belum dikurasi plagiarisme',
              conditional: {
                vIf: (o) => !o.statuskurasiplagiat || !o.statuskurasiplagiat.post_plagiat_id
              }
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
                disabled: !isCan('kurasi_plagiat'),
                color: 'orange',
                isBlock: true
              },
              conditional: {
                vIf: (o) => !o.kurator && o.status.id == 3 && o.statuskurasiplagiat && o.statuskurasiplagiat.post_plagiat_id == 1
              },
              action: 'kurasi',
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
    this.loadMapel();
    //set default filter sesuai peran
  },
  mounted() {
    this.checkQuery();
    if (this.current_user && this.current_user.peran.id == 3) {
      this.plagiat = {
        id: 1,
        nama: "Lolos/Tidak Plagiat",
        type: "plagiat"
      }
    } else if (this.current_user && this.is_kurator_plagiat) {
      this.plagiat = {
        id: 0,
        nama: "Belum Dikurasi",
        type: "plagiat"
      }
    }
  },
  methods: {
    checkQuery() {
      if (this.$route.query.id) {
        const artikel_id = this.$route.query.id;
        return this.$store
          .dispatch("kurasiArtikel/detail", artikel_id)
          .then(res => {
            const item = res;
            if (
              item.id &&
              item.statuskurasiplagiat &&
              item.statuskurasiplagiat.post_plagiat_id == 1
            ) {
              this.nilai(item);
            } else {
              this.$error("Artikel Tidak ditemukan");
            }
          })
          .catch(e => e);
      }
    },
    load() {
      return this.$store
        .dispatch("kurasiArtikel/get", {
          params: {
            post_type_id: 2,
            page: this.cp,
            s: this.textSearch,
            jenis: this.jenis ? this.jenis.id : null,
            status: this.status ? this.status.id : null,
            is_similarity: this.bobot ? this.bobot.id : null,
            tanggal: (this.tanggal) ? this.tanggal.id : null,
            mapel: this.mapel ? this.mapel.nama : null,
            status_kurasi_plagiat: this.plagiat ? this.plagiat.id : null,
            is_simpatika: this.is_simpatika ? this.is_simpatika.id : null
          }
        })
        .then(res => {
          this.page = res;
          this.items = res.data;
          this.cekLock();
        })
        .catch(e => e);
    },
    loadMapel() {
      return this.$store
        .dispatch("user/getMapel", {
          params: {}
        })
        .then(res => {
          this.itemMapels = res;
        })
        .catch(e => e);
    },
    cekPlagiarism(item, status) {
      this.$refs.dlgPengesahan.open(item, null, null, status).then(() => {
        this.load();
      });
    },
    batalSetPlagiat(item) {
      this.$confirm(
        `Apakah Anda yakin akan membatalkan kurasi plagiarisme pada Artikel ini ? <br>
        <div class="mt-2 title grow text-center">
           ${item.judul} <br>
        </div>
      `
      )
        .then(() =>
          this.$store
            .dispatch("kurasiArtikel/batalSetPlagiat", { obj: item })
            .then(res => {
              if (res.error) {
                this.$error("Pembatalan Set Plagiat gagal");
              } else {
                this.$info("Set Artikel Plagiat dibatalkan");
              }
            })
            .then(() => this.load())
            .catch(e => e)
        )
        .catch(e => e);
    },
    cekLock() {
      return this.$store
        .dispatch("kurasiArtikel/get", {
          params: {
            post_type_id: 2,
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

      if (data.plagiat) {
        this.plagiat = data.plagiat;
        this.plagiat.type = 'plagiat'
      }else{
        this.plagiat = null
      }

      if (data.statusKonten) {
        this.is_simpatika = data.statusKonten;
        this.is_simpatika.type = 'jenis user'
      }else{
        this.is_simpatika = null
      }

      this.mapel = {
        nama: data.mapel,
        type: 'mapel'
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
      }else if (item == 'plagiat') {
        this.plagiat = null
      }else if (item == 'jenis user') {
        this.is_simpatika = null
      }else if (item == 'mapel') {
        this.mapel = null
      }
      this.load()
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
            .dispatch("kurasiArtikel/ajukan", { obj: item })
            .then(res => {
              if (res.error) {
                this.$info("Artikel gagal dipublikasikan");
              } else {
                this.$info("Artikel berhasil dipublikasikan");
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
            .dispatch("kurasiArtikel/batalAjuan", { obj: item })
            .then(res => {
              if (res.error) {
                this.$error("Batal Ajuan Artikel Gagal");
              } else {
                this.$info(
                  "Ajuan Artikel dibatalkan. Artikel dikembalikan kembali kepada kontributor."
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
        `Apakah Anda yakin akan membatalkan Kurasi Anda pada Artikel ini ?<br>
        <div class="mt-2 title grow text-center">
           ${item.judul} <br>
        </div>
      `
      )
        .then(() =>
          this.$store
            .dispatch("kurasiArtikel/batalKurasi", { obj: item })
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
        `Apakah Anda yakin akan batal menayangkan Artikel ini ?<br>
        <div class="mt-2 title grow text-center">
          ${item.judul} <br>
        </div>
      `
      )
        .then(() =>
          this.$store
            .dispatch("kurasiArtikel/batalTayang", { obj: item })
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
    history(item) {
      this.$refs.historyDlg.open(item);
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
