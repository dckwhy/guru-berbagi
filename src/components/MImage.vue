<template>
  <v-img
    :src="source || defaultSource"
    :lazy-src="thumbnail"
    aspect-ratio="1"
    class="grey lighten-2"
  >
    <template v-slot:placeholder>
      <v-layout fill-height align-center justify-center ma-0>
        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
      </v-layout>
    </template>
  </v-img>
</template>

<script>
export default {
  props: {
    source: {
      type: String,
      default: ""
    },
    defaultSource: {
      type: String,
      default: ""
    },
    thumbnail: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
