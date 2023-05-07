<template>
  <m-card 
    v-bind="$attrs" 
    v-on="$listeners" 
    :edit="false" 
    :footer="footer" 
    no-padding class="elevation-2"
  >
    <template v-if="filterBy && filterBy.length > 0 ">
      <span class="subtitle-2 ml-4">Filter: </span>
      <span v-for="(item, i) in filterBy" :key="i">
        <v-chip
          v-if="item && item.id != null || item && item.type == 'mapel'"
          class="ma-2"
          close
          @click:close="removeFilterBy(item)"
        >
          {{ (item) ? (item.name) ? item.name : item.nama : ''}}
        </v-chip>
      </span>
      <v-divider></v-divider>
    </template>
    <template v-slot:action_ext>
      <slot name="action_ext"></slot>
    </template>
    <v-row wrap>
      <v-col cols="12" class="mt-4 pt-0">
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
          :headers="headers"
        >
          <template v-slot:top>
            <slot name="top"></slot>
          </template>
          <template v-slot:item="props">
            <v-row class="ma-3">
              <v-col v-for="field in gridConfig" :key="field.index" 
              v-bind="field.grid" 
              :class="field.class" 
              v-show="(!field.vShow) ? true : (field.vShow.cond)">
                <template v-if="field.header">
                  <p class="caption grey--text"  v-if="(!field.conditional) ? true : (field.conditional.vIf) ? field.conditional.vIf(props.item) : field.conditional.cond"> {{ field.header }}</p>
                </template>
                <template v-for="(comp, i) in field.contents">
                    <component 
                    :key="i"
                    :is="comp.component" 
                    :class="comp.statusColor && comp.statusName ? comp.statusColor.statusColor(wrapObj(comp.statusName, props.item))+'--text ' + comp.class : '' + comp.class" 
                    v-bind="comp.properties" 
                    :href="comp.href ? wrapObj(comp.href, props.item) : ''"
                    :target="comp.target ? comp.target : ''"
                    :src="(comp.src) ? comp.src(props.item) : ''"
                    v-if="(!comp.conditional) ? true : (comp.conditional.vIf) ? comp.conditional.vIf(props.item) : comp.conditional.cond"
                    action="toAction"
                    @toAction="$emit(comp.action ? comp.action :'toAction', props.item)"
                    >
                        <template v-if="comp.name">
                            <template v-if="comp.filter">
                                {{ filters(comp.filter, wrapObj(comp.name, props.item), comp.len)}}
                            </template>
                            <template v-else>
                                {{ wrapObj(comp.name, props.item) }}
                            </template>
                        </template>
                        <template v-else>
                            {{ (comp.textFunc) ? (comp.filter) ? filters(comp.filter, comp.textFunc(props.item), comp.len) : comp.textFunc(props.item) : comp.text }}
                        </template>
                        <template v-if="comp.type && comp.type == 'tag'">
                            <component :is="comp.component" v-for="tag in wrapObj(comp.items, props.item)" :key="tag.index" :class="comp.class" v-bind="comp.properties">
                                {{ wrapObj(comp.textItems, tag) }}
                            </component>
                        </template>
                        <template v-if="comp.type && comp.type == 'laporan'">
                            <component :is="comp.component" v-for="tag in wrapObj(comp.items, props.item)" :key="tag.index" class="error--text mdi mdi-alert" v-bind="comp.properties">
                                {{ wrapObj(comp.textItems, tag) }}
                                <p class="black--text">{{ tag.total }} pelapor </p>
                            </component>
                        </template>
                        <template v-if="comp.type && comp.type == 'more'">
                            <p class="py-0 my-0">
                                <m-menu right class="clearfix" style="float:right" :items="comp.more" :object="props.item" />
                            </p>
                        </template>
                        <template v-if="comp.type && comp.type == 'list'">
                            <ul v-if="wrapObj(comp.items, props.item).length > 0">
                              <li v-for="(item, i) in wrapObj(comp.items, props.item)" :key="i">{{ item }}</li>
                            </ul>
                            <p v-else> - </p>
                        </template>
                        <template v-if="comp.subContents">
                            <template  v-for="(subCont, i) in comp.subContents" >
                                <template v-if="subCont.type && subCont.type == 'tags'">
                                  <component :is="subCont.component" v-for="tag in wrapObj(subCont.name, props.item)" :key="tag.index" :class="subCont.class" v-bind="subCont.properties">
                                        {{ wrapObj(subCont.name, props.item).length > 0 ? wrapObj(subCont.textName, tag) : ''}}
                                  </component>
                                </template>
                                    <template v-else >
                                      <component 
                                      :key="i"
                                      :is="subCont.component" 
                                      :class="subCont.class" 
                                      v-bind="subCont.properties" 
                                      :href="subCont.href ? wrapObj(subCont.href, props.item) : ''" 
                                      :target="subCont.target ? subCont.target : ''"
                                      :src="(subCont.src) ? subCont.src(props.item) : ''"
                                      v-if="(!subCont.conditional) ? true : (subCont.conditional.vIf) ? subCont.conditional.vIf(props.item) : subCont.conditional.cond">
                                          <template v-if="subCont.name">
                                              <template v-if="subCont.filter">
                                                  {{ filters(subCont.filter, wrapObj(subCont.name, props.item), subCont.len) }}
                                              </template>
                                              <template v-else>
                                                  {{ wrapObj(subCont.name, props.item) }}
                                              </template>
                                          </template>
                                          <template v-else>
                                              {{subCont.text}}
                                          </template>
                                      </component>
                                    </template>
                            </template>
                        </template>
                    </component>
                </template>
              </v-col>
            </v-row>
            <v-divider></v-divider>
          </template>
          <template v-slot:expanded-item="props">
            <slot name="detail" :props="props" :item="props.item"></slot>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <template v-slot:footer>
      <v-row wrap class="pb-3" v-if="page && page.last_page > 1" align="center" justify="center">
        <v-col :cols="$vuetify.breakpoint.smAndUp ? 2 : 10" :class="$vuetify.breakpoint.smAndUp ? 'text-left' : 'text-center'" >
          <p class="caption font-weight-bold">{{ page.total }} &nbsp; Data ditemukan</p>
          <v-select
            v-if="$vuetify.breakpoint.xsOnly"
            :items="totalPagination"
            v-model="jump_page"
            @change="jump"
            label="Hal."
          ></v-select>
        </v-col>
        <v-col cols="8" v-if="$vuetify.breakpoint.smAndUp" class="text-center">
          <v-pagination v-if="page.total" :key="page_key" v-model="current_page" :length="page.last_page" :total-visible="7" @input="change"></v-pagination>
        </v-col>
        <v-col :cols="$vuetify.breakpoint.smAndUp ? 2 : 12" v-if="page.from" class="text-center">
          <p class="caption font-weight-bold">{{ page.from }} - {{ page.to }} dari {{ page.total }}</p>
        </v-col>
      </v-row>
      <v-divider></v-divider>
    </template>
  </m-card>
</template>

<script>
// @group Global Component
export default {
  inheritAttrs: false,
  name: "m-grid",
  props: {
    headers: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    },
    filterBy: {
      type: Array,
      default: () => []
    },
    gridConfig: {
      type: Array,
      default: () => [
        {
          align: "left",
          name: "kode",
          type: "string",
          grid: {cols: 12,sm: 12,md: 12,lg: 12}
        }
      ]
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
    object: {},
    totalPagination: [],
    opt: ['toD', 'toDT', 'toUppercase', 'toTitleCase', 'truncate', 'toTime', 'toDN', 'toF2']
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
    },
    wrapObj(path, obj) {
      var context = obj || this;
      path = path.split(".");

      for (var i = 0; i < path.length; i++) {
        context = context[path[i]];
      }

      return context;
    },
    filters(opt, v, len){
        var f = this.opt.filter(e => e == opt)
        if (f == 'truncate') {
          return this.$options.filters[f](v, len)
        }else{
          return this.$options.filters[f](v)
        }    
    },
    removeFilterBy(item){
      this.$emit('remove-filter-by', item.type);
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
