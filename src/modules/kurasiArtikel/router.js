const router = [
  {
    path: "/kurasiArtikel",
    name: "kurasiArtikel",
    meta: {
      auth: true
    },
    component: () => import("./pages/List.vue")
  },
  {
    path: "/kurasiArtikelPlagiasi",
    name: "kurasiArtikelPlagiasi",
    meta: {
      auth: true
    },
    component: () => import("./pages/ListPlagiasi.vue")
  },
  {
    path: "/kurasiArtikel/:rpp_id",
    name: "kurasiArtikel.detail",
    meta: {
      auth: true
    },
    component: () => import("./pages/Detail.vue")
  }
];

export default router;
