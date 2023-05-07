<template>
  <v-dialog
    v-model="dialog"
    :width="width"
    scrollable
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dense dark :color="color">
        <v-btn icon dark @click.native="dialog = false">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>{{title}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items></v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-layout column>
          <component :is="comp" ref="global_form">
            <slot v-bind:entity="entity"></slot>
          </component>
        </v-layout>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <slot name="footer" v-bind:act="act">
          <v-btn text @click="dialog = false">Batal</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="save">Simpan</v-btn>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    module: {
      type: String,
      default: '',
    },
    width: {
      type: Number,
      default: 500,
    },
    color: {
      type: String,
      default: 'primary'
    },
    form: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      entity: {},
      dialog: false,
      resolve: null,
      reject: null,
    };
  },
  computed: {
    act() {
      return { save: this.save, close: this.close }
    },
    comp() {
      return this.form ? 'v-form' : 'div'
    }
  },
  methods: {
    open(obj) {
      if (this.form && this.$refs.global_form)
        this.$refs.global_form.resetValidation()

      let o = {}
      if (obj) {
        Object.assign(o, obj)
      }
      this.entity = o

      this.dialog = true
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    save() {
      if (this.form && !this.$refs.global_form.validate())
        return

      // eslint-disable-next-line
      let ap = this.entity.id ? 'update' : 'store'
      this.$store.dispatch(`${this.module}/${ap}`, this.entity)
        .then(res => {
          this.resolve(res)
          this.reject = null
          this.dialog = false
        })
        .catch(err => {
          this.reject(err)
        })
    },
    resolveClose(res) {
      this.reject = null
      this.resolve(res)
      this.dialog = false
    },
    close() {
      if (this.form)
        this.$refs.global_form.resetValidation()
      this.dialog = false
    }
  },
  watch: {
    dialog(n) {
      if (!n && this.reject) {
        this.reject(null)
      }
    }
  }
};
</script>
