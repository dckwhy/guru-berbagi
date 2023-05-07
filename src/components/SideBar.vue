<template>
  <v-navigation-drawer
    persistent
    :mini-variant="false"
    v-model="drawer"
    enable-resize-watcher
    fixed
    app
    class="grey lighten-4"
    width="340"
  >
    <v-container class="pa-0 white" fill-height>
      <v-layout column>
        <v-list class="fix-icon" dense>
          <v-list>
            <v-list-item>
              <v-img :src="$consts.LOGO" contain height="50"></v-img>
            </v-list-item>
          </v-list>
          <br />

          <div v-for="item in items" :key="item.id ? item.id : item.title">
            <template v-if="item.subheader">
              <v-subheader class="py-0 my-0" v-if="!item.hidden"
                >{{ item.title }}
              </v-subheader>
              <v-divider></v-divider>
            </template>
            <template v-else-if="item.items">
              <v-list-group
                v-if="!item.hidden"
                :value="item.open"
                :prepend-icon="item.icon"
                active-class="my-active-link-group"
                no-action
              >
                <template v-slot:activator>
                  <v-list-item-content
                    v-if="item.items"
                    :key="item.id ? item.id : item.title"
                    exact
                  >
                    <div>
                      {{ item.title }}
                      <v-chip
                        x-small
                        label
                        class="mx-1 px-1 mt-n4"
                        v-if="item.new"
                        color="success"
                        >Baru
                      </v-chip>
                    </div>
                  </v-list-item-content>
                </template>
                <template v-for="subItem in item.items">
                  <v-list-item
                    v-if="!subItem.hidden"
                    :key="subItem.id ? subItem.id : subItem.title"
                    :to="subItem.to"
                    :href="subItem.href"
                    active-class="my-active-link"
                    exact
                  >
                    <v-list-item-title v-if="subItem.new">
                      {{ subItem.title }}
                      <v-chip
                        x-small
                        label
                        class="mx-1 px-1"
                        color="success"
                        >Baru
                      </v-chip>
                    </v-list-item-title>
                    <v-list-item-title v-else>{{
                      subItem.title
                    }}</v-list-item-title>
                  </v-list-item>
                </template>
              </v-list-group>
            </template>
            <template v-else>
              <v-list-item
                v-if="!item.hidden"
                :key="item.id ? item.id : item.title"
                :to="item.to"
                :href="item.href"
                active-class="my-active-link"
                exact
              >
                <v-list-item-action class="my-act-icon">
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title v-if="item.new">
                    {{ item.title }}
                    <v-chip x-small label color="green white--text ma-2"
                      >BARU</v-chip
                    >
                  </v-list-item-title>
                  <v-list-item-title v-else>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </div>
        </v-list>
        <div
          class="mx-2"
          v-if="
            current_user &&
              !current_user.is_super_admin &&
              current_user.peran.id != 1
          "
          @click="toGB"
        >
          <v-img
            src="https://cdn.siap.id/s3/simpkb/asset%20img/guru-praktik-baik/promo-potrait.png"
          ></v-img>
        </div>
      </v-layout>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
import MListGroup from "./MListGroup";
import MListTile from "./MListTile";
import { GURUBELAJAR } from "@/const";
export default {
  components: {
    MListGroup,
    MListTile
  },
  data() {
    return {
      drawer: this.lDrawer
    };
  },
  computed: {
    lDrawer() {
      return this.$store.getters["main/lDrawer"];
    },
    items() {
      return this.$store.getters["menu/menus"];
    }
  },
  methods: {
    toGB() {
      window.open(GURUBELAJAR, "_blank");
    }
  },
  watch: {
    lDrawer(n) {
      this.drawer = n;
    },
    drawer(n) {
      this.$store.commit("main/setLDrawer", n);
    }
  }
};
</script>

<style>
.fix-icon .v-icon.fas {
  font-size: 1rem !important;
}
.fix-icon .my-act-icon .v-icon,
.fix-icon .v-list__group__header__prepend-icon .v-icon {
  font-size: 20px !important;
}
.fix-icon .my-act-icon,
.fix-icon .v-list__group__header .v-list__group__header__prepend-icon {
  padding-right: 0;
  min-width: 25px;
}
.fix-icon .v-list__group__items .v-list__tile {
  padding-left: 56px !important;
}
.fix-icon .my-active-link {
  color: #0d47a1 !important;
  background-color: #e9e9e9 !important;
}

.fix-icon .my-active-link-group {
  color: #0d47a1 !important;
}
</style>
