const router = [
  {
    path: "/aksi",
    name: "aksi",
    meta: {
      auth: true,
    },
    component: () => import("./pages/List.vue"),
  },
  {
    path: "/aksi/:aksi_id",
    name: "aksi.detail",
    meta: {
      auth: true,
    },
    component: () => import("./pages/Detail.vue"),
  },
];

export default router;
