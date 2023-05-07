const router = [
  {
    path: "/riwayat-kurasi-plagiasi",
    name: "riwayatKurasiPlagiasi",
    meta: {
      auth: true
    },
    component: () => import("./pages/ListPlagiasi.vue")
  },
  {
    path: "/riwayat-kurasi-substansi",
    name: "riwayatKurasiSubstansi",
    meta: {
      auth: true
    },
    component: () => import("./pages/List.vue")
  },
  {
    path: "/riwayat-kurasi-laporan",
    name: "riwayatKurasiLaporan",
    meta: {
      auth: true
    },
    component: () => import("./pages/Laporan.vue")
  }
];

export default router;
