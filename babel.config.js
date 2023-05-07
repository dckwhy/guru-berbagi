// module.exports = {
//   presets: ["@babel/preset-env"],
//   plugins: [
//     [
//       "transform-imports",
//       {
//         vuetify: {
//           transform: "vuetify/es5/components/${member}",
//           preventFullImport: true
//         }
//       }
//     ]
//   ]
// };
module.exports = {
  presets: [
    [
      "@vue/app",
      {
        useBuiltIns: "entry"
      }
    ]
  ],
  plugins: [
    [
      "transform-imports",
      {
        vuetify: {
          transform: "vuetify/es5/components/${member}",
          preventFullImport: true
        }
      }
    ]
  ]
};
