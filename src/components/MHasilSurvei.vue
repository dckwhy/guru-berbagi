<template>
  <v-dialog
    v-model="dialog"
    scrollable
    :fullscreen="fullscreen"
    max-width="800"
    transition="dialog-bottom-transition"
  >
    <v-card v-if="data && render">
      <v-toolbar dark color="primary" class="elevation-0" max-height="60">
        <v-btn text icon @click="dialog=false">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>{{data.nama}}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <slot name="container" :ready="ready">
          <v-container grid-list-lg :class="{'pa-0':!withPadding}">
            <div>
              <v-expansion-panels v-model="panel" focusable>
                <v-expansion-panel
                  v-for="(blok,index) in data.blok"
                  :key="blok.index"
                  :mandatory="index==0"
                >
                  <v-expansion-panel-header>
                    <p class="title font-weight-bold primary--text">{{pVal(blok,'nama')}}</p>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row wrap>
                      <v-col cols="12">
                        <p
                          v-if="blok.keterangan"
                          class="title teal--text"
                        >{{pVal(blok,'keterangan')}}</p>
                      </v-col>

                      <!-- Tipe List dengan 1 Column (11) -->
                      <v-col cols="12" v-if="blok.view_type==11">
                        <v-row wrap>
                          <v-col
                            cols="12"
                            :sm="blok.view_type==11?12:4"
                            :md="blok.view_type==11?12:4"
                            :lg="blok.view_type==11?12:4"
                            v-for="pertanyaan in blok.pertanyaan"
                            :key="pertanyaan.id"
                          >
                            <v-row>
                              <v-col
                                cols="12"
                                sm="12"
                                md="12"
                                lg="12"
                                class="font-weight-bold teal--text"
                              >{{pVal(pertanyaan,'judul')}}</v-col>
                              <v-col
                                cols="12"
                                sm="12"
                                md="12"
                                lg="12"
                                v-for="m in pertanyaan.text"
                                :key="m.index"
                              >{{pVal(m,'keterangan')}}</v-col>
                              <!-- <v-col
                                cols="12"
                                sm="12"
                                md="12"
                                lg="12"
                                v-for="m in pertanyaan.text"
                                :key="m.index"
                              >{{pVal(m,'keterangan')}}</v-col>-->
                            </v-row>
                          </v-col>
                        </v-row>
                        <!-- Data Pendukung (Pihak Terkait) -->
                        <v-row
                          wrap
                          v-if="index==0 && data.respon.length>0&& data.respon[0].pihak_terkait"
                        >
                          <v-col cols="12">
                            <p class="title teal--text">Informasi Pihak Yang dilibatkan</p>
                          </v-col>
                          <v-col cols="12" sm="12" md="12" xl="12">
                            <v-simple-table>
                              <template v-slot:default>
                                <thead>
                                  <tr>
                                    <th>Nama Lengkap</th>
                                    <th>Pihak Terlibat</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr
                                    v-for="informasi in data.respon[0].pihak_terkait"
                                    :key="informasi.index"
                                  >
                                    <td>{{pVal(informasi,'nama')}}</td>
                                    <td>{{pVal(informasi,'status')}}</td>
                                  </tr>
                                </tbody>
                              </template>
                            </v-simple-table>
                            <v-list-item two-line>
                              <v-list-item-content>
                                <v-list-item-title>Keterangan Tambahan (Opsional)</v-list-item-title>
                                <v-list-item-subtitle>{{pVal(data.detail,'keterangan_tambahan')}}</v-list-item-subtitle>
                              </v-list-item-content>
                            </v-list-item>
                          </v-col>
                        </v-row>
                      </v-col>

                      <!-- Tipe Tabel Custom Table Pilihan -->
                      <v-col cols="12" v-if="blok.view_type==12">
                        <!-- Data Pertanyaan yang tidak diregistrasikan di Display Data (JSON Display) -->
                        <v-row wrap v-if="blok.display">
                          <v-col
                            cols="12"
                            sm="12"
                            md="12"
                            lg="12"
                            v-for="pertanyaan in blok.pertanyaan"
                            :key="pertanyaan.id"
                          >
                            <v-row>
                              <v-col
                                cols="12"
                                sm="12"
                                md="12"
                                lg="12"
                                class="title teal--text"
                              >{{pVal(pertanyaan,'judul')}}</v-col>
                              <v-col cols="12" sm="12" md="12" lg="12" class="font-weight-bold">
                                <v-chip
                                  class="ma-2"
                                  color="green"
                                  text-color="white"
                                  v-for="(m,index) in filteredKeterangan(pertanyaan.text)"
                                  :key="m.index"
                                >
                                  <v-avatar left class="green darken-4">{{index+1}}</v-avatar>
                                  {{pVal(m,'keterangan')}}
                                </v-chip>
                              </v-col>
                            </v-row>
                          </v-col>
                        </v-row>
                        <br />
                        <v-divider></v-divider>
                        <!-- Data Pertanyaan yang diregistrasikan di Display Data (JSON Display) -->
                        <v-simple-table>
                          <template v-slot:default>
                            <thead>
                              <tr v-if="blok.display">
                                <th>No.</th>
                                <th class="text-left">{{blok.display.label}}</th>
                                <th
                                  v-for="header in blok.display.header"
                                  :key="header.index"
                                >{{header.keterangan}}</th>
                              </tr>
                              <tr v-else>
                                <th class="text-center">No</th>
                                <th class="text-left">{{blok.display.label}}</th>
                                <th
                                  class="text-left"
                                  v-for="pilihan in blok.pertanyaan[0].pilihan"
                                  :key="pilihan.id"
                                >{{pVal(pilihan,'keterangan')}}</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="(pertanyaan,index) in blok.dataTable" :key="pertanyaan.id">
                                <td width="2%" class="font-weight-bold teal--text">{{index+1}}.</td>
                                <td width="30%" class="pa-5">
                                  <span
                                    class="font-weight-bold teal--text"
                                  >{{pVal(pertanyaan,'judul')}}</span>
                                  <br />
                                  <span v-if="pertanyaan.konten">{{pVal(pertanyaan,'konten')}}</span>
                                  <span
                                    v-if="pertanyaan.is_custom"
                                  >{{pVal(pertanyaan.text[0],'keterangan')}}</span>
                                </td>
                                <td v-for="pilihan in pertanyaan.pilihan" :key="pilihan.id">
                                  <ul class="answerList">
                                    <v-radio-group v-model="pilihan.is_pilih" :mandatory="false">
                                      <v-radio :value="true" color="primary" hint="ok" disabled></v-radio>
                                    </v-radio-group>
                                    <v-tooltip bottom max-width="300">
                                      <template v-slot:activator="{ on }">
                                        <v-icon color="grey" dark v-on="on">mdi-help-circle</v-icon>
                                      </template>
                                      <span>{{pVal(pilihan,'hint')}}</span>
                                    </v-tooltip>
                                  </ul>
                                </td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </v-col>

                      <!-- Tipe Tabel Custom Table Pilihan + Essay -->
                      <v-col cols="12" v-if="blok.view_type==13">
                        <!-- Data Pertanyaan yang tidak diregistrasikan di Display Data (JSON Display) -->
                        <v-row wrap v-if="blok.display">
                          <v-col
                            cols="12"
                            sm="12"
                            md="12"
                            lg="12"
                            v-for="pertanyaan in blok.pertanyaan"
                            :key="pertanyaan.id"
                          >
                            <v-row>
                              <v-col
                                cols="12"
                                sm="12"
                                md="12"
                                lg="12"
                                class="title teal--text"
                              >{{pVal(pertanyaan,'judul')}}</v-col>
                              <v-col cols="12" sm="12" md="12" lg="12" class="font-weight-bold">
                                <v-chip
                                  class="ma-2"
                                  color="green"
                                  text-color="white"
                                  v-for="(m,index) in filteredKeterangan(pertanyaan.text)"
                                  :key="m.index"
                                >
                                  <v-avatar left class="green darken-4">{{index+1}}</v-avatar>
                                  {{pVal(m,'keterangan')}}
                                </v-chip>
                              </v-col>
                            </v-row>
                          </v-col>
                        </v-row>
                        <br />
                        <v-divider></v-divider>
                        <!-- Data Pertanyaan yang diregistrasikan di Display Data (JSON Display) -->
                        <v-simple-table>
                          <template v-slot:default>
                            <thead>
                              <tr v-if="blok.display">
                                <th>No.</th>
                                <th class="text-left">{{blok.display.label}}</th>
                                <th
                                  v-for="header in blok.display.header"
                                  :key="header.index"
                                >{{header.keterangan}}</th>
                                <th class="text-left">{{blok.display.label_essay[0].keterangan}}</th>
                              </tr>
                              <tr v-else>
                                <th class="text-center">No</th>
                                <th class="text-left">{{blok.display.label}}</th>
                                <th
                                  class="text-left"
                                  v-for="pilihan in blok.pertanyaan[0].pilihan"
                                  :key="pilihan.id"
                                >{{pVal(pilihan,'keterangan')}}</th>
                                <th
                                  class="text-left"
                                  v-if="blok.pertanyaan[0].label_essay"
                                >{{blok.pertanyaan[0].label_essay[0].keterangan}}</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="(pertanyaan,index) in blok.dataTable" :key="pertanyaan.id">
                                <td width="2%" class="font-weight-bold teal--text">{{index+1}}.</td>
                                <td width="30%" class="pa-5">
                                  <span
                                    class="font-weight-bold teal--text"
                                  >{{pVal(pertanyaan,'judul')}}</span>
                                  <br />
                                  <span v-if="pertanyaan.konten">{{pVal(pertanyaan,'konten')}}</span>
                                  <span
                                    v-if="pertanyaan.is_custom"
                                  >{{pVal(pertanyaan.text[0],'keterangan')}}</span>
                                </td>
                                <td v-for="pilihan in pertanyaan.pilihan" :key="pilihan.id">
                                  <ul class="answerList">
                                    <v-radio-group v-model="pilihan.is_pilih" :mandatory="false">
                                      <v-radio :value="true" color="primary" hint="ok" disabled></v-radio>
                                    </v-radio-group>
                                    <v-tooltip bottom max-width="300">
                                      <template v-slot:activator="{ on }">
                                        <v-icon color="grey" dark v-on="on">mdi-help-circle</v-icon>
                                      </template>
                                      <span>{{pVal(pilihan,'hint')}}</span>
                                    </v-tooltip>
                                  </ul>
                                </td>
                                <td>
                                  <p
                                    v-for="k in filteredKeterangan(pertanyaan.text)"
                                    :key="k.index"
                                  >{{k.keterangan}}</p>
                                </td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </v-col>

                      <!-- Tipe Tabel Custom Table Essay -->
                      <v-col cols="12" v-if="blok.view_type==14">
                        <!-- Data Pertanyaan yang tidak diregistrasikan di Display Data (JSON Display) -->
                        <v-row wrap v-if="blok.display">
                          <v-col
                            cols="12"
                            sm="12"
                            md="12"
                            lg="12"
                            v-for="pertanyaan in blok.pertanyaan"
                            :key="pertanyaan.id"
                          >
                            <v-row>
                              <v-col
                                cols="12"
                                sm="12"
                                md="12"
                                lg="12"
                                class="title teal--text"
                              >{{pVal(pertanyaan,'judul')}}</v-col>
                              <v-col cols="12" sm="12" md="12" lg="12" class="font-weight-bold">
                                <v-chip
                                  class="ma-2"
                                  color="green"
                                  text-color="white"
                                  v-for="(m,index) in filteredKeterangan(pertanyaan.text)"
                                  :key="m.index"
                                >
                                  <v-avatar left class="green darken-4">{{index+1}}</v-avatar>
                                  {{pVal(m,'keterangan')}}
                                </v-chip>
                              </v-col>
                            </v-row>
                          </v-col>
                        </v-row>
                        <br />
                        <v-divider></v-divider>
                        <!-- Data Pertanyaan yang diregistrasikan di Display Data (JSON Display) -->
                        <v-simple-table>
                          <template v-slot:default>
                            <thead>
                              <tr v-if="blok.display">
                                <th>No.</th>
                                <th class="text-left">{{blok.display.label}}</th>
                                <th class="text-left">{{blok.display.label_essay[0].keterangan}}</th>
                              </tr>
                              <tr v-else>
                                <th class="text-center">No</th>
                                <th class="text-left">{{blok.display.label}}</th>
                                <th
                                  class="text-left"
                                  v-for="pilihan in blok.pertanyaan[0].pilihan"
                                  :key="pilihan.id"
                                >{{pVal(pilihan,'keterangan')}}</th>
                                <th
                                  class="text-left"
                                  v-if="blok.pertanyaan[0].label_essay"
                                >{{blok.pertanyaan[0].label_essay[0].keterangan}}</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="(pertanyaan,index) in blok.dataTable" :key="pertanyaan.id">
                                <td width="2%" class="font-weight-bold teal--text">{{index+1}}.</td>
                                <td width="30%" class="pa-5">
                                  <span
                                    class="font-weight-bold teal--text"
                                  >{{pVal(pertanyaan,'judul')}}</span>
                                  <br />
                                  <span v-if="pertanyaan.konten">{{pVal(pertanyaan,'konten')}}</span>
                                  <span
                                    v-if="pertanyaan.is_custom"
                                  >{{pVal(pertanyaan.text[0],'keterangan')}}</span>
                                </td>
                                <td>
                                  <p
                                    v-for="k in filteredKeterangan(pertanyaan.text)"
                                    :key="k.index"
                                  >{{k.keterangan}}</p>
                                </td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </v-col>

                      <!-- Tipe Essay Table -->
                      <v-col cols="12" v-if="blok.view_type==10">
                        <v-simple-table>
                          <template v-slot:default>
                            <thead>
                              <tr>
                                <th>No</th>
                                <th
                                  v-for="n in blok.pertanyaan[0].label_essay"
                                  :key="n.index"
                                  class="text-left"
                                >{{n}}</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="(jawaban,i) in splitArray(blok.pertanyaan[0].text,blok.pertanyaan[0].label_essay.length)"
                                :key="jawaban.index"
                              >
                                <td>{{i+1}}</td>
                                <td v-for="m in jawaban" :key="m.index">{{pVal(m,'keterangan')}}</td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>
          </v-container>
        </slot>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import _ from "lodash";
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    data: {
      type: Object,
      default: null
    },
    ready: {
      default: true
    },
    steps: {
      type: Number,
      default: 1
    },
    btnsave: {
      default: true
    },
    loading: {
      default: false
    },
    action: {
      default: true
    },
    fullscreen: {
      default: true
    },
    withPadding: {
      default: true
    }
  },
  mounted() {},

  data() {
    return {
      e1: 1,
      panel: 0,
      orderBlok: null,
      render: false,
      dialog: false,
      res: null,
      rej: null
    };
  },
  methods: {
    open() {
      this.step = 0;
      this.e1 = 0;
      this.panel = 0;
      return new Promise((resolve, reject) => {
        this.res = resolve;
        this.rej = reject;

        this.dialog = true;
      });
    },
    process(n) {
      if (n) {
        n.blok.forEach(blok => {
          if (blok.display) {
            //parsing json display
            blok.display = JSON.parse(blok.display);
            //filter data yang akan ditampilkan di tabel (dataTable)
            blok.dataTable = [];
            if (blok.display.data) {
              blok.display.data.forEach(data => {
                const dataFiltered = _.find(blok.pertanyaan, { order: data });
                if (dataFiltered) {
                  blok.dataTable.push(dataFiltered);
                  _.remove(blok.pertanyaan, {
                    id: dataFiltered.id
                  });
                }
              });
            }
          } else {
            blok.dataTable = blok.pertanyaan;
          }
        });
        this.render = true;
        return (this.data = n);
      }
    },
    filteredKeterangan(n) {
      let filtered = [];
      n.forEach(data => {
        if (data.flag != 1) {
          filtered.push(data);
        }
      });
      return filtered;
    },
    save() {
      this.$emit("save");
    },
    splitArray(data, n) {
      return _.chunk(data, n);
    },
    nextStep(n) {
      if (n === this.steps) {
        this.e1 = 1;
      } else {
        this.e1 = n + 1;
      }
    }
  },
  watch: {
    data(n) {
      this.process(n);
    },
    dialog(n) {
      if (!n && this.rej) {
        //this.rej(null)
      }
    },
    steps(val) {
      if (this.e1 > val) {
        this.e1 = val;
      }
    }
  }
};
</script>
