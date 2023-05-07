<template>
  <m-dialog
    ref="dlg"
    :btnsave="false"
    :title="video && video.id ? 'Kurasi Video' : 'Tambah Video'"
    @updatelock="releaseLock"
  >
    <v-row row wrap justify="center" align="center">
      <v-col cols="12" sm="10" md="8" lg="8" xl="8">
        <v-card tile>
          <v-toolbar color="primary" dark flat>
            <v-col cols="2"></v-col>
            <v-col class="d-flex justify-space-around">
              <v-toolbar-title class="white--text">Video</v-toolbar-title>
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
                        :color="video.similarity <= 50 ? 'grey' : 'grey'"
                        >{{ video.similarity | toF2 }}%</v-chip
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
                        <video-embed
                          v-if="isYoutube"
                          css="embed-responsive-21by9"
                          :src="video.urlvideo"
                        ></video-embed>
                        <iframe
                          v-if="isTiktok"
                          style="width: 100%; height: 729px; display: block; visibility: unset; max-height: 729px;border:none"
                          :src="`https://www.tiktok.com/embed/v2/` + tiktokCode"
                        ></iframe>
                        <div
                          class="card-footer text-muted"
                          v-html="message"
                        ></div>
                        <p>Sumber : {{ pVal(video, "sumber_file") }}</p>
                      </v-col>
                    </v-row>
                    <avatar-cropper
                      :key="6"
                      :upload-handler="cropperHandler"
                      trigger="#pick-avatar-kurasi-video"
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
                    v-model="video.judul"
                    autofocus
                    placeholder="Isikan Judul Video"
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
                  <p v-if="video.jenis" class="font-weight-bold">
                    {{ pVal(video, "jenis") | toTitleCase }}
                  </p>
                </v-col>
                <v-col cols="12" v-if="video.jenis == 'refleksi'">
                  <span class="font-weight-bold primary--text"
                    >RPP terkait yang sudah Anda upload</span
                  >
                  <p class="black--text" v-if="video.rpp">
                    Tautan RPP :
                    <a :href="video.rpp.link" target="_blank">
                      <em>{{ video.rpp.judul | toTitleCase }}</em>
                    </a>
                  </p>
                </v-col>
                <v-col cols="12">
                  <span class="font-weight-bold primary--text"
                    >Konten Video</span
                  >
                  <span class="error--text">&nbsp;*</span>
                  <vue-editor
                    @text-change="wordCount(video.deskripsi)"
                    v-model="video.deskripsi"
                    useCustomImageHandler
                    @image-added="handleImageAdded"
                  ></vue-editor>
                  <span>{{ countDeskripsi }}/1000 kata</span>
                  <p
                    class="red--text"
                    v-if="
                      countDeskripsi > 0 &&
                        (countDeskripsi <= 30 || countDeskripsi > 5000)
                    "
                  >
                    Konten Video minimal 30 kata maksimal 5000 kata
                  </p>
                </v-col>
                <v-col cols="12">
                  <v-chip
                    label
                    small
                    class="light-blue darken-4 white--text mr-2"
                    >Kategori :
                    {{ pVal(video, "jenis_aksi") | toUppercase }}</v-chip
                  >
                  <v-chip label small class="success white--text mr-2"
                    >Lingkup: {{ pVal(video, "lingkup") | toUppercase }}</v-chip
                  >
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                  <span class="font-weight-bold primary--text">Kata Kunci</span>
                  <v-autocomplete
                    outlined
                    dense
                    chips
                    small-chips
                    multiple
                    clearable
                    deletable-chips
                    v-model="video.tags"
                    :items="itemTags"
                    item-value="id"
                    item-text="nama"
                    return-object
                    no-data-text="Kata Kunci tidak ditemukan"
                    placeholder="Pilih Kata Kunci"
                    name="Kata Kunci"
                    data-vv-name="tags"
                    data-vv-as="tags"
                    v-validate="''"
                    :error-messages="errors.collect('form.tags')"
                  >
                    <div slot="append-item" class="ma-2">
                      <v-text-field
                        v-model="newTag"
                        outlined
                        background-color="amber accent-1"
                        dense
                        @keyup.enter="addTag(newTag)"
                        placeholder="Tambah Kata Kunci"
                        :hint="
                          duplicateTag
                            ? 'Kata Kunci sudah Ada pilih Kata Kunci lain atau ketikkan kata kunci baru'
                            : 'Tekan Enter untuk menambahkan Kata Kunci baru, kemudian pilih Kata Kunci yang ingin ditambahkan'
                        "
                        persistent-hint
                        data-vv-name="judul"
                        data-vv-as="Kata Kunci"
                      ></v-text-field>
                    </div>
                  </v-autocomplete>
                </v-col>
                <v-col cols="12">
                  <span class="font-weight-bold primary--text">Nilai</span>
                  <span class="error--text">&nbsp;*</span>
                  <v-select
                    outlined
                    dense
                    v-model="video.nilai"
                    :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                    autofocus
                    placeholder="Nilai Kurasi Video"
                    hint="Nilai dari 1-10 (Jika nilai kurang dari 6 maka status video berubah menjadi TOLAK)"
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
import { VueEditor } from "vue2-editor";
import AvatarCropper from "vue-avatar-cropper";
import { MAX_UPLOAD_SIZE } from "@/const";
export default {
  $_veeValidate: {
    validator: "new"
  },
  components: {
    AvatarCropper,
    VueEditor
    // TextEditor
  },

  data() {
    return {
      rend: 1,
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
      video: {
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
      itemTags: [],
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
      autoRefresh: false,
      isTiktok: false,
      tiktokCode: 0,
      isYoutube: false
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
      this.video = obj
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
        this.wordCount(obj.deskripsi);
        this.rppTerkait = { ...obj.rpp };
        this.video.deskripsi = obj.deskripsi;
        if (obj.cover && obj.cover.new_url) {
          this.video.sumber_file = obj.cover.sumber_file;
          this.url = obj.cover.new_url.medium;
        }
        if (obj.mapel.length > 1) {
          this.changeJenjang(obj.mapel[0].term_id);
          this.changeTingkat(obj.mapel[1].term_id);
          this.video.jenjang = obj.mapel[0].term_id;
          this.video.tingkat = obj.mapel[1].term_id;
          this.video.mata_pelajaran = obj.mapel[2].term_id;
        }
      } else {
        this.countDeskripsi = 0;
        this.url =
          "https://cdn.siap.id/s3/asset illustrasi/Illustrasi/bg-default.png";
      }
      this.video.nilai = null;
      this.$validator.reset();
      return this.$refs.dlg.open();
    },
    getContent(content) {
      this.video.deskripsi = content;
    },
    wordCount(str) {
      this.countDeskripsi = this.$tools.wordCount(str);
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
        .dispatch("video/uploadImage", file)
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
        .dispatch("video/getTag", {})
        .then(res => {
          this.itemTags = res;
        })
        .catch(e => e);
    },
    loadJenjang() {
      this.$store
        .dispatch("tagging/get", {
          params: {
            post_type_id: 5,
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
            post_type_id: 5,
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
            post_type_id: 5,
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
        `Apakah Anda yakin akan membatalkan Kurasi Anda pada Video ini?`
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
          if (this.countDeskripsi >= 30 && this.countDeskripsi <= 5000) {
            this.video.cover = this.cover;
            if (this.rppTerkait && this.rppTerkait.id) {
              this.video.rpp_id = this.rppTerkait.id;
              this.video.jenjang = this.rppTerkait.mapel[0].term_id;
              this.video.tingkat = this.rppTerkait.mapel[1].term_id;
              this.video.mata_pelajaran = this.rppTerkait.mapel[2].term_id;
            }
            return this.$store
              .dispatch("kurasiVideo/tambah", {
                obj: this.video
              })
              .then(res => {
                if (res.error) {
                  this.$error("Video gagal Dikurasi");
                } else {
                  this.$info("Video berhasil dikurasi");
                  this.$refs.dlg.resolve();
                  return res;
                }
              })
              .catch(e => e);
          }
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
      this.$store
        .dispatch("kurasiVideo/deleteLock", this.video.id)
        .catch(e => e);
      this.$refs.dlg.resolve();
    }
  },
  watch: {
    autoRefresh(val) {
      if (val && !this.t) {
        // it seems to me this additional check would make sense?
        this.t = setInterval(() => {
          this.$store
            .dispatch("kurasiVideo/updateLock", this.video.id)
            .catch(e => e);
        }, 60 * 60 * 1000); // 1 jam
      } else {
        clearInterval(this.t);
      }
    },
    "video.urlvideo": function(n) {
      var tiktokVideo = n.match(/.tiktok.*/);
      var youtubeVideo1 = n.match(/.youtube.*/);
      var youtubeVideo2 = n.match(/.youtu.be.*/);

      this.isYoutube = youtubeVideo1 ? true : youtubeVideo2 ? true : false;
      this.isTiktok = tiktokVideo ? true : false;

      if (tiktokVideo) {
        var explode = n.split("/video/");
        this.tiktokCode = explode[1];
      }
    }
  }
};
</script>
