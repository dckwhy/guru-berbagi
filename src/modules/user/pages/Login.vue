<template>
  <v-container container--fluid fill-height> </v-container>
</template>

<script>
import VueRecaptcha from "vue-recaptcha";
import { SITE_KEY, BASE_API } from "@/const";
const lc = window.localStorage;
const TOKEN = "gbtoken";
export default {
  components: {
    VueRecaptcha
  },
  $_veeValidate: {
    validator: "new"
  },
  data: () => ({
    drawer: true,
    loading: false,
    appendIcon: "mdi-eye-off",
    passwordFieldType: "password",
    switchForgotPassword: false,
    errorMessage: false,
    registerForm: {
      recaptchaVerified: false,
      pleaseTickRecaptchaMessage: ""
    },
    model: {
      email: null,
      password: null,
      grant_type: null
    }
  }),
  mounted() {
    lc.removeItem(TOKEN);
    this.$validator.reset();
    this.checkQuery();
  },
  computed: {
    sitekey() {
      return SITE_KEY;
    }
  },
  methods: {
    checkQuery() {
      if (this.$route.query.token) {
        this.token = this.$route.query.token;
        // clean query
        window.history.replaceState({}, document.title, "/login");
        // langsung lakukan verifikasi
        this.$nextTick(() => {
          this.verify();
        });
      } else {
        if (lc.getItem(TOKEN)) {
          this.$router.push({ name: "home" });
        } else {
          window.location.href = BASE_API;
        }
      }
    },
    verify() {
      this.$validator
        .validateAll("form-1")
        .then(res => {
          if (!res) return Promise.reject();
        })
        .then(() => {
          this.loading = true;
          this.$store
            .dispatch("user/login", { token: this.token })
            .then(res => {
              this.loading = false;
              res.id ? this.st++ : Promise.reject;
            })
            .catch(() => {
              this.loading = false;
            });
        })
        .catch(e => e);
    },
    // eslint-disable-next-line
    markRecaptchaAsVerified(response) {
      this.registerForm.pleaseTickRecaptchaMessage = "";
      this.registerForm.recaptchaVerified = true;
    },
    // eslint-disable-next-line
    checkIfRecaptchaVerified() {
      if (!this.registerForm.recaptchaVerified) {
        this.registerForm.pleaseTickRecaptchaMessage = "Please tick recaptcha.";
        return true; // prevent form from submitting
      }
    },
    login() {
      return this.$store.dispatch("user/login", {});
    },
    registrasi() {
      this.$router.push({ name: "user.registrasi" });
    }
  }
};
</script>
<style scoped lang="css">
#login {
  font-family: "Roboto Condensed", sans-serif;
  position: relative;
  font-weight: 400;
}
.logo {
  height: 60px;
  margin-bottom: 2rem !important;
}
.divanim {
  position: relative;
  -webkit-animation-name: example; /* Safari 4.0 - 8.0 */
  -webkit-animation-duration: 3s; /* Safari 4.0 - 8.0 */
  -webkit-animation-fill-mode: forwards; /* Safari 4.0 - 8.0 */
  animation-name: example;
  animation-duration: 1s;
  animation-fill-mode: forwards;
}
/* Safari 4.0 - 8.0 */
@-webkit-keyframes example {
  from {
    top: -200px;
  }
  to {
    top: 0px;
  }
}

@keyframes example {
  from {
    top: -200px;
  }
  to {
    top: 0px;
  }
}

body {
  padding: 0 !important;
  margin: 0 !important;
  background: #90cbe6;
  position: relative;
}
.rightpanel {
  background: #90cbe6;
}
.bg {
  /* The image used */
  background-image: url("https://cdn.siap.id/s3/simpkb/asset img/Guru-Berbagi/illustrasi/guru-4.png");

  /* Full height */
  height: 100%;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.laptop {
  position: fixed;
  width: 606px;
  height: 447px;
  background: url(/img/background.jpg) repeat scroll 0 0;
  bottom: 0;
  left: 0;
}

.footer {
  min-height: 100vh;
}

.write {
  position: fixed;
  width: 441px;
  height: 340px;
  background: url(/img/write.png) repeat scroll 0 0;
  bottom: 0;
  right: 0;
}

.paper {
  background: url(/img/paper.png) repeat scroll 0 0;
  bottom: -130px;
  height: 318px;
  right: 480px;
  position: fixed;
  width: 289px;
}

.panel {
  border: none;
  box-shadow: none;
  padding: 20px;
  box-shadow: 2px 2px 5px #649ddd;
}

.rounded-card {
  border-radius: 15px;
}
</style>
