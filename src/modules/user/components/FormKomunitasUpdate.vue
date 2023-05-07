<template>
  <m-dialog ref="dlg" :btnsave="false" title="Ubah Profil Komunitas">
    <v-row row wrap justify="center" align="center" class="pt-3">
      <v-col cols="12" sm="10" md="8" lg="7" xl="7">
        <v-row>
          <v-card tile>
            <v-toolbar color="primary" dark flat>
              <v-col cols="2"></v-col>
              <v-col class="d-flex justify-space-around">
                <v-toolbar-title class="white--text"
                  >Profil Komunitas Anda</v-toolbar-title
                >
              </v-col>
              <v-col cols="2" class="d-flex justify-end"></v-col>
            </v-toolbar>
            <v-card-text>
              <v-row wrap>
                <v-col cols="12" sm="4" md="4" lg="4" xl="4">
                  <v-img
                    position="top center"
                    :src="url ? url : 'img/avatar-default.png'"
                    height="410"
                    contain
                  >
                    <v-btn
                      fab
                      depressed
                      small
                      color="pink"
                      style="position: absolute;right: 2px;top: 5px;"
                      id="pick-avatar-komunitas-update"
                    >
                      <v-icon color="white">mdi-camera</v-icon>
                    </v-btn>
                  </v-img>
                  <avatar-cropper
                    :key="99"
                    :upload-handler="cropperHandler"
                    trigger="#pick-avatar-komunitas-update"
                    :output-mime="cropperOutputMime"
                    :output-quality="0.8"
                    :labels="{ submit: 'Simpan', cancel: 'Hapus' }"
                  />
                </v-col>
                <v-col cols="12" sm="8" md="8" lg="8" xl="8">
                  <v-form @submit.prevent data-vv-scope="form" lazy-validation>
                    <v-row wrap>
                      <v-col cols="12" class="pb-0 mb-0">
                        <span class="primary--text"
                          >Nama Komunitas/Organisasi</span
                        >
                        <v-text-field
                          outlined
                          dense
                          color="primary"
                          background-color="white"
                          v-model="user.nama_komunitas"
                          data-vv-name="nama_komunitas"
                          data-vv-as="Nama Komunitas"
                          v-validate="'required'"
                          single-line
                          :error-messages="
                            errors.collect('form.nama_komunitas')
                          "
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" class="py-0 my-0">
                        <span class="primary--text">Deskripsi Komunitas</span>

                        <v-textarea
                          outlined
                          dense
                          placeholder=""
                          persistent-hint
                          v-model="user.deskripsi"
                          data-vv-name="deskripsi"
                          data-vv-as="Deskripsi"
                          v-validate="''"
                          :error-messages="errors.collect('form.deskripsi')"
                        ></v-textarea>
                      </v-col>
                      <v-col cols="12" sm="12" md="6" lg="6" class="py-0 my-0">
                        <span class="primary--text">Tipe Komunitas</span>

                        <v-select
                          v-model="user.tipe_komunitas_id"
                          :items="itemTipeKomunitas"
                          outlined
                          dense
                          placeholder="Pilih Tipe Komunitas"
                          persistent-hint
                          hint=""
                          item-text="keterangan"
                          item-value="id"
                          data-vv-name="tipe komunitas"
                          data-vv-as="Tipe Komunitas"
                          v-validate="'required'"
                          :error-messages="
                            errors.collect('form.tipe komunitas')
                          "
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="12" md="6" lg="6" class="py-0 my-0">
                        <span class="primary--text">Tanggal Berdiri</span>

                        <m-datepicker
                          dense
                          single-line
                          outlined
                          label="Tanggal Berdiri"
                          v-model="user.tanggal_berdiri"
                          hint="Tanggal Berdiri"
                          data-vv-name="tanggal"
                          data-vv-as="Tanggal Berdiri"
                          v-validate.persist="'required'"
                          :error-messages="errors.collect('form.tanggal')"
                        ></m-datepicker>
                      </v-col>
                      <v-col cols="12" sm="6" md="4" lg="4" class="py-0">
                        <span class="primary--text">Provinsi</span>

                        <v-autocomplete
                          dense
                          outlined
                          placeholder="Isikan Propinsi"
                          :items="itemProvinsis"
                          v-model="user.propinsi_id"
                          item-value="id"
                          item-text="keterangan"
                          @change="getKota(user.propinsi_id)"
                          data-vv-name="provinsi"
                          data-vv-as="Propinsi"
                          v-validate="'required'"
                          :error-messages="errors.collect('form.provinsi')"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12" sm="6" md="4" lg="4" class="py-0">
                        <span class="primary--text">Kota/Kabupaten</span>
                        <v-autocomplete
                          dense
                          outlined
                          placeholder="Isikan Kota/Kabupaten"
                          :items="itemKotas"
                          v-model="user.kota_id"
                          item-value="id"
                          item-text="keterangan"
                          data-vv-name="kota"
                          data-vv-as="Kota/Kabupaten"
                          v-validate="'required'"
                          :error-messages="errors.collect('form.kota')"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12" sm="6" md="4" lg="4" class="py-0 my-0">
                        <span class="primary--text">Kode Pos</span>
                        <v-text-field
                          outlined
                          dense
                          placeholder="Kode Pos"
                          color="primary"
                          background-color="white"
                          v-model="user.kode_pos"
                          data-vv-name="kode_pos"
                          data-vv-as="Kode Pos"
                          v-validate="'required|numeric'"
                          single-line
                          :error-messages="errors.collect('form.kode_pos')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" class="py-0 my-0">
                        <span class="primary--text">Alamat lengkap</span>

                        <v-textarea
                          outlined
                          dense
                          placeholder=""
                          persistent-hint
                          v-model="user.alamat"
                          data-vv-name="alamat"
                          data-vv-as="Alamat"
                          v-validate="''"
                          :error-messages="errors.collect('form.alamat')"
                        ></v-textarea>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" lg="6" class="py-0 my-0">
                        <span class="primary--text"
                          >Nomor Telepon Organisasi</span
                        >
                        <v-text-field
                          outlined
                          dense
                          color="primary"
                          background-color="white"
                          v-model="user.telp"
                          data-vv-name="no_telepon"
                          data-vv-as="Nomor Telepon"
                          v-validate="'required|numeric'"
                          single-line
                          :error-messages="errors.collect('form.no_telepon')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" lg="6" class="py-0 my-0">
                        <span class="primary--text">Website Organisasi</span>
                        <v-text-field
                          outlined
                          dense
                          color="primary"
                          background-color="white"
                          v-model="user.website"
                          data-vv-name="website"
                          data-vv-as="website"
                          v-validate="'required'"
                          single-line
                          :error-messages="errors.collect('form.website')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" lg="6" class="py-0 my-0">
                        <span class="primary--text"
                          >Akun Instagram organisasi</span
                        >
                        <v-text-field
                          outlined
                          dense
                          color="primary"
                          background-color="white"
                          v-model="user.ig"
                          data-vv-name="instagram"
                          data-vv-as="instagram"
                          v-validate="'required'"
                          single-line
                          :error-messages="errors.collect('form.instagram')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" lg="6" class="py-0 my-0">
                        <span class="primary--text">Akun FB organisasi</span>
                        <v-text-field
                          outlined
                          dense
                          color="primary"
                          background-color="white"
                          v-model="user.fb"
                          data-vv-name="facebooks"
                          data-vv-as="facebooks"
                          v-validate="'required'"
                          single-line
                          :error-messages="errors.collect('form.facebooks')"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        v-if="current_user && current_user.komunitas"
                      >
                        <p class="primary--text mb-0 pb-0">
                          Ruang Lingkup Komunitas
                        </p>
                        <v-chip
                          class="mx-1"
                          v-for="item in current_user.komunitas.lingkup"
                          :key="item.index"
                          >{{ item.keterangan }}</v-chip
                        >
                      </v-col>
                    </v-row>
                  </v-form>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="mr-4 mb-4" @click="save" color="primary"
                >SIMPAN</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </m-dialog>
</template>

<script>
import AvatarCropper from "vue-avatar-cropper";
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
      cover: null,
      user: {},
      defUser: {
        name: null,
        email: "",
        no_hp: null,
        kelamin: "L"
      },
      itemLingkups: [],
      itemTipeKomunitas: [],
      itemProvinsis: [],
      itemKotas: []
    };
  },
  methods: {
    // eslint-disable-next-line
    open(obj) {
      this.rend = this.rend + 1;

      this.getProvinsi();
      this.loadTipe();
      this.loadLingkup();
      this.$validator.reset();
      this.user = { ...obj.komunitas };
      // this.url = this.user.logo ? this.user.logo.url : null;
      this.getKota(this.user.propinsi_id);
      return this.$refs.dlg.open();
    },
    getProvinsi() {
      return this.$store
        .dispatch("user/getProvinsi", {
          params: {}
        })
        .then(res => {
          this.itemProvinsis = res;
        })
        .catch(e => e);
    },
    getKota(id) {
      return this.$store
        .dispatch("user/getKota", {
          id: id,
          params: {}
        })
        .then(res => {
          this.itemKotas = res;
        })
        .catch(e => e);
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
    loadTipe() {
      return this.$store
        .dispatch("user/getTipe")
        .then(res => {
          this.itemTipeKomunitas = res;
        })
        .catch(e => e);
    },
    loadLingkup() {
      return this.$store
        .dispatch("user/getLingkup")
        .then(res => {
          this.itemLingkups = res;
        })
        .catch(e => e);
    },
    // eslint-disable-next-line
    save() {
      this.$validator
        .validateAll("form")
        .then(res => {
          if (!res) return Promise.reject();
          return res;
        })
        .then(() => {
          this.user.cover = this.cover;
          return this.$store.dispatch("user/updateKomunitas", this.user);
        })
        .then(res => {
          this.$refs.dlg.resolve();
          return res;
        })
        .catch(e => e);
    }
  }
};
</script>
