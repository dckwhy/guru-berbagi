<template>
  <v-dialog scrollable ref="detailDlg" v-model="dialog" max-width="1150">
    <v-card v-if="buletin">
      <v-toolbar color="primary" dark flat>
        <v-col cols="2"></v-col>
        <v-col class="d-flex justify-space-around">
          <v-toolbar-title class="white--text">Detil Buletin</v-toolbar-title>
        </v-col>
        <v-col cols="2" class="d-flex justify-end"></v-col>
      </v-toolbar>
      <v-card-title class="title black--text font-weight-bold">{{
        pVal(buletin, "judul") | toTitleCase
      }}</v-card-title>
      <v-card-text class="pb-0 mb-0">
        <v-row>
          <v-col cols="12">
            <p class="caption my-2">
              Sumber:
              <span class="black--text">{{
                pVal(buletin.author, "name") | toTitleCase
              }}</span
              >,
              <span class="black--text">{{
                pVal(buletin, "created_at") | toDT
              }}</span>
            </p>
          </v-col>
          <v-col cols="12" class="text-left py-0">
            <v-row>
              <v-col cols="12">
                <v-img
                  contain
                  :src="
                    buletin.cover
                      ? buletin.cover.new_url.medium
                      : 'https://cdn.siap.id/s3/simpkb/asset img/Guru-Berbagi/revisi-portal/thumb-default.jpg'
                  "
                  lazy-src="https://cdn.siap.id/s3/simpkb/asset img/Guru-Berbagi/revisi-portal/thumb-default.jpg"
                  aspect-ratio="1.7778"
                />
                <br />
                <v-row v-if="buletin.letterrpp.length > 0">
                  <v-col cols="12">
                    <span class="title black--text">RPP Pilihan</span>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="4"
                    lg="4"
                    xl="4"
                    v-for="itemRpp in buletin.letterrpp"
                    :key="itemRpp.id"
                  >
                    <BlockCard
                      :is_organisasi="false"
                      :title="itemRpp.judul"
                      :jenis="itemRpp.moda"
                      :author="itemRpp.author ? itemRpp.author.name : ''"
                      :logo="
                        itemRpp.cover && itemRpp.cover.new_url
                          ? itemRpp.cover.new_url.thumbnail
                          : 'https://cdn.siap.id/s3/simpkb/asset img/Guru-Berbagi/revisi-portal/thumb-default.jpg'
                      "
                      :height="120"
                      color="blue"
                      to
                    />
                  </v-col>
                </v-row>
                <v-row v-if="buletin.letterartikel.length > 0">
                  <v-col cols="12">
                    <span class="title black--text">Artikel Pilihan</span>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="4"
                    lg="4"
                    xl="4"
                    v-for="itemArtikel in buletin.letterartikel"
                    :key="itemArtikel.id"
                  >
                    <BlockCard
                      :is_organisasi="false"
                      :title="itemArtikel.judul"
                      :jenis="itemArtikel.jenis"
                      :author="
                        itemArtikel.author ? itemArtikel.author.name : ''
                      "
                      :logo="
                        itemArtikel.cover && itemArtikel.cover.new_url
                          ? itemArtikel.cover.new_url.thumbnail
                          : 'https://cdn.siap.id/s3/simpkb/asset img/Guru-Berbagi/revisi-portal/thumb-default.jpg'
                      "
                      :height="120"
                      color="blue"
                      to
                    />
                  </v-col>
                </v-row>
                <v-row v-if="buletin.letteraksi.length > 0">
                  <v-col cols="12">
                    <span class="title black--text">Aksi Pilihan</span>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="4"
                    lg="4"
                    xl="4"
                    v-for="itemAksi in buletin.letteraksi"
                    :key="itemAksi.id"
                  >
                    <BlockCard
                      :is_organisasi="false"
                      :title="itemAksi.judul"
                      :jenis="itemAksi.jenis"
                      :author="itemAksi.author ? itemAksi.author.name : ''"
                      :logo="
                        itemAksi.cover && itemAksi.cover.new_url
                          ? itemAksi.cover.new_url.thumbnail
                          : 'https://cdn.siap.id/s3/simpkb/asset img/Guru-Berbagi/revisi-portal/thumb-default.jpg'
                      "
                      :height="120"
                      color="blue"
                      to
                    />
                  </v-col>
                </v-row>
                <br />
                <span class="title black--text">Konten</span>
                <div clas v-html="konten"></div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="ma-2">
        <v-spacer></v-spacer>
        <v-btn @click="dialog = false" text class="black--text mr-1">
          Tutup
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import BlockCard from "@/components/BlockCard";
export default {
  components: {
    BlockCard
  },
  data() {
    return {
      dialog: false,
      buletin: null,
      items: [],
      page: null,
      cp: 1
    };
  },
  computed: {
    konten() {
      return this.buletin && this.buletin.deskripsi
        ? this.buletin.deskripsi.replace(/<br>\\*/g, "</p><p>")
        : "";
    }
  },
  methods: {
    // eslint-disable-next-line
    open(obj) {
      this.buletin = { ...obj };
      this.dialog = true;
    }
  }
};
</script>
<style>
.vue-map-container,
.vue-map-container .vue-map {
  width: 100%;
  height: 95%;
}
img {
  max-width: 230px;
  max-height: 250px;
}
</style>
