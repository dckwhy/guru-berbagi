const router = [
  {
    path: "/kurasiVideo",
    name: "kurasiVideo",
    meta: {
      auth: true
    },
    component: () => import("./pages/List.vue")
  },
  {
    path: "/kurasiVideo/:rpp_id",
    name: "kurasiVideo.detail",
    meta: {
      auth: true
    },
    component: () => import("./pages/Detail.vue")
  }
];

export default router;
