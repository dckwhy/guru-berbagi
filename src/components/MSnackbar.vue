<template>
  <v-snackbar
    multi-line
    v-model="snackbar.value"
    right
    top
    :timeout="snackbar.type == 'reload' ? 0 : 4000"
    :color="
      snackbar.type == 'error'
        ? 'red'
        : snackbar.type == 'reload'
        ? 'blue'
        : 'success'
    "
  >
    <v-icon v-if="snackbar.type == 'error'" color="red" class="mr-3"
      >mdi-alert-circle</v-icon
    >
    <v-icon v-else color="white" class="mr-3">mdi-information</v-icon>
    <span v-html="snackbar.text"></span>
    <v-btn
      v-if="snackbar.type == 'reload'"
      text
      @click="
        () => {
          dismiss();
          if (snackbar.item.event && typeof snackbar.item.event === 'function')
            snackbar.item.event();
        }
      "
      >Muat Ulang</v-btn
    >
    <v-btn v-else text @click="snackbar.value = false">Tutup</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  data: () => ({
    snackbar: {
      value: false,
      text: "",
      type: "success",
      cls: "black--text",
      item: null
    }
  }),
  methods: {
    // eslint-disable-next-line
    open(type, message, obj) {
      this.snackbar.text = message;
      this.snackbar.value = true;
      this.snackbar.type = type;
      this.snackbar.cls = `${type}--text`;
      this.snackbar.item = obj;
    },
    error(message, obj) {
      this.open("error", message, obj);
    },
    info(message, obj) {
      this.open("info", message, obj);
    },
    success(message, obj) {
      this.open("success", message, obj);
    },
    warning(message, obj) {
      this.open("warning", message, obj);
    },
    reload(message, obj) {
      this.open("reload", message, obj);
    },
    dismiss() {
      this.snackbar.value = false;
    }
  }
};
</script>

<style></style>
