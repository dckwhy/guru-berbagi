const router = [
  {
    path: "/home",
    name: "home",
    meta: {
      auth: true
    },
    component: () => import("./pages/Home")
  }
];

export default router;
