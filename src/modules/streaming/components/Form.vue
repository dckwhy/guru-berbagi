<template>
  <m-dialog
    ref="dlg"
    :btnsave="false"
    :title="streaming && streaming.id ? 'Ubah streaming' : 'Tambah streaming'"
  >
    <v-row row wrap justify="center" align="center">
      <v-col cols="12" sm="10" md="8" lg="8" xl="8">
        <v-card tile>
          <v-toolbar color="primary" dark flat>
            <v-col cols="12" class="d-flex justify-space-around">
              <v-toolbar-title class="white--text"
                >Detail Live Streaming
              </v-toolbar-title>
            </v-col>
          </v-toolbar>
          <v-card-text>
            <v-form
              autocomplete="off"
              @submit.prevent
              data-vv-scope="form"
              lazy-validation
            >
              <v-row wrap>
                <v-col cols="12" sm="12" md="6" lg="6">
                  <span class="font-weight-bold black--text">Judul</span>
                  <span class="error--text">&nbsp;*</span>
                  <v-text-field
                    autofocus
                    outlined
                    dense
                    v-model="streaming.judul"
                    placeholder="Isikan Judul Rencana Pelaksanaan Pembelajaran"
                    hint="Judul maksimal 100 karakter"
                    persistent-hint
                    data-vv-name="judul"
                    data-vv-as="Judul"
                    v-validate="'required|max:100'"
                    :error-messages="errors.collect('form.judul')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="6">
                  <span class="font-weight-bold black--text">Tautan / Url</span>
                  <span class="error--text">&nbsp;*</span>
                  <v-text-field
                    autofocus
                    outlined
                    dense
                    v-model="streaming.urlvideo"
                    placeholder="Isikan Tautan streaming"
                    hint="Isikan tautan streaming Anda"
                    persistent-hint
                    data-vv-name="url"
                    data-vv-as="Tautan streaming"
                    v-validate="'required|url'"
                    :error-messages="errors.collect('form.url')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="6" class="py-0 my-0">
                  <span class="font-weight-bold black--text">Tanggal</span>
                  <span class="error--text">&nbsp;*</span>
                  <m-datepicker
                    dense
                    single-line
                    outlined
                    label="Tanggal"
                    v-model="tanggal"
                    hint="Tanggal"
                    data-vv-name="tanggal"
                    data-vv-as="Tanggal"
                    v-validate.persist="'required'"
                    :error-messages="errors.collect('form.tanggal')"
                  ></m-datepicker>
                </v-col>

                <v-col cols="12" sm="6" md="3" lg="3" class="py-0 my-0">
                  <span class="font-weight-bold black--text">Jam Mulai</span>
                  <span class="error--text">&nbsp;*</span>
                  <br />
                  <vue-timepicker
                    input-class="my-awesome-picker"
                    input-width="150px"
                    v-model="jam_mulai"
                    hide-clear-button
                  >
                    <template v-slot:icon>
                      <v-icon small color="grey">mdi-clock</v-icon>
                    </template>
                  </vue-timepicker>
                </v-col>
                <v-col cols="12" sm="6" md="3" lg="3" class="py-0 my-0">
                  <span class="font-weight-bold black--text">Jam Selesai</span>
                  <span class="error--text">&nbsp;*</span>
                  <br />
                  <vue-timepicker
                    input-width="150px"
                    v-model="jam_selesai"
                    hide-clear-button
                  >
                    <template v-slot:icon>
                      <v-icon small color="grey">mdi-clock</v-icon>
                    </template>
                  </vue-timepicker>
                </v-col>
                <v-col cols="12">
                  <span class="font-weight-bold black--text"
                    >Deskripsi Singkat</span
                  >
                  <span class="error--text">&nbsp;*</span>
                  <v-textarea
                    outlined
                    dense
                    placeholder="Isikan Deskripsi Singkat streaming"
                    persistent-hint
                    v-model="streaming.deskripsi"
                    data-vv-name="deskripsi"
                    data-vv-as="Deskripsi"
                    v-validate="'required'"
                    :error-messages="errors.collect('form.deskripsi')"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="mr-4 mb-4" @click="save" color="primary"
              >SIMPAN
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </m-dialog>
</template>

<script>
import VueTimepicker from "vue2-timepicker";
import "vue2-timepicker/dist/VueTimepicker.css";

export default {
  $_veeValidate: {
    validator: "new"
  },
  components: {
    VueTimepicker
  },

  data() {
    return {
      streaming: {},
      defStreaming: {
        judul: null,
        urlvideo: null,
        deskripsi: null
      },
      tanggal: null,
      jam_mulai: "00:00",
      jam_selesai: "00:00"
    };
  },
  mounted() {},
  methods: {
    // eslint-disable-next-line
    open(obj) {
      this.streaming = obj ? obj : this.defStreaming;
      if (obj) {
        var jamMulai = obj.waktu.split(" ");
        var jamSelesai = obj.waktu_selesai.split(" ");
        this.tanggal = jamMulai[0];
        this.jam_mulai = jamMulai[1];
        this.jam_selesai = jamSelesai[1];
      } else {
        this.tanggal = null;
        this.jam_mulai = "00:00";
        this.jam_selesai = "00:00";
      }

      this.$validator.reset();
      return this.$refs.dlg.open();
    },
    save() {
      this.streaming.waktu =
        this.jam_mulai && this.jam_mulai.HH
          ? this.tanggal + " " + this.jam_mulai.HH + ":" + this.jam_mulai.mm
          : this.tanggal + " " + this.jam_mulai;
      this.streaming.waktu_selesai =
        this.jam_selesai && this.jam_selesai.HH
          ? this.tanggal + " " + this.jam_selesai.HH + ":" + this.jam_selesai.mm
          : this.tanggal + " " + this.jam_selesai;

      this.$validator
        .validateAll("form")
        .then(res => {
          if (!res) return Promise.reject();
          return res;
        })
        .then(() => {
          return this.$store
            .dispatch("streaming/form", {
              obj: this.streaming
            })
            .then(res => {
              if (res.error) {
                this.$error("Simpan streaming gagal");
              } else {
                this.$info("Simpan streaming Berhasil");
                this.$refs.dlg.resolve();
                return res;
              }
            })
            .catch(e => e);
        })

        .catch(e => e);
    }
  }
};
</script>
<style>
.vue__time-picker input.display-time {
  height: 2.8em;
  border: 0.02em solid lightgrey;
  border-radius: 5px;
}
</style>
