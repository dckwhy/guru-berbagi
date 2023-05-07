<template>
  <v-container grid-list-xl class="pa-0">
    <v-row wrap>
      <v-col cols="12">
        <m-grid
          :gridConfig="grid"
          two-line
          title="Forum Bantuan"
          footerLabel="Pertanyaan"
          search
          id-key
          :items="items"
          refresh
          @refresh="load"
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
        >
        </m-grid>
      </v-col>
    </v-row>
    <ChangeDlg ref="dlg" />
  </v-container>
</template>

<script>
import { isCan } from "@/tools";
import ChangeDlg from "../components/Form.vue";

export default {
  components: {
    ChangeDlg
  },
  data() {
    return {
      items: [],
      textSearch: null,
      page: null,
      cp: 1,
      more_menu: [
        // eslint-disable-next-line
        {
          title: "Tayangkan",
          click: (i, o) => this.setujui(o),
          check: (i, o) => o.approve == 0 && isCan("bantuan")
        },
        {
          title: "Batal Tayang",
          click: (i, o) => this.batalSetujui(o),
          check: (i, o) => o.approve == 1 && isCan("bantuan")
        },
        {
          title: "Ubah Jawaban",
          click: (i, o) => this.edit(o) && isCan("bantuan")
        },
        {
          title: "Hapus",
          click: (i, o) => this.hapus(o) && isCan("bantuan")
        }
      ]
    };
  },
  computed: {
    grid(){
      const conf = [
        {
          grid: {cols: this.$vuetify.breakpoint.mdAndDown ? 10 : 12, sm: 11, md: 11, lg: 4},
          contents: [
            {
              component: 'p',
              class: 'font-weight-bold my-0 py-0',
              name: 'judul',
              filter: 'toTitleCase'
            },
            {
              component: 'p',
              class: 'caption light-blue--text text--darken-4 my-2 py-0 mdi mdi-account',
              name: 'author',
            },
            {
              component: 'p',
              class: 'caption light-blue--text text--darken-4 my-2 py-0 mdi mdi-email',
              name: 'email',
            },
            {
              component: 'p',
              name: 'pesan',
            },
          ]
        },
        {
          grid: {cols: 2, sm: 1, md: 1},
          contents: [
            {
              component: 'p',
              type: "more",
              more: this.more_menu,
              conditional: {
                cond:this.$vuetify.breakpoint.mdAndDown
              }
            }
          ],
          vShow: {
            cond: this.$vuetify.breakpoint.mdAndDown
          }
        },
        {
          grid: {cols: 12, sm: 12, md: 12, lg: 4},
          contents: [
            {
              component: 'p',
              class: 'font-weight-bold my-0 py-0',
              name: 'jawab.judul',
              filter: 'toTitleCase'
            },
            {
              component: 'p',
              class: 'caption light-blue--text text--darken-4 my-2 py-0 mdi mdi-account',
              name: 'jawab.author',
            },
            {
              component: 'p',
              class: 'caption light-blue--text text--darken-4 my-2 py-0 mdi mdi-email',
              name: 'jawab.email',
            },
            {
              component: 'p',
              name: 'jawab.pesan',
            },
          ]
        },
        {
          grid: {cols: 12, sm: 12, md: 12, lg: 3},
          header: 'Status',
          contents: [
            {
              component: 'p',
              text: 'TAYANG',
              class: 'caption success--text',
              conditional: {
                vIf: (o) => o.approve == 1
              }
            },
            {
              component: 'p',
              text: 'MODERASI',
              class: 'caption error--text',
              conditional: {
                vIf: (o) => o.approve != 1
              }
            },
            {
              component: 'm-button',
              class: 'white--text',
              properties:{
                appendIcon: true,
                icon: 'mdi mdi-send',
                textButton: 'Jawab',
                color: 'primary'
              },
              conditional: {
                vIf: (o) => !o.jawab
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
                cond:this.$vuetify.breakpoint.lgOnly
              }
            }
          ],
          conditional: {
            cond:this.$vuetify.breakpoint.lgOnly
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
  methods: {
    load() {
      return this.$store
        .dispatch("bantuan/get", {
          params: {
            page: this.cp,
            s: this.textSearch
          }
        })
        .then(res => {
          this.page = res;
          this.items = res.data;
        })
        .catch(e => e);
    },
    setujui(item) {
      this.$confirm(
        `Apakah Anda yakin akan menayangkan pertanyaan ini ?<br>
        <div class="mt-2 title grow text-center">
          ${item.pesan} <br>
        </div>
      `
      )
        .then(() =>
          this.$store
            .dispatch("bantuan/setujui", { obj: item })
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
        `Apakah Anda yakin akan batal menayangkan pertanyaan ini ?<br>
        <div class="mt-2 title grow text-center">
          ${item.pesan} <br>
        </div>
      `
      )
        .then(() =>
          this.$store
            .dispatch("bantuan/batalSetujui", { obj: item })
            .then(() => {
              this.$info("Batal tayang berhasil");
            })
            .then(() => this.load())
            .catch(e => e)
        )
        .catch(e => e);
    },
    hapus(item) {
      this.$confirm(
        `Apakah Anda yakin akan menghapus pertanyaan ini ?<br>
        <div class="mt-2 title grow text-center">
          ${item.pesan} <br>
        </div>
      `
      )
        .then(() =>
          this.$store
            .dispatch("bantuan/hapus", { obj: item })
            .then(() => {
              this.$info("Pertanyaan berhasil dihapus");
            })
            .then(() => this.load())
            .catch(e => e)
        )
        .catch(e => e);
    },
    jawab(item) {
      this.$refs.dlg.open(item).then(() => {
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
    }
  },
  watch: {}
};
</script>
