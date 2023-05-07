<template>
  <div>
    <v-form ref="fr" lazy-validation>
      <v-layout row class="pa-0">
        <v-img v-if="file_url"
          height="150"
          :src="file_url"
          contain
          style="cursor:pointer"
          @click="browseImg"
        ></v-img>
      </v-layout>
      <v-layout column class="py-2 px-4">
        <v-text-field v-if="options.description" v-model="description" label="Keterangan"></v-text-field>
      </v-layout>
      <v-layout wrap :justify-center="true">
        <v-btn :disabled="uploading" color="success" @click="browseImg" class="mx-0">
          <v-icon small class="mr-2">mdi-folder-open</v-icon>F
        </v-btn>
      </v-layout>
    </v-form>
    <input
      type="file"
      :accept="options.mime"
      :multiple="false"
      ref="file"
      @change="onFileChange"
      style="display:none"
    >
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  $_veeValidate: {
    validator: "new"
  },
  props: {
    isReset: {
      default: false,
    }
  },
  data() {
    return {
      file_blob: null,
      file_val: null,
      uploading: false,
      file_url: null,
      description: null,
      options: {},
      defOptions: {
        id: null,
        category: false,
        preview: true,
        description: false,
        mime: "*",
        module: null,
        title: "Upload File"
      }
    };
  },
  mounted() {},
  computed: {
    isPreview() {
      return this.file_val && this.file_val.type.indexOf("image/") >= 0;
    }
  },
  methods: {
    // eslint-disable-next-line
    open(obj = {}) {
      this.$refs.file.value = null;
      this.file_blob = null;
      this.file_val = null;
      this.description = null;
      this.file_url = null;

      this.$validator.reset();
      this.options = { ...this.defOptions, ...obj };
      return this.$refs.dlg.open();
    },
    reset(){
       this.$refs.file.value = null;
      this.file_blob = null;
      this.file_val = null;
      this.description = null;
      this.file_url = null;

      this.$validator.reset();
    },
    save() {
      this.$validator
        .validateAll()
        .then(res => {
          if (!res) return Promise.reject();
          return res;
        })
        .then(() => {
          this.uploading = true;
          let obj = {
            file: this.file_val
          };
          if (this.options.id) obj.id = this.options.id;
          if (this.options.description) obj.keterangan = this.description;

          // return this.$store.dispatch(this.options.module, obj)
          //   .then(res => {
          //     this.uploading = false
          //     return res
          //   })
          //   .catch(() => {
          //     this.uploading = false
          //     return Promise.reject()
          //   })
        })
        .then(res => {
          this.$success("Foto berhasil di upload");
          // this.$refs.dlg.resolve();
          return res;
        })
        .catch(e => e);
    },
    onFileChange(e) {
      let fl = e.target.files ? e.target.files[0] : null;
      if (fl) {
        this.file_val = fl;
        let fr = new FileReader();
        fr.addEventListener("load", () => {
          this.file_url = fr.result;
        });
        fr.readAsDataURL(fl);
      }
      this.$emit("getFile", this.file_val);
    },
    browseImg() {
      this.$refs.file.click();
    }
  },
  watch: {
    isReset(x){
      if(x){
        this.reset()
      }
    }
  }
};
</script>
