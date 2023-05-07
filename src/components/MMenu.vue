<template>
  <v-menu v-bind="$attrs">
    <template v-slot:activator="{ on }">
    <v-icon v-on="on">{{icon}}</v-icon>
    </template>
    <v-card width="200" class="pa-0 ma-0">
      <v-list dense>
        <template v-for="(i,index) in allItem">
          <v-divider v-if="i.divider" :key="`d_${index}`"></v-divider>
          <v-list-item v-else :key="index" @click="i.click(i, object)">
            <v-list-item-title>{{i.title}}</v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    items: {
      type: Array,
      default: () => []
    },
    icon: {
      type: String,
      default: "mdi-dots-vertical"
    },
    object: {}
  },
  computed: {
    allItem() {
      return this.items.filter(i => {
        return i.check ? i.check(i, this.object) : true;
      });
    }
  }
};
</script>

<style>
</style>
