const router = [
  {
    path: "/streaming",
    name: "streaming",
    meta: {
      auth: true
    },
    component: () => import("./pages/List.vue")
  },
  {
    path: "/streaming/:streaming_id",
    name: "streaming.detail",
    meta: {
      auth: true
    },
    component: () => import("./pages/Detail.vue")
  }
];

export default router;
