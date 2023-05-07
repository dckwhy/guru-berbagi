<template>
  <m-dialog ref="dlg">
    <template v-slot:action>
      <v-toolbar-items>v-on="on"
          <template v-slot:activator="{ on }">
          <v-btn  text @click="save(0)">Tolak
            <v-icon class="ml-2">mdi-close-outline</v-icon>
          </v-btn>
          </template>
          <span>Tolak</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
          <v-btn  text @click="save(1)">Setujui
            <v-icon class="ml-2">mdi-check-outline</v-icon>
          </v-btn>
          </template>
          <span>Setujui</span>
        </v-tooltip>
      </v-toolbar-items>
    </template>
    <slot :item="obj"></slot>
  </m-dialog>
</template>

<script>
export default {
  props: {
    api: {
      type: String,
      default: null
    },
    onVerval: {
      type: Function,
      default: ()=>null,
    }
  },
  data: () => ({
    obj: null
  }),
  methods: {
    open(o) {
      this.obj = o ? { ...o } : {};
      return this.$refs.dlg.open(o);
    },
    // eslint-disable-next-line
    save(i) {
      //   this.$emit("save", i);
      if (!this.onVerval) return;
      this.onVerval(i, this.obj)
        .then(() => this.$refs.dlg.resolve())
        .catch(e => e);
    }
  }
};
</script>

<style>
</style>
