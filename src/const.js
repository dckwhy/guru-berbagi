export const ENV = process.env.VUE_APP_SERVER || "DEVEL";
export const API = process.env.VUE_APP_API;
export const BASE_API = process.env.VUE_APP_BASE;
export const PORTAL = process.env.VUE_APP_PORTAL;
export const COPYRIGHT =
  process.env.VUE_APP_COPYRIGHT || "&copy;" + new Date().getFullYear();
export const LOGO = process.env.VUE_APP_LOGO;

export const TAWK_SRC = process.env.VUE_APP_TAWK_SRC;
export const GMAP_KEY = process.env.VUE_APP_GMAP_KEY;
export const CLIENT_ID = process.env.VUE_APP_CLIENT_ID;
export const CLIENT_SECRET = process.env.VUE_APP_CLIENT_SECRET;
export const SITE_KEY = process.env.VUE_APP_RECAPTCHA_SITE_KEY;
export const DSN_SENTRY = process.env.VUE_APP_DSN_SENTRY;
export const GA = process.env.VUE_APP_GA;
export const MAMOTO = process.env.VUE_APP_MAMOTO;
export const MAMOTO_SITE_ID = process.env.VUE_APP_MAMOTO_SITE_ID || 0;
export const MAX_UPLOAD_SIZE = process.env.VUE_APP_MAX_UPLOAD_SIZE || 10;

export const SOP_REGISTRASI = process.env.VUE_APP_SOP_REGISTRASI;
export const SOP_ARTIKEL = process.env.VUE_APP_SOP_ARTIKEL;
export const SOP_RPP = process.env.VUE_APP_SOP_RPP;
export const POSTER_RPP = process.env.VUE_APP_POSTER_RPP;
export const GURUBELAJAR = process.env.VUE_APP_GURUBELAJAR;

export const THEME_DEF = {
  primary: "#26A69A",
  secondary: "#B2DFDB",
  accent: "#FFC107",
  error: "#f44336",
  warning: "#ffeb3b",
  info: "#2196f3",
  success: "#4caf50"
};
export const THEME_PRIMS = {
  primary: "#106550",
  secondary: "#A5D6A7",
  accent: "#FBC02D",
  error: "#f44336",
  warning: "#FFCA28",
  info: "#2196f3",
  success: "#4caf50"
};
export const THEME_MONEVMT = {
  primary: "#0dbbfa",
  secondary: "#FF9800",
  judul: "#009688",
  subjudul: "#757575",
  accent: "#0D47A1",
  error: "#f44336",
  warning: "#ffeb3b",
  info: "#2196f3",
  success: "#4caf50"
};

export const KELAMIN = [
  {
    id: "L",
    label: "Laki-laki"
  },
  {
    id: "P",
    label: "Perempuan"
  }
];

export const ROLE_ADMIN = {
  id: 1,
  name: process.env.VUE_APP_ADMIN || "Admin"
};
export const ROLE_GURU = {
  id: 2,
  name: process.env.VUE_APP_GURU || "Kontributor"
};
export const ROLE_KURATOR = {
  id: 3,
  name: process.env.VUE_APP_KURATOR || "Kurator"
};
export const ROLE_KOMUNITAS = {
  id: 4,
  name: "Komunitas"
};
