<template>
  <m-dialog
    ref="dlg"
    :btnsave="false"
    :title="buletin && buletin.id ? 'Ubah Buletin' : 'Tambah Buletin'"
  >
    <v-row row wrap justify="center" align="center" v-if="buletin">
      <v-col cols="12" sm="10" md="8" lg="8" xl="8">
        <v-card tile>
          <v-toolbar color="primary" dark flat>
            <v-col cols="2"></v-col>
            <v-col class="d-flex justify-space-around">
              <v-toolbar-title class="white--text">Buletin</v-toolbar-title>
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
                      <v-col class="text-left" cols="12" align-start colbox>
                        <span class="font-weight-bold primary--text"
                          >Gambar/Ilustrasi</span
                        >
                      </v-col>
                      <v-col class="text-center" cols="12" align-end colbox>
                        <v-img
                          position="bottom center"
                          :src="
                            buletin & buletin.cover
                              ? buletin.cover.new_url
                              : url
                              ? url
                              : 'https://cdn.siap.id/s3/simpkb/asset%20img/Guru-Berbagi/revisi-portal/thumb-default.jpg'
                          "
                        >
                          <v-btn
                            fab
                            depressed
                            small
                            color="pink"
                            style="position: absolute;right: 2px;top: 5px;"
                            id="pick-avatar-buletin"
                          >
                            <v-icon color="white">mdi-camera</v-icon>
                          </v-btn>
                        </v-img>
                        <div
                          class="card-footer text-muted"
                          v-html="message"
                        ></div>
                        <p>
                          Ukuran gambar yang diizinkan
                          <strong>maksimal 1 MB</strong>. Apabila Anda tidak
                          menambahkan gambar, maka akan kami sediakan Gambar
                          Standar.
                        </p>
                      </v-col>
                    </v-row>
                    <avatar-cropper
                      :key="3"
                      :upload-handler="cropperHandler"
                      trigger="#pick-avatar-buletin"
                      :output-mime="cropperOutputMime"
                      :output-quality="0.5"
                      :cropper-options="{ aspectRatio: 4 / 2 }"
                      :output-options="{ width: 800, height: 400 }"
                      :labels="{ submit: 'Simpan', cancel: 'Hapus' }"
                    />
                  </v-card>
                </v-col>
                <v-col cols="12">
                  <span class="font-weight-bold primary--text">Atur Judul</span>
                  <span class="error--text">&nbsp;*</span>
                  <v-text-field
                    outlined
                    dense
                    v-model="buletin.judul"
                    autofocus
                    placeholder="Isikan Atur Judul"
                    hint="Atur Judul maksimal 200 karakter"
                    persistent-hint
                    data-vv-name="judul"
                    data-vv-as="Atur Judul"
                    v-validate="'required|max:200'"
                    :error-messages="errors.collect('form.judul')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                  <span class="font-weight-bold primary--text"
                    >Atur 3 RPP Terpilih</span
                  >
                  <span class="error--text">&nbsp;*</span>
                  <v-row>
                    <v-col cols="12">
                      <v-card
                        class="ra-0"
                        tile
                        flat
                        height="50"
                        color="blue lighten-2"
                        @click="addRpp"
                      >
                        <v-card-text class="pa-0" fill-height>
                          <v-container fill-height fluid>
                            <v-row align="center" justify="center">
                              <v-col cols="2" class="py-0">
                                <v-icon>mdi-plus</v-icon>
                              </v-col>
                              <v-col cols="10" class="title py-0">
                                <div id="organisasi" class="header text-left">
                                  <span>Pilih RPP</span>
                                </div>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>
                      </v-card>
                      <BlockCard
                        v-for="item in buletin.letterrpp"
                        :key="item.id"
                        :is_organisasi="true"
                        :title="item.judul"
                        :jenis="item.moda"
                        :author="pVal(item.author, 'name')"
                        @deselect="batalRpp(item)"
                        :logo="
                          item.cover && item.cover.new_url
                            ? item.cover.new_url.thumbnail
                            : 'https://cdn.siap.id/s3/simpkb/asset img/Guru-Berbagi/revisi-portal/thumb-default.jpg'
                        "
                        :height="120"
                        color="blue"
                        to
                      />
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                  <span class="font-weight-bold primary--text"
                    >Atur 3 Artikel Terpilih</span
                  >
                  <span class="error--text">&nbsp;*</span>
                  <v-row>
                    <v-col cols="12">
                      <v-card
                        class="ra-0"
                        tile
                        flat
                        height="50"
                        color="blue lighten-2"
                        @click="addArtikel"
                      >
                        <v-card-text class="pa-0" fill-height>
                          <v-container fill-height fluid>
                            <v-row align="center" justify="center">
                              <v-col cols="2" class="py-0">
                                <v-icon>mdi-plus</v-icon>
                              </v-col>
                              <v-col cols="10" class="title py-0">
                                <div id="organisasi" class="header text-left">
                                  <span>Pilh Artikel</span>
                                </div>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>
                      </v-card>
                      <BlockCard
                        v-for="item in buletin.letterartikel"
                        :key="item.id"
                        :is_organisasi="true"
                        :title="item.judul"
                        :jenis="item.jenis"
                        :author="pVal(item.author, 'name')"
                        @deselect="batalArtikel(item)"
                        :logo="
                          item.cover && item.cover.new_url
                            ? item.cover.new_url.thumbnail
                            : 'https://cdn.siap.id/s3/simpkb/asset img/Guru-Berbagi/revisi-portal/thumb-default.jpg'
                        "
                        :height="120"
                        color="blue"
                        to
                      />
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                  <span class="font-weight-bold primary--text"
                    >Atur 3 Aksi Terpilih</span
                  >
                  <span class="error--text">&nbsp;*</span>
                  <v-row>
                    <v-col cols="12">
                      <v-card
                        class="ra-0"
                        tile
                        flat
                        height="50"
                        color="blue lighten-2"
                        @click="addAksi"
                      >
                        <v-card-text class="pa-0" fill-height>
                          <v-container fill-height fluid>
                            <v-row align="center" justify="center">
                              <v-col cols="2" class="py-0">
                                <v-icon>mdi-plus</v-icon>
                              </v-col>
                              <v-col cols="10" class="title py-0">
                                <div id="organisasi" class="header text-left">
                                  <span>Pilh Aksi</span>
                                </div>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>
                      </v-card>
                      <BlockCard
                        v-for="item in buletin.letteraksi"
                        :key="item.id"
                        :is_organisasi="true"
                        :title="item.judul"
                        :jenis="item.jenis"
                        :author="pVal(item.author, 'name')"
                        @deselect="batalAksi(item)"
                        :logo="
                          item.cover && item.cover.new_url
                            ? item.cover.new_url.thumbnail
                            : 'https://cdn.siap.id/s3/simpkb/asset img/Guru-Berbagi/revisi-portal/thumb-default.jpg'
                        "
                        :height="120"
                        color="blue"
                        to
                      />
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12">
                  <span class="font-weight-bold primary--text"
                    >Konten Buletin</span
                  >
                  <span class="error--text">&nbsp;*</span>
                  <vue-editor
                    v-model="buletin.deskripsi"
                    useCustomImageHandler
                    @image-added="handleImageAdded"
                  ></vue-editor>
                </v-col>
                <v-col cols="12" v-if="error">
                  <v-alert dense outlined type="error">
                    Anda wajib minimal
                    <strong>1 RPP atau 1 Artikel Terpilih</strong>. Silakan
                    lengkapi pilihan Anda.
                  </v-alert>
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
    <PilihRpp ref="dlgPilihRpp" @pilihRpp="pilihRpp" />
    <PilihArtikel ref="dlgPilihArtikel" @pilihArtikel="pilihArtikel" />
    <PilihAksi ref="dlgPilihAksi" @pilihAksi="pilihAksi" />
  </m-dialog>
</template>

<script>
import axios from "axios";
import { API } from "@/const";
import PilihRpp from "../components/PilihRpp.vue";
import PilihArtikel from "../components/PilihArtikel.vue";
import PilihAksi from "../components/PilihAksi.vue";
import { VueEditor } from "vue2-editor";
import BlockCard from "@/components/BlockCard";
import AvatarCropper from "vue-avatar-cropper";
import { MAX_UPLOAD_SIZE } from "@/const";
export default {
  $_veeValidate: {
    validator: "new"
  },
  components: {
    AvatarCropper,
    VueEditor,
    PilihRpp,
    PilihArtikel,
    PilihAksi,
    BlockCard
  },

  data() {
    return {
      rend: 1,
      options: {
        contextmenu: "",
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
      error: false,
      cropperOutputMime: "image/jpeg",
      randomImg: "sqwea12",
      url: null,
      buletin: {
        letterrpp: [],
        letterartikel: [],
        letteraksi: []
      },
      edit: false,
      rppTerkait: null,
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
      rpp_terpilih: [],
      defBerita: {
        nama: null,
        letterrpp: [],
        letterartikel: [],
        letteraksi: [],
        cover: {
          url:
            "https://cdn.siap.id/s3/asset illustrasi/Illustrasi/bg-default.png"
        }
      }
    };
  },
  mounted() {},
  computed: {
    itemJenises() {
      if (this.current_user && this.current_user.peran.id == 2) {
        return ["refleksi"];
      } else if (this.current_user && this.current_user.peran.id == 3) {
        return ["bacaan", "tips"];
      } else {
        return ["bacaan", "tips", "refleksi"];
      }
    }
  },
  methods: {
    // eslint-disable-next-line
    open(obj) {
      this.rend = this.rend + 1;
      this.error = false;
      this.buletin = obj
        ? {
            ...obj,
            ...(this.edit = true)
          }
        : {
            ...this.defBerita,
            ...(this.edit = false),
            ...(this.errorType = false),
            ...(this.cover = null)
          };
      if (obj) {
        this.buletin.deskripsi = obj.deskripsi;
        if (obj.cover && obj.cover.new_url) {
          this.buletin.sumber_file = obj.cover.sumber_file;
          this.url = obj.cover.new_url.medium;
        }
      } else {
        this.url =
          "https://cdn.siap.id/s3/asset illustrasi/Illustrasi/bg-default.png";
      }
      let x = this.$refs.dlg.open();
      this.$validator.reset();
      // this.$nextTick(() => {
      //   this.buletin.letterrpp = new Array();
      //   this.buletin.letterartikel = new Array();
      //   this.buletin.letteraksi = new Array();
      // });

      return x;
      // this.$validator.reset();
      // return this.$refs.dlg.open();
    },
    addRpp() {
      this.$refs.dlgPilihRpp.open(this.buletin.letterrpp).then(() => {});
    },
    addArtikel() {
      this.$refs.dlgPilihArtikel
        .open(this.buletin.letterartikel)
        .then(() => {});
    },
    addAksi() {
      this.$refs.dlgPilihAksi.open(this.buletin.letteraksi).then(() => {});
    },
    pilihRpp(itemRpp) {
      this.buletin.letterrpp = itemRpp;
    },
    pilihArtikel(itemArtikel) {
      this.buletin.letterartikel = itemArtikel;
    },
    pilihAksi(itemAksi) {
      this.buletin.letteraksi = itemAksi;
    },
    getContent(content) {
      this.buletin.deskripsi = content;
    },
    batalRpp(item) {
      for (var i = 0; i < this.buletin.letterrpp.length; i++) {
        if (this.buletin.letterrpp[i].id === item.id) {
          this.buletin.letterrpp.splice(i, 1);
        }
      }
    },
    batalArtikel(item) {
      for (var i = 0; i < this.buletin.letterartikel.length; i++) {
        if (this.buletin.letterartikel[i].id === item.id) {
          this.buletin.letterartikel.splice(i, 1);
        }
      }
    },
    batalAksi(item) {
      for (var i = 0; i < this.buletin.letteraksi.length; i++) {
        if (this.buletin.letteraksi[i].id === item.id) {
          this.buletin.letteraksi.splice(i, 1);
        }
      }
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
        .dispatch("buletin/uploadImage", file)
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
    save() {
      this.$validator
        .validateAll("form")
        .then(res => {
          if (!res) return Promise.reject();
          return res;
        })
        .then(() => {
          if (this.cover) {
            this.buletin.cover = this.cover;
          } else {
            this.buletin.cover = null;
          }
          return this.$store
            .dispatch("buletin/tambah", {
              obj: this.buletin
            })
            .then(res => {
              if (res.error) {
                this.$error("Simpan Data gagal");
              } else {
                this.$info("Simpan Data Berhasil");
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
