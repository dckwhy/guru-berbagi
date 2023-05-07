<template>
  <m-dialog
    ref="dlg"
    :btnsave="false"
    :title="aksi && aksi.id ? 'Kurasi Aksi' : 'Tambah Aksi'"
    @updatelock="releaseLock"
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
                <v-col cols="12" class="my-0 py-0">
                  <p class="font-weight-bold black--text">
                    Kesesuaian Konten :
                    <span class="font-weight-bold black--text">
                      <v-chip
                        text-color="white"
                        dark
                        :color="aksi.similarity <= 50 ? 'grey' : 'grey'"
                        >{{ aksi.similarity | toF2 }}%</v-chip
                      >
                    </span>
                  </p>
                </v-col>
                <v-col cols="12">
                  <v-card text color="#fff" flat>
                    <v-row fill-height>
                      <v-col class="text-left" cols="12" align-start colbox>
                        <span class="font-weight-bold primary--text"
                          >Gambar/Ilustrasi</span
                        >
                      </v-col>
                      <v-col class="text-left" cols="12" align-end colbox>
                        <v-img
                          position="bottom center"
                          :src="
                            aksi & aksi.cover
                              ? aksi.cover.new_url
                              : url
                              ? url
                              : 'https://cdn.siap.id/s3/simpkb/asset%20img/Guru-Berbagi/revisi-portal/thumb-default.jpg'
                          "
                        >
                        </v-img>
                        <div
                          class="card-footer text-muted"
                          v-html="message"
                        ></div>
                        <p>Sumber : {{ pVal(aksi, "sumber_file") }}</p>
                      </v-col>
                    </v-row>
                    <avatar-cropper
                      :key="4"
                      :upload-handler="cropperHandler"
                      trigger="#pick-avatar-kurasi-aksi"
                      :output-mime="cropperOutputMime"
                      :output-quality="0.5"
                      :cropper-options="{ aspectRatio: 4 / 2 }"
                      :output-options="{ width: 800, height: 400 }"
                      :labels="{ submit: 'Simpan', cancel: 'Hapus' }"
                    />
                  </v-card>
                </v-col>
                <v-col cols="12">
                  <span class="font-weight-bold primary--text">Judul</span>
                  <span class="error--text">&nbsp;*</span>
                  <v-text-field
                    outlined
                    dense
                    v-model="aksi.judul"
                    autofocus
                    placeholder="Isikan Judul Aksi"
                    hint="Judul maksimal 200 karakter"
                    persistent-hint
                    data-vv-name="judul"
                    data-vv-as="Judul"
                    v-validate="'required|max:200'"
                    :error-messages="errors.collect('form.judul')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <span class="font-weight-bold primary--text">Kategori</span>
                  <p v-if="aksi.jenis_aksi" class="font-weight-bold">
                    {{ pVal(aksi, "jenis_aksi") | toTitleCase }}
                  </p>
                </v-col>
                <v-col cols="12" v-if="aksi.jenis == 'refleksi'">
                  <span class="font-weight-bold primary--text"
                    >RPP terkait yang sudah Anda upload</span
                  >
                  <p class="black--text" v-if="aksi.rpp">
                    Tautan RPP :
                    <a :href="aksi.rpp.link" target="_blank">
                      <em>{{ aksi.rpp.judul | toTitleCase }}</em>
                    </a>
                  </p>
                </v-col>
                <v-col cols="12">
                  <span class="font-weight-bold primary--text"
                    >Konten Aksi</span
                  >
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
                  <v-chip
                    label
                    small
                    class="light-blue darken-4 white--text mr-2"
                    >Jenis :
                    {{ pVal(aksi, "jenis_aksi") | toUppercase }}</v-chip
                  >
                  <v-chip
                    v-if="aksi && aksi.jenis_aksi != 'Dokumen'"
                    label
                    small
                    class="success white--text mr-2"
                    >Lokasi: {{ pVal(aksi, "lokasi") }}</v-chip
                  >
                  <br />
                  <br />
                  {{ aksi.dokumen }}
                  <span class="font-weight-bold primary--text">{{
                    aksi.jenis_aksi != "Dokumen" ? "Waktu" : "Waktu Unggah"
                  }}</span>
                  <p
                    v-if="aksi && aksi.jenis_aksi == 'Dokumen'"
                    class="font-weight-bold"
                  >
                    {{ pVal(aksi, "waktu") | toDT }}
                  </p>
                  <p v-else class="font-weight-bold">
                    {{ pVal(aksi, "waktu") | toDT }} s/d
                    {{ pVal(aksi, "waktu_selesai") | toDT }}
                  </p>
                </v-col>
                <v-col cols="12">
                  <span class="font-weight-bold primary--text">Nilai</span>
                  <span class="error--text">&nbsp;*</span>
                  <v-select
                    outlined
                    dense
                    v-model="aksi.nilai"
                    :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                    autofocus
                    placeholder="Nilai Kurasi Aksi"
                    hint="Nilai dari 1-10 (Jika nilai kurang dari 6 maka status aksi berubah menjadi TOLAK)"
                    persistent-hint
                    data-vv-name="nilai"
                    data-vv-as="Nilai"
                    v-validate="'required'"
                    :error-messages="errors.collect('form.nilai')"
                  ></v-select>
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
        contextmenu: "link image",
        contextmenu_never_use_native: true,
        language_url: window.location.origin + "/langs/id.js",
        menubar: "",
        height: "250",
        plugins: [
          "image",
          "media",
          "paste",
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
        paste_preprocess: function(plugin, args) {
          args.content = "";
        },
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
      autofocus: false,
      message: "",
      cropperOutputMime: "image/jpeg",
      randomImg: "sqwea12",
      url: null,
      aksi: {
        tags: []
      },
      countDeskripsi: 0,
      rppTerkait: null,
      edit: false,
      cover: null,
      file: null,
      newTag: null,
      duplicateTag: null,
      name: "",
      type: "",
      size: 0,
      // itemJenises: ["bacaan", "tips", "refleksi"],
      maxSize: MAX_UPLOAD_SIZE,
      errorType: false,
      accepts: ["application/pdf"].join(","),
      itemRpps: null,
      itemTags: null,
      itemJenjangs: null,
      itemTingkats: null,
      itemMapels: null,
      defRpp: {
        nama: null,
        cover: {
          url:
            "https://cdn.siap.id/s3/asset illustrasi/Illustrasi/bg-default.png"
        },
        tags: []
      },
      autoRefresh: false
    };
  },
  mounted() {},
  computed: {
    itemJenises() {
      if (this.current_user && this.current_user.peran.id == 2) {
        return ["refleksi"];
      } else {
        return ["bacaan", "tips", "refleksi"];
      }
    }
  },
  methods: {
    // eslint-disable-next-line
    open(obj) {
      this.rend = this.rend + 1;
      this.autoRefresh = true;
      this.loadJenjang();
      this.loadRpp();

      this.loadTag();
      this.aksi = obj
        ? { ...obj, ...(this.edit = true) }
        : {
            ...this.defRpp,
            ...(this.edit = false),
            ...(this.errorType = false),
            ...(this.duplicateTag = false),
            ...(this.cover = null),
            ...(this.rppTerkait = null)
          };
      if (obj) {
        this.rppTerkait = { ...obj.rpp };
        if (obj.cover && obj.cover.new_url) {
          this.aksi.sumber_file = obj.cover.sumber_file;
          this.url = obj.cover.new_url.medium;
        }
        if (obj.mapel.length > 1) {
          this.changeJenjang(obj.mapel[0].term_id);
          this.changeTingkat(obj.mapel[1].term_id);
          this.aksi.jenjang = obj.mapel[0].term_id;
          this.aksi.tingkat = obj.mapel[1].term_id;
          this.aksi.mata_pelajaran = obj.mapel[2].term_id;
        }
      } else {
        this.countDeskripsi = 0;
        this.url =
          "https://cdn.siap.id/s3/asset illustrasi/Illustrasi/bg-default.png";
      }
      this.aksi.nilai = null;
      let x = this.$refs.dlg.open();
      this.$validator.reset();
      return x;
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

    addTag(tags) {
      var a = _.includes(this.itemTags, tags);

      if (!a) {
        this.newTag = null;
        this.itemTags.push(tags);
      } else {
        this.duplicateTag = true;
      }
    },
    loadRpp() {
      this.$store
        .dispatch("rpp/getMy", {})
        .then(res => {
          this.itemRpps = res;
        })
        .catch(e => e);
    },
    loadTag() {
      this.$store
        .dispatch("aksi/getTag", {})
        .then(res => {
          this.itemTags = res;
        })
        .catch(e => e);
    },
    loadJenjang() {
      this.$store
        .dispatch("tagging/get", {
          params: {
            post_type_id: 3,
            taxonomy_id: 1
          }
        })
        .then(res => {
          this.itemJenjangs = res;
        })
        .catch(e => e);
    },
    changeJenjang(id) {
      this.$store
        .dispatch("tagging/get", {
          params: {
            post_type_id: 3,
            taxonomy_id: 2,
            parent: id
          }
        })
        .then(res => {
          this.itemTingkats = res;
        })
        .catch(e => e);
    },
    changeTingkat(id) {
      this.$store
        .dispatch("tagging/get", {
          params: {
            post_type_id: 3,
            taxonomy_id: 3,
            parent: id
          }
        })
        .then(res => {
          this.itemMapels = res;
        })
        .catch(e => e);
    },
    batalKurasi() {
      this.$confirm(
        `Apakah Anda yakin akan membatalkan Kurasi Anda pada Aksi ini?`
      )
        .then(() => {
          this.$refs.dlg.resolve();
        })
        .catch(e => e);
    },
    save() {
      this.$validator
        .validateAll("form")
        .then(res => {
          if (!res) return Promise.reject();
          return res;
        })
        .then(() => {
          this.aksi.cover = this.cover;
          if (this.rppTerkait && this.rppTerkait.id) {
            this.aksi.rpp_id = this.rppTerkait.id;
            this.aksi.jenjang = this.rppTerkait.mapel[0].term_id;
            this.aksi.tingkat = this.rppTerkait.mapel[1].term_id;
            this.aksi.mata_pelajaran = this.rppTerkait.mapel[2].term_id;
          }
          return this.$store
            .dispatch("kurasiAksi/tambah", {
              obj: this.aksi
            })
            .then(res => {
              if (res.error) {
                this.$error("Aksi gagal Dikurasi");
              } else {
                this.$info("Aksi berhasil dikurasi");
                this.$refs.dlg.resolve();
                return res;
              }
            })
            .catch(e => e);
        })

        .catch(e => e);
    },
    handleFileUpload() {
      this.errorType = false;
      if (this.file) {
        if (this.file.type != "application/pdf") {
          this.errorType = true;
        }
        this.size = (this.file.size / 1000000).toFixed(2);
      }
    },
    releaseLock() {
      this.autoRefresh = false;
      this.$store.dispatch("kurasiAksi/deleteLock", this.aksi.id).catch(e => e);
      this.$refs.dlg.resolve();
    }
  },
  watch: {
    autoRefresh(val) {
      if (val && !this.t) {
        // it seems to me this additional check would make sense?
        this.t = setInterval(() => {
          this.$store
            .dispatch("kurasiAksi/updateLock", this.aksi.id)
            .catch(e => e);
        }, 60 * 60 * 1000); // 1 jam
      } else {
        clearInterval(this.t);
      }
    },
    content(n) {
      this.aksi.deskripsi = n;
    }
  }
};
</script>
