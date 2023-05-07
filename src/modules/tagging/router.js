const router = [
  {
    path: "/tagging/matapelajaran",
    name: "tagging.matapelajaran",
    meta: {
      auth: true
    },
    component: () => import("./pages/ListMapel.vue")
  },
  {
    path: "/tagging/jenjang",
    name: "tagging.jenjang",
    meta: {
      auth: true
    },
    component: () => import("./pages/ListJenjang.vue")
  },
  {
    path: "/tagging/tingkat",
    name: "tagging.tingkat",
    meta: {
      auth: true
    },
    component: () => import("./pages/ListTingkat.vue")
  }
];

export default router;
