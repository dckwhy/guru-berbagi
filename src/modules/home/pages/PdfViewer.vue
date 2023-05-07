<template>
  <div class="text-center">
    <v-dialog scrollable v-model="dialog" ref="dlgPdf" width="850">
      <template v-slot:activator="{}"></template>
      <v-card>
        <v-toolbar dark color="primary" class="elevation-0" max-height="60"
          >{{ title }}<v-spacer></v-spacer
          ><v-icon @click="dialog = false">mdi-close</v-icon></v-toolbar
        >
        <v-card-text>
          <pdf v-for="i in numPages" :key="i" :src="src" :page="i"></pdf
        ></v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import pdf from "vue-pdf";

var loadingTask = pdf.createLoadingTask(
  "https://cdn.siap.id/s3/guruberbagi/docs/SOP%20Berbagi%20RPP.pdf"
);

export default {
  components: {
    pdf
  },
  data() {
    return {
      title: "Dokumen SOP",
      dialog: false,
      currentPage: 0,
      src: loadingTask,
      numPages: undefined
    };
  },
  mounted() {
    this.src.promise.then(pdf => {
      this.numPages = pdf.numPages;
    });
  },
  methods: {
    // eslint-disable-next-line
    open(title, url) {
      this.title = title;
      this.url = url;
      this.src = pdf.createLoadingTask(url);
      this.dialog = true;
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
        this.dialog = true;
      });
    }
  }
};
</script>
