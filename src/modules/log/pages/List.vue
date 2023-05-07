<template>
  <v-container grid-list-xl class="pa-0">
    <v-row wrap>
      <v-col cols="12">
        <m-card-list
          two-line
          title="Log Sistem"
          :items="items"
          :headers="headers"
          refresh
          @refresh="load"
          :page="page"
          footer
          @search="
            search => {
              textSearch = search;
              load();
            }
          "
          @change:page="
            pg => {
              cp = pg;
              load();
            }
          "
        >
          <template v-slot:items="{ props, item }">
            <tr v-if="$vuetify.breakpoint.mdAndUp">
              <td>
                <i class="mdi mdi-history grey--text"> &nbsp;</i
                >{{ pVal(item, "created_at") | toDT }}
              </td>
              <td class="caption light-blue--text text--darken-4">
                <p class="mb-0 ">
                  <i class="mdi mdi-account">&nbsp;</i
                  >{{ pVal(item.user, "name") }}
                </p>
                <a class="mt-0" :href="`mailto:${item.user.email}`"
                  ><i class="mdi mdi-email"> &nbsp;</i>{{ item.user.email }}</a
                >
              </td>
              <td class="font-weight-bold">{{ pVal(item, "nama") }}</td>
              <td>{{ pVal(item, "deskripsi") }}</td>
            </tr>
            <tr v-else>
              <td class="v-data-table__mobile-row">
                <div class="v-data-table__mobile-row__wrapper">
                  <div class="v-data-table__mobile-row__header">
                    {{ headers[0].text }}
                  </div>
                  <div class="v-data-table__mobile-row__cell">
                    {{ pVal(item, "created_at") | toDT }}
                  </div>
                </div>
              </td>
              <td class="v-data-table__mobile-row">
                <div class="v-data-table__mobile-row__wrapper">
                  <div class="v-data-table__mobile-row__header">
                    {{ headers[1].text }}
                  </div>
                  <div
                    class="font-weight-bold primary--text v-data-table__mobile-row__cell"
                  >
                    {{ pVal(item.user, "name") }}
                  </div>
                </div>
              </td>
              <td class="v-data-table__mobile-row">
                <div class="v-data-table__mobile-row__wrapper">
                  <div class="v-data-table__mobile-row__header">
                    {{ headers[2].text }}
                  </div>
                  <div class="font-weight-bold v-data-table__mobile-row__cell">
                    {{ pVal(item, "deskripsi") }}
                  </div>
                </div>
              </td>
              <td class="v-data-table__mobile-row">
                <div class="v-data-table__mobile-row__wrapper">
                  <div class="v-data-table__mobile-row__header">
                    <v-btn
                      x-small
                      text
                      color="primary"
                      icon
                      @click="props.expand(true)"
                      v-if="!props.isExpanded"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                    <v-btn
                      x-small
                      text
                      color="primary"
                      icon
                      @click="props.expand(false)"
                      v-if="props.isExpanded"
                    >
                      <v-icon>mdi-minus</v-icon>
                    </v-btn>
                  </div>
                  <div class="v-data-table__mobile-row__cell"></div>
                </div>
              </td>
            </tr>
          </template>
        </m-card-list>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      expanded: [],
      singleExpand: false,
      items: [],
      textSearch: null,
      page: null,
      cp: 1,
      headers: [
        { text: "Tanggal", align: "left", value: "created_at" },
        { text: "User", align: "left", value: "user.name" },
        { text: "", align: "left", value: "nama" },
        { text: "Deskripsi", align: "left", value: "deskripsi" }
      ]
    };
  },
  computed: {},
  activated() {
    this.load();
  },
  methods: {
    load() {
      this.$store
        .dispatch("log/get", { page: this.cp, filter: this.textSearch })
        .then(res => {
          this.page = res;
          this.items = res.data;
        })
        .catch(e => e);
    }
  }
};
</script>
