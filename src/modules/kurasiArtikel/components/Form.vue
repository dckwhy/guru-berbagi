<template>
  <m-dialog
    ref="dlg"
    :btnsave="false"
    :title="artikel && artikel.id ? 'Kurasi Artikel' : 'Tambah Artikel'"
    @updatelock="releaseLock"
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
                        :color="artikel.similarity <= 50 ? 'grey' : 'grey'"
                        >{{ artikel.similarity | toF2 }}%</v-chip
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
                            artikel & artikel.cover
                              ? artikel.cover.new_url
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
                        <p>Sumber : {{ pVal(artikel, "sumber_file") }}</p>
                      </v-col>
                    </v-row>
                    <avatar-cropper
                      :key="5"
                      :upload-handler="cropperHandler"
                      trigger="#pick-avatar-kurasi-artikel"
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
                    v-model="artikel.judul"
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
                  <span class="font-weight-bold primary--text">Kategori</span>
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
                    >RPP terkait yang sudah Anda upload</span
                  >
                  <p class="black--text" v-if="artikel.rpp">
                    Tautan RPP :
                    <a :href="artikel.rpp.link" target="_blank">
                      <em>{{ artikel.rpp.judul | toTitleCase }}</em>
                    </a>
                  </p>
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
                <v-col cols="12">
                  <span class="font-weight-bold primary--text">Nilai</span>
                  <span class="error--text">&nbsp;*</span>
                  <v-select
                    outlined
                    dense
                    v-model="artikel.nilai"
                    :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                    autofocus
                    placeholder="Nilai Kurasi Artikel"
                    hint="Nilai dari 1-10 (Jika nilai kurang dari 6 maka status artikel berubah menjadi TOLAK)"
                    persistent-hint
                    data-vv-name="nilai"
                    data-vv-as="Nilai"
                    v-validate="''"
                    :error-messages="errors.collect('form.nilai')"
                  ></v-select>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="mr-4 mb-4" @click="save('draft')" color="primary"
              >SImpan
            </v-btn>
            <v-btn
              class="mr-4 mb-4"
              @click="save('publish')"
              :color="artikel.nilai < 6 ? 'error' : 'success'"
              >{{ artikel.nilai && artikel.nilai >= 6 ? "Publikasi" : "Tolak" }}
            </v-btn>
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
      showMinWord: false,
      autofocus: false,
      message: "",
      cropperOutputMime: "image/jpeg",
      randomImg: "sqwea12",
      url: null,
      artikel: {
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
      maxSize: MAX_UPLOAD_SIZE,
      errorType: false,
      accepts: ["application/pdf"].join(","),
      itemRpps: null,
      itemTags: [],
      itemJenjangs: null,
      itemTingkats: null,
      itemMapels: null,
      defArtikel: {
        nama: null,
        nilai: 1,
        cover: {
          url:
            "https://cdn.siap.id/s3/asset illustrasi/Illustrasi/bg-default.png"
        },
        tags: []
      },
      autoRefresh: false,
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
      return ["refleksi", "bacaan", "tips"];
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
      this.autoRefresh = true;
      this.loadJenjang();
      this.loadRpp();

      this.loadTag();
      this.artikel = obj
        ? { ...obj, ...(this.edit = true) }
        : {
            ...this.defArtikel,
            ...(this.edit = false),
            ...(this.errorType = false),
            ...(this.duplicateTag = false),
            ...(this.cover = null),
            ...(this.rppTerkait = null)
          };
      if (obj) {
        this.rppTerkait = { ...obj.rpp };
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
        this.url =
          "https://cdn.siap.id/s3/asset illustrasi/Illustrasi/bg-default.png";
      }

      this.artikel.nilai = null;
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
    batalKurasi() {
      this.$confirm(
        `Apakah Anda yakin akan membatalkan Kurasi Anda pada Artikel ini?`
      )
        .then(() => {
          this.$refs.dlg.resolve();
        })
        .catch(e => e);
    },
    save(tipe) {
      this.$validator
        .validateAll("form")
        .then(res => {
          this.cekWordCount();
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

            this.$confirm(
              tipe == "draft"
                ? "Kurasi Anda akan disimpan dan dapat dilanjutkan kembali dengan menekan tombol kurasi pada Artikel ini"
                : `Apakah Anda yakin dengan hasil kurasi Anda? Jika Nilai dibawah 6 maka Artikel akan di tolak sedangkan jika nilai sama atau diatas 6 maka artikel akan du pulikasi di portal Guru Berbagi`
            )
              .then(() => {
                return this.$store
                  .dispatch("kurasiArtikel/tambah", {
                    obj: this.artikel,
                    is_publish: tipe == "draft" ? 0 : 1
                  })
                  .then(res => {
                    if (res.error) {
                      this.$error("Artikel gagal Dikurasi");
                    } else {
                      this.$info("Artikel berhasil dikurasi");
                      this.$refs.dlg.resolve();
                      return res;
                    }
                  })
                  .catch(e => e);
              })
              .catch(e => e);
          } else {
            if (this.artikel.nilai < 6) {
              this.artikel.cover = this.cover;
              if (this.rppTerkait && this.artikel.jenis == "refleksi") {
                this.artikel.rpp_id = this.rppTerkait.id;
                this.artikel.jenjang = this.rppTerkait.mapel[0].term_id;
                this.artikel.tingkat = this.rppTerkait.mapel[1].term_id;
                this.artikel.mata_pelajaran = this.rppTerkait.mapel[2].term_id;
              } else {
                this.artikel.rpp_id = 0;
              }

              this.$confirm(
                tipe == "draft"
                  ? "Kurasi Anda akan disimpan dan dapat dilanjutkan kembali dengan menekan tombol kurasi pada Artikel ini"
                  : `Apakah Anda yakin akan menolak Artikel sesuai hasil kurasi Anda?`
              )
                .then(() => {
                  return this.$store
                    .dispatch("kurasiArtikel/tambah", {
                      obj: this.artikel,
                      is_publish: tipe == "draft" ? 0 : 1
                    })
                    .then(res => {
                      if (res.error) {
                        this.$error("Artikel gagal Dikurasi");
                      } else {
                        this.$info("Artikel berhasil dikurasi");
                        this.$refs.dlg.resolve();
                        return res;
                      }
                    })
                    .catch(e => e);
                })
                .catch(e => e);
            }
          }
        })
        .catch(e => e);
    },
    cekWordCount() {
      var count = this.$refs.editorRef.editor.plugins.wordcount.getCount();
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
    },
    releaseLock() {
      this.autoRefresh = false;
      this.$store
        .dispatch("kurasiArtikel/deleteLock", this.artikel.id)
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
            .dispatch("kurasiArtikel/updateLock", this.artikel.id)
            .catch(e => e);
        }, 60 * 60 * 1000); //60 menit
      } else {
        clearInterval(this.t);
      }
    },
    content(n) {
      this.artikel.deskripsi = n;
    }
  }
};
</script>
