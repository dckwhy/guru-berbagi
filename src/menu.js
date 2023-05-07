import { isCan } from "@/tools";
import { PORTAL } from "@/const";

const store = {
  namespaced: true,
  getters: {
    judul_rpp(state, getters, rootState, rootGetters) {
      const i = rootGetters["user/user"];
      return i && i.peran.id == 2 ? "RPP Saya" : "RPP";
    },
    judul_video(state, getters, rootState, rootGetters) {
      const i = rootGetters["user/user"];
      return i && i.peran.id == 2 ? "Video Saya" : "Video";
    },
    judul_artikel(state, getters, rootState, rootGetters) {
      const i = rootGetters["user/user"];
      return i && i.peran.id == 2 ? "Artikel" : "Artikel";
    },
    kurator_plagiat(state, getters, rootState, rootGetters) {
      const i = rootGetters["user/user"];
      return i && i.is_kurator_plagiat
        ? true
        : i.is_super_admin
        ? true
        : i.peran && i.peran.id == 1
        ? true
        : false;
    },
    admin(state, getters, rootState, rootGetters) {
      const i = rootGetters["user/user"];
      return i && i.peran && i.peran.id == 1 ? true : false;
    },
    // eslint-disable-next-line
    menus(state, getters, rootState, rootGetters) {
      const u = rootGetters["user/user"];
      return [
        {
          icon: "mdi-home-variant-outline",
          title: "Beranda SIM",
          new: false,
          to: {
            name: "home"
          },
          hidden: false
        },
        {
          subheader: true,
          title: "Fitur Anda"
        },
        {
          icon: "mdi-magnify",
          title: "Pencarian Berkas RPP",
          new: false,
          to: {
            name: "rpp.cari"
          },
          hidden: !isCan("artikel_kurasi")
        },

        {
          icon: "mdi-file-document-edit",
          title: "Kelola",
          open: u.peran.id == 2 ? true : false,
          demo: false,
          hidden: false,
          items: [
            {
              icon: "mdi-account",
              title: "Pengguna",
              new: false,
              to: {
                name: "user"
              },
              hidden: !isCan("user")
            },
            {
              icon: "mdi-newspaper",
              title: "Buletin",
              new: false,
              to: {
                name: "buletin"
              },
              hidden: !isCan("newsletter_read")
            },
            {
              icon: "mdi-book",
              title: getters["judul_rpp"],
              new: false,
              to: {
                name: "rpp"
              },
              hidden: !isCan("rpp_read")
            },

            {
              icon: "mdi-book-open-variant",
              title: getters["judul_artikel"],
              new: false,
              to: {
                name: "artikel"
              },
              hidden: !isCan("artikel_read")
            },
            {
              icon: "mdi-book-open-variant",
              title: "Catatan Guru Penggerak",
              new: false,
              to: {
                name: "artikel.cgp"
              },
              hidden: !isCan("cerita_read")
            },
            {
              icon: "mdi-video",
              title: getters["judul_video"],
              new: true,
              to: {
                name: "video"
              },
              hidden: !isCan("video_read")
            },
            {
              icon: "mdi-bookmark-check",
              title: "Aksi",
              new: false,
              to: {
                name: "aksi"
              },
              hidden: !isCan("aksi_read")
            },
            {
              icon: "mdi-youtube",
              title: "Streaming Video",
              new: true,
              to: {
                name: "streaming"
              },
              hidden: false
            }
          ]
        },
        {
          icon: "mdi-file-document-box-check",
          title: "Kurasi",
          open: false,
          demo: false,
          hidden: !isCan("artikel_kurasi"),
          items: [
            {
              icon: "mdi-book-open",
              title: "Plagiasi Artikel",
              new: false,
              to: {
                name: "kurasiArtikelPlagiasi"
              },
              hidden: !getters["kurator_plagiat"]
            },
            {
              icon: "mdi-book-open-page-variant",
              title: "Substansi Artikel",
              new: false,
              to: {
                name: "kurasiArtikel"
              },
              hidden: !isCan("artikel_kurasi")
            },

            {
              icon: "mdi-video",
              title: "Video",
              new: true,
              to: {
                name: "kurasiVideo"
              },
              hidden: !isCan("video_approve")
            },

            {
              icon: "mdi-bookmark-check",
              title: "Aksi",
              new: true,
              to: {
                name: "kurasiAksi"
              },
              hidden: !isCan("aksi_approve")
            }
          ]
        },
        {
          icon: "mdi-history",
          title: "Riwayat Kurasi",
          demo: false,
          new: true,
          hidden: !isCan("artikel_kurasi"),
          items: [
            {
              icon: "mdi-account",
              title: "Plagiasi",
              new: false,
              to: {
                name: "riwayatKurasiPlagiasi"
              }
            },
            {
              icon: "mdi-newspaper",
              title: "Substansi",
              new: false,
              to: {
                name: "riwayatKurasiSubstansi"
              }
            },
            {
              icon: "mdi-book",
              title: "Laporan",
              new: false,
              to: {
                name: "riwayatKurasiLaporan"
              },
              hidden: !getters["admin"]
            }
          ]
        },
        {
          icon: "mdi-alert",
          title: "Laporan Konten",
          new: false,
          to: {
            name: "pengawasan"
          },
          hidden: !getters["admin"]
        },
        {
          subheader: true,
          title: "Fitur Lain"
        },
        {
          icon: "mdi-account-question",
          title: "Forum Bantuan",
          new: false,
          to: {
            name: "bantuan"
          },
          hidden: !isCan("bantuan")
        },

        {
          icon: "mdi-help-box",
          title: "Bantuan",
          new: false,
          to: {
            name: "sop"
          },
          hidden: false
        },
        {
          icon: "mdi-history",
          title: "Log Sistem",
          new: false,
          to: {
            name: "log"
          },
          hidden: !isCan("log_read")
        },
        {
          icon: "mdi-web",
          title: "Portal",
          href: PORTAL
        }
      ];
    }
  }
};

export default store;
