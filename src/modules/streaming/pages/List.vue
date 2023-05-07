<template>
  <v-row wrap>
    <v-col cols="12">
      <m-grid
        :gridConfig="grid"
        title="Daftar Live Streaming"
        add
        search
        id-key
        filter
        filterStatus
        @filter="filter"
        :filterBy="this.status ? [status] : null"
        @remove-filter-by="removeFilterBy"
        :itemStatuses="itemStatuses"
        addText="Tambah Video"
        refresh
        @refresh="load"
        footerLabel="Daftar Live Streaming"
        :items="items"
        @toAction="submit"
        :disableAdd="current_user && current_user.no_hp ? false : true"
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
    <ChangeDlg ref="dlg" />
  </v-row>
</template>

<script>
import ChangeDlg from "../components/Form.vue";

export default {
  components: {
    ChangeDlg
  },
  data() {
    return {
      noData: false,
      items: [],
      tanggal: null,
      status: null,
      textSearch: null,
      page: null,
      cp: 1,
      more_menu: [
        // eslint-disable-next-line
        {
          title: "Ubah",
          click: (i, o) => this.edit(o)
        },
        {
          title: "Hapus",
          click: (i, o) => this.hapus(o)
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
                  text: "mdi-youtube"
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
          grid: { cols: 12, sm: 4, md: 4, lg: 4 },
          class: "my-1 py-0",
          contents: [
            {
              component: "p",
              class: "subtitle-1 black--text my-0 py-0",
              name: "judul",
              filter: "toTitleCase"
            },
            {
              component: "p",
              class: "body-2 grey--text",
              name: "deskripsi",
              filter: "truncate",
              len: 144
            }
          ]
        },
        {
          grid: { cols: 12, sm: 2, md: 2, lg: 2 },
          header: "Tanggal",
          contents: [
            {
              component: "p",
              name: "waktu",
              class: "caption my-0 py-0",
              filter: "toDN"
            },
            {
              component: "VIcon",
              text: "mdi-clock",
              class: "caption blue--text"
            },
            {
              component: "span",
              name: "waktu",
              class: "caption",
              filter: "toTime"
            },
            {
              component: "span",
              text: "-",
              class: "caption"
            },
            {
              component: "span",
              name: "waktu_selesai",
              class: "caption",
              filter: "toTime"
            },
            {
              component: "span",
              text: "WIB",
              class: "caption"
            }
          ]
        },
        {
          grid: { cols: 12, sm: 2, md: 2, lg: 2 },
          header: "Tautan / Url",
          contents: [
            {
              component: "a",
              name: "urlvideo",
              href: "urlvideo",
              target: "_blank",
              class: "subtitle-2",
              filter: 'truncate',
              len: 21
            }
          ]
        },
        {
          grid: { cols: 12, sm: 2, md: 2, lg: 2 },
          header: "Status",
          contents: [
            {
              component: "p",
              name: "status_streaming",
              statusColor: this.$streaming,
              statusName: "status_streaming"
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
      ];
      return conf;
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
      const itemStatuses = [
        {
          id: "berakhir",
          nama: "Sudah Berakhir"
        },
        {
          id: "belum",
          nama: "Belum dimulai"
        },
        {
          id: "berlangsung",
          nama: "Sedang Berlangsung"
        }
      ]
      return itemStatuses
    }
  },
  activated() {
    this.load();
  },
  methods: {
    load() {
      return this.$store
        .dispatch("streaming/get", {
          params: {
            post_type_id: 5,
            page: this.cp,
            s: this.textSearch,
            status_streaming: this.status ? this.status.id : null
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
    updateProfil(item) {
      this.$refs.dlgProfil.open(item);
    },
    submit(item) {
      this.$confirm(
        `Apakah Anda yakin akan mengajukan streaming ini ? Anda tidak dapat mengubah streaming ini setelah diajukan.<br>
        <div class="mt-2 title grow text-center">
           ${item.judul} <br>
        </div>
      `
      )
        .then(() =>
          this.$store
            .dispatch("streaming/submit", { obj: item })
            .then(res => {
              if (res.error) {
                this.$info("streaming gagal diajukan");
              } else {
                this.$info("streaming berhasil diajukan");
              }
            })
            .then(() => this.load())
            .catch(e => e)
        )
        .catch(e => e);
    },
    ajukan(item) {
      this.$confirm(
        `Apakah Anda yakin akan mengajukan streaming ini ?<br>
        <div class="mt-2 title grow text-center">
           ${item.judul} <br>
        </div>
      `
      )
        .then(() =>
          this.$store
            .dispatch("streaming/ajukan", { obj: item })
            .then(res => {
              if (res.error) {
                this.$info("streaming gagal diajukan");
              } else {
                this.$info("streaming berhasil diajukan");
              }
            })
            .then(() => this.load())
            .catch(e => e)
        )
        .catch(e => e);
    },
    batalSetujui(item) {
      this.$confirm(
        `Apakah Anda yakin akan batal menayangkan streaming ini ?<br>
        <div class="mt-2 title grow text-center">
          ${item.judul} <br>
        </div>
      `
      )
        .then(() =>
          this.$store
            .dispatch("streaming/batalSetujui", { obj: item })
            .then(res => {
              if (res.error) {
                this.$info("streaming gagal ditayangkan");
              } else {
                this.$info("streaming berhasil ditayangkan");
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
        .then(() => this.$store.dispatch("streaming/drop", item))
        .then(res => {
          if (res.error) {
            this.$info("streaming gagal dihapus");
          } else {
            this.$info("streaming berhasil dihapus");
          }
        })
        .then(() => this.load())
        .catch(e => e);
    }
  },
  watch: {}
};
</script>
