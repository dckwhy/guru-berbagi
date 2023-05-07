const router = [
  {
    path: "/kurasiAksi",
    name: "kurasiAksi",
    meta: {
      auth: true
    },
    component: () => import("./pages/List.vue")
  },
  {
    path: "/kurasiAksi/:rpp_id",
    name: "kurasiAksi.detail",
    meta: {
      auth: true
    },
    component: () => import("./pages/Detail.vue")
  }
];

export default router;
