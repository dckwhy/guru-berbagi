<template>
  <m-dialog ref="dlgPilihRpp" :btnsave="false" title="Pilih 3 RPP terbaik">
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
              <v-toolbar-title class="white--text">Pilih RPP</v-toolbar-title>
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
                      placeholder="Isikan Kata Pencarian RPP"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-data-table
                      v-model="selectedItems"
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
                                v-model="selectedItems"
                                :value="item"
                                style="margin:0px;padding:0px"
                                hide-details
                              />
                            </td>
                            <td>
                              <BlockCard
                                :key="item.id"
                                :title="item.judul"
                                :jenis="item.moda"
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
                <v-row v-if="rpp">
                  <v-col
                    :cols="$vuetify.breakpoint.smAndUp ? 12 : 12"
                    class="text-left py-0"
                  >
                    <v-row>
                      <v-col cols="12" class="mt-5 pt-5">
                        <v-img
                          max-height="220"
                          :src="
                            rpp.cover && rpp.cover.new_url
                              ? rpp.cover.new_url.thumbnail
                              : 'https://cdn.siap.id/s3/simpkb/asset img/Guru-Berbagi/revisi-portal/thumb-default.jpg'
                          "
                          lazy-src="https://cdn.siap.id/s3/simpkb/asset img/Guru-Berbagi/revisi-portal/thumb-default.jpg"
                        />
                        <span class="title font-weight-bold">{{
                          pVal(rpp, "judul")
                        }}</span>
                        <!-- <br />
                        <v-icon color="yellow">mdi-star</v-icon>
                        <span class="ma-2">0.0 / 5</span>-->
                      </v-col>
                      <v-col cols="12" v-if="rpp.lapor_count > 0">
                        <span
                          class="red--text font-weight-bold"
                          v-for="i in rpp.lapor"
                          :key="i.index"
                          v-html="i.deskripsi"
                        ></span>
                      </v-col>
                      <v-col class="py-1 font-weight-bold" cols="3"
                        >Penulis</v-col
                      >
                      <v-col class="py-1" cols="9"
                        >: {{ pVal(rpp.author, "name") }}</v-col
                      >
                      <v-col class="py-1 font-weight-bold" cols="3"
                        >Diunggah</v-col
                      >
                      <v-col class="py-1" cols="9"
                        >: {{ pVal(rpp, "created_at") | toDT }}</v-col
                      >
                      <v-col class="py-1 font-weight-bold" cols="3"
                        >Jenjang</v-col
                      >
                      <v-col class="py-1" cols="9"
                        >: {{ pVal(rpp.mapel[0].term, "nama") }}</v-col
                      >
                      <v-col class="py-1 font-weight-bold" cols="3"
                        >Kelas</v-col
                      >
                      <v-col class="py-1" cols="9"
                        >: {{ pVal(rpp.mapel[1].term, "nama") }}</v-col
                      >
                      <v-col class="py-1 font-weight-bold" cols="3"
                        >Mata Pelajaran</v-col
                      >
                      <v-col class="py-1" cols="9"
                        >: {{ pVal(rpp.mapel[2].term, "nama") }}</v-col
                      >
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <p class="font-weight-bold mb-0">Deskripsi</p>
                        <p class="text-justify">{{ pVal(rpp, "deskripsi") }}</p>
                      </v-col>
                      <v-col cols="12">
                        <v-chip
                          v-for="tag in rpp.tags"
                          :key="tag.index"
                          class="mr-2 mt-1"
                          color="grey lighten-1"
                          label
                          small
                          >#{{ pVal(tag, "nama") }}</v-chip
                        >
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <v-row v-else>
                  <v-col cols="12">
                    <span class="title black--text"
                      >Pilih RPP untuk melihat pratinjaunya disini</span
                    >
                    <p>
                      Pilih salah satu konten disamping untuk memunculkan
                      pratinjau RPP sebagai pertimbangan memilih RPP.
                    </p>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="mr-4 mb-4" @click="save" color="primary"
              >SIMPAN</v-btn
            >
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
      rppTerpilih: [],
      rpp: null,
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
      selectedItems: [],
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
      this.selectedItems = [];
      this.selected = selected;
      this.items = [];
      this.current_page = 1;
      this.load(this.current_page);
      let x = this.$refs.dlgPilihRpp.open();
      this.$validator.reset();
      return x;
    },
    load() {
      return this.$store
        .dispatch("buletin/getRpp", {
          params: {
            post_type_id: 1,
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
          if (this.textSearch && this.selectedItems.length == 0) {
            this.selectedItems = [];
          }
          if (
            !this.textSearch &&
            this.selectedItems.length == 0 &&
            this.current_page == 1
          ) {
            this.selectedItems = [];
          }
        })
        .catch(e => e);
    },
    search() {
      var tempRpp = this.selectedItems;
      this.selectedItems = [];
      return this.$store
        .dispatch("buletin/getRpp", {
          params: {
            post_type_id: 1,
            status_id: 2,
            page: this.current_page,
            s: this.textSearch
          }
        })
        .then(res => {
          this.selectedItems = tempRpp;
          this.selected = tempRpp;
          this.page = res;
          this.items = res.data;
        })
        .catch(e => e);
    },
    detail(item) {
      this.rpp = { ...item };
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
      if (this.selectedItems.length <= 3) {
        this.$emit("pilihRpp", this.selectedItems);
        this.selectedItems = [];
        this.selected = [];
        this.$refs.dlgPilihRpp.resolve();
      } else {
        this.$error(
          "Anda memilih " +
            this.selectedItems.length +
            " RPP. Anda tidak diizinkan memilih lebih dari 3 RPP"
        );
      }
    },
    pilihRpp(item) {
      this.rppTerpilih.push(item);
    },
    batalRpp(item) {
      for (var i = 0; i < this.rppTerpilih.length; i++) {
        if (this.rppTerpilih[i].id === item.id) {
          this.rppTerpilih.splice(i, 1);
        }
      }
    },
    getSelectedItem(items) {
      items.forEach(data => {
        this.selected.forEach(selected => {
          if (data.id == selected.id) {
            const dataFiltered = _.find(this.selectedItems, { id: data.id });
            if (!dataFiltered) {
              this.selectedItems.push(data);
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
    },
    selectedItems() {}
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
