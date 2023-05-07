<template>
  <v-layout wrap>
    <v-flex md12 pt-2>
      <v-card class="card--flex-toolbar">
        <v-toolbar card prominent>
          <v-toolbar-title class="body-2 primary--text">Laporan Aksi</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn @click="addImg" color="primary lighten-2">
            <v-icon left>add</v-icon>Foto
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-layout wrap v-if="item">
              <!-- Dokumentasi Foto -->
              <v-flex md6 v-for="(photos, photoCategory) in groups" :key="photoCategory">
                <v-layout wrap>
                  <v-flex xs12>
                    <v-card color="secondary" tile>
                      <v-card-text>{{photoCategory}}</v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex md4 v-for="(photo) in photos" :key="photo.url">
                    <v-card class="grey lighten-4">
                      <v-img :src="photo.url" height="150px" contain></v-img>
                      <v-card-actions class="pl-3 white">
                        <span class="font-weight-medium">{{photo.description}}</span>
                        <v-spacer></v-spacer>
                        <v-btn icon>
                          <v-icon>edit</v-icon>
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
      <MImgDialog ref="dlgImg" />
    </v-flex>
  </v-layout>
</template>

<script>
import MImgDialog from "@/components/MImgDialog";
import { groupBy } from "@/tools";

export default {
  components: {
    MImgDialog
  },
  props: {
    item: {
      type: Object,
      default: null
    },
    module: {
      type: String,
      default: ""
    }
  },
  methods: {
    addImg() {
      if (!this.item) return;
      let op = {
        id: this.item.detailActivity.activityId,
        title: "Upload Foto",
        img: null,
        options: {
          description: true,
          category: true
        }
      };
      this.$refs.dlgImg.open(op).then(res => {
        this.item.files = { ...res.files };
      });
    }
  },
  computed: {
    groups() {
      return groupBy(this.item.files.galery, "category");
    }
  }
};
</script>

<style>
</style>
