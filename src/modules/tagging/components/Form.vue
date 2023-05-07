<template>
  <m-dialog
    ref="dlg"
    @save="save"
    :title="
      tagging && tagging.tagging_id ? 'Ubah Kata Kunci' : 'Tambah Kata Kunci'
    "
  >
    <v-container>
      <v-form @submit.prevent data-vv-scope="form" lazy-validation>
        <v-row row wrap justify="center" align="center">
          <v-col cols="12" sm="12" md="8" lg="8" xl="8">
            <span class="font-weight-bold primary--text">Nama Kata Kunci</span>
            <span class="error--text">&nbsp;*</span>
            <v-text-field
              outlined
              dense
              v-model="tagging.nama"
              placeholder="Isikan Nama tag"
              hint="Masukkan nama tag"
              data-vv-name="tagging"
              data-vv-as="Tagging"
              v-validate="'required'"
              :error-messages="errors.collect('form.tagging')"
            ></v-text-field>
          </v-col>
          <!-- <v-col cols="12" sm="12" md="8" lg="8" xl="8">
            <span class="font-weight-bold primary--text">Tipe</span>
            <span class="error--text">&nbsp;*</span>
            <v-select
              outlined
              dense
              :items="taxonomy"
              v-model="tagging.taxonomy_id"
              data-vv-name="taxonomy"
              placeholder="Tipe Kata Kunci"
              data-vv-as="Tipe"
              item-text="keterangan"
              item-value="id"
              v-validate="'required'"
              :error-messages="errors.collect('form.taxonomy')"
            ></v-select>
          </v-col>-->
          <v-col cols="12" sm="12" md="8" lg="8" xl="8">
            <span class="font-weight-bold primary--text">Deskripsi</span>
            <span class="error--text">&nbsp;*</span>
            <v-text-field
              outlined
              dense
              autofocus
              placeholder="Isikan Deskripsi Singkat Tagging"
              hint="Deskripsi maksimal 50 karakter"
              persistent-hint
              v-model="tagging.deskripsi"
              data-vv-name="deskripsi"
              data-vv-as="Deskripsi"
              v-validate="'required|max:50'"
              :error-messages="errors.collect('form.deskripsi')"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </m-dialog>
</template>

<script>
export default {
  $_veeValidate: {
    validator: "new"
  },

  data() {
    return {
      tagging: {},
      taxonomy: [
        {
          id: 1,
          keterangan: "Mata Pelajaran"
        },
        {
          id: 2,
          keterangan: "Jenjang"
        },
        {
          id: 3,
          keterangan: "Tingkat"
        }
      ],
      defTag: {
        nama: null
      }
    };
  },
  mounted() {},
  methods: {
    // eslint-disable-next-line
    open(obj) {
      this.$validator.reset();
      this.tagging = obj ? { ...obj } : { ...this.defTag };
      return this.$refs.dlg.open();
    },
    save() {
      this.$validator
        .validateAll("form")
        .then(res => {
          if (!res) return Promise.reject();
          return res;
        })
        .then(() => {
          this.tagging.slug = this.tagging.nama;
          this.tagging.taxonomy_id =
            this.$router.currentRoute.name == "tagging.matapelajaran"
              ? 1
              : this.$router.currentRoute.name == "tagging.jenjang"
              ? 2
              : 3;
          return this.$store
            .dispatch("tagging/form", { obj: this.tagging })
            .then(res => {
              if (res && res.error) {
                this.$error("Terjadi Kesalahan Sistem");
              } else {
                this.$info("Simpan Data Berhasil");
                this.$refs.dlg.resolve();
                this.$router.push({ name: this.$router.currentRoute.name });
                return res;
              }
            });
        })

        .catch(e => e);
    }
  }
};
</script>
