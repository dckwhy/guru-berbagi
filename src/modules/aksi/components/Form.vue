<template>
  <m-dialog
    ref="dlg"
    :btnsave="false"
    :title="aksi && aksi.id ? 'Ubah Aksi' : 'Input Aksi'"
  >
    <v-row row wrap justify="center" align="center">
      <v-col cols="12" sm="10" md="8" lg="8" xl="8">
        <v-card tile>
          <v-toolbar color="primary" dark flat>
            <v-col cols="2"></v-col>
            <v-col class="d-flex justify-space-around">
              <v-toolbar-title class="white--text">Aksi</v-toolbar-title>
            </v-col>
            <v-col cols="2" class="d-flex justify-end"></v-col>
          </v-toolbar>
          <v-card-text>
            <v-form
              autocomplete="off"
              @submit.prevent
              data-vv-scope="form"
              lazy-validation
            >
              <v-row wrap>
                <v-col cols="12">
                  <v-card text color="#fff" flat>
                    <v-row fill-height justify-center>
                      <v-col class="text-center" cols="12" align-end colbox>
                        <span class="font-weight-bold primary--text"
                          >Gambar/Ilustrasi</span
                        >
                      </v-col>
                      <v-col class="d-flex justify-center" cols="12">
                        <v-img
                          position="bottom center"
                          :src="
                            aksi && aksi.cover
                              ? url
                              : 'https://cdn.siap.id/s3/simpkb/asset%20img/Guru-Berbagi/revisi-portal/thumb-default.jpg'
                          "
                          aspect-ratio="1"
                          :max-width="
                            $vuetify.breakpoint.lgAndUp
                              ? 400
                              : $vuetify.breakpoint.smAndUp
                              ? 200
                              : 50
                          "
                          :max-height="
                            $vuetify.breakpoint.lgAndUp
                              ? 400
                              : $vuetify.breakpoint.smAndUp
                              ? 200
                              : 50
                          "
                        >
                          <v-btn
                            fab
                            depressed
                            small
                            color="pink"
                            style="position: absolute;right: 2px;top: 5px;"
                            id="pick-avatar-aksi"
                          >
                            <v-icon color="white">mdi-camera</v-icon>
                          </v-btn>
                        </v-img>
                        <div
                          class="card-footer text-muted"
                          v-html="message"
                        ></div>
                      </v-col>
                    </v-row>
                    <avatar-cropper
                      :key="1"
                      :upload-handler="cropperHandler"
                      trigger="#pick-avatar-aksi"
                      :output-mime="cropperOutputMime"
                      :output-quality="0.5"
                      :cropper-options="{ aspectRatio: 1 }"
                      :output-options="{ width: 800, height: 800 }"
                      :labels="{ submit: 'Simpan', cancel: 'Hapus' }"
                    />
                  </v-card>
                </v-col>
                <v-col class="text-center" cols="12" align-end colbox>
                  <span>Ukuran gambar yang diizinkan maksimal 1 MB</span>
                </v-col>
                <v-col cols="12">
                  <span class="font-weight-bold primary--text"
                    >Sumber Gambar/Ilustrasi</span
                  >
                  <span class="error--text">&nbsp;*</span>
                  <v-text-field
                    outlined
                    dense
                    autofocus
                    v-model="aksi.sumber_file"
                    placeholder="Isikan Sumber Gambar/Ilustrasi"
                    hint="Tambahkan Sumber Gambar/Ilustrasi"
                    persistent-hint
                    data-vv-name="sumber_ilustrasi"
                    data-vv-as="Sumber Gambar/Ilustrasi"
                    v-validate="'required|max:500'"
                    :error-messages="errors.collect('form.sumber_ilustrasi')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <span class="font-weight-bold primary--text">Judul</span>
                  <span class="error--text">&nbsp;*</span>
                  <v-text-field
                    outlined
                    dense
                    v-model="aksi.judul"
                    placeholder="Isikan Judul Artikel"
                    hint="Judul maksimal 200 karakter"
                    persistent-hint
                    data-vv-name="judul"
                    data-vv-as="Judul"
                    v-validate="'required|max:200'"
                    :error-messages="errors.collect('form.judul')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <span class="font-weight-bold primary--text">Jenis</span>
                  <span class="error--text">&nbsp;*</span>
                  <v-select
                    outlined
                    dense
                    v-model="aksi.jenis_aksi"
                    :items="jenisAksis"
                    no-data-text="Data Tidak Tersedia"
                    placeholder="Pilih Jenis Aksi"
                    name="Jenis Aksi"
                    data-vv-name="jenis_aksi"
                    data-vv-as="Jenis Aksi"
                    v-validate="'required'"
                    :error-messages="errors.collect('form.jenis_aksi')"
                  ></v-select>
                </v-col>
                <v-col cols="12" v-if="aksi.jenis_aksi != 'Dokumen'">
                  <span class="font-weight-bold primary--text">Lokasi</span>
                  <span class="error--text">&nbsp;*</span>
                  <v-select
                    outlined
                    dense
                    v-model="aksi.lokasi"
                    :items="itemLokasi"
                    no-data-text="Tambahkan lokasi lain"
                    placeholder="Tulis Lokasi"
                    name="Lokasi"
                    data-vv-name="lokasi"
                    data-vv-as="lokasi"
                    v-validate="'required'"
                    :error-messages="errors.collect('form.lokasi')"
                  >
                  </v-select>
                </v-col>
                <v-col cols="12" v-if="aksi.jenis_aksi != 'Dokumen'">
                  <span class="font-weight-bold primary--text">{{
                    aksi.lokasi == "Daring" ? "Tautan" : "Tempat"
                  }}</span>
                  <span class="error--text">&nbsp;*</span>
                  <v-text-field
                    outlined
                    dense
                    v-model="aksi.tempat"
                    :placeholder="
                      `Isikan ` + aksi.lokasi == 'Daring'
                        ? 'Tautan'
                        : 'Tempat' + ' Aksi'
                    "
                    hint="Apabila Daring, isikan alamat tautan. Apabila Luring sebaiknya isikan tempat spesifik, semisal : Gedung A dst"
                    persistent-hint
                    data-vv-name="tempat"
                    :data-vv-as="aksi.lokasi == 'Daring' ? 'Tautan' : 'Tempat'"
                    v-validate="'required|max:100'"
                    :error-messages="errors.collect('form.tempat')"
                  ></v-text-field>
                </v-col>
                <v-col
                  v-if="aksi.jenis_aksi != 'Dokumen'"
                  cols="12"
                  sm="6"
                  md="6"
                  lg="6"
                  xl="6"
                >
                  <span class="font-weight-bold primary--text"
                    >Waktu Mulai</span
                  >
                  <span class="error--text">&nbsp;*</span>
                  <datetime
                    type="datetime"
                    value-zone="Asia/Jakarta"
                    zone="Asia/Jakarta"
                    :format="{
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit'
                    }"
                    :phrases="{ ok: 'Lanjut', cancel: 'Batal' }"
                    v-model="waktu_mulai"
                    class="timepicker"
                  ></datetime>
                  <span class="error--text mt-0 my-0" v-show="waktu_mulai == ''"
                    >Waktu Mulai harus diisi</span
                  >
                </v-col>

                <v-col
                  v-if="aksi.jenis_aksi != 'Dokumen'"
                  cols="12"
                  sm="6"
                  md="6"
                  lg="6"
                  xl="6"
                >
                  <span class="font-weight-bold primary--text"
                    >Waktu Selesai</span
                  >
                  <span class="error--text">&nbsp;*</span>
                  <datetime
                    type="datetime"
                    :min-datetime="
                      waktu_mulai
                        ? new Date(waktu_mulai).toISOString()
                        : new Date().toISOString()
                    "
                    value-zone="Asia/Jakarta"
                    zone="Asia/Jakarta"
                    :format="{
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit'
                    }"
                    :phrases="{ ok: 'Lanjut', cancel: 'Batal' }"
                    v-model="waktu_selesai"
                    class="timepicker"
                  ></datetime>
                  <span
                    class="error--text mt-0 my-0"
                    v-show="waktu_selesai == ''"
                    >Waktu Selesai harus diisi</span
                  >
                </v-col>
                <v-col cols="12">
                  <span class="font-weight-bold primary--text">Deskripsi</span>
                  <span class="error--text">&nbsp;*</span>
                  <editor
                    :key="rend"
                    :initialValue="aksi.deskripsi"
                    ref="editorRef"
                    v-model="content"
                    api-key="0iu1x8uuavwjanzbn1wut0ont7pbtanoag9mrfd9nhfnroba"
                    :init="options"
                  />
                </v-col>
                <v-col cols="12">
                  <span class="font-weight-bold black--text"
                    >Lampiran Brosur</span
                  >
                  <p v-if="edit && aksi.brosur">
                    Berkas :
                    <a :href="aksi.brosur.url" target="_blank">{{
                      pVal(aksi.brosur, "filename")
                    }}</a>
                  </p>
                  <div class="container">
                    <v-file-input
                      ref="file"
                      v-model="file"
                      :hint="
                        'Bisa berupa PDF maupun Gambar. Ukuran berkas maksimal ' +
                          maxSize +
                          ' MB'
                      "
                      persistent-hint
                      id="file"
                      @change="handleFileUpload"
                      :placeholder="
                        edit && aksi.brosur ? 'Ubah Berkas' : 'Pilih Berkas'
                      "
                      name="File"
                      :accept="accepts"
                      data-vv-name="file"
                      data-vv-as="Berkas"
                      :error-messages="errors.collect('form.file')"
                      outlined
                      dense
                    ></v-file-input>
                    <p
                      class="error--text"
                      v-if="this.file && this.size > this.maxSize"
                    >
                      Ukuran Berkas Anda melebihi ketentuan : {{ this.size }} MB
                    </p>
                  </div>
                </v-col>
              </v-row>
            </v-form>
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
import moment from "moment";
import axios from "axios";
import { API } from "@/const";
import AvatarCropper from "vue-avatar-cropper";
import { MAX_UPLOAD_SIZE } from "@/const";
import Editor from "@tinymce/tinymce-vue";
export default {
  $_veeValidate: {
    validator: "new"
  },
  components: {
    AvatarCropper,
    editor: Editor
  },

  data() {
    return {
      rend: 1,
      content: "",
      options: {
        contextmenu: "",
        language_url: window.location.origin + "/langs/id.js",
        menubar: "",
        height: "250",
        plugins: [
          "image",
          "paste",
          "media",
          "visualblocks",
          "visualchars",
          "fullscreen",
          "link",
          "codesample",
          "charmap",
          "advlist",
          "lists",
          "wordcount",
          "imagetools",
          "charmap",
          "table"
        ],
        toolbar1:
          " bold italic underline | fontsizeselect | table | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor  | insertfile image media link  code",
        file_picker_types: "image",
        images_upload_handler: function(blobInfo, success, failure) {
          let data = new FormData();
          data.append("file", blobInfo.blob(), blobInfo.filename());
          axios
            .post(`${API}/upload`, data)
            .then(function(res) {
              success(res.data.url);
            })
            .catch(function(err) {
              failure("HTTP Error: " + err.message);
            });
        }
      },
      message: "",
      cropperOutputMime: "image/jpeg",
      randomImg: "sqwea12",
      url: null,
      edit: false,
      aksi: {
        tags: []
      },
      countDeskripsi: 0,
      cover: null,
      file: null,
      accepts: ["application/pdf", "image/*"].join(","),
      newTag: null,
      itemLokasi: ["Daring", "Luring"],
      lokasilain: null,
      duplicateTag: null,
      name: "",
      jenisAksis: ["Webinar GTK", "Dokumen", "Webinar"],
      type: "",
      size: 0,
      maxSize: MAX_UPLOAD_SIZE,
      itemTags: null,
      waktu_mulai: new Date().toISOString(),
      waktu_selesai: new Date().toISOString(),
      defRpp: {
        nama: null,
        brosur: null,
        cover: {
          url:
            "https://cdn.siap.id/s3/asset illustrasi/Illustrasi/bg-default.png"
        },
        tags: []
      }
    };
  },
  mounted() {},
  methods: {
    // eslint-disable-next-line
    open(obj) {
      this.rend = this.rend + 1;
      this.loadTag();
      if (this.current_user.peran.id == 1) {
        this.jenisAksis = ["Webinar GTK", "Dokumen", "Webinar"];
      } else {
        this.jenisAksis = ["Dokumen", "Webinar"];
      }
      this.aksi = obj
        ? {
            ...obj,
            ...(this.edit = true)
          }
        : {
            ...this.defRpp,
            ...(this.edit = false),
            ...(this.duplicateTag = false),
            ...(this.waktu_mulai = new Date().toISOString()),
            ...(this.waktu_selesai = new Date().toISOString()),
            ...(this.file = null),
            ...(this.cover = null)
          };
      if (obj) {
        this.wordCount(obj.deskripsi);
        this.itemLokasi = ["Daring", "Luring"];
        if (obj.lokasi !== "Daring" || obj.lokasi !== "Luring") {
          this.itemLokasi.push(obj.lokasi);
        }
        this.waktu_mulai = moment(obj.waktu).toISOString();
        this.waktu_selesai = moment(obj.waktu_selesai).toISOString();

        if (obj.cover && obj.cover.new_url) {
          this.aksi.sumber_file = obj.cover.sumber_file;
          this.url = obj.cover.new_url.medium;
        }
      } else {
        this.itemLokasi = ["Daring", "Luring"];
        this.url =
          "https://cdn.siap.id/s3/asset illustrasi/Illustrasi/bg-default.png";
      }
      let x = this.$refs.dlg.open();
      this.$validator.reset();
      return x;
    },
    addLokasi(lokasi) {
      this.itemLokasi.push(lokasi);
      this.aksi.lokasi = lokasi;
    },
    cropperHandler(cropper) {
      var imgdat = cropper.getCroppedCanvas().toDataURL(this.cropperOutputMime);
      var file = this.dataURLtoFile(imgdat, "thumb" + Math.random + ".png");
      this.url = URL.createObjectURL(file);
      this.cover = file;

      return this.cover;
    },
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], filename, { type: mime });
    },

    addTag(tags) {
      var a = _.includes(this.itemTags, tags);

      if (!a) {
        this.newTag = null;
        // this.aksi.tags.push(tags);
        this.itemTags.push(tags);
      } else {
        this.duplicateTag = true;
      }
    },
    loadTag() {
      this.$store
        .dispatch("aksi/getTag", {})
        .then(res => {
          this.itemTags = res;
        })
        .catch(e => e);
    },
    wordCount(str) {
      this.countDeskripsi = this.$tools.wordCount(str);
    },

    save() {
      this.$validator
        .validateAll("form")
        .then(res => {
          if (!res) {
            const el = document.querySelector(
              ".v-messages__message:first-of-type"
            );
            el.scrollIntoView();
            return Promise.reject();
          }
          return res;
        })
        .then(() => {
          if (this.size <= this.maxSize) {
            this.aksi.waktu = moment(this.waktu_mulai).format(
              "YYYY-MM-DD HH:mm:ss"
            );
            this.aksi.waktu_selesai = moment(this.waktu_selesai).format(
              "YYYY-MM-DD HH:mm:ss"
            );
            this.aksi.file = this.file;
            this.aksi.cover = this.cover;
            return this.$store
              .dispatch("aksi/tambah", {
                obj: this.aksi
              })
              .then(res => {
                if (res.error) {
                  this.$error("Simpan Data Aksi gagal");
                } else {
                  this.$info("Simpan Data Aksi Berhasil");
                  this.$refs.dlg.resolve();
                  return res;
                }
              })
              .catch(e => e);
          }
        })

        .catch(e => e);
    },
    handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
      this.$store
        .dispatch("aksi/uploadImage", file)
        .then(res => {
          this.$info(
            "Unggah gambar berhasil, gambar telah ditambahkan di editor"
          );
          let url = res.data.url;
          Editor.insertEmbed(cursorLocation, "image", url);
          resetUploader();
        })
        .catch(e => e);
    },

    handleFileUpload() {
      if (this.file) {
        this.size = (this.file.size / 1000000).toFixed(2);
      }
    }
  },
  watch: {
    waktu_mulai(n) {
      this.waktu_akhir = n;
    },
    content(n) {
      this.aksi.deskripsi = n;
    }
  }
};
</script>
<style>
.timepicker {
  color: rgba(0, 0, 0, 0.87);
  padding: 9px 8px 9px;
  max-width: 100%;
  width: 100%;
  border: 1px solid grey;
  outline: 1px;
  background: transparent;
  border-radius: 4px;
}
.vdatetime-input {
  width: 500px;
}
</style>
