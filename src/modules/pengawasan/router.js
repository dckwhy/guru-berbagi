const router = [
  {
    path: "/pengawasan",
    name: "pengawasan",
    meta: {
      auth: true
    },
    component: () => import("./pages/List.vue")
  },
  {
    path: "/pengawasan/:rpp_id",
    name: "pengawasan.detail",
    meta: {
      auth: true
    },
    component: () => import("./pages/Detail.vue")
  }
];

export default router;
