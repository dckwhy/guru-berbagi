<template>
  <v-btn @click="login" v-bind="$attrs">
    <v-icon small class="mr-2">fas fa-sign-in-alt</v-icon>Login
  </v-btn>
</template>

<script>
import { BASE_API } from '@/const'
export default {
  inheritAttrs: false,
  data() {
    return {
      menu: false,
    }
  },
  mounted() {
    window.addEventListener('message', this.onMessage, false)
  },
  beforeDestroy() {
    window.removeEventListener('message', this.onMessage)
  },
  methods: {
    login() {
      let newWindow = this.openWindow('', 'Login')
      newWindow.location.href = BASE_API
      // .then(() => {
      //     return this.$store.dispatch('fetchUser')
      // })
      // .then(() => {
      //   this.$router.push({ name: 'instansi' })
      // })
    },
    openWindow(url, title, w = 600, h = 700) {
      var top = (screen.height / 2) - (h / 2);
      var left = (screen.width / 2) - (w / 2);
      var newWindow = window.open(url, title,
        `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no,
        copyhistory=no, width=${w}, height=${h}', top=${top}, left=${left}`
      );

      if (window.focus) {
        newWindow.focus();
      }

      return newWindow;
    },
    onMessage(e) {
      if (e.origin !== BASE_API || !e.data.token) {
        return
      }
      this.$store.dispatch('user/saveToken', {
        token: e.data.token
      })
        .then(() => {
          return this.$store.dispatch('user/fetch')
        })
        .then(() => {
          this.$router.push({ name: 'instansi' })
        })
    },
  }
}
</script>
