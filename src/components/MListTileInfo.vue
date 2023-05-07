<template>
  <v-list-item>
    <v-list-item-avatar v-if="icon">
      <v-icon v-html="icon"></v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-subtitle>{{ label }}</v-list-item-subtitle>
      <slot name="value">
        <span class="subtitle-1 font-weight-normal">{{ value }}</span>
      </slot>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'm-list-tile-info',
  props: {
    icon: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: ''
    },
    value: {
    }
  }
}
</script>

<style>
</style>
