<template>
  <v-dialog
    v-model="dialog"
    scrollable
    persistent
    :fullscreen="fullscreen"
    max-width="800"
    transition="dialog-bottom-transition"
    :retain-focus="false"
    eager
  >
    <v-card>
      <v-toolbar dark color="primary" class="elevation-0" max-height="60">
        <v-btn
          text
          icon
          @click="(dialog = false), $emit('updatelock')"
          v-if="step == 0"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-btn
          text
          icon
          @click="
            step--;
            $emit('step', step);
          "
          v-else
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <slot name="action" v-if="action && fullscreen && btnsave" :step="step">
          <v-toolbar-items>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  :loading="loading"
                  :disabled="!ready"
                  v-on="on"
                  text
                  @click="save"
                >
                  Simpan
                  <v-icon class="ml-2">mdi-content-save</v-icon>
                </v-btn>
              </template>
              <span>Simpan</span>
            </v-tooltip>
          </v-toolbar-items>
        </slot>
      </v-toolbar>
      <v-card-text>
        <slot name="container" :ready="ready">
          <v-container grid-list-lg :class="{ 'pa-0': !withPadding }">
            <slot :ready="ready"></slot>
          </v-container>
        </slot>
      </v-card-text>
      <v-divider v-if="action && !fullscreen"></v-divider>
      <slot name="card-action">
        <v-card-actions
          v-if="action && !fullscreen"
          class="grey lighten-3 pa-3"
        >
          <slot name="action_bottom">
            <v-spacer></v-spacer>
            <v-btn v-if="!loading" @click="reject" text class="primary--text"
              >Batal</v-btn
            >
            <template v-slot:activator="{ on }">
              <v-btn
                :loading="loading"
                :disabled="!ready"
                v-on="on"
                @click="save"
                class="primary"
              >
                <v-icon class="mr-2">mdi-save</v-icon>Simpan
              </v-btn>
            </template>
          </slot>
        </v-card-actions>
      </slot>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    ready: {
      default: true
    },
    btnsave: {
      default: true
    },
    loading: {
      default: false
    },
    action: {
      default: true
    },
    fullscreen: {
      default: true
    },
    withPadding: {
      default: true
    }
  },
  mounted() {},
  data() {
    return {
      dialog: false,
      res: null,
      rej: null,

      step: 0
    };
  },
  methods: {
    open() {
      this.step = 0;
      return new Promise((resolve, reject) => {
        this.res = resolve;
        this.rej = reject;

        this.dialog = true;
      });
    },
    reject() {
      this.dialog = false;
    },
    resolve(res) {
      this.rej = null;
      this.res(res);
      this.dialog = false;
    },
    save() {
      this.$emit("save");
    },

    next() {
      this.step++;
      this.$emit("step", this.step);
    },
    prev() {
      this.step--;
      if (this.step < 0) this.step = 0;
      this.$emit("step", this.step);
    }
  },
  watch: {
    dialog(n) {
      if (!n && this.rej) {
        //this.rej(null)
      }
    }
  }
};
</script>
