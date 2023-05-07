<template>
  <v-app id="logined">
    <MToolbar>
      <router-view name="toolbar" v-slot:menu></router-view>
      <router-view name="minitoolbar" v-slot:minimenu></router-view>
    </MToolbar>
    <v-fade-transition mode="out-in">
      <MRightBar />
    </v-fade-transition>

    <v-fade-transition mode="out-in">
      <MSideBar />
    </v-fade-transition>
    <v-container grid-list-xs class="mt-5 pt-5">
        <br/>
      <v-slide-y-transition mode="out-in">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </v-slide-y-transition>
      <br/>
      <br/>
    </v-container>
    <MFooter />
  </v-app>
</template>

<script>
import MToolbar from "@/components/Toolbar";
import MSideBar from "@/components/SideBar";
import MRightBar from "@/components/RightBar";
import MFooter from "@/components/Footer";

export default {
  components: {
    MToolbar,
    MSideBar,
    MRightBar,
    MFooter
  },
  computed: {},
  methods: {}
};
</script>

