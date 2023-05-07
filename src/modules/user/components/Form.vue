<template>
  <m-dialog
    ref="dlg"
    :btnsave="false"
    :title="user && user.id ? 'Ubah Profil' : 'Tambah Profil'"
  >
    <v-row row wrap justify="center" align="center" class="pt-3">
      <v-col cols="12" sm="10" md="8" lg="7" xl="7">
        <v-row>
          <v-card tile>
            <v-toolbar color="primary" dark flat>
              <v-col cols="2"></v-col>
              <v-col class="d-flex justify-space-around">
                <v-toolbar-title class="white--text"
                  >Profil Anda</v-toolbar-title
                >
              </v-col>
              <v-col cols="2" class="d-flex justify-end"></v-col>
            </v-toolbar>
            <v-card-text>
              <v-row wrap>
                <v-col
                  cols="12"
                  sm="4"
                  md="4"
                  lg="4"
                  xl="4"
                  class="d-flex justify-space-around"
                >
                  <v-avatar :size="120" color="grey lighten-4">
                    <img
                      :src="
                        user.file_foto
                          ? user.file_foto
                          : 'img/avatar-default.png'
                      "
                      alt="avatar"
                    />
                  </v-avatar>
                </v-col>
                <v-col cols="12" sm="8" md="8" lg="8" xl="8">
                  <v-form @submit.prevent data-vv-scope="form" lazy-validation>
                    <v-row wrap>
                      <v-col cols="12" sm="12" md="6" lg="6" class="py-0">
                        <label class="caption mb-2 primary--text"
                          >Nama Lengkap</label
                        >
                        <v-text-field
                          autofocus
                          dense
                          disabled
                          single-line
                          outlined
                          label="Nama lengkap*"
                          v-model="user.name"
                          hint="Masukkan Nama Lengkap Anggota"
                          data-vv-name="name"
                          data-vv-as="Nama Lengkap"
                          v-validate="'required'"
                          :error-messages="errors.collect('form.name')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="6" lg="6" class="py-0">
                        <label class="caption mb-2 primary--text"
                          >Alamat Surel</label
                        >
                        <v-text-field
                          dense
                          disabled
                          single-line
                          outlined
                          label="Surel*"
                          v-model="user.email"
                          hint="Masukkan Surel Anggota"
                          data-vv-name="email"
                          data-vv-as="Surel"
                          v-validate="'required|email'"
                          :error-messages="errors.collect('form.email')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="6" lg="6" class="py-0">
                        <label class="caption mb-2 primary--text"
                          >Profesi</label
                        >
                        <v-text-field
                          dense
                          disabled
                          single-line
                          outlined
                          label="Profesi*"
                          v-model="user.profesi"
                          hint="Masukkan Profesi Anggota"
                          data-vv-name="profesi"
                          data-vv-as="Profesi"
                          v-validate="''"
                          :error-messages="errors.collect('form.profesi')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="6" lg="6" class="py-0">
                        <label class="caption mb-2 primary--text"
                          >Organisasi</label
                        >
                        <v-text-field
                          dense
                          disabled
                          single-line
                          outlined
                          label="Organisasi*"
                          v-model="user.organisasi"
                          hint="Masukkan Organisasi Anggota"
                          data-vv-name="organisasi"
                          data-vv-as="Organisasi"
                          v-validate="''"
                          :error-messages="errors.collect('form.organisasi')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12" lg="6" class="py-0">
                        <label class="caption mb-2 primary--text">
                          Nomor Telp
                          <span class="error--text">
                            *
                            <v-chip color="green white--text my-2" label x-small
                              >Baru</v-chip
                            >
                          </span>
                        </label>
                        <v-text-field
                          dense
                          single-line
                          outlined
                          label="Nomor Selular"
                          v-model="user.no_hp"
                          hint="Masukkan Nomor Selular"
                          data-vv-name="no_hp"
                          data-vv-as="Nomor Selular"
                          v-validate="'required|numeric|min:6|max:14'"
                          :error-messages="errors.collect('form.no_hp')"
                          :autocomplete="false"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                        lg="6"
                        class="py-0"
                        v-show="false"
                      >
                        <label class="caption mb-2 primary--text">
                          Surel Alternatif
                          <span class="error--text">
                            *
                            <v-chip color="green white--text my-2" label x-small
                              >Baru</v-chip
                            >
                          </span>
                        </label>
                        <v-text-field
                          dense
                          single-line
                          outlined
                          label="Surel Alternatif"
                          v-model="user.alt_email"
                          hint="Masukkan Surel Alternatif"
                          data-vv-name="alt_email"
                          data-vv-as="Surel Alternatif"
                          v-validate="''"
                          :error-messages="errors.collect('form.alt_email')"
                          :autocomplete="false"
                        ></v-text-field>
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
import { KELAMIN } from "@/const";
export default {
  $_veeValidate: {
    validator: "new"
  },

  data() {
    return {
      user: {},
      defUser: {
        name: null,
        email: "",
        no_hp: null,
        kelamin: "L"
      },
      KELAMIN: KELAMIN
    };
  },
  methods: {
    // eslint-disable-next-line
    open(obj) {
      // this.user = obj
      //   ? { ...obj }
      //   : { ...this.defUser, organisasi: [], showAtribut: false };
      // this.user.user_id
      //   ? (this.loadAtributUser(obj), (this.organisasi = obj.organisasi))
      //   : Promise.resolve;
      // let x = this.$refs.dlg.open();
      // this.$validator.reset();
      // this.isReset = true;
      // this.$nextTick(() => {
      //   this.isReset = false;
      // });
      // return x;
      this.$validator.reset();
      this.user = obj
        ? { ...obj }
        : { ...this.defUser, organisasi: [], showAtribut: false };
      return this.$refs.dlg.open();
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
          return this.$store.dispatch("user/update", this.user).then(res => {
            if (res.error) {
              this.$error("Profil komunitas gagal diperbarui");
            } else {
              this.$info("Profil komunitas berhasil diperbarui");
              this.$refs.dlg.resolve();
              return res;
            }
          });
        })

        .catch(e => e);
    }
  }
};
</script>
