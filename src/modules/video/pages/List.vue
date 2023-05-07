<template>
  <v-row wrap>
    <v-col cols="12">
      <v-col cols="12" class="mb-0">
        <m-alert :show="current_user && !current_user.no_hp">
          <template v-slot:default>
            <h3>
              Untuk dapat menambahkan Video, Anda harus melengkapi nomor selular
              terlebih dahulu
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
    </v-col>
    <v-col cols="12">
      <m-grid
        :gridConfig="grid"
        title="Daftar Video"
        add
        search
        id-key
        refresh
        @refresh="load"
        addText="Tambah Video"
        footerLabel="Daftar Berkas Berbagi Video"
        :items="items"
        @toAction="ajukan"
        :disableAdd="
          current_user && current_user.no_hp
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
    <ChangeDlg ref="dlg" />
    <DetailDlg ref="detailDlg" />
    <ProfilDlg ref="dlgProfil" />
  </v-row>
</template>

<script>
import ProfilDlg from "../../user/components/Form.vue";
import ChangeDlg from "../components/Form.vue";
import DetailDlg from "../pages/Detail.vue";

export default {
  components: {
    ChangeDlg,
    DetailDlg,
    ProfilDlg
  },
  data() {
    return {
      noData: false,
      items: [],
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
          title: "Tautan Video",
          click: (i, o) => this.link(o),
          check: (i, o) => o.status
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
    grid() {
      const conf = [
        {
          grid: { cols: this.$vuetify.breakpoint.smAndUp ? 12 : 10, sm: 1, md: 1, lg: 1 },
          properties: {
            align: "center",
            justify: "center"
          },
          contents: [
            {
              component: "VAvatar",
              properties: {
                width: 50,
                height: 50,
                size: 45,
                color: "light-blue lighten-4"
              },
              subContents: [
                {
                  component: "VIcon",
                  properties: {
                    color: "blue"
                  },
                  text: "mdi-video"
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
          class: 'my-1 py-0',
          contents: [
            {
              component: 'p',
              class: 'subtitle-1 black--text my-0 py-0',
              name: 'judul',
              filter: 'toTitleCase'
            },
            {
              component: 'p',
              class: 'caption light-blue--text text--darken-4 my-0 py-0 mdi mdi-account',
              name: 'author.name',
              conditional: {
                cond: this.user && this.user.peran.id != 2
              }
            },
            {
              component: 'p',
              name: 'created_at',
              class: 'grey--text text--darken-2 caption mr-1',
              filter: 'toD'
            },
            {
              component: 'p',
              class: 'body-2 grey--text text--darken-2',
              name: 'deskripsi',
              filter: 'truncate',
              len: 89
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
          header: 'Kategori',
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
              name: 'lingkup',
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
              statusColor: this.$video,
              statusName: 'status.id'
            },
            {
              component: 'i',
              class: 'mdi mdi-alert error--text',
              conditional: {
                vIf: (o) => o.lapor_count > 0 && o.status.id !== 3
              }
            },
            {
              component: 'span',
              text: 'Video Anda dalam Pengawasan',
              conditional: {
                vIf: (o) => o.lapor_count > 0 && o.status.id !== 3
              }
            },
            {
              component: 'm-button',
              properties:{
                appendIcon: true,
                icon: 'mdi mdi-send',
                textButton: 'Ajukan',
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
    }
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      return this.$store
        .dispatch("video/get", {
          params: {
            post_type_id: 5,
            page: this.cp,
            s: this.textSearch,
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
    updateProfil(item) {
      this.$refs.dlgProfil.open(item);
    },
    submit(item) {
      this.$confirm(
        `Apakah Anda yakin akan mengajukan Video ini ? Anda tidak dapat mengubah video ini setelah diajukan.<br>
        <div class="mt-2 title grow text-center">
           ${item.judul} <br>
        </div>
      `
      )
        .then(() =>
          this.$store
            .dispatch("video/submit", { obj: item })
            .then(res => {
              if (res.error) {
                this.$info("Video gagal diajukan");
              } else {
                this.$info("Video berhasil diajukan");
              }
            })
            .then(() => this.load())
            .catch(e => e)
        )
        .catch(e => e);
    },
    ajukan(item) {
      this.$confirm(
        `Apakah Anda yakin akan mengajukan Video ini ?<br>
        <div class="mt-2 title grow text-center">
           ${item.judul} <br>
        </div>
      `
      )
        .then(() =>
          this.$store
            .dispatch("video/ajukan", { obj: item })
            .then(res => {
              if (res.error) {
                this.$info("Video gagal diajukan");
              } else {
                this.$info("Video berhasil diajukan");
              }
            })
            .then(() => this.load())
            .catch(e => e)
        )
        .catch(e => e);
    },
    batalSetujui(item) {
      this.$confirm(
        `Apakah Anda yakin akan batal menayangkan Video ini ?<br>
        <div class="mt-2 title grow text-center">
          ${item.judul} <br>
        </div>
      `
      )
        .then(() =>
          this.$store
            .dispatch("video/batalSetujui", { obj: item })
            .then(res => {
              if (res.error) {
                this.$info("Video gagal ditayangkan");
              } else {
                this.$info("Video berhasil ditayangkan");
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
        .then(() => this.$store.dispatch("video/drop", item))
        .then(res => {
          if (res.error) {
            this.$info("Video gagal dihapus");
          } else {
            this.$info("Video berhasil dihapus");
          }
        })
        .then(() => this.load())
        .catch(e => e);
    }
  },
  watch: {}
};
</script>
