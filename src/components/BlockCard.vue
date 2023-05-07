<template>
  <v-card outlined class="my-2 mx-auto" v-bind="$attrs" v-on="$listeners" @click="showDetail">
    <v-card-text class="my-0 py-0">
      <v-row v-if="is_organisasi">
        <v-col cols="4">
          <v-avatar class="ma-3" size="75" tile>
            <v-img :src="logo"></v-img>
          </v-avatar>
        </v-col>
        <v-col cols="8">
          <div>
            <div class="text-left mt-4">
              <span class="black--text subtitle font-weight-bold">
                {{
                title | toTitleCase | truncate(33)
                }}
              </span>
            </div>

            <div v-if="author" class="caption text-left">
              Oleh :
              <span class="primary--text">{{ author | toTitleCase }}</span>
            </div>
            <div v-if="jenis" class="caption text-left">
              Jenis :
              <span class="green--text">{{ jenis | toTitleCase }}</span>
            </div>
            <div v-if="jenis" class="caption text-left">
              Berakhir Pada :
              <span class="green--text">{{ expired | toTitleCase }}</span>
            </div>
          </div>
        </v-col>
      </v-row>
      <div class="d-flex flex-no-wrap" v-else>
        <v-avatar class="ma-3" size="75" tile>
          <v-img :src="logo"></v-img>
        </v-avatar>
        <div>
          <div class="text-left mt-4">
            <span class="black--text subtitle font-weight-bold">
              {{
              title | toTitleCase | truncate(25)
              }}
            </span>
          </div>

          <div v-if="author" class="text-left">
            Oleh :
            <span class="primary--text">{{ author | toTitleCase }}</span>
          </div>
          <div v-if="jenis" class="text-left">
            Jenis :
            <span class="green--text">{{ jenis | toTitleCase }}</span>
          </div>
          <div v-if="expired" class="text-left">
            Berakhir Pada :
            <span class="green--text">{{ expired | toDT }}</span>
          </div>
        </div>
      </div>
    </v-card-text>
    <v-card-actions class="mt-0 pt-0" v-if="is_organisasi">
      <v-spacer></v-spacer>
      <v-btn depressed text small @click="remove" color="red">Hapus</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    is_organisasi: {
      type: Boolean,
      default: false
    },
    select: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: 0
    },
    value: {
      type: Object,
      default: null
    },
    title: {
      type: String,
      default: "Title"
    },
    expired: {
      type: String,
      default: ""
    },
    author: {
      type: String,
      default: ""
    },
    jenis: {
      type: String,
      default: ""
    },
    link: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "primary"
    },
    icon: {
      type: String,
      default: null
    },
    logo: {
      type: String,
      default: null
    },
    height: {
      type: Number,
      default: 150
    }
  },
  mounted() {
    this.check = false;
  },
  data() {
    return {
      check: false
    };
  },
  methods: {
    remove() {
      this.$emit("deselect");
    },
    showDetail() {
      this.$emit("showDetail");
    }
  },
  watch: {
    check(n) {
      if (n) {
        this.$emit("select");
      } else {
        this.$emit("deselect");
      }

      return n;
    }
  }
};
</script>

<style></style>
