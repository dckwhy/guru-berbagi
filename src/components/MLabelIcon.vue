<template>
  <v-layout row class="pa-0 ma-0" align-center>
    <v-avatar :size="avatarSize" class="mr-2" :color="avatarColor">
      <v-icon :size="iconSize" :color="iconColor">{{ icon }}</v-icon>
    </v-avatar>
    <slot></slot>
  </v-layout>
</template>

<script>
export default {
  props: {
    icon: {
      type: String
    },
    avatarSize: {
      type: Number,
      default: 40,
    },
    iconSize: {
      type: Number,
      default: 40,
    },
    avatarColor: {
      type: String,
      default: null,
    },
    iconColor: {
      type: String,
      default: null,
    }
  }

}
</script>

<style>
</style>
