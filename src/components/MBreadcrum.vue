<template>
  <v-layout wrap>
    <v-slide-y-reverse-transition mode="out-in">
      <div class="font-weight-light subtitle-1 mb-1 mt-1" v-if="items.length>=0">
        <template v-for="(i,index) in items">
          <v-hover :key="index">
            <span
              slot-scope="{hover}"
              @click="i.to ? $router.push(i.to):()=>{}"
              :class="{
                'primary--text text-darken-2': hover && (i.force || index<items.length-1),
                'primary--text text--lighten-2':!hover && index<items.length-1,
                'grey--text text--darken-2':!hover && index===items.length-1
              }"
              :style="hover && (index<items.length-1 || i.force) ? 'cursor:pointer':''"
            >
              <v-icon
                v-if="i.icon"
                :size="20"
                :color="index<items.length-1 ? 'primary':'grey'"
                class="mr-1"
              >{{i.icon}}</v-icon>
              {{i.title}}
            </span>
          </v-hover>
          <span class="grey--text" :key="`s_${index}`" v-if="index<items.length-1">/</span>
        </template>
      </div>
    </v-slide-y-reverse-transition>
  </v-layout>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  methods: {}
};
</script>

