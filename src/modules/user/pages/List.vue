<template>
  <v-container grid-list-xl class="pa-0">
    <v-row wrap>
      <v-col cols="12">
        <m-grid
          :gridConfig="grid"
          title="Daftar Pengguna"
          search
          id-key
          refresh
          @refresh="load"
          filter
          filterKonten
          filterPeran
          @filter="filter"
          :filterBy="this.peran || this.is_simpatika ?  [peran, is_simpatika] : null"
          @remove-filter-by="removeFilterBy"
          :items="items"
          footerLabel="Pengguna"
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
    </v-row>
  </v-container>
</template>

<script>
import { isCan } from "@/tools";
import ChangeDlg from "../../user/components/Form.vue";

export default {
  components: {
    ChangeDlg
    // DetailDlg
  },
  data() {
    return {
      items: [],
      itemMapels: [],
      peran: null,
      peran_id: null,
      is_simpatika: null,
      jenis_user_id: null,
      textSearch: null,
      page: null,
      cp: 1,
      more_menu: [
        // eslint-disable-next-line
        {
          title: "Ubah Peran",
          click: (i, o) => this.setRole(o),
          check: () => isCan("user")
        },
        {
          title: "Set Kurator Plagiarisme",
          click: (i, o) => this.setKurator(o, "tambah"),
          check: (i, o) =>
            isCan("user") &&
            (o.peran.id == 1 || o.peran.id == 3) &&
            !o.is_kurator_plagiat
        },
        {
          title: "Batal Kurator Plagiarisme",
          click: (i, o) => this.setKurator(o, "batal"),
          check: (i, o) =>
            isCan("user") &&
            (o.peran.id == 1 || o.peran.id == 3) &&
            o.is_kurator_plagiat
        }
      ]
    };
  },
  computed: {
    grid() {
      const conf =  [
        {
          grid: {cols: this.$vuetify.breakpoint.smAndUp ? 12 : 10, sm: 1, md: 1, lg: 1},
          properties: {
            alig:"center", 
            justify:"center"
          },
          contents: [
            {
              component: 'VAvatar',
              properties: {
                size: 45, 
                color:"light-blue lighten-4"
              },
              subContents: [
                {
                  component: 'VImg',
                  properties: {
                    alt: 'avatar',
                  },
                  src: (o) => (o.file_foto) ? o.file_foto : (o.gender == 'P') ? 'img/avatar-default.png' : 'img/avatar-default.png' 
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
          class: 'py-0 my-1',
          contents: [
            {
              component: 'p',
              class: 'subtitle-1 my-0 py-0',
              name: 'name',
              filter: 'toTitleCase'
            },
            {
              component: 'i',
              class: 'mdi mdi-check-circle green--text',
              conditional: {
                vIf: (o) => o.email_verified_at
              }
            },
            {
              component: 'span',
              class: 'caption my-0',
              name: 'email_verified_at',
              filter: 'toDT'
            },
            {
              component: 'p',
              class: 'light-blue--text text--darken-4 caption mdi mdi-email',
              name: 'email',
            },
            {
              component: 'VChip',
              properties: {
                small: true,
                color: 'orange white--text',
                label: true
              },
              class: 'mb-1',
              text: "Kurator Plagiarisme",
              conditional: {
                vIf: (o) => o.is_kurator_plagiat
              }
            }
          ]
        },
        {
          grid: {cols: 12, sm: 3, md: 3, lg: 3},
          header: 'Mata Pelajaran',
          contents: [
            {
              component: 'p',
              type: 'list',
              items: 'mapel'
            }
          ]
        },
        {
          grid: {cols: 12, sm: 3, md: 3, lg: 3},
          header: 'Peran',
          contents: [
            {
              component: 'span',
              name: 'peran.name',
              statusColor: this.$user,
              statusName: 'peran.id',
              filter: 'toTitleCase'
            },
            {
              component: 'span',
              text: "Kemenag",
              class: 'primary--text',
              conditional: {
                vIf: (o) => o.peran.name == 'kurator' && o.is_simpatika == 1
              }
            },
            {
              component: 'span',
              text: "Kemdikbud",
              class: 'primary--text',
              conditional: {
                vIf: (o) => o.peran.name == 'kurator' && o.is_simpatika != 1
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
        { text: "", sortable: false }
      ];
      return a;
    }
  },
  activated() {
    this.load();
    this.loadMapel();
  },
  methods: {
    load() {
      return this.$store
        .dispatch("user/get", {
          params: {
            page: this.cp,
            s: this.textSearch,
            peran: this.peran_id,
            is_simpatika: this.jenis_user_id
          }
        })
        .then(res => {
          this.page = res;
          this.items = res.data;
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
    filter(data) {
      if (data.peran) {
        this.peran = data.peran;
        this.peran.type = 'peran'
        if (this.peran) {
          this.peran_id = this.peran.id
        }else{
          this.peran_id = null
        }
      }else{
        this.peran = null
        this.peran_id = null
      }

      if (data.statusKonten) {
      this.is_simpatika = data.statusKonten;
      this.is_simpatika.type = 'is_simpatika'
      if (this.is_simpatika) {
        this.jenis_user_id = this.is_simpatika.id
      }else{
        this.jenis_user_id = null
      }
      }else{
        this.is_simpatika = null
        this.jenis_user_id = null
      }
      this.load();
    },
    removeFilterBy(item){
      if (item == 'peran') {
        this.peran = null
        this.peran_id = null
      }else{
        this.is_simpatika = null
        this.jenis_user_id = null
      }
      this.load()
    },
    ajukan(item) {
      this.$confirm(
        `Apakah Anda yakin akan menambahkan Anggota ini sebagai <strong>Kurator Plagiarisme</strong> ?<br>
        <div class="mt-2 title grow text-center">
           ${item.judul} <br>
        </div>
      `
      )
        .then(() =>
          this.$store
            .dispatch("user/ajukan", { obj: item })
            .then(() => {
              this.$info("Data berhasil diajukan");
            })
            .then(() => this.load())
            .catch(e => e)
        )
        .catch(e => e);
    },
    setKurator(item, status) {
      this.$confirm(
        `Apakah Anda yakin akan mempublikasikan Anggota ini ?<br>
        <div class="mt-2 title grow text-center">
           ${item.name} <br>
        </div>
      `
      )
        .then(() =>
          this.$store
            .dispatch("user/setKuratorPlagiat", {
              obj: item,
              akses:
                status == "tambah"
                  ? [
                      {
                        id: 1,
                        nama: "kurasi_plagiat",
                        keterangan: "Kurasi Plagiat"
                      }
                    ]
                  : []
            })
            .then(() => {
              this.$info(
                "Pengguna berhasil di tambahkan sebagai Kurator Plagiarisme"
              );
            })
            .then(() => this.load())
            .catch(e => e)
        )
        .catch(e => e);
    },
    setRole(item) {
      var roleAll = [
        { id: 1, name: "Admin" },
        { id: 2, name: "Kontributor" },
        { id: 3, name: "Kurator" },
        { id: 4, name: "Komunitas" }
      ];
      var roleAdmins = [
        { id: 2, name: "Kontributor" },
        { id: 3, name: "Kurator" },
        { id: 4, name: "Komunitas" }
      ];
      this.$confirm(
        `Apakah anda yakin akan mengubah peran pengguna sesuai data yang Anda pilih?<br>
        <div class='mt-2 title font-weight-bold text-center red--text text--darken-2'>
          ${item.name}
        </div>
        `,
        {
          role: this.current_user.is_super_admin ? roleAll : roleAdmins,
          mapel: this.itemMapels
        },
        "Ubah Peran",
        item
      )
        .then(res => {
          var obj = {
            user_id: item.id,
            role_id: typeof res.role == "object" ? res.role.id : res.role,
            mapel: res.mapel
            // is_simpatika:
            //   typeof res.tenant === "object" ? res.tenant.id : res.tenant
          };
          this.$store
            .dispatch("user/setRole", obj)
            .then(() => {
              this.load();
              this.$info("Ubah peran user berhasil");
            })
            .catch(e => e);
        })
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
        .then(() => this.$store.dispatch("user/drop", item))
        .then(() => {
          this.$info("Anggota " + item.judul + " berhasil dihapus");
        })
        .then(() => this.load())
        .catch(e => e);
    }
  },
  watch: {}
};
</script>
