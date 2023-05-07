<template>
  <v-btn v-if="appendIcon == true" :disabled="disabled" :block="isBlock" :depresed="depresed" :fab="fab" :small="small" :outlined="outlined" @click="$emit(action)" :color="color" v-bind="$attrs">
      {{ fab ? "" : textButton }}
      <v-icon class="ml-1" small :class="fab ? '' : ''" v-if="icon">{{ icon }}</v-icon>
  </v-btn>
  <v-btn v-else :disabled="disabled" :block="isBlock" :depresed="depresed" :fab="fab" :small="small" :outlined="outlined" @click="$emit(action)" :color="color" v-bind="$attrs">
      <v-icon class="mr-1" small :class="fab ? '' : ''" v-if="icon">{{ icon }}</v-icon>
      {{ fab ? "" : textButton }}
  </v-btn>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    appendIcon:{
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: null
    },
    textButton: {
      type: String,
      default: "Simpan"
    },
    color: {
      type: String,
      default: "primary"
    },
    isBlock: {
      type: Boolean,
      default: false
    },
    depresed: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: false
    },
    fab: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    action: {
      type: String,
      default: "save"
    }
  },
  computed: {
    smallSize() {
      return this.$vuetify.breakpoint.smAndUp ? this.small : true;
    }
  }
};
</script>
