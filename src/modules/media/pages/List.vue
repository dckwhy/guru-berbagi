
<template>
  <v-container grid-list-xl class="pa-0">
    <v-card class="my-2" outlined flat>
      <v-card-title>Daftar Media</v-card-title>
      <v-card-subtitle>Berikut adalah media yang Anda unggah dalam pembuatan aksi maupun artikel</v-card-subtitle>
      <v-card-text>
        <v-row wrap>
          <v-col cols="12" sm="6" md="3" lg="3" xl="3" v-for="item in items" :key="item.id">
            <v-card flat outlined>
              <v-img :src="item.media.url" height="194"></v-img>

              <v-card-text
                :id="item.id"
                class="black--text mt-2 mx-1 text-center caption"
              >{{pVal(item.media,'origin_filename')}}</v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon @click="copyText(item.media.url)">mdi-content-copy</v-icon>
                </v-btn>
                <v-btn icon @click="hapus(item)">
                  <v-icon color="red">mdi-trash-can-outline</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      items: [],
      textSearch: null,
      page: null,
      cp: 1,
      more_menu: [
        // eslint-disable-next-line
        {
          title: "Hapus",
          click: (i, o) => this.hapus(o)
        }
      ]
    };
  },
  computed: {
    headers() {
      const a = [
        { text: "", align: "left", value: "" },
        { text: "", align: "left", value: "" },
        { text: "", align: "left", value: "" },
        { text: "", align: "left", value: "" },
        { text: "", sortable: false }
      ];
      return a;
    }
  },
  activated() {
    this.load();
  },
  methods: {
    load() {
      return this.$store
        .dispatch("media/get", {
          params: {
            post_type_id: 3,
            page: this.cp,
            s: this.textSearch
          }
        })
        .then(res => {
          this.items = res;
        })
        .catch(e => e);
    },
    copyText(url) {
      this.$copyText(url)
        .then(() => {
          this.$info("URL media berhasil di copy");
        })
        .catch(() => {
          this.$info("URL media gagal di copy");
        });
    },
    hapus(item) {
      this.$confirm(
        `Apakah Anda yakin akan menghapus media ini ?<br>
        <div class="mt-2 caption grow text-center">
          ${item.media.origin_filename}<br>
        </div>`
      )
        .then(() => this.$store.dispatch("media/drop", item))
        .then(() => {
          this.$info(
            "Media " + item.media.origin_filename + " berhasil dihapus"
          );
        })
        .then(() => this.load())
        .catch(e => e);
    }
  },
  watch: {}
};
</script>
