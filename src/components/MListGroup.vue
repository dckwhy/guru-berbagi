<template>
  <v-list-group
    :prepend-icon="level==0 ? item.icon:''"
    no-action
    :sub-group="level>0"
    v-model="is_open"
    @click="groupClick"
    v-if="!item.hidden"
  >
  <template v-slot:activator="{ on }">
    <v-list-item v-on="on">
      <v-list-item-content>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item-content>
      <v-list-item-action v-if="false">
        <v-btn text icon small>
          <v-icon small>mdi-plus</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </template>
    <template v-for="(subItem,i) in item.items">
      <m-list-tile
        v-if="!subItem.items"
        :level="level+1"
        :key="i"
        :item="subItem"
      />
      <m-list-group v-else :level="level+1" :item="subItem" :key="i"/>
    </template>
  </v-list-group>
</template>

<script>
import MListTile from './MListTile'
export default {
  name: 'm-list-group',
  props: {
    item: {
      type: Object
    },
    level: {
      type: Number
    }
  },
  components: {
    MListTile
  },
  data() {
    return {
      is_open: false
    }
  },
  methods: {
    groupClick() {
      if (this.item && this.item.to) {
        this.$router.push(this.item.to)
      }
    }
  }

}
</script>
