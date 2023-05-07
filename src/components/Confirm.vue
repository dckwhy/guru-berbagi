<template>
  <v-dialog
    persistent
    v-model="dialog"
    :max-width="options.width"
    @keydown.esc="cancel()"
  >
    <v-toolbar dark :color="options.color" dense>
      <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
    </v-toolbar>
    <v-card tile>
      <v-card-text class="pt-5">
        <span v-if="message" v-html="message"></span>
        <v-form @submit.prevent data-vv-scope="form" lazy-validation>
          <v-select
            v-if="options.organisasi"
            v-model="organisasi"
            :items="options.organisasi"
            label="Organisasi"
            item-text="nama"
            item-value="no_reg"
            v-validate="'required'"
            data-vv-name="organisasi"
            data-vv-as="organisasi"
            :error-messages="errors.collect('form.organisasi')"
          ></v-select>
          <v-select
            v-if="options.role"
            v-model="role"
            :items="options.role"
            label="Pilih Peran"
            item-text="name"
            item-value="id"
            v-validate="'required'"
            data-vv-name="role"
            data-vv-as="Peran"
            :error-messages="errors.collect('form.role')"
          ></v-select>
          <v-select
            v-if="options.tenant"
            v-model="tenant"
            :items="options.tenant"
            label="Pilih"
            item-text="name"
            item-value="id"
            v-validate="'required'"
            data-vv-name="tenant"
            data-vv-as="Tenant"
            :error-messages="errors.collect('form.tenant')"
          ></v-select>
          <v-autocomplete
            v-if="options.mapel"
            v-model="mapel"
            chips
            small-chips
            multiple
            clearable
            deletable-chips
            :items="options.mapel"
            label="Mapel"
            item-text="nama"
            item-value="nama"
            v-validate="''"
            data-vv-name="mapel"
            data-vv-as="Mapel"
            :error-messages="errors.collect('form.mapel')"
          ></v-autocomplete>
          <v-textarea
            v-if="options.keterangan"
            class="mt-2"
            :label="options.keterangan.label || 'Keterangan'"
            :rows="4"
            filled
            v-model="keterangan"
            :hint="options.keterangan.hint"
            persistent-hint
          ></v-textarea>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <template v-if="options.okOnly">
          <v-btn text :color="options.color + ' darken-1'" @click.native="agree"
            >OK</v-btn
          >
        </template>
        <template v-if="options.cancelOnly">
          <v-btn
            text
            :color="options.color + ' darken-1'"
            @click.native="cancel"
            >Keluar</v-btn
          >
        </template>
        <template v-else>
          <v-btn text @click.native="cancel">Tidak</v-btn>
          <v-btn text :color="options.color + ' darken-1'" @click.native="agree"
            >Ya</v-btn
          >
        </template>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      resolve: null,
      reject: null,
      message: null,
      title: null,
      keterangan: null,
      organisasi: null,
      role: null,
      tenant: null,
      mapel: [],
      options: {}
    };
  },
  methods: {
    open(message, options = {}, title, obj) {
      this.$validator.reset();
      this.organisasi = [];
      this.role = [];
      this.mapel = [];
      this.keterangan = null;
      if (obj) {
        options.role.forEach(role => {
          if (role.id == obj.peran.id) {
            this.role = role;
          }
        });
        this.mapel = obj.mapel;
      }

      this.title = title || "Perhatian!";
      this.message = message;
      let def = {
        color: "primary",
        width: 600,
        okOnly: false
      };
      this.options = { ...def, ...options };
      // apply keterangan jika ada
      if (this.options.keterangan)
        this.keterangan = this.options.keterangan.data || "";

      this.dialog = true;
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    agree() {
      this.$validator
        .validateAll("form")
        .then(res => {
          if (!res) return Promise.reject();
          return res;
        })
        .then(() => {
          this.dialog = false;
          let resObj = {
            organisasi: this.organisasi,
            role: this.role,
            mapel: this.mapel,
            tenant: this.tenant,
            keterangan: this.keterangan
          };
          return this.resolve(resObj);
        })
        .catch(e => e);
    },
    cancel() {
      if (!this.dialog) return;
      this.reject(false);
      this.dialog = false;
    }
  }
};
</script>
