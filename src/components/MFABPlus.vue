<template>
  <v-scale-transition>
    <v-btn
      v-if="offsetTop>offset"
      v-bind="$attrs"
      v-on="$listeners"
      fab
      dark
      right
      color="success"
      fixed
      bottom
      class="mb-3 mr-3"
    >
      <v-icon dark>fa-plus</v-icon>
    </v-btn>
  </v-scale-transition>
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'm-fab-plus',
  props: {
    offset: {
      type: Number,
      default: 60,
    },
  },
  data: () => ({
    offsetTop: 0, // offset untuk scroll layout
  }),
  mounted() {
    // sementara pakai window scroll karena v-scroll masih trouble
    window.addEventListener('scroll', this.onScroll);
  },
  deactivated() {
    window.removeEventListener('scroll', this.onScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    onScroll() {
      this.offsetTop = window.pageYOffset || document.documentElement.scrollTop;
    },
  },
};
</script>

<style>
</style>
