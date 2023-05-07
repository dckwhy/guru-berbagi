// vue.config.js
module.exports = {
  publicPath: "./",
  transpileDependencies: [
    "vuetify",
    /\/node_modules\/vue-echarts\//,
    /\/node_modules\/resize-detector\//
  ],
  // css: {
  //   loaderOptions: {
  //     sass: {
  //       data: `@import "~@/assets/sass/variables.scss"`
  //     }
  //   }
  // },
  configureWebpack: {
    // We provide the app's title in Webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: process.env.VUE_APP_TITLE
    // Set up all the aliases we use in our app.
  },
  pwa: {
    name: "App Guru Berbagi",
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "./src/service-worker.js"
      // exclude: [/\.htaccess$/]
    }
  }
};
