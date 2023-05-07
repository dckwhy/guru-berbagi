<template>
  <m-dialog ref="dlgPilihAksi" :btnsave="false" title="Pilih 3 Aksi terbaik">
    <v-row wrap justify="center" align="center">
      <v-col
        cols="12"
        sm="12"
        md="12"
        lg="12"
        xl="12"
        class="text-center"
        align="center"
        justify="center"
      >
        <v-card>
          <v-toolbar color="primary" dark flat>
            <v-col cols="2"></v-col>
            <v-col class="d-flex justify-space-around">
              <v-toolbar-title class="white--text">Pilih Aksi</v-toolbar-title>
            </v-col>
            <v-col cols="2" class="d-flex justify-end"></v-col>
          </v-toolbar>
          <v-card-text>
            <v-row wrap>
              <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                <v-row row>
                  <v-col cols="12">
                    <span class="title text-left">Pencarian</span>
                    <v-text-field
                      outlined
                      dense
                      v-model="textSearch"
                      @keyup.enter="search"
                      append-icon="mdi-magnify"
                      @click:append="search"
                      autofocus
                      placeholder="Isikan Kata Pencarian Aksi"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-data-table
                      v-model="selectedAksiItems"
                      :items="items"
                      :items-per-page="15"
                      item-key="id"
                      hide-default-footer
                    >
                      <template v-slot:body="{ items }">
                        <tbody>
                          <tr v-for="item in items" :key="item.id">
                            <td width="5">
                              <v-checkbox
                                class="ma-0"
                                v-model="selectedAksiItems"
                                :value="item"
                                style="margin:0px;padding:0px"
                                hide-details
                              />
                            </td>
                            <td>
                              <BlockCard
                                :key="item.id"
                                :title="item.judul"
                                :jenis="item.jenis"
                                :expired="item.waktu_selesai"
                                :author="pVal(item.author, 'name')"
                                @showDetail="detail(item)"
                                :logo="
                                  item.cover && item.cover.new_url
                                    ? item.cover.new_url.thumbnail
                                    : 'https://cdn.siap.id/s3/simpkb/asset img/Guru-Berbagi/revisi-portal/thumb-default.jpg'
                                "
                                :height="120"
                                color="blue"
                                to
                              />
                            </td>
                          </tr>
                        </tbody>
                      </template>
                    </v-data-table>
                  </v-col>
                </v-row>
                <v-row wrap class="pb-0" v-if="page && page.last_page > 1">
                  <v-pagination
                    v-if="page.total"
                    v-model="current_page"
                    :length="page.last_page"
                    :total-visible="6"
                    @input="change"
                  ></v-pagination>
                </v-row>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                <v-row v-if="aksi">
                  <v-col :cols="$vuetify.breakpoint.smAndUp ? 12 : 12" class="text-left py-0">
                    <v-row>
                      <v-col cols="12">
                        <v-img
                          :src="
                            aksi.cover
                              ? aksi.cover.new_url.medium
                              : 'https://cdn.siap.id/s3/simpkb/asset img/Guru-Berbagi/revisi-portal/thumb-default.jpg'
                          "
                          lazy-src="https://cdn.siap.id/s3/simpkb/asset img/Guru-Berbagi/revisi-portal/thumb-default.jpg"
                          aspect-ratio="1.7778"
                        />
                        <span class="title font-weight-bold">
                          {{
                          pVal(aksi, "judul")
                          }}
                        </span>
                      </v-col>
                      <v-col class="py-1 font-weight-bold" cols="3">Penulis</v-col>
                      <v-col class="py-1" cols="9">: {{ pVal(aksi.author, "name") }}</v-col>
                      <v-col class="py-1 font-weight-bold" cols="3">Diunggah</v-col>
                      <v-col class="py-1" cols="9">: {{ pVal(aksi, "created_at") | toDT }}</v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <p class="font-weight-bold mb-0">Deskripsi</p>
                        <p class="text-justify" v-html="konten"></p>
                      </v-col>
                      <v-col cols="12">
                        <v-chip
                          v-for="tag in aksi.tags"
                          :key="tag.index"
                          class="mr-2 mt-1"
                          color="grey lighten-1"
                          label
                          small
                        >#{{ pVal(tag, "nama") }}</v-chip>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <v-row v-else>
                  <v-col cols="12">
                    <span class="title black--text">Pilih Aksi untuk melihat pratinjaunya disini</span>
                    <p>
                      Pilih salah satu konten disamping untuk memunculkan
                      pratinjau Aksi sebagai pertimbangan memilih Aksi.
                    </p>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="mr-4 mb-4" @click="save" color="primary">SIMPAN</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </m-dialog>
</template>

<script>
import _ from "lodash";
import BlockCard from "@/components/BlockCard";
import Form from "../components/Form";
export default {
  components: {
    BlockCard,
    Form
  },
  data() {
    return {
      aksiTerpilih: [],
      aksi: null,
      dialog: true,
      organisasi: {},
      items: [],
      e1: 0,
      current_page: 1,
      textSearch: null,
      page: null,
      cp: 1,
      index: null,

      editable: false,
      selected: [],
      selectedAksiItems: [],
      pagination: {
        sortBy: "nama"
      },
      jump_page: 0,
      selection: [],
      pagging: {},
      page_key: 0,
      totalPagination: []
    };
  },
  methods: {
    open(selected) {
      this.textSearch = null;
      this.selectedAksiItems = [];
      this.selected = selected;
      this.selectedAksiItems = selected;
      this.items = [];
      this.current_page = 1;
      this.load(this.current_page);
      let x = this.$refs.dlgPilihAksi.open();
      this.$validator.reset();
      return x;
    },
    load() {
      // var tempSelectedAksi = this.selectedAksiItems;
      return this.$store
        .dispatch("buletin/getAksi", {
          params: {
            post_type_id: 3,
            status_id: 2,
            page: this.current_page
          }
        })
        .then(res => {
          this.getSelectedItem(res.data);
          this.page = res;
          this.items = res.data;
        })
        .then(() => {
          if (this.textSearch && this.selectedAksiItems.length == 0) {
            this.selectedItems = [];
          }
          if (
            !this.textSearch &&
            this.selectedAksiItems.length == 0 &&
            this.current_page == 1
          ) {
            this.selectedAksiItems = [];
          }
        })
        .catch(e => e);
    },
    search() {
      var tempAksi = this.selectedAksiItems;
      this.selectedAksiItems = [];
      return this.$store
        .dispatch("buletin/getRpp", {
          params: {
            post_type_id: 3,
            status_id: 2,
            page: this.current_page,
            s: this.textSearch
          }
        })
        .then(res => {
          this.selectedAksiItems = tempAksi;
          this.selected = tempAksi;
          this.page = res;
          this.items = res.data;
        })
        .catch(e => e);
    },
    detail(item) {
      this.aksi = { ...item };
    },
    add() {
      this.$refs.dlg.open().then(() => {
        this.load();
      });
    },
    change() {
      this.load(this.current_page);
    },
    save() {
      if (this.selectedAksiItems.length <= 3) {
        this.$emit("pilihAksi", this.selectedAksiItems);
        this.selectedAksiItems = [];
        this.selected = [];
        this.$refs.dlgPilihAksi.resolve();
      } else {
        this.$error(
          "Anda memilih " +
            this.selectedAksiItems.length +
            " Aksi. Anda tidak diizinkan memilih lebih dari 3 Aksi"
        );
      }
    },
    pilihAksi(item) {
      this.aksiTerpilih.push(item);
    },
    batalAksi(item) {
      for (var i = 0; i < this.aksiTerpilih.length; i++) {
        if (this.aksiTerpilih[i].id === item.id) {
          this.aksiTerpilih.splice(i, 1);
        }
      }
    },
    getSelectedItem(items) {
      items.forEach(data => {
        this.selected.forEach(selected => {
          if (data.id == selected.id) {
            const dataFiltered = _.find(this.selectedAksiItems, {
              id: data.id
            });
            if (!dataFiltered) {
              this.selectedAksiItems.push(data);
            }
          }
        });
      });
    }
  },
  watch: {
    page(n) {
      if (n) {
        this.current_page = n.current_page;
        this.jump_page = n.current_page;
        this.page_key = Math.random();
        for (let i = 1; i <= n.last_page; i++) {
          this.totalPagination.push(i);
        }
      }
    },
    items() {
      this.current_page = this.page ? this.page.current_page : 0;
    }
  },
  computed: {
    konten() {
      return this.aksi && this.aksi.deskripsi
        ? this.aksi.deskripsi.replace(/<br>\\*/g, "</p><p>")
        : "";
    }
  }
};
</script>
<style>
.vue-map-container,
.vue-map-container .vue-map {
  width: 100%;
  height: 95%;
}
img {
  max-width: 230px;
  max-height: 250px;
}
</style>
