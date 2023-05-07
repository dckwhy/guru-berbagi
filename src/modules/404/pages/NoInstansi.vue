<template>
  <v-layout wrap fill-height justify-center align-center>
    <v-flex md8 xs12>
      <v-card class="ra-2 pa-4">
        <v-flex xs12 layout justify-center align-center>
          <span class="display-4 font-weight-light mr-4 orange--text">404</span>
          <v-layout wrap>
            <v-flex xs12>
              <p class="orange--text">
                <strong>Mohon maaf, Desa yang Anda tuju tidak ditemukan</strong>
                <br />Silakan klik tombol di bawah ini untuk kembali ke halaman depan
              </p>
            </v-flex>
            <v-flex xs12>
              <v-btn :to="{name:'instansi.pilih'}" class="ma-0 mt-3" color="error">Pilih Desa</v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {};
</script>

<style>
</style>
