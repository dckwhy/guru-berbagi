const router = [
  {
    path: "/media",
    name: "media",
    meta: {
      auth: true
    },
    component: () => import("./pages/List.vue")
  }
];

export default router;
