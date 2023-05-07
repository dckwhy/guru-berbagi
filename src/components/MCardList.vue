s<template>
  <m-card
    v-bind="$attrs"
    v-on="$listeners"
    :edit="false"
    :footer="footer"
    no-padding
  >
    <template v-slot:action_ext>
      <slot name="action_ext"></slot>
    </template>
    <v-row wrap>
      <v-col cols="12">
        <v-data-table
          :show-select="selectAll"
          :items="items"
          no-data-text="Data Tidak Tersedia"
          :sort-by="idKey"
          v-model="selection"
          :items-per-page="perPage"
          :item-key="itemKey"
          :show-expand="expand"
          :single-expand="true"
          class="elevation-0 fix_td"
          hide-default-footer
          :hide-default-header="!headers || headers.length == 0"
        >
          <template v-slot:top>
            <slot name="top"></slot>
          </template>
          <template v-slot:item="props">
            <slot name="items" :props="props" :item="props.item"></slot>
          </template>
          <template v-slot:expanded-item="props">
            <slot name="detail" :props="props" :item="props.item"></slot>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <template v-slot:footer>
      <v-row wrap class="pb-3" v-if="page">
        <v-col
          v-if="page.total"
          :cols="$vuetify.breakpoint.smAndUp ? 1 : 3"
          class="text-left"
          align="center"
          justify="center"
        >
          <v-select
            :items="totalPagination"
            v-model="jump_page"
            @change="jump"
            label="Hal."
          ></v-select>
        </v-col>
        <v-col cols="9" v-if="$vuetify.breakpoint.smAndUp" class="text-center">
          <v-pagination
            v-if="page.total"
            :key="page_key"
            v-model="current_page"
            :length="page.last_page"
            :total-visible="7"
            @input="change"
          ></v-pagination>
        </v-col>
        <v-col
          :cols="$vuetify.breakpoint.smAndUp ? 2 : 9"
          v-if="page.from"
          class="text-right"
        >
          <p class="caption font-weight-bold">
            {{ page.from }} - {{ page.to }} dari {{ page.total }}
          </p>
        </v-col>
      </v-row>
    </template>
  </m-card>
</template>

<script>
export default {
  inheritAttrs: false,
  name: "m-card-list",
  props: {
    headers: {
      type: Array,
      default: () => []
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
    expand: {
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
    footerLabel: {
      type: String,
      default: "Data"
    },
    edit: {
      type: Boolean,
      default: false
    },
    footer: {
      type: Boolean,
      default: false
    },
    page: {
      type: Object,
      default: null
    },
    perPage: {
      type: Number,
      default: 15
    },
    selectAll: {
      type: Boolean,
      default: false
    },
    value: {},
    itemKey: {
      type: String,
      default: "id"
    },
    noDataText: {
      type: String,
      default: "Data tidak tersedia"
    }
  },
  data: () => ({
    current_page: 0,
    jump_page: 0,
    selection: [],
    pagging: {},
    page_key: 0,
    totalPagination: []
  }),
  methods: {
    change() {
      if (this.current_page !== this.page.current_page) {
        this.$emit("change:page", this.current_page);
      }
    },
    jump() {
      if (Number.isInteger(this.jump_page)) {
        this.$emit("change:page", this.jump_page);
      }
    }
  },
  created() {
    this.current_page = this.page ? this.page.current_page : 0;
    this.jump_page = this.page ? this.page.current_page : 1;
  },
  watch: {
    page(n) {
      if (n) {
        this.current_page = n.current_page;
        this.jump_page = n.current_page;
        this.page_key = Math.random();
        for (let i = 1; i <= n.last_page; i++) {
          this.totalPagination.push(i);
        }
      }
    },
    value(n) {
      this.selection = n;
    },
    items() {
      this.current_page = this.page ? this.page.current_page : 0;
    },
    selection(n) {
      this.$emit("input", n);
    }
  }
};
</script>

<style></style>
