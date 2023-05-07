import axios from "axios";
import { API } from "../../const";
import { normParam } from "@/tools";

const store = {
  namespaced: true,
  state: {
    buletin: null,
    kegiatan_id: null
  },
  getters: {
    buletin(state) {
      return state.buletin;
    },
    kegiatan_id(state) {
      return state.kegiatan_id;
    }
  },
  mutations: {
    setKegiatan(state, val) {
      state.buletin = val;
    }
  },
  actions: {
    // eslint-disable-next-line
    get(_, { params }) {
      return axios
        .get(`${API}/newsletter${normParam(params)}`)
        .then(res => {
          return res.data;
        })
        .catch(err => Promise.reject(err));
    },
    // eslint-disable-next-line
    getRpp(_, { params }) {
      return axios
        .get(`${API}/letter${normParam(params)}`)
        .then(res => {
          return res.data;
        })
        .catch(err => Promise.reject(err));
    },
    // eslint-disable-next-line
    getArtikel(_, { params }) {
      return axios
        .get(`${API}/letter${normParam(params)}`)
        .then(res => {
          return res.data;
        })
        .catch(err => Promise.reject(err));
    },
    // eslint-disable-next-line
    getAksi(_, { params }) {
      return axios
        .get(`${API}/letter${normParam(params)}`)
        .then(res => {
          return res.data;
        })
        .catch(err => Promise.reject(err));
    },
    // eslint-disable-next-line
    getTag(_, { params }) {
      return axios
        .get(`${API}/tags${normParam(params)}`)
        .then(res => {
          return res.data;
        })
        .catch(err => Promise.reject(err));
    },
    submit(_, { obj }) {
      let formDataBacaan = new FormData();
      formDataBacaan.append("id", obj.id);
      formDataBacaan.append("status", 3);

      return axios.post(`${API}/newsletter/${obj.id}`, formDataBacaan, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
    },
    tambah(_, { obj }) {
      if (obj.id) {
        let formDataBacaan = new FormData();
        formDataBacaan.append("id", obj.id);
        formDataBacaan.append("post_type_id", 4);
        formDataBacaan.append("judul", obj.judul);
        formDataBacaan.append("deskripsi", obj.deskripsi);
        obj.letterrpp.forEach((letter_rpp, i) => {
          formDataBacaan.append("letter_rpp[" + i + "]", letter_rpp.id);
        });
        obj.letterartikel.forEach((letter_artikel, j) => {
          formDataBacaan.append("letter_artikel[" + j + "]", letter_artikel.id);
        });
        obj.letteraksi.forEach((letter_aksi, k) => {
          formDataBacaan.append("letter_aksi[" + k + "]", letter_aksi.id);
        });
        if (obj.cover) {
          formDataBacaan.append("cover", obj.cover);
        }
        return axios.post(`${API}/newsletter/${obj.id}`, formDataBacaan, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
      } else {
        let formDataBacaan = new FormData();
        formDataBacaan.append("post_type_id", 4);
        formDataBacaan.append("judul", obj.judul);
        formDataBacaan.append("deskripsi", obj.deskripsi);
        obj.letterrpp.forEach((letter_rpp, i) => {
          formDataBacaan.append("letter_rpp[" + i + "]", letter_rpp.id);
        });
        obj.letterartikel.forEach((letter_artikel, j) => {
          formDataBacaan.append("letter_artikel[" + j + "]", letter_artikel.id);
        });
        obj.letteraksi.forEach((letter_aksi, k) => {
          formDataBacaan.append("letter_aksi[" + k + "]", letter_aksi.id);
        });
        if (obj.cover) {
          formDataBacaan.append("cover", obj.cover);
        }
        return axios.post(`${API}/newsletter`, formDataBacaan, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
      }
    },
    uploadImage(_, file) {
      let formImageUpload = new FormData();
      formImageUpload.append("file", file);

      return axios.post(`${API}/upload`, formImageUpload, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
    },
    ajukan(_, { obj }) {
      var objVerval = {
        id: obj.id,
        judul: obj.judul,
        status: 2
      };
      return axios.post(`${API}/newsletter/${obj.id}`, objVerval);
    },

    batalSetujui(_, { obj }) {
      var objVerval = {
        id: obj.id,
        status: 1
      };
      return axios.post(`${API}/newsletter/${obj.id}/unapprove`, objVerval);
    },

    drop(_, buletin) {
      return axios.delete(`${API}/newsletter/${buletin.id}`).then(res => {
        return res.data;
      });
    }
  }
};

export default store;
