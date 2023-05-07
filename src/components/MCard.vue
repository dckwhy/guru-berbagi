<template>
  <v-card class="mt-5" outlined tile>
    <div class="pb-0 mb-0" v-if="showHint">
      <v-alert border="bottom" colored-border type="error" elevation="2"
        >Apakah Anda sudah siap untuk berbagi.</v-alert
      >
    </div>
    <div class="primary" v-if="showCard">
      <v-card-title
        class="headline white--text"
        style="word-break: break-word;"
      >
        {{ title }}
        <v-spacer></v-spacer>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              :disabled="disableAdd"
              color="yellow"
              v-on="on"
              depressed
              v-if="add"
              @click="$emit('add')"
            >
              <v-icon>mdi-plus</v-icon>
              {{ addString }}
            </v-btn>
          </template>
          <span>{{ addHint }}</span>
        </v-tooltip>
      </v-card-title>
    </div>

    <v-toolbar v-if="showToolbar" color="white lighten-3" flat>
      <v-toolbar-title
        v-if="title"
        class="title font-weight-normal black--text my-3"
      >
        <v-icon>{{ icon }}</v-icon>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-progress-circular
        v-if="loading || iLoading"
        indeterminate
        color="primary lighten-2"
      ></v-progress-circular>
      <template v-else>
        <slot name="action">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                color="primary"
                v-on="on"
                v-if="search"
                icon
                @click="toggleSearch = !toggleSearch"
              >
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </template>
            <span>Cari Data</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                color="primary"
                v-on="on"
                v-if="filter"
                icon
                @click="toggleFilter = !toggleFilter"
              >
                <v-icon>mdi-filter-variant</v-icon>
              </v-btn>
            </template>
            <span>Filter Data</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                color="primary"
                class="mx-3"
                v-if="print"
                v-on="on"
                outlined
                depressed
                @click="$emit('cetak')"
              >
                <v-icon>mdi-download-outline</v-icon>Cetak Akun Institusi
              </v-btn>
            </template>
            <span>Cetak Akun Institusi</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" v-if="setting" icon @click="$emit('setting')">
                <v-icon>mdi-settings-outline</v-icon>
              </v-btn>
            </template>
            <span>Konfigurasi</span>
          </v-tooltip>
          <v-btn
            small
            class="mr-0 pr-0"
            v-if="edit"
            icon
            @click="$emit('edit')"
          >
            <v-icon>mdi-pencil-outline</v-icon>
          </v-btn>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                color="primary"
                v-on="on"
                v-if="refresh"
                icon
                @click="doRefresh"
              >
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </template>
            <span>Muat Ulang Tayangan</span>
          </v-tooltip>
          <v-btn
            small
            class="mr-0 pr-0"
            v-if="close"
            icon
            @click="$emit('close')"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-menu v-if="more" left>
            <template v-slot:activator="{ on }">
              <v-btn small class="mr-0 pr-0" icon v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-card width="300">
              <slot name="more_menu"></slot>
            </v-card>
          </v-menu>
        </slot>
        <slot name="action_ext"></slot>
      </template>
    </v-toolbar>
    <v-divider></v-divider>

    <slot name="under_toolbar">
      <v-row justify="end">
        <v-col cols="12" sm="12" md="12" xl="12" v-if="toggleSearch">
          <v-text-field
            class="mx-2 mt-n2"
            v-model="q"
            clearable
            append-icon="mdi-magnify"
            @click:append="$emit('search', q)"
            @click:clear="$emit('search', null)"
            label="Tulis Pencarian"
            single-line
            hide-details
            @keyup.enter="$emit('search', q)"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="end" v-if="filter && toggleFilter">
        <v-col cols="12">
          <v-dialog ref="filterData" v-model="dialog" max-width="500">
            <v-card class="pa-2">
              <v-card-title class="headline pl-4 primary--text"
                >Filter Berdasarkan</v-card-title
              >
              <v-card-text>
                <v-form @submit.prevent data-vv-scope="form" lazy-validation>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="12"
                      md="12"
                      lg="12"
                      class="pa-1"
                      v-if="filterData"
                    >
                      <v-select
                        clearable
                        :items="itemJenisData"
                        label="Semua Data"
                        name="Semua Data"
                        item-text="nama"
                        item-value="id"
                        placeholder="Semua Data"
                        v-model="jenisData"
                        hint="Pilih Semua Data"
                        data-vv-name="Semua Data"
                        data-vv-as="Semua Data"
                        return-object
                      ></v-select>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="12"
                      md="12"
                      lg="12"
                      class="pa-1"
                      v-if="filterJenisAksi"
                    >
                      <v-select
                        clearable
                        :items="itemJenisAksis"
                        label="Jenis Aksi"
                        name="Jenis Aksi"
                        placeholder="Pilih jenis Aksi"
                        v-model="jenisAksi"
                        hint="Pilih Jenis Aksi"
                        data-vv-name="Jenis Aksi"
                        data-vv-as="jenis Aksi"
                        item-text="nama"
                        item-value="id"
                        return-object
                      ></v-select>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="12"
                      md="12"
                      lg="12"
                      class="pa-1"
                      v-if="filterPeran"
                    >
                      <v-select
                        clearable
                        :items="itemPerans"
                        label="Peran"
                        name="Peran"
                        placeholder="Pilih Peran"
                        v-model="peran"
                        hint="Pilih Peran"
                        data-vv-name="peran"
                        data-vv-as="Peran"
                        item-text="name"
                        item-value="id"
                        return-object
                      ></v-select>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="12"
                      md="12"
                      lg="12"
                      class="pa-1"
                      v-if="filterModa"
                    >
                      <v-select
                        clearable
                        :items="itemModas"
                        label="Moda"
                        name="Moda"
                        placeholder="Pilih Moda"
                        v-model="moda"
                        hint="Pilih Moda"
                        data-vv-name="moda"
                        data-vv-as="Moda"
                        item-text="nama"
                        item-value="id"
                        return-object
                      ></v-select>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="12"
                      md="12"
                      lg="12"
                      class="pa-1"
                      v-if="filterKonten"
                    >
                      <v-select
                        :items="itemStatusKonten"
                        label="Jenis User"
                        name="Jenis User"
                        placeholder="Pilih Jenis User"
                        v-model="statusKonten"
                        hint="Pilih Jenis User"
                        data-vv-name="status"
                        data-vv-as="Jenis User"
                        item-text="nama"
                        item-value="id"
                        return-object
                      ></v-select>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="12"
                      md="12"
                      lg="12"
                      class="pa-1"
                      v-if="filterJenis"
                    >
                      <v-select
                        clearable
                        :items="itemJenises"
                        label="Jenis"
                        name="Jenis"
                        placeholder="Pilih Jenis"
                        v-model="jenis"
                        hint="Pilih Jenis"
                        data-vv-name="jenis"
                        data-vv-as="Jenis"
                        item-text="nama"
                        item-value="id"
                        return-object
                      ></v-select>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="12"
                      md="12"
                      lg="12"
                      class="pa-1"
                      v-if="filterStatus"
                    >
                      <v-select
                        clearable
                        :items="itemStatuses"
                        label="Status"
                        name="Status"
                        placeholder="Pilih Status"
                        v-model="status"
                        hint="Pilih Status"
                        data-vv-name="status"
                        data-vv-as="Status"
                        item-text="nama"
                        item-value="id"
                        return-object
                      ></v-select>
                    </v-col>

                    <v-col
                      cols="12"
                      sm="12"
                      md="12"
                      lg="12"
                      class="pa-1"
                      v-if="filterMapel"
                    >
                      <v-autocomplete
                        clearable
                        :items="itemMapels"
                        label="Mata pelajaran"
                        name="Mata pelajaran"
                        placeholder="Pilih Mata pelajaran"
                        v-model="mapel"
                        hint="Pilih Mata pelajaran"
                        data-vv-name="status"
                        data-vv-as="Mata pelajaran"
                        item-text="nama"
                        item-value="nama"
                      ></v-autocomplete>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="12"
                      md="12"
                      lg="12"
                      class="pa-1"
                      v-if="filterStatusPlagiat"
                    >
                      <v-select
                        clearable
                        :items="itemStatusPlagiats"
                        label="Status Plagiarisme"
                        name="Status Plagiarisme"
                        placeholder="Pilih Status Plagiarisme"
                        v-model="plagiat"
                        hint="Pilih Status Plagiarisme"
                        data-vv-name="status"
                        data-vv-as="Status Plagiarisme"
                        item-text="nama"
                        item-value="id"
                        return-object
                      ></v-select>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="12"
                      md="12"
                      lg="12"
                      class="pa-1"
                      v-if="filterTanggal"
                    >
                      <v-select
                        clearable
                        :items="itemTanggals"
                        label="Urutan Tanggal"
                        name="Tanggal"
                        placeholder="Tanggal"
                        v-model="tanggal"
                        hint="Urutkan berdasarkan tanggal"
                        data-vv-name="bobot"
                        data-vv-as="Tanggal"
                        item-text="nama"
                        item-value="id"
                        return-object
                      ></v-select>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="12"
                      md="12"
                      lg="12"
                      class="pa-1"
                      v-if="filterBobot"
                    >
                      <v-select
                        clearable
                        :items="itemBobots"
                        label="Kesesuaian Konten"
                        name="Kesesuaian Konten"
                        placeholder="Kesesuaian Konten"
                        v-model="bobot"
                        hint="Kesesuaian Konten"
                        data-vv-name="bobot"
                        data-vv-as="Kesesuaian Konten"
                        item-text="nama"
                        item-value="id"
                        return-object
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>

              <v-card-actions class="pr-4 pb-4">
                <v-spacer></v-spacer>
                <v-btn
                  name="simpan"
                  depressed
                  color="primary"
                  @click="
                    applyFilter({
                      status: status,
                      jenis: jenis,
                      jenisAksi: jenisAksi,
                      moda: moda,
                      peran: peran,
                      bobot: bobot,
                      tanggal: tanggal,
                      mapel: mapel,
                      plagiat: plagiat,
                      statusKonten: statusKonten,
                      jenisData: jenisData
                    })
                  "
                >
                  <v-icon>mdi-check</v-icon>Terapkan
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
      <v-row justify="start" v-if="customFilter" class="pa-3 mt-4 mb-0 ml-2">
        <v-col cols="12" sm="3" md="3" lg="3" xl="2" v-if="dateRange">
          <v-menu
            ref="menu1"
            v-model="menu1"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="dateFromFormatted"
                label="Mulai"
                prepend-icon="mdi-calendar-range"
                color="primary"
                class="pt-0 mt-1 ml-2 mr-2"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="from"
              :max="maxFrom"
              no-title
              @input="process"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="3" md="3" lg="3" xl="2" v-if="dateRange">
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="dateToFormatted"
                label="Sampai"
                class="pt-0 mt-1 ml-2 mr-2"
                prepend-icon="mdi-calendar-range"
                color="primary"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="to"
              :min="minTo"
              :max="maxTo"
              no-title
              @input="process"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="3" md="3" lg="3" xl="2" v-if="selectGrup">
          <v-select
            v-model="s"
            @change="$emit('changeGroup', s)"
            class="pt-0 mt-0 ml-2 mr-2"
            :disabled="disabledSelectGroup"
            single-line
            clearable
            :items="selectedGrupItems"
            item-text="nama"
            item-value="id"
            label="Pilih Grup"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="3" md="3" lg="3" xl="3" v-if="selectKegiatan">
          <v-select
            v-model.lazy="r"
            single-line
            hide-details
            dense
            @change="$emit('changeKegiatan', r)"
            class="pt-0 mt-1 ml-2 mr-2"
            clearable
            :items="kegiatans"
            :return-object="true"
            item-text="nama"
            item-value="id"
            label="Semua Aksi"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="3" md="3" lg="3" xl="3" v-if="selectSumberDana">
          <v-select
            v-model.lazy="x"
            single-line
            hide-details
            dense
            @change="$emit('changeSumberDana', x)"
            class="pt-0 mt-1 ml-2 mr-2"
            clearable
            :items="sumberDanas"
            label="Semua Sumber Dana"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="3" md="3" lg="3" xl="3" v-if="unduh">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                color="primary"
                v-on="on"
                depressed
                @click="$emit('cetak', r)"
              >
                <v-icon>mdi-download-outline</v-icon>
                {{ textUnduh }}
              </v-btn>
            </template>
            <span>Cetak Laporan Seluruh Aksi atau Per Aksi</span>
          </v-tooltip>
        </v-col>
        <v-col cols="12" sm="8" md="8" lg="8" xl="6" v-if="selectTag && tags">
          <span class="font-weight-black ml-2 primary--text"
            >Filter Tag Laporan</span
          >
          <v-form autocomplete="off">
            <v-select
              class="pt-0 mt-0 ml-2 mr-2"
              v-model="u"
              :disabled="!r"
              :items="tags"
              single-line
              multiple
              hide-details
              outlined
              dense
              placeholder="Semua Tag Laporan"
              item-text="keterangan"
              :return-object="true"
              @blur="$emit('changeTag', u)"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip small v-if="index === 0">
                  <span>{{ item.keterangan }}</span>
                </v-chip>
                <v-chip small v-if="index === 1">
                  <span>{{ item.keterangan }}</span>
                </v-chip>
                <v-chip small v-if="index === 2">
                  <span>{{ item.keterangan }}</span>
                </v-chip>
                <span v-if="index === 3" class="grey--text caption"
                  >(+{{ u.length - 3 }} tag lain)</span
                >
              </template>
            </v-select>
          </v-form>
        </v-col>
      </v-row>
    </slot>
    <v-card-text :class="{ 'pa-3 my-3': noPadding }">
      <slot></slot>
    </v-card-text>
    <v-card-actions v-if="footer">
      <slot name="footer" :loading="loading"></slot>
    </v-card-actions>
  </v-card>
</template>

<script>
import { ROLE_ADMIN, ROLE_GURU, ROLE_KURATOR, ROLE_KOMUNITAS } from "@/const";
export default {
  name: "m-card",
  components: {},
  props: {
    icon: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    showHint: {
      type: Boolean,
      default: false
    },
    addHint: {
      type: String,
      default: "Tambah Data"
    },
    textUnduh: {
      type: String,
      default: "Unduh"
    },
    cover: {
      type: String,
      default:
        "https://cdn.siap.id/s3/simpkb/asset img/Guru-Berbagi/illustrasi/guru-3.png"
    },
    kegiatans: {
      type: Array,
      default: () => []
    },
    sumberDanas: {
      type: Array,
      default: () => []
    },
    tags: {
      type: Array,
      default: () => []
    },
    dateRange: {
      type: Boolean,
      default: false
    },
    edit: {
      type: Boolean,
      default: false
    },
    unduh: {
      type: Boolean,
      default: false
    },
    add: {
      type: Boolean,
      default: false
    },
    tambah: {
      type: Boolean,
      default: false
    },
    print: {
      type: Boolean,
      default: false
    },
    addIcon: {
      type: String,
      default: "mdi-plus"
    },
    disableAdd: {
      type: Boolean,
      default: false
    },
    addString: {
      type: String,
      default: "Tambah"
    },
    customFilter: {
      type: Boolean,
      default: false
    },
    setting: {
      type: Boolean,
      default: false
    },
    footer: {
      type: Boolean,
      default: false
    },
    refresh: {
      type: Boolean,
      default: false
    },
    showCard: {
      type: Boolean,
      default: true
    },
    showToolbar: {
      type: Boolean,
      default: true
    },
    close: {
      type: Boolean,
      default: false
    },
    more: {
      type: Boolean,
      default: false
    },
    search: {
      type: Boolean,
      default: false
    },
    filter: {
      type: Boolean,
      default: false
    },
    filterJenis: {
      type: Boolean,
      default: false
    },
    filterBobot: {
      type: Boolean,
      default: false
    },
    filterMapel: {
      type: Boolean,
      default: false
    },
    filterTanggal: {
      type: Boolean,
      default: false
    },
    filterPeran: {
      type: Boolean,
      default: false
    },
    filterModa: {
      type: Boolean,
      default: false
    },
    filterData: {
      type: Boolean,
      default: false
    },
    filterStatus: {
      type: Boolean,
      default: false
    },
    filterKonten: {
      type: Boolean,
      default: false
    },

    filterJenisAksi: {
      type: Boolean,
      default: false
    },
    noPadding: {
      type: Boolean,
      default: false
    },
    disabledSelectGroup: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    selectKegiatan: {
      type: Boolean,
      default: false
    },
    selectTag: {
      type: Boolean,
      default: false
    },
    selectGrup: {
      type: Boolean,
      default: false
    },
    selectSumberDana: {
      type: Boolean,
      default: false
    },
    isCover: {
      type: Boolean,
      default: true
    },
    filterStatusPlagiat: {
      type: Boolean,
      default: false
    },
    selectedGrupItems: {
      type: Array,
      default: () => []
    },
    itemJenisAksis: {
      type: Array,
      default: () => ["Webinar GTK", "Dokumen", "Webinar"]
    },
    itemJenisData: {
      type: Array,
      default: () => [
        { id: 1, nama: "RPP" },
        { id: 6, nama: "catatan guru penggerak" }
      ]
    },
    itemStatuses: {
      type: Array,
      default: () => [
        {
          id: 1,
          nama: "Draf"
        },
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
      ]
    },
    itemMapels: {
      type: Array,
      default: () => []
    },
    labelInfos: {
      type: Array,
      default: () => []
    },
    valueInfos: {
      type: Array,
      default: () => []
    },
    onRefresh: {
      type: Function,
      default: null
    }
  },
  data: vm => ({
    dialog: true,
    jenisData: null,
    q: null,
    r: null,
    s: null,
    t: null,
    u: null,
    jenisAksi: null,
    v: [],
    w: [],
    x: [],
    labelInfo: null,
    valueInfo: null,
    status: null,
    statusKonten: null,
    peran: null,
    jenis: null,
    moda: null,
    bobot: null,
    tanggal: null,
    mapel: null,
    plagiat: null,
    statusSurvey: null,
    itemPerans: [ROLE_ADMIN, ROLE_KURATOR, ROLE_GURU, ROLE_KOMUNITAS],
    itemModas: [
      {
        id: "daring",
        nama: "Daring"
      },
      {
        id: "luring",
        nama: "Luring"
      },
      {
        id: "kombinasi",
        nama: "Kombinasi"
      }
    ],
    itemStatusKonten: [
      {
        id: null,
        nama: "Semua Jenis"
      },
      {
        id: 0,
        nama: "GTK"
      },
      {
        id: 1,
        nama: "SIMPATIKA"
      }
    ],
    itemBobots: [
      {
        id: 1,
        nama: "Kesesuaian Konten tertinggi - terendah"
      },
      {
        id: 2,
        nama: "Kesesuaian Konten terandah - tertinggi"
      }
    ],
    itemTanggals: [
      {
        id: 1,
        nama: "Tanggal artikel terbaru -terlama"
      },
      {
        id: 2,
        nama: "Tanggal artikel terlama - terbaru"
      }
    ],
    itemJenises: [
      {
        id: "refleksi",
        nama: "Refleksi"
      },
      {
        id: "tips",
        nama: "Tips"
      },
      {
        id: "bacaan",
        nama: "Bacaan"
      }
    ],
    itemStatusPlagiats: [
      {
        id: 0,
        nama: "Belum Dikurasi"
      },
      {
        id: 1,
        nama: "Lolos/Tidak Plagiat"
      },
      {
        id: 2,
        nama: "Plagiat"
      }
    ],
    toggleSearch: false,
    toggleFilter: false,
    iLoading: false,
    maxFrom: new Date().toISOString().substr(0, 10),
    minTo: null,
    maxTo: new Date().toISOString().substr(0, 10),
    from: new Date(),
    to: new Date().toISOString().substr(0, 10),
    dateFromFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    dateToFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    menu2: false
  }),

  activated() {},
  computed: {},
  mounted() {
    let d = new Date();
    let sevenDaysAgo = d.setDate(d.getDate() - 29);
    this.from = new Date(sevenDaysAgo).toISOString().substr(0, 10);
    this.minTo = new Date(sevenDaysAgo).toISOString().substr(0, 10);
    this.process();
    //set default filter sesuai peran
    if (
      this.$route.name !== "riwayatKurasiPlagiasi" &&
      this.$route.name !== "riwayatKurasiSubstansi" &&
      this.$route.name !== "streaming" &&
      this.$route.name !== "buletin" &&
      this.$route.name !== "rpp" 
    ) {
      this.status = {
        id: 3,
        nama: 'Ajukan'
      };
      if (
        this.current_user &&
        this.current_user.peran.id == 3 &&
        this.$route.name == "kurasiArtikel"
      ) {
        this.plagiat = {
          id: 1,
          nama: "Lolos/Tidak Plagiat"
        };
      } else if (
        this.current_user &&
        this.current_user.is_kurator_plagiat &&
        this.$route.name == "kurasiArtikelPlagiasi"
      ) {
        this.plagiat = null
      }
    } else {
      this.status = null;
      this.plagiat = null;
    }
  },
  methods: {
    doRefresh() {
      if (this.onRefresh) {
        this.iLoading = true;
        this.onRefresh()
          .then(() => (this.iLoading = false))
          .catch(() => (this.iLoading = false));
      } else this.$emit("refresh");
    },
    process() {
      let range = {
        from: this.from,
        to: this.to
      };
      this.menu1 = false;
      this.menu2 = false;

      this.$emit("process", range);
    },
    applyFilter(data) {
      this.toggleFilter = !this.toggleFilter;
      this.$emit("filter", data);
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${day.padStart(2, "0")}-${month.padStart(2, "0")}-${year}`;
    }
  },
  watch: {
    dialog(n) {
      if (n == false) this.toggleFilter = false;
    },
    toggleFilter(n) {
      if (n == true) {
        this.dialog = true;
      }
    },
    q(textSearch) {
      if (!textSearch) {
        this.$emit("search", null);
      }
    },
    r() {
      this.u = null;
    },
    from() {
      this.dateFromFormatted = this.formatDate(this.from);
      this.minTo = new Date(this.from).toISOString().substr(0, 10);
    },
    to() {
      this.dateToFormatted = this.formatDate(this.to);
      this.maxFrom = new Date(this.to).toISOString().substr(0, 10);
    },
    labelInfo() {
      this.valueInfo = null;
    }
  }
};
</script>
