const router = [
  {
    path: "/rpp",
    name: "rpp",
    meta: {
      auth: true
    },
    component: () => import("./pages/List.vue")
  },
  {
    path: "/rpp/cari",
    name: "rpp.cari",
    meta: {
      auth: true
    },
    component: () => import("./pages/Pencarian.vue")
  },
  {
    path: "/rpp/:rpp_id",
    name: "rpp.detail",
    meta: {
      auth: true
    },
    component: () => import("./pages/Detail.vue")
  }
];

export default router;
