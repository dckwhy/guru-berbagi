<template>
  <m-dialog
    ref="dlg"
    :btnsave="false"
    :title="video && video.id ? 'Ubah Video' : 'Tambah Video'"
  >
    <v-row row wrap justify="center" align="center">
      <v-col cols="12" sm="10" md="8" lg="8" xl="8">
        <v-card tile>
          <v-toolbar color="primary" dark flat>
            <v-col cols="12" class="d-flex justify-space-around">
              <v-toolbar-title class="white--text"
                >Rencana Pelaksanaan Pembelajaran</v-toolbar-title
              >
            </v-col>
          </v-toolbar>
          <v-card-text>
            <v-form
              autocomplete="off"
              @submit.prevent
              data-vv-scope="form"
              lazy-validation
            >
              <v-alert
                dismissible
                outlined
                text
                dense
                color="primary"
                class="black--text title my-4"
                >Lengkapi Data Video</v-alert
              >
              <v-row wrap>
                <v-col cols="12" align="center">
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
                </v-col>
                <v-col cols="12">
                  <span class="font-weight-bold black--text">Tautan Video</span>
                  <span class="error--text">&nbsp;*</span>
                  <v-text-field
                    autofocus
                    outlined
                    dense
                    v-model="video.urlvideo"
                    placeholder="Isikan Tautan Video"
                    hint="Isikan tautan Video Anda"
                    persistent-hint
                    data-vv-name="url"
                    data-vv-as="Tautan Video"
                    v-validate="'required|url'"
                    :error-messages="errors.collect('form.url')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <span class="font-weight-bold black--text">Judul Video</span>
                  <span class="error--text">&nbsp;*</span>
                  <v-text-field
                    autofocus
                    outlined
                    dense
                    v-model="video.judul"
                    placeholder="Isikan Judul Rencana Pelaksanaan Pembelajaran"
                    hint="Judul maksimal 100 karakter"
                    persistent-hint
                    data-vv-name="judul"
                    data-vv-as="Judul"
                    v-validate="'required|max:100'"
                    :error-messages="errors.collect('form.judul')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <span class="font-weight-bold black--text"
                    >Deskripsi Video</span
                  >
                  <span class="error--text">&nbsp;*</span>
                  <v-textarea
                    outlined
                    dense
                    placeholder="Isikan Deskripsi Singkat Video"
                    hint="Deskripsi minimal 30 Kata maksimal 5000 kata"
                    persistent-hint
                    v-model="video.deskripsi"
                    data-vv-name="deskripsi"
                    data-vv-as="Deskripsi"
                    v-validate="'required'"
                    :error-messages="errors.collect('form.deskripsi')"
                  ></v-textarea>
                  <span>{{ countDeskripsi }}/5000 kata</span>
                  <p
                    class="red--text"
                    v-if="
                      current_user &&
                        countDeskripsi > 0 &&
                        (countDeskripsi < 30 || countDeskripsi > 5000)
                    "
                  >
                    Konten Artikel minimal 30 kata maksimal 5000 kata
                  </p>
                </v-col>
                <v-col cols="12" sm="12" md="4" lg="4" xl="4">
                  <span class="font-weight-bold black--text">Kategori</span>
                  <span class="error--text">&nbsp;*</span>
                  <v-autocomplete
                    outlined
                    dense
                    v-model="video.jenis_aksi"
                    :items="itemJenises"
                    no-data-text="Data Tidak Tersedia"
                    placeholder="Pilih Jenis Video"
                    name="Jenis"
                    data-vv-name="jenis"
                    data-vv-as="Jenis"
                    v-validate="'required'"
                    :error-messages="errors.collect('form.jenis')"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="12" md="4" lg="4" xl="4">
                  <span class="font-weight-bold black--text">Lingkup</span>
                  <span class="error--text">&nbsp;*</span>
                  <v-autocomplete
                    outlined
                    dense
                    v-model="video.lingkup"
                    :items="itemLingkups"
                    no-data-text="Data Tidak Tersedia"
                    placeholder="Pilih Lingkup"
                    name="Lingkup"
                    data-vv-name="lingkup"
                    data-vv-as="Lingkup"
                    v-validate="'required'"
                    :error-messages="errors.collect('form.jenjang')"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                  <span class="font-weight-bold black--text">Kata Kunci</span>
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
                    data-vv-name="tag"
                    data-vv-as="tag"
                    v-validate="''"
                    :error-messages="errors.collect('form.tag')"
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
                            ? 'Kata Kunci sudah Ada pilih Kata Kunci lain atau ketikkan tag baru'
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
                  <span class="font-weight-bold black--text"
                    >Berkas Materi</span
                  >
                  <p v-if="edit && video.file">
                    Berkas :
                    <a :href="video.file.url_lampiran" target="_blank">
                      {{ pVal(video.file, "filename") }}
                    </a>
                  </p>
                  <div class="container">
                    <v-file-input
                      ref="file"
                      v-model="file"
                      :hint="'Ukuran berkas maksimal ' + maxSize + ' MB'"
                      persistent-hint
                      id="file"
                      @change="handleFileUpload"
                      :placeholder="edit ? 'Ubah Berkas' : 'Pilih Berkas'"
                      :accept="accepts"
                      name="File"
                      data-vv-name="file"
                      data-vv-as="Berkas"
                      v-validate="edit ? '' : ''"
                      :error-messages="errors.collect('form.file')"
                      outlined
                      dense
                    ></v-file-input>
                    <p class="error--text" v-if="errorType">
                      Tipe berkas Anda tidak memenuhi syarat.
                    </p>
                    <p
                      class="error--text"
                      v-if="this.file && this.size > this.maxSize"
                    >
                      Ukuran Berkas Anda melebihi ketentuan : {{ this.size }} MB
                    </p>
                  </div>
                </v-col>
                <v-col cols="12">
                  <v-divider></v-divider>
                  <br />
                  <v-checkbox
                    v-model="setuju"
                    class="mx-2"
                    dense
                    name="setuju"
                    label="Saya sudah membaca dan mengikuti lembar panduan berbagi Video"
                    data-vv-name="setuju"
                    data-vv-as="Persetujuan"
                    v-validate="'required'"
                    :error-messages="errors.collect('form.setuju')"
                  ></v-checkbox>
                  <v-divider></v-divider>
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
import { MAX_UPLOAD_SIZE } from "@/const";

export default {
  $_veeValidate: {
    validator: "new"
  },
  components: {
    AvatarCropper
  },

  data() {
    return {
      autofocus: false,
      message: "",
      cropperOutputMime: "image/jpeg",
      randomImg: "sqwea12",
      url: null,
      video: {
        tags: []
      },
      countDeskripsi: 0,
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
      itemJenises: ["Umum", "Webinar GTK"],
      itemJenjangs: null,
      itemTingkats: null,
      itemMapels: null,
      itemTags: [],
      itemLingkups: [],
      defRpp: {
        nama: null,
        cover: {
          url:
            "https://cdn.siap.id/s3/asset illustrasi/Illustrasi/bg-default.png"
        },
        tags: []
      },
      setuju: null,
      options: {
        mime: "*"
      },
      isTiktok: false,
      tiktokCode: 0,
      isYoutube: false
    };
  },
  mounted() {},
  methods: {
    // eslint-disable-next-line
    open(obj) {
      if (this.current_user.peran.id == 1) {
        this.itemJenises = ["Umum", "Webinar GTK"];
        this.itemLingkups = [
          "Umum",
          "GTK Profesi",
          "GTK Dikmensus",
          "GTK Dikdas",
          "GTK Paud",
          "GTK Setditjen"
        ];
      } else {
        this.itemJenises = ["Umum"];
        this.itemLingkups = ["Umum"];
      }
      this.loadJenjang();
      this.loadTag();
      (this.file = null),
        (this.video = obj
          ? { ...obj, ...(this.edit = true), ...(this.setuju = true) }
          : {
              ...this.defRpp,
              ...(this.edit = false),
              ...(this.errorType = false),
              ...(this.duplicateTag = false),
              ...(this.setuju = null),
              ...(this.cover = null)
            });
      if (obj) {
        if (obj.cover && obj.cover.new_url) {
          this.url = obj.cover.new_url.thumbnail;
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
      this.$validator.reset();
      return this.$refs.dlg.open();
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

    addTag(tag) {
      this.duplicateTag = false;

      var a = _.includes(this.itemTags, tag);

      if (!a) {
        this.newTag = null;
        // this.video.tags.push(tag);
        this.itemTags.push(tag);
      } else {
        this.duplicateTag = true;
      }
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
            post_type_id: 1,
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
            post_type_id: 1,
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
            post_type_id: 1,
            taxonomy_id: 3,
            parent: id
          }
        })
        .then(res => {
          this.itemMapels = res;
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
          var batasDeskripsi = 30;
          if (
            this.current_user &&
            this.countDeskripsi >= batasDeskripsi &&
            this.countDeskripsi <= 5000
          ) {
            if (this.size <= this.maxSize && !this.errorType) {
              this.video.file = this.file;
              this.video.cover = this.cover;
              return this.$store
                .dispatch("video/form", {
                  obj: this.video
                })
                .then(res => {
                  if (res.error) {
                    this.$error("Simpan Video gagal");
                  } else {
                    this.$info("Simpan Video Berhasil");
                    this.$refs.dlg.resolve();
                    return res;
                  }
                })
                .catch(e => e);
            }
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
    }
  },
  watch: {
    "video.deskripsi": function() {
      return this.wordCount(this.video.deskripsi);
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
