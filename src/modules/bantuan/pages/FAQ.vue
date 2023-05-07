<template>
  <v-container grid-list-xl class="pa-0">
    <v-row wrap>
      <v-col cols="12">
        <m-card pa-0 ma-0 title="Bantuan">
          <v-row justify="center">
            <v-expansion-panels inset>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <span class="title">
                    <v-icon small>mdi-circle-medium</v-icon>Tips Berbagi RPP
                  </span>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <p>1. Guru-guru diberikan kebebasan untuk menentukan rencana pembelajaran. Namun perlu berisi Tujuan strategi/aktivitas</p>
                  <p>2. Disarankan ada aktivitas yang kontekstual dengan kondisi rumah dan lingkungan sekitar</p>
                  <p>3. Disarankan ada 1-3 assesmen formatif selama proses pembelajaran</p>
                  <p>4. Proses komunikasi dua arah</p>
                  <p>5. Mencantumkan asal sumber belajar</p>
                  <p>6. Disarankan membuat penjelasan dan instruksi belajar yang spesifik dan rinci</p>
                  <p>7. Disarankan tidak hanya menggunakan satu strategi atau aksi yang monoton</p>
                  <p>8. Tidak memuat unsur sara dan intoleransi</p>
                  <p>9. Tidak plagiat karya orang lain</p>
                  <p>10. Jika Anda memasukkan wajah murid ke dalam RPP Anda, pastikan Anda sudah meminta izin pada anak dan orang tuanya</p>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-row>
        </m-card>
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
          check: (i, o) => o.approve == 0 && isCan("bantuan_write")
        },
        {
          title: "Batal Tayang",
          click: (i, o) => this.batalSetujui(o),
          check: (i, o) => o.approve == 1 && isCan("bantuan_approve")
        },
        {
          title: "Ubah Jawaban",
          click: (i, o) => this.edit(o) && isCan("bantuan_write")
        },
        {
          title: "Hapus",
          click: (i, o) => this.hapus(o) && isCan("bantuan_write")
        }
      ]
    };
  },
  computed: {
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
