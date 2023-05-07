<template>
  <m-dialog
    ref="dlg"
    :btnsave="false"
    :title="rpp && rpp.id ? 'Ubah RPP' : 'Tambah RPP'"
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
            <m-alert :show="current_user && !current_user.no_hp">
              <template v-slot:default>
                <h3>
                  Untuk dapat menambahkan RPP, Anda harus melengkapi nomor
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
                  >Daftar RPP</v-btn
                >
              </template>
            </m-alert>
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
                >Lengkapi Data RPP</v-alert
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
                            rpp & rpp.cover
                              ? rpp.cover.new_url
                              : url
                              ? url
                              : 'https://guruberbagi.simpkb.id/wp-content/uploads/2020/03/Icon-1-3.png'
                          "
                          :max-width="
                            $vuetify.breakpoint.smAndUp ? '500px' : '300px'
                          "
                        >
                          <v-btn
                            fab
                            depressed
                            small
                            color="pink"
                            style="position: absolute;right: 2px;top: 5px;"
                            id="pick-avatar-rpp"
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
                        </p>
                      </v-col>
                    </v-row>
                    <avatar-cropper
                      :key="9"
                      :upload-handler="cropperHandler"
                      trigger="#pick-avatar-rpp"
                      :output-mime="cropperOutputMime"
                      :output-quality="0.8"
                      :cropper-options="{ aspectRatio: 4 / 2 }"
                      :output-options="{ width: 800, height: 400 }"
                      :labels="{ submit: 'Simpan', cancel: 'Hapus' }"
                    />
                  </v-card>
                </v-col>
                <v-col cols="12">
                  <span class="font-weight-bold black--text">Judul RPP</span>
                  <span class="error--text">&nbsp;*</span>
                  <v-text-field
                    autofocus
                    outlined
                    dense
                    v-model="rpp.judul"
                    placeholder="Isikan Judul Rencana Pelaksanaan Pembelajaran"
                    hint="Judul maksimal 50 karakter"
                    persistent-hint
                    data-vv-name="judul"
                    data-vv-as="Judul"
                    v-validate="'required|max:50'"
                    :error-messages="errors.collect('form.judul')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="4" lg="4" xl="4">
                  <span class="font-weight-bold black--text">Jenis</span>
                  <span class="error--text">&nbsp;*</span>
                  <v-autocomplete
                    outlined
                    dense
                    v-model="rpp.moda"
                    :items="itemJenises"
                    no-data-text="Data Tidak Tersedia"
                    placeholder="Pilih Jenis RPP"
                    name="Jenis"
                    data-vv-name="jenis"
                    data-vv-as="Jenis"
                    v-validate="'required'"
                    :error-messages="errors.collect('form.jenis')"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12">
                  <span class="font-weight-bold black--text"
                    >Deskripsi RPP</span
                  >
                  <span class="error--text">&nbsp;*</span>
                  <v-textarea
                    outlined
                    dense
                    placeholder="Isikan Deskripsi Singkat RPP"
                    hint="Deskripsi minimal 200 karakter maksimal 500 karakter"
                    persistent-hint
                    v-model="rpp.deskripsi"
                    data-vv-name="deskripsi"
                    data-vv-as="Deskripsi"
                    v-validate="'required|min:200|max:500'"
                    :error-messages="errors.collect('form.deskripsi')"
                  ></v-textarea>
                  <blockquote
                    class="ml-3 black--text"
                    v-if="rpp && rpp.deskripsi"
                  >
                    {{ rpp.deskripsi.length }}/500
                  </blockquote>
                </v-col>
                <v-col cols="12" sm="12" md="4" lg="4" xl="4">
                  <span class="font-weight-bold black--text">Jenjang</span>
                  <span class="error--text">&nbsp;*</span>
                  <v-autocomplete
                    outlined
                    dense
                    v-model="rpp.jenjang"
                    :items="itemJenjangs"
                    item-value="id"
                    item-text="nama"
                    no-data-text="Data Tidak Tersedia"
                    @change="changeJenjang(rpp.jenjang)"
                    placeholder="Pilih Jenjang"
                    name="Jenjang"
                    data-vv-name="jenjang"
                    data-vv-as="Jenjang"
                    v-validate="'required'"
                    :error-messages="errors.collect('form.jenjang')"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="12" md="4" lg="4" xl="4">
                  <span class="font-weight-bold black--text"
                    >Tingkat / Kelas</span
                  >
                  <span class="error--text">&nbsp;*</span>
                  <v-autocomplete
                    outlined
                    dense
                    v-model="rpp.tingkat"
                    :items="itemTingkats"
                    item-value="id"
                    item-text="nama"
                    placeholder="Pilih Tingkat"
                    name="Tingkat"
                    :disabled="!rpp.jenjang"
                    @change="changeTingkat(rpp.tingkat)"
                    data-vv-name="tingkat"
                    data-vv-as="Tingkat"
                    v-validate="'required'"
                    :error-messages="errors.collect('form.tingkat')"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="12" md="4" lg="4" xl="4">
                  <span class="font-weight-bold black--text"
                    >Mata Pelajaran</span
                  >
                  <span class="error--text">&nbsp;*</span>
                  <v-autocomplete
                    outlined
                    dense
                    v-model="rpp.mata_pelajaran"
                    :items="itemMapels"
                    :disabled="!rpp.tingkat"
                    item-value="id"
                    item-text="nama"
                    placeholder="Pilih Mata Pelajaran"
                    name="Mata Pelajaran"
                    data-vv-name="mapel"
                    data-vv-as="Mata Pelajaran"
                    v-validate="'required'"
                    :error-messages="errors.collect('form.mapel')"
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
                    v-model="rpp.tags"
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
                    >Lampiran Berkas</span
                  >
                  <span class="error--text">&nbsp;*</span>
                  <p v-if="edit && rpp.file">
                    Berkas :
                    <a :href="rpp.file.url_lampiran" target="_blank">
                      {{ pVal(rpp.file, "filename") }}
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
                      v-validate="edit ? '' : 'required'"
                      :error-messages="errors.collect('form.file')"
                      outlined
                      dense
                    ></v-file-input>
                    <p class="error--text" v-if="errorType">
                      Tipe berkas Anda tidak memenuhi syarat. ({{ file.type }})
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
                  <!-- <v-alert
                    class="grey lighten-4 my-2 mt-5"
                    border="right"
                    colored-border
                    icon="mdi-alert"
                    type="info"
                    elevation="2"
                  >
                    <ol>
                      <li>Berkas dibuat dalam bentuk PDF</li>
                      <li>Nama berkas Rencana Pembelajaran_judul_kelas</li>
                      <li>Ukuran berkas maksimal {{maxSize}} MB</li>
                      <li>
                        Hal Hal yang perlu disertakan dalam file yang akan diunggah:
                        <ul>
                          <li>Nama pembuat Rencana Pembelajaran</li>
                          <li>Nama Sekolah/Instansi pembuat Rencana Pembelajaran</li>
                          <li>Surel pembuat Rencana Pembelajaran</li>
                          <li>Rencana Pembelajaran untuk jenjang dan kelas</li>
                          <li>Topik Rencana Pembelajaran</li>
                        </ul>
                      </li>
                    </ol>
                  </v-alert>-->

                  <v-checkbox
                    v-model="setuju"
                    class="mx-2"
                    dense
                    name="setuju"
                    label="Saya sudah membaca dan mengikuti lembar panduan berbagi RPP"
                    data-vv-name="setuju"
                    data-vv-as="Persetujuan"
                    v-validate="'required'"
                    :error-messages="errors.collect('form.setuju')"
                  ></v-checkbox>
                  <!-- <span class="pl-5 ml-5">
                      <router-link
                        class="blue--text text--darken-4"
                        :to="{name:'faq'}"
                      >Tautan Panduan Berbagi RPP</router-link>
                  </span>-->
                  <v-divider></v-divider>
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
      rend: 1,
      autofocus: false,
      message: "",
      cropperOutputMime: "image/jpeg",
      randomImg: "sqwea12",
      url: null,
      rpp: {
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
      itemJenises: ["daring", "luring", "kombinasi"],
      itemJenjangs: [],
      itemTingkats: [],
      itemMapels: [],
      itemTags: [],
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
      }
    };
  },
  mounted() {},
  methods: {
    // eslint-disable-next-line
    open(obj) {
      this.rend = this.rend + 1;
      this.loadJenjang();
      this.loadTag();
      (this.file = null),
        (this.rpp = obj
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
          this.rpp.jenjang = obj.mapel[0].term_id;
          this.rpp.tingkat = obj.mapel[1].term_id;
          this.rpp.mata_pelajaran = obj.mapel[2].term_id;
        }
      } else {
        this.url =
          "https://cdn.siap.id/s3/asset illustrasi/Illustrasi/bg-default.png";
      }
      this.errorType = false;
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

    addTag(tag) {
      this.duplicateTag = false;

      var a = _.includes(this.itemTags, tag);

      if (!a) {
        this.newTag = null;
        // this.rpp.tags.push(tag);
        this.itemTags.push(tag);
      } else {
        this.duplicateTag = true;
      }
    },
    loadTag() {
      this.$store
        .dispatch("rpp/getTag", {})
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
          if (this.size <= this.maxSize && !this.errorType) {
            this.rpp.file = this.file;
            this.rpp.cover = this.cover;
            return this.$store
              .dispatch("rpp/form", {
                obj: this.rpp
              })
              .then(res => {
                if (res.error) {
                  this.$error("Simpan RPP gagal");
                } else {
                  this.$info("Simpan RPP Berhasil");
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
        if (
          this.file.type == "application/pdf" ||
          this.file.type == "application/x-pdf"
        ) {
          this.errorType = false;
        } else {
          this.errorType = true;
        }
        this.size = (this.file.size / 1000000).toFixed(2);
      }
    }
  }
};
</script>
