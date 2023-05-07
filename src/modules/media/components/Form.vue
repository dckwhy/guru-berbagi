<template>
  <m-dialog
    ref="dlg"
    :btnsave="false"
    :title="media && media.id ? 'Ubah Media' : 'Tambah Media'"
  >
    <v-row row wrap justify="center" align="center">
      <v-col cols="12" sm="10" md="8" lg="8" xl="8">
        <v-card tile>
          <v-toolbar color="primary" dark flat>
            <v-col cols="2"></v-col>
            <v-col class="d-flex justify-space-around">
              <v-toolbar-title class="white--text">Media</v-toolbar-title>
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
                    <v-row fill-height>
                      <v-col class="text-center" cols="12" align-end colbox>
                        <span class="font-weight-bold primary--text"
                          >Gambar/Ilustrasi</span
                        >
                      </v-col>
                      <v-col class="text-center" cols="12" align-end colbox>
                        <v-img
                          position="top center"
                          :src="
                            media & media.cover
                              ? media.cover
                              : url
                              ? url
                              : 'https://cdn.siap.id/s3/simpkb/asset%20img/Guru-Berbagi/revisi-portal/thumb-default.jpg'
                          "
                          aspect-ratio="1.7778"
                          :min-width="
                            $vuetify.breakpoint.lgAndUp
                              ? 640
                              : $vuetify.breakpoint.smAndUp
                              ? 340
                              : 120
                          "
                          :min-height="
                            $vuetify.breakpoint.lgAndUp
                              ? 358
                              : $vuetify.breakpoint.smAndUp
                              ? 58
                              : 79
                          "
                        >
                          <v-btn
                            fab
                            depressed
                            small
                            color="pink"
                            style="position: absolute;right: 2px;top: 5px;"
                            id="pick-avatar-media"
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
                      :key="7"
                      :upload-handler="cropperHandler"
                      trigger="#pick-avatar-media"
                      :output-mime="cropperOutputMime"
                      :output-quality="0.8"
                      :cropper-options="{ aspectRatio: 16 / 9 }"
                      :output-options="{ width: 700, height: 350 }"
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
                    v-model="media.judul"
                    autofocus
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
                  <span class="font-weight-bold primary--text">Waktu</span>
                  <span class="error--text">&nbsp;*</span>
                  <m-datetimepicker
                    label="Tanggal"
                    v-model="media.waktu"
                    hint="Tanggal"
                    data-vv-name="tanggal"
                    data-vv-as="Tanggal Media"
                    v-validate="'required'"
                    :error-messages="errors.collect('form.tanggal')"
                  ></m-datetimepicker>
                </v-col>
                <v-col cols="12">
                  <span class="font-weight-bold primary--text">Deskripsi</span>
                  <span class="error--text">&nbsp;*</span>
                  <vue-editor
                    :editorToolbar="customToolbar"
                    v-model="media.deskripsi"
                  ></vue-editor>
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
import AvatarCropper from "vue-avatar-cropper";
import { VueEditor } from "vue2-editor";
import { MAX_UPLOAD_SIZE } from "@/const";
export default {
  $_veeValidate: {
    validator: "new"
  },
  components: {
    AvatarCropper,
    VueEditor
  },

  data() {
    return {
      rend: 1,
      customToolbar: [
        // [{ font: [] }],
        // [{ header: [false, 1, 2, 3, 4, 5, 6] }],
        // [{ size: ["small", false, "large", "huge"] }],
        ["bold", "italic", "underline"],
        [
          { align: "" },
          { align: "center" },
          { align: "right" },
          { align: "justify" }
        ],
        // [{ header: 1 }, { header: 2 }],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        // [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        // [{ color: [] }, { background: [] }],
        ["link", "video"]
        // [{ direction: "rtl" }],
        // ["clean"]
      ],
      autofocus: false,
      message: "",
      cropperOutputMime: null,
      randomImg: "sqwea12",
      url: null,
      media: {
        tags: []
      },
      edit: false,
      cover: null,
      file: null,
      newTag: null,
      duplicateTag: null,
      name: "",
      type: "",
      size: 0,
      maxSize: MAX_UPLOAD_SIZE,
      errorType: false,
      accepts: ["application/pdf"].join(","),
      itemTags: null,
      defRpp: {
        nama: null,
        cover: {
          url:
            "https://cdn.siap.id/s3/asset illustrasi/Illustrasi/bg-default.png"
        },
        tags: []
      },
      options: {
        mime: "*"
      }
    };
  },
  mounted() {},
  methods: {
    // eslint-disable-next-line
    open(obj) {
      this.rend = this.rend + 1;
      this.loadTag();
      this.media = obj
        ? { ...obj, ...(this.edit = true) }
        : {
            ...this.defRpp,
            ...(this.edit = false),
            ...(this.errorType = false),
            ...(this.duplicateTag = false)
          };
      if (obj) {
        if (obj.cover && obj.cover.url) {
          this.url = obj.cover.url;
        }
      } else {
        this.url =
          "https://cdn.siap.id/s3/asset illustrasi/Illustrasi/bg-default.png";
      }
      this.$validator.reset();
      return this.$refs.dlg.open();
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
        // this.media.tags.push(tags);
        this.itemTags.push(tags);
      } else {
        this.duplicateTag = true;
      }
    },
    loadTag() {
      this.$store
        .dispatch("media/getTag", {})
        .then(res => {
          this.itemTags = res;
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
          this.media.cover = this.cover;
          return this.$store
            .dispatch("media/tambah", {
              obj: this.media
            })
            .then(res => {
              this.$info("Simpan Data Media Berhasil");
              this.$refs.dlg.resolve();
              this.$router.push({
                name: "media"
              });
              return res;
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
    }
  }
};
</script>
