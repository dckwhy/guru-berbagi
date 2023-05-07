<template>
  <v-navigation-drawer v-model="drawer" right temporary fixed width="250">
    <v-card flat>
      <!-- <v-img
        class="white--text"
        height="200px"
        src="https://cdn.siap.id/s3/simpkb/asset img/Guru-Berbagi/illustrasi/guru-4.png"
      >-->
      <div class="primary">
        <v-container fill-height container--fluid>
          <v-row fill-height>
            <v-col class="text-center" cols="12" align-end flexbox>
              <!-- <router-link class="ok"> -->
              <v-avatar :size="150" color="grey lighten-4">
                <img
                  v-if="user.image"
                  :src="user.image.url.logo"
                  alt="avatar"
                />
                <img v-else src="img/avatar-default-full.png" alt="avatar" />
              </v-avatar>
              <!-- </router-link> -->
            </v-col>
          </v-row>
        </v-container>
      </div>

      <!-- </v-img> -->
      <div class="pt-3 px-3">
        <p class="subtitle mb-0 font-weight-bold">{{ user.name }}</p>
        <p class="caption mb-0 grey--text">{{ user.email }}</p>
      </div>
      <v-divider class="mt-2"></v-divider>
      <v-list dense>
        <span class="caption grey--text ml-3 mb-0">Hak Akses Anda</span>
        <v-list-item class="grey--text">
          <v-list-item-action
            v-if="user.is_super_admin == 1 || user.change"
            @click="switchRole"
          >
            <v-icon>mdi-swap-horizontal-bold</v-icon>
          </v-list-item-action>
          <v-list-item-content v-if="user && user.peran">
            <v-list-item-title>
              {{ user.peran.name | toTitleCase }}
              {{ user.is_simpatika ? "Kemenag" : "" }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider class="mb-2"></v-divider>
        <span class="caption grey--text ml-3 mb-0">Akun</span>
        <v-list-item class="grey--text" @click="toProfile">
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{
              current_user.peran.id == 4 ? "Profil Komunitas" : "Profil"
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item class="grey--text" @click="logout">
          <v-list-item-action>
            <v-icon>mdi-logout-variant</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Keluar</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      drawer: false
    };
  },
  computed: {
    rDrawer() {
      return this.$store.getters["main/rDrawer"];
    },
    user() {
      return this.$store.getters["user/user"];
    },
    token() {
      return this.$store.getters["user/token"];
    }
  },
  methods: {
    toProfile() {
      this.$router.push({
        name: "profil"
      });
    },
    switchRole() {
      this.$confirm(
        `Silakan pilih Peran`,
        {
          role: [
            { id: 1, name: "Admin" },
            { id: 2, name: "Kontributor" },
            { id: 3, name: "Kurator" }
          ]
        },
        "Pilih Peran"
      )
        .then(res => {
          var obj = {
            name: this.user.name,
            no_hp: this.user.no_hp,
            change: true,
            peran: {
              id: res.role,
              name:
                res.role == 1
                  ? "Administrator"
                  : res.role == 2
                  ? "Kontributor"
                  : "Kurator"
            }
          };
          return this.$store.commit("user/setUser", obj);
        })
        .then(() => {
          // this.$router.push({
          //   name: "home"
          // });
        })
        .catch(e => e);
    },
    logout() {
      this.drawer = false;
      this.$store
        .dispatch("user/logout")
        // .then(() => this.$router.push({ name: "login" }))
        .catch(e => e);
    }
  },
  watch: {
    rDrawer(n) {
      this.drawer = n;
    },
    drawer(n) {
      this.$store.commit("main/setRDrawer", n);
    }
  }
};
</script>

<style></style>
