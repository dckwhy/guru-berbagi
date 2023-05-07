<template>
  <!-- <v-flex xs12 layout justify-center v-if="loading">
    <v-progress-circular
      indeterminate
      color="primary lighten-2"
      class="mr-0"
      :size="150"
      :width="15"
    >
      <span class="font-weight-bold">Loading . . .</span>
    </v-progress-circular>
  </v-flex>-->
  <loading
    :active.sync="loading"
    loader="dots"
    :width="100"
    :height="100"
    color="#3F51B5"
    background-color="#EEEEEE"
    :z-index="999"
    :can-cancel="false"
    :is-full-page="fullPage"
  ></loading>
</template>

<script>
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  props: {
    loading: {
      type: Boolean
    }
  },
  data() {
    return {
      fullPage: true
    };
  },
  components: {
    Loading
  },
  methods: {
    doAjax() {
      this.isLoading = true;
      // simulate AJAX
      setTimeout(() => {
        this.isLoading = false;
      }, 5000);
    },
  }
};
</script>

<style>
</style>
