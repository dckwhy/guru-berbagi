<template>
  <v-card
    outlined
    class="my-2 mx-auto"
    v-bind="$attrs"
    v-on="$listeners"
    @click="toModul(modul)"
  >
    <v-card-text class="mb-0 pb-0">
      <v-row no-gutters>
        <v-col cols="8">
          <p :class="`${color}--text title mb-0 pb-0`">
            <v-icon :color="color">{{ icon }}</v-icon
            >{{ title }}
          </p>
          <p class="mt-0 pt-0 pb-3 caption">yang harus dikurasi</p>
        </v-col>
        <v-col cols="4">
          <div align="right" class="font-weight-bold mt-1">
            <h1>{{ ajuan }}</h1>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions :class="color">
      <span class="white--text" style="font-size:65%">
        dari Total {{ total }} {{ title }} artikel tersedia
      </span>
      <v-spacer></v-spacer>
      <v-icon small color="white">mdi-arrow-right</v-icon>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    item: {
      type: Object,
      default: null
    },
    color: {
      type: String,
      default: "primary"
    },
    icon: {
      type: String,
      default: "mdi-book"
    },
    title: {
      type: String,
      default: "Title"
    },
    total: {
      type: Number,
      default: 0
    },
    ajuan: {
      type: Number,
      default: 0
    },
    modul: {
      type: String,
      default: "artikel"
    }
  },
  mounted() {},
  data() {
    return {};
  },
  methods: {
    toModul(modul) {
      this.$router.push({
        name: modul
      });
    }
  },
  watch: {}
};
</script>

<style></style>
