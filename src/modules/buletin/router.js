const router = [
  {
    path: "/buletin",
    name: "buletin",
    meta: {
      auth: true
    },
    component: () => import("./pages/List.vue")
  },
  {
    path: "/buletin/:rpp_id",
    name: "buletin.detail",
    meta: {
      auth: true
    },
    component: () => import("./pages/Detail.vue")
  }
];

export default router;
