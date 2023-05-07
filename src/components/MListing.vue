<template>
  <v-layout wrap>
    <span class="hidden-sm-and-up title font-weight-normal teal--text ml-2 mt-1">{{ title }}</span>
    <v-flex xs12 class="pb-0">
      <v-toolbar text class="ra-2 transparent">
        <v-toolbar-title class="hidden-xs-only title font-weight-normal teal--text my-3">{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-text-field
            v-if="search"
            v-model="q"
            append-icon="fa-search"
            @click:append="$emit('click:search',q,is_open_advance)"
            label="Search"
            single-line
            hide-details
            class="mr-2"
            @keyup.enter="$emit('click:search',q,is_open_advance)"
          ></v-text-field>
          <v-icon v-if="add" class="ml-3 mr-2" @click="$emit('click:add')">fa-plus</v-icon>
          <template v-if="switchView">
            <v-icon v-if="view==1" class @click="view=2; $emit('click:view',view)">fa-th-list</v-icon>
            <v-icon v-else class @click="view=1; $emit('click:view',view)">fa-th</v-icon>
          </template>
          <v-icon v-if="refresh" class="ml-3 mr-2" @click="$emit('click:refresh')">fa-sync</v-icon>
          <v-tooltip bottom class="mt-3" v-if="advance">
            <template v-slot:activator="{ on }">
            <v-icon
              @click="toggleAdvance"
              v-on="on"
            >{{ is_open_advance ? 'fa-angle-up':'fa-angle-down' }}</v-icon>
            </template>
            <span>Advance search</span>
          </v-tooltip>
          <slot name="action"></slot>
        </v-toolbar-items>
      </v-toolbar>
      <template v-if="advance">
        <v-expand-transition>
          <v-card text class="transparent" v-if="is_open_advance">
            <v-card-text>
              <slot name="advance" v-bind:q="q" v-bind:is_open_advance="is_open_advance"></slot>
            </v-card-text>
          </v-card>
        </v-expand-transition>
      </template>
      <v-divider></v-divider>
    </v-flex>
    <v-flex xs12 class="pt-0">
      <v-card class="rb-2 transparent" text>
        <v-card-text class="px-0">
          <slot name="nodata" v-if="!items || items.length==0">
            <v-alert type="info" color="green lighten-2" class="ra-2 mx-2">Data kosong</v-alert>
          </slot>
          <slot :q="q" :view="view" v-else>
            <template v-if="listing">
              <v-list :three-line="threeLine" :two-line="twoLine" v-if="items && items.length>0">
                <template v-for="(i,index) in items">
                  <v-list-item avatar :key="i[idKey]" @click.stop="$emit('select', i)">
                    <slot name="list-avatar" :item="i">
                      <v-list-item-avatar class="{'pt-3':threeLine,'pt-0':twoLine}">
                        <v-icon size="20">{{ avatarIcon }}</v-icon>
                      </v-list-item-avatar>
                    </slot>
                    <v-list-item-content>
                      <v-list-item-title>
                        <slot name="list-title" :item="i">
                          <span class="font-weight-bold">{{ i[titleKey] }}</span>
                        </slot>
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        <slot name="list-subtitle-1" :item="i">
                          <span>{{ subTitle1Key ? i[subTitle1Key]:'' }}</span>
                        </slot>
                      </v-list-item-subtitle>
                      <v-list-item-subtitle v-if="threeLine">
                        <slot name="list-subtitle-2" :item="i">
                          <span>{{ subTitle2Key ? i[subTitle2Key]:'' }}</span>
                        </slot>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn v-if="edit" icon @click.stop="$emit('edit:item', i)">
                        <v-icon small>fa-pen</v-icon>
                      </v-btn>
                      <slot name="list-item-action" :item="i"></slot>
                    </v-list-item-action>
                  </v-list-item>
                  <v-divider :key="`d_${index}`" v-if="index<items.length-1"></v-divider>
                </template>
              </v-list>
            </template>
          </slot>
        </v-card-text>
        <m-fab-plus v-if="add" @click="$emit('click:add')"/>
      </v-card>
    </v-flex>
    <slot name="other"></slot>
    <v-flex xs12 v-if="page" class="pb-3">
      <div class="text-center" v-if="page && page.total">
        <v-pagination
          prev-icon="fa-angle-left"
          next-icon="fa-angle-right"
          circle
          v-model="current_page"
          :length="page.last_page"
          :total-visible="6"
          @input="change"
        ></v-pagination>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    title: String,
    add: {
      type: Boolean,
      default: false
    },
    edit: {
      type: Boolean,
      default: false
    },
    switchView: {
      type: Boolean,
      default: false
    },
    search: {
      type: Boolean,
      default: false
    },
    refresh: {
      type: Boolean,
      default: false
    },
    advance: {
      type: Boolean,
      default: false
    },
    page: {
      type: Object,
      default: null
    },
    listing: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: () => []
    },
    avatarIcon: {
      type: String,
      default: "fa-chalkboard"
    },
    threeLine: {
      type: Boolean,
      default: false
    },
    twoLine: {
      type: Boolean,
      default: false
    },
    idKey: {
      type: String,
      default: "id"
    },
    titleKey: {
      type: String,
      default: ""
    },
    subTitle1Key: {
      type: String,
      default: ""
    },
    subTitle2Key: {
      type: String,
      default: ""
    },
    compTable: {
      type: String,
      default: ""
    },
    compPanel: {
      type: String,
      default: ""
    },
    compCard: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      q: "",
      view: 2, // 1 grid, 2 list/table
      current_page: 0,
      is_open_advance: false
    };
  },
  methods: {
    change() {
      if (this.current_page !== this.page.current_page) {
        this.$emit("change:page", this.current_page);
      }
    },
    toggleAdvance() {
      this.is_open_advance = !this.is_open_advance;
    }
  },
  computed: {},
  watch: {
    page(n) {
      if (n) {
        this.current_page = n.current_page;
      }
    }
  }
};
</script>
