<template>
  <v-container container--fluid fill-height class="white">
    <v-row justify="center" align="center">
      <v-col cols="5" class="text-left">
        <div class="ml-2">
          <p class="display-1 black--text">Error 43! Anda tidak memiliki akses ke halaman ini</p>
          <v-btn depressed :to="{name:'home'}" class="ma-0 mt-3" color="yellow">Kembali</v-btn>
        </div>
      </v-col>
      <v-col cols="7" class="text-center ma-0 pa-0">
        <v-img
          src="https://cdn.siap.id/s3/asset illustrasi/Illustrasi/error.png"
          lazy-src="https://cdn.siap.id/s3/asset illustrasi/Illustrasi/error.png"
          max-height="700px"
          contain
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center">
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style scoped>
.v-main__wrap {
  background-color: white;
}
</style>
