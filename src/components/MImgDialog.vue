<template>
  <v-layout row justify-center>
    <v-dialog
      scrollable
      v-model="dialog"
      width="800"
      transition="dialog-bottom-transition"
    >
      <v-card class="ra-0" fill-height>
        <v-toolbar light color="secondary" class="elevation-0">
          <v-btn v-if="!uploading" icon @click.native="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>{{title}}</v-toolbar-title>
        </v-toolbar>
        <v-card-text class="pa-0">
          <v-layout row class="pa-0" v-if="options.preview">
            <v-img
              v-if="img_url"
              aspec-ratio="1.7"
              height="300"
              :src="img_url"
              class="grey darken-4"
              contain
              style="cursor:pointer"
              @click="browseImg"
            ></v-img>
          </v-layout>
          <v-layout column v-else>
            <v-list v-if="file_val">
              <v-list-item avatar>
                <v-list-item-avatar>
                  <v-icon>attach_file</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{file_val.name}}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action v-if="false">
                  <v-btn icon>
                    <v-icon>delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-layout>
          <v-layout column class="py-2 px-4">
            <v-text-field
              v-if="options.category"
              v-model="category"
              label="Kategori"
            ></v-text-field>
            <v-text-field
              v-if="options.description"
              v-model="description"
              label="Keterangan"
            ></v-text-field>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-btn v-if="!uploading" text @click="browseImg">Browse</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="!file_val || uploading"
            :loading="uploading"
            @click="submit"
            text
            color="primary"
          >Upload</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <input
      type="file"
      :accept="options.mime"
      :multiple="false"
      ref="file"
      @change="onFileChange"
      style="display:none"
    >
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      title: 'Upload Gambar',
      dialog: false,
      resolve: null,
      reject: null,

      file_blob: null,
      file_val: null,
      uploading: false,
      img_url: null,

      id: null,
      func: null,
      collection: null,
      description: null,
      category: null,

      options: {},
      defOptions: {
        desc: false,
        category: false,
        preview: true,
        mime: "image/*"
      }
    }
  },
  methods: {
    open({ title, func, collection, id, img, options = {} }) {
      this.title = title
      this.file_blob = null
      this.file_val = null
      this.id = id
      this.func = func
      this.category = null
      this.description = null
      this.collection = collection
      this.img_url = img || '/img/camera.jpg'
      this.options = { ...this.defOptions, ...options }
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject

        this.dialog = true
      })
    },
    onFileChange(e) {
      let fl = e.target.files ? e.target.files[0] : null;
      if (fl) {
        this.file_val = fl
        let fr = new FileReader()
        fr.addEventListener('load', () => {
          this.img_url = fr.result
        })
        fr.readAsDataURL(fl)
      }
    },
    browseImg() {
      this.$refs.file.click();
    },
    submit() {
      this.uploading = true
      this.$store.dispatch(this.func, {
        id: this.id,
        collection: this.collection,
        description: this.description,
        category: this.category,
        file: this.file_val,
      })
        .then(res => {
          this.resolve(res)
          this.dialog = false
          this.uploading = false
        })
        .catch(() => {
          this.uploading = false
        })
    }
  },
  watch: {
    dialog(n) {
      if (!n) this.reject()
    }
  }
}
</script>

<style>
</style>
