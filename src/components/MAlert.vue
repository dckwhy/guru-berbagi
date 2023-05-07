<template>
  <v-alert
    v-if="show"
    :color="color"
    border="left"
    :elevation="`0 ${color} lighten-5`"
    colored-border
    icon="mdi-information"
    class="mt-2 mb-0"
  >
    <template v-slot:default>
      <slot name="default"></slot>
    </template>
  </v-alert>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    color: {
      type: String,
      default: "primary"
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  computed: {}
};
</script>

<style></style>
