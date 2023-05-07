const router = [
  {
    path: "/bantuan",
    name: "bantuan",
    meta: {
      auth: true
    },
    component: () => import("./pages/List.vue")
  },
  {
    path: "/bantuan/sop",
    name: "sop",
    meta: {
      auth: true
    },
    component: () => import("./pages/SOP.vue")
  },
  {
    path: "/faq",
    name: "faq",
    meta: {
      auth: true
    },
    component: () => import("./pages/FAQ.vue")
  },
  {
    path: "/bantuan/:rpp_id",
    name: "bantuan.detail",
    meta: {
      auth: true
    },
    component: () => import("./pages/Detail.vue")
  }
];

export default router;
