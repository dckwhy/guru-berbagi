<template>
  <v-container grid-list-xl class="pa-0">
    <v-layout wrap>
      <v-flex xs12>
        <m-card-list
          two-line
          title="Pilihan Tingkat"
          cover="https://cdn.siap.id/s3/simpkb/asset img/Guru-Berbagi/illustrasi/banner-artikel.png"
          add
          edit
          search
          :items="items"
          :headers="headers"
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
          @add="add"
        >
          <template v-slot:items="{ props, item }">
            <tr v-if="$vuetify.breakpoint.mdAndUp">
              <td>
                {{
                  item.id == 1
                    ? "Mata Pelajaran"
                    : item.id == 2
                    ? "Jenjang"
                    : "Tingkat"
                }}
              </td>
              <td>{{ pVal(item, "nama") }}</td>
              <td>{{ pVal(item, "deskripsi") }}</td>
              <td>
                <!-- <m-menu left style="float:right" :items="more_menu" :object="item" /> -->
              </td>
            </tr>
            <tr v-else>
              <td class="v-data-table__mobile-row">
                <div class="v-data-table__mobile-row__wrapper">
                  <div class="v-data-table__mobile-row__header">
                    {{ headers[0].text }}
                  </div>
                  <div class="v-data-table__mobile-row__cell">
                    {{ pVal(item, "nama") }}
                  </div>
                </div>
              </td>
              <td class="v-data-table__mobile-row">
                <div class="v-data-table__mobile-row__wrapper">
                  <div class="v-data-table__mobile-row__header">
                    {{ headers[1].text }}
                  </div>
                  <div class="v-data-table__mobile-row__cell">
                    {{ pVal(item, "deskripsi") }}
                  </div>
                </div>
              </td>
              <td class="v-data-table__mobile-row">
                <div class="v-data-table__mobile-row__wrapper">
                  <div class="v-data-table__mobile-row__header">
                    {{ headers[2].text }}
                  </div>
                  <div class="v-data-table__mobile-row__cell">
                    <m-menu
                      left
                      style="float:right"
                      :items="more_menu"
                      :object="item"
                    />
                  </div>
                </div>
              </td>
            </tr>
          </template>
        </m-card-list>
      </v-flex>
    </v-layout>
    <ChangeDlg ref="dlg" />
  </v-container>
</template>

<script>
import ChangeDlg from "../components/Form.vue";
import BlockCard from "@/components/BlockCard";

export default {
  components: {
    ChangeDlg,
    BlockCard
  },
  data() {
    return {
      items: [],
      textSearch: null,
      page: null,
      cp: 1,
      headers: [
        { text: "Nama", align: "left", value: "nama" },
        { text: "Keterangan", align: "left", value: "keterangan" },
        { text: "", align: "left", sortable: false }
      ],
      stat: {
        jenis_kelamin: { data: [], legend: [] },
        usia: { data: [], legend: [] }
      },
      more_menu: [
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
  computed: {},
  mounted() {
    this.load();
  },
  methods: {
    load() {
      this.$store
        .dispatch("tagging/get", {
          params: {
            taxonomy_id: 2,
            keyword: this.textSearch
          }
        })
        .then(res => {
          this.items = res;
        })
        .catch(e => e);
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
    hapus(item) {
      this.$confirm(
        `Apakah Anda yakin akan menghapus data ini ?<br>
        <div class="mt-2 title grow text-center">
          ${item.keterangan}<br>
        </div>
        <div class="red mt-3 pa-2 white--text">
          Pastikan Anda benar-benar mengerti apa yang Anda lakukan.
        </div>
      `
      )
        .then(() =>
          this.$store.dispatch("tagging/drop", {
            organisasi_id: this.organisasi_id,
            hari_libur_id: item.hari_libur_id
          })
        )
        .then(() => {
          this.$info("Data berhasil dihapus");
        })
        .then(() => this.load())
        .catch(e => e);
    }
  }
};
</script>
