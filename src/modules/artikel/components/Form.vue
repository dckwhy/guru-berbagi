<template>
  <m-dialog
    ref="dlg"
    :btnsave="false"
    :title="artikel && artikel.id ? 'Ubah Artikel' : 'Tambah Artikel'"
  >
    <v-row row wrap justify="center" align="center">
      <v-col cols="12" sm="10" md="8" lg="8" xl="8">
        <v-card tile>
          <v-toolbar color="primary" dark flat>
            <v-col cols="2"></v-col>
            <v-col class="d-flex justify-space-around">
              <v-toolbar-title class="white--text">Artikel</v-toolbar-title>
            </v-col>
            <v-col cols="2" class="d-flex justify-end"></v-col>
          </v-toolbar>
          <v-card-text>
            <m-alert :show="current_user && !current_user.no_hp">
              <template v-slot:default>
                <h3>
                  Untuk dapat menambahkan Artikel, Anda harus melengkapi nomor
                  selular terlebih dahulu
                </h3>
                <p>
                  Untuk melengkapi nomor selular, silakan klik tombol berikut
                </p>
                <v-btn
                  :small="$vuetify.breakpoint.xs"
                  label
                  color="blue white--text"
                  @click="$refs.dlg.resolve()"
                  >Daftar Artikel</v-btn
                >
              </template>
            </m-alert>
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
                      <v-col class="text-center" cols="12" align-start colbox>
                        <span class="font-weight-bold primary--text"
                          >Gambar/Ilustrasi</span
                        >
                      </v-col>
                      <v-col class="d-flex justify-center" cols="12">
                        <v-img
                          position="bottom center"
                          :src="
                            artikel & artikel.cover
                              ? artikel.cover.new_url
                              : url
                              ? url
                              : 'https://cdn.siap.id/s3/simpkb/asset%20img/Guru-Berbagi/revisi-portal/thumb-default.jpg'
                          "
                          max-width="250px"
                        >
                          <v-btn
                            fab
                            depressed
                            small
                            color="pink"
                            style="position: absolute;right: 2px;top: 5px;"
                            id="pick-avatar-artikel"
                          >
                            <v-icon color="white">mdi-camera</v-icon>
                          </v-btn>
                        </v-img>
                        <div
                          class="card-footer text-muted"
                          v-html="message"
                        ></div>
                      </v-col>
                      <v-col cols="12">
                        <p>
                          Ukuran gambar yang diizinkan
                          <strong>maksimal 1 MB</strong>. Apabila Anda tidak
                          menambahkan gambar, maka akan kami sediakan Gambar
                          Standar.
                        </p></v-col
                      >
                    </v-row>
                    <avatar-cropper
                      :key="2"
                      :upload-handler="cropperHandler"
                      trigger="#pick-avatar-artikel"
                      :output-mime="cropperOutputMime"
                      :output-quality="0.5"
                      :cropper-options="{ aspectRatio: 4 / 2 }"
                      :output-options="{ width: 800, height: 400 }"
                      :labels="{ submit: 'Simpan', cancel: 'Hapus' }"
                    />
                  </v-card>
                </v-col>
                <v-col cols="12">
                  <span class="font-weight-bold primary--text"
                    >Sumber Gambar/Ilustrasi</span
                  >
                  <span class="error--text">&nbsp;*</span>
                  <v-text-field
                    outlined
                    dense
                    v-model="artikel.sumber_file"
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
                    v-model="artikel.judul"
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
                  <span class="font-weight-bold primary--text">Kategori</span>
                  <span class="error--text">&nbsp;*</span>
                  <v-select
                    outlined
                    dense
                    v-model="artikel.jenis"
                    :items="itemJenises"
                    no-data-text="Data Tidak Tersedia"
                    placeholder="Pilih Kategori Artikel"
                    name="Kategori"
                    data-vv-name="kategori"
                    data-vv-as="Kategori Artikel"
                    v-validate="'required'"
                    :error-messages="errors.collect('form.kategori')"
                  ></v-select>
                </v-col>
                <v-col cols="12" v-if="artikel.jenis == 'refleksi'">
                  <span class="font-weight-bold primary--text"
                    >RPP terkait dengan yang sudah Anda unggah</span
                  >
                  <span class="error--text">&nbsp;*</span>
                  <v-autocomplete
                    outlined
                    dense
                    v-model="rppTerkait"
                    :items="itemRpps"
                    item-value="id"
                    item-text="judul"
                    no-data-text="Data Tidak Tersedia"
                    placeholder="Pilih RPP"
                    name="RPP"
                    data-vv-name="rpp"
                    data-vv-as="RPP"
                    :return-object="true"
                    v-validate="'required'"
                    :error-messages="errors.collect('form.rpp')"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12">
                  <span class="font-weight-bold primary--text"
                    >Konten Artikel</span
                  >
                  <span class="error--text">&nbsp;*</span>
                  <editor
                    :key="rend"
                    :initialValue="artikel.deskripsi"
                    ref="editorRef"
                    v-model="content"
                    api-key="0iu1x8uuavwjanzbn1wut0ont7pbtanoag9mrfd9nhfnroba"
                    :init="options"
                  />
                  <p class="red--text" v-show="showMinWord">
                    Konten Artikel minimal 300 kata maksimal 2500 kata
                  </p>
                </v-col>
                <v-col cols="12">
                  <span class="font-weight-bold primary--text"
                    >Sumber Referensi</span
                  >
                  <span class="error--text">&nbsp;*</span>
                  <v-text-field
                    outlined
                    dense
                    v-model="artikel.sumber_penulis"
                    placeholder="Isikan Sumber Referensi"
                    hint="Tambahkan Sumber Referensi"
                    persistent-hint
                    data-vv-name="sumber"
                    data-vv-as="Sumber Referensi"
                    v-validate="'required|max:500'"
                    :error-messages="errors.collect('form.sumber')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" v-if="isCan('user')">
                  <span class="font-weight-bold primary--text"
                    >Penulis Asli</span
                  >
                  <v-text-field
                    outlined
                    dense
                    v-model="artikel.penulis_asli"
                    placeholder="Isikan Penulis Asli Artikel"
                    hint="Hanya diisi jika artikel ditulis atas nama Penulis lain"
                    persistent-hint
                    data-vv-name="penulis_asli"
                    data-vv-as="Penulis Asli"
                    v-validate="''"
                    :error-messages="errors.collect('form.penulis_asli')"
                  ></v-text-field>
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
                    v-model="artikel.tags"
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
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="current_user && !current_user.no_hp"
              class="mr-4 mb-4"
              @click="save"
              color="primary"
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
import Editor from "@tinymce/tinymce-vue";
import AvatarCropper from "vue-avatar-cropper";
import { MAX_UPLOAD_SIZE, API } from "@/const";
import axios from "axios";
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
      showMinWord: false,
      autofocus: false,
      message: "",
      content: "",
      cropperOutputMime: "image/jpeg",
      randomImg: "sqwea12",
      url: null,
      artikel: {
        tags: []
      },
      countDeskripsi: 0,
      isCoverEmpty: true,
      edit: false,
      rppTerkait: null,
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
      itemRpps: [],
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
      }
    };
  },
  mounted() {},
  computed: {
    itemJenises() {
      if (this.current_user && this.current_user.peran.id == 2) {
        return ["refleksi", "bacaan", "tips"];
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
      if (this.current_user.peran.id !== 1) {
        this.options.paste_preprocess = function(plugin, args) {
          args.content = "";
        };
      }
      this.rend = this.rend + 1;
      this.countDeskripsi = 0;
      this.loadJenjang();
      this.loadRpp();
      this.loadTag();
      this.artikel = obj
        ? {
            ...obj
          }
        : {
            ...this.defRpp
          };
      if (obj) {
        this.edit = true;
        this.isCoverEmpty = false;
        if (obj.rpp_id) {
          this.rppTerkait = { ...obj.rpp };
        }
        if (obj.cover && obj.cover.new_url) {
          this.artikel.sumber_file = obj.cover.sumber_file;
          this.url = obj.cover.new_url.medium;
        }
        if (obj.mapel.length > 1) {
          this.changeJenjang(obj.mapel[0].term_id);
          this.changeTingkat(obj.mapel[1].term_id);
          this.artikel.jenjang = obj.mapel[0].term_id;
          this.artikel.tingkat = obj.mapel[1].term_id;
          this.artikel.mata_pelajaran = obj.mapel[2].term_id;
        }
      } else {
        this.countDeskripsi = 0;
        this.edit = false;
        this.errorType = false;
        this.duplicateTag = false;
        this.cover = null;
        this.rppTerkait = null;
        this.isCoverEmpty = true;
        this.url =
          "https://cdn.siap.id/s3/asset illustrasi/Illustrasi/bg-default.png";
      }
      let x = this.$refs.dlg.open();
      this.$validator.reset();
      return x;
    },
    cropperHandler(cropper) {
      var imgdat = cropper.getCroppedCanvas().toDataURL(this.cropperOutputMime);

      var file = this.dataURLtoFile(imgdat, "thumb" + Math.random + ".png");
      this.url = URL.createObjectURL(file);
      this.cover = file;
      this.isCoverEmpty = false;

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
        .dispatch("artikel/uploadImage", file)
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
        .dispatch("artikel/getTag", {})
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
          this.cekWordCount();
          if (this.isCoverEmpty) {
            this.$error("Anda wajib mengupload gambar ilustrasi");
            return Promise.reject();
          }
          if (!res) return Promise.reject();
          return res;
        })
        .then(() => {
          if (this.showMinWord == false) {
            this.artikel.cover = this.cover;
            if (this.rppTerkait && this.artikel.jenis == "refleksi") {
              this.artikel.rpp_id = this.rppTerkait.id;
              this.artikel.jenjang = this.rppTerkait.mapel[0].term_id;
              this.artikel.tingkat = this.rppTerkait.mapel[1].term_id;
              this.artikel.mata_pelajaran = this.rppTerkait.mapel[2].term_id;
            } else {
              this.artikel.rpp_id = 0;
            }

            return this.$store
              .dispatch("artikel/tambah", {
                obj: this.artikel
              })
              .then(res => {
                if (res.error) {
                  this.$error("Simpan Data Artikel gagal");
                } else {
                  this.$info("Simpan Data Artikel Berhasil");
                  this.$refs.dlg.resolve();
                  return res;
                }
              })
              .catch(e => e);
          }
        })

        .catch(e => e);
    },
    cekWordCount() {
      const count = this.$refs.editorRef.editor.plugins.wordcount.getCount();
      if (count >= 0 && (count < 300 || count > 2500)) {
        this.showMinWord = true;
      } else {
        this.showMinWord = false;
      }
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
    content(n) {
      this.artikel.deskripsi = n;
    }
  }
};
</script>
