const router = [
  {
    path: "/artikel",
    name: "artikel",
    meta: {
      auth: true
    },
    component: () => import("./pages/List.vue")
  },
  {
    path: "/artikel-cgp",
    name: "artikel.cgp",
    meta: {
      auth: true
    },
    component: () => import("./pages/ListCGP.vue")
  },
  {
    path: "/artikel/:rpp_id",
    name: "artikel.detail",
    meta: {
      auth: true
    },
    component: () => import("./pages/Detail.vue")
  }
];

export default router;
