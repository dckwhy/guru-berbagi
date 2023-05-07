const router = [
  {
    path: "/log",
    name: "log",
    meta: {
      auth: true
    },
    component: () => import("./pages/List.vue")
  }
];

export default router;
