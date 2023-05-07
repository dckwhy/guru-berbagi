<template>
    <v-card>
      <v-toolbar color="transparent" text dense card>
        <v-toolbar-title>
          <h4 class="font-weight-light">{{title}}</h4>
        </v-toolbar-title>
        <template v-if="!ext">
          <slot name="refresh">
            <v-spacer></v-spacer>
            <v-btn icon @click="refresh">
              <v-icon>refresh</v-icon>
            </v-btn>
          </slot>
        </template>

        <v-layout v-if="ext" v-slot:extension row class="ml-0">
            <slot name="action">
            </slot>
            <slot name="refresh">
              <v-spacer></v-spacer>
              <v-btn icon @click="refresh">
                <v-icon>refresh</v-icon>
              </v-btn>
            </slot>
        </v-layout>
      </v-toolbar>
      <v-divider></v-divider>
      <slot></slot>
    </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    ext : {
      type : Boolean,
      default : false
    }
  },
  methods:{
    refresh(){
      this.$emit('refresh')
    }
  }
}
</script>
