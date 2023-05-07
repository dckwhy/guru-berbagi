import axios from "axios";
import { API } from "../../const";
import { normParam } from "@/tools";

const store = {
  namespaced: true,
  state: {
    artikel: null,
    kegiatan_id: null
  },
  getters: {
    artikel(state) {
      return state.artikel;
    },
    kegiatan_id(state) {
      return state.kegiatan_id;
    }
  },
  mutations: {
    setKegiatan(state, val) {
      state.artikel = val;
    }
  },
  actions: {
    // eslint-disable-next-line
    get(_, { params }) {
      return axios
        .get(`${API}/artikel${normParam(params)}`)
        .then(res => {
          return res.data;
        })
        .catch(err => Promise.reject(err));
    },
    // eslint-disable-next-line
    getCerita(_, { params }) {
      return axios
        .get(`${API}/cerita${normParam(params)}`)
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

      return axios.post(`${API}/artikel/${obj.id}`, formDataBacaan, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
    },
    tambah(_, { obj }) {
      if (obj.id) {
        let formDataBacaan = new FormData();
        formDataBacaan.append("id", obj.id);
        formDataBacaan.append("post_type_id", 2);
        formDataBacaan.append("judul", obj.judul);
        formDataBacaan.append("jenis", obj.jenis);
        formDataBacaan.append("deskripsi", obj.deskripsi);
        if (obj.penulis_asli) {
          formDataBacaan.append("penulis_asli", obj.penulis_asli);
        }
        formDataBacaan.append("rpp_id", obj.rpp_id);
        formDataBacaan.append("mapel[1]", obj.jenjang);
        formDataBacaan.append("mapel[2]", obj.tingkat);
        formDataBacaan.append("mapel[0]", obj.mata_pelajaran);
        formDataBacaan.append("sumber_file", obj.sumber_file);
        formDataBacaan.append("sumber_penulis", obj.sumber_penulis);
        obj.tags.forEach(function(value, i) {
          if (typeof value == "object") {
            formDataBacaan.append("tags[" + i + "]", value.nama);
          } else {
            formDataBacaan.append("tags[" + i + "]", value);
          }
        });

        if (obj.cover) {
          formDataBacaan.append("cover", obj.cover);
        }
        return axios.post(`${API}/artikel/${obj.id}`, formDataBacaan, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
      } else {
        let formDataBacaan = new FormData();
        formDataBacaan.append("judul", obj.judul);
        formDataBacaan.append("post_type_id", 2);
        formDataBacaan.append("jenis", obj.jenis);
        formDataBacaan.append("deskripsi", obj.deskripsi);
        if (obj.penulis_asli) {
          formDataBacaan.append("penulis_asli", obj.penulis_asli);
        }
        formDataBacaan.append("sumber_file", obj.sumber_file);
        formDataBacaan.append("rpp_id", obj.rpp_id);
        formDataBacaan.append("mapel[1]", obj.jenjang);
        formDataBacaan.append("mapel[2]", obj.tingkat);
        formDataBacaan.append("mapel[0]", obj.mata_pelajaran);
        formDataBacaan.append("sumber_penulis", obj.sumber_penulis);
        obj.tags.forEach(function(value, i) {
          if (typeof value == "object") {
            formDataBacaan.append("tags[" + i + "]", value.nama);
          } else {
            formDataBacaan.append("tags[" + i + "]", value);
          }
        });
        if (obj.cover) {
          formDataBacaan.append("cover", obj.cover);
        }
        return axios.post(`${API}/artikel`, formDataBacaan, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
      }
    },
    tambahCerita(_, { obj }) {
      if (obj.id) {
        let formDataBacaan = new FormData();
        formDataBacaan.append("id", obj.id);
        formDataBacaan.append("judul", obj.judul);
        formDataBacaan.append("deskripsi", obj.deskripsi);

        formDataBacaan.append("sumber_file", obj.sumber_file);
        formDataBacaan.append("sumber_penulis", obj.sumber_penulis);
        obj.tags.forEach(function(value, i) {
          if (typeof value == "object") {
            formDataBacaan.append("tags[" + i + "]", value.nama);
          } else {
            formDataBacaan.append("tags[" + i + "]", value);
          }
        });

        if (obj.cover) {
          formDataBacaan.append("cover", obj.cover);
        }
        return axios.post(`${API}/cerita/${obj.id}`, formDataBacaan, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
      } else {
        let formDataBacaan = new FormData();
        formDataBacaan.append("judul", obj.judul);
        formDataBacaan.append("deskripsi", obj.deskripsi);
        formDataBacaan.append("sumber_file", obj.sumber_file);
        formDataBacaan.append("sumber_penulis", obj.sumber_penulis);
        obj.tags.forEach(function(value, i) {
          if (typeof value == "object") {
            formDataBacaan.append("tags[" + i + "]", value.nama);
          } else {
            formDataBacaan.append("tags[" + i + "]", value);
          }
        });
        if (obj.cover) {
          formDataBacaan.append("cover", obj.cover);
        }
        return axios.post(`${API}/cerita`, formDataBacaan, {
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
      return axios.post(`${API}/artikel/${obj.id}`, objVerval);
    },

    batalSetujui(_, { obj }) {
      var objVerval = {
        id: obj.id,
        status: 3
      };
      return axios.post(`${API}/artikel/${obj.id}/unapprove`, objVerval);
    },

    batalAjuan(_, { obj }) {
      var objVerval = {
        id: obj.id,
        status: 1
      };
      return axios.post(`${API}/artikel/${obj.id}`, objVerval);
    },

    drop(_, artikel) {
      return axios.delete(`${API}/artikel/${artikel.id}`).then(res => {
        return res.data;
      });
    }
  }
};

export default store;
