<template>
  <m-dialog
    ref="dlg"
    :btnsave="false"
    :title="bantuan && bantuan.id ? 'Jawab' : 'Jawab'"
  >
    <v-row row wrap justify="center" align="center" v-if="bantuan">
      <v-col cols="12" sm="10" md="8" lg="8" xl="8">
        <v-card tile>
          <v-toolbar color="primary" dark flat>
            <v-col cols="2"></v-col>
            <v-col cols="12">
              <v-toolbar-title class="white--text">{{
                pVal(bantuan, "judul")
              }}</v-toolbar-title>
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
                <v-col cols="12">
                  <span>{{ pertanyaan }}</span>
                </v-col>
                <v-col cols="12">
                  <span class="font-weight-bold primary--text">Jawaban</span>
                  <span class="error--text">&nbsp;*</span>
                  <editor
                    :key="rend"
                    :initialValue="jawaban"
                    ref="editorRef"
                    v-model="content"
                    api-key="0iu1x8uuavwjanzbn1wut0ont7pbtanoag9mrfd9nhfnroba"
                    :init="options"
                  />
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
import axios from "axios";
import { API } from "@/const";
import { MAX_UPLOAD_SIZE } from "@/const";
import Editor from "@tinymce/tinymce-vue";

export default {
  $_veeValidate: {
    validator: "new"
  },
  components: {
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
      bantuan: {},
      pertanyaan: "",
      jawaban: "",
      edit: false,
      file: null,
      name: "",
      type: "",
      size: 0,
      text: "",
      maxSize: MAX_UPLOAD_SIZE,
      errorType: false,
      accepts: ["application/pdf"].join(","),
      itemJenjangs: null,
      itemTingkats: null,
      itemMapels: null,
      defRpp: {
        nama: null
      }
    };
  },
  mounted() {},
  methods: {
    // eslint-disable-next-line
    open(obj) {
      this.rend = this.rend + 1;
      this.pertanyaan = obj && obj.pesan ? obj.pesan : "-";
      this.bantuan = { ...obj };
      if (obj && obj.jawab) {
        this.jawaban = obj.jawab.pesan;
      }
      this.$validator.reset();
      let x = this.$refs.dlg.open();
      return x;
    },
    save() {
      this.$validator
        .validateAll("form")
        .then(res => {
          if (!res) return Promise.reject();
          return res;
        })
        .then(() => {
          var jawaban = null;
          if (this.bantuan.jawab) {
            jawaban = {
              jawaban_id: this.bantuan.jawab.id,
              pesan: this.bantuan.pesan,
              proses: "update"
            };
          } else {
            jawaban = {
              pesan_id: this.bantuan.id,
              pesan: this.bantuan.pesan,
              proses: "baru"
            };
          }

          return this.$store
            .dispatch("bantuan/jawab", {
              obj: jawaban
            })
            .then(res => {
              if (res.error) {
                this.$error("Simpan Data gagal");
              } else {
                this.$info("Simpan Data Berhasil");
                this.$refs.dlg.resolve();
                return res;
              }
            });
        })

        .catch(e => e);
    }
  },
  watch: {
    content(n) {
      this.jawaban = n;
    }
  }
};
</script>
