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
    getLock(_, id) {
      return axios
        .get(`${API}/video/${id}/waktu`)
        .then(res => {
          return res.data;
        })
        .catch(err => Promise.reject(err));
    },
    // eslint-disable-next-line
    updateLock(_, id) {
      return axios
        .post(`${API}/video/${id}/waktu`)
        .then(res => {
          return res.data;
        })
        .catch(err => Promise.reject(err));
    },
    // eslint-disable-next-line
    deleteLock(_, id) {
      return axios
        .delete(`${API}/video/${id}/waktu`)
        .then(res => {
          return res.data;
        })
        .catch(err => Promise.reject(err));
    },
    // eslint-disable-next-line
    get(_, { params }) {
      return axios
        .get(`${API}/artikel_kurasi${normParam(params)}`)
        .then(res => {
          return res.data;
        })
        .catch(err => Promise.reject(err));
    },
    // eslint-disable-next-line
    detail(_, artikel_id) {
      return axios
        .get(`${API}/artikel/${artikel_id}`)
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
    tambah(_, { obj, is_publish }) {
      if (obj.id) {
        let formDataBacaan = new FormData();
        formDataBacaan.append("id", obj.id);
        formDataBacaan.append("post_type_id", 2);
        formDataBacaan.append("judul", obj.judul);
        formDataBacaan.append("jenis", obj.jenis);
        formDataBacaan.append("deskripsi", obj.deskripsi);
        if (obj.nilai) {
          formDataBacaan.append("nilai", obj.nilai);
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
        return axios.post(
          `${API}/artikel/${obj.id}/approve?is_publish=${is_publish}`,
          formDataBacaan,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );
      } else {
        let formDataBacaan = new FormData();
        formDataBacaan.append("judul", obj.judul);
        formDataBacaan.append("post_type_id", 2);
        formDataBacaan.append("jenis", obj.jenis);
        formDataBacaan.append("deskripsi", obj.deskripsi);
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
    uploadImage(_, file) {
      let formImageUpload = new FormData();
      formImageUpload.append("file", file);

      return axios.post(`${API}/upload`, formImageUpload, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
    },
    setPlagiat(_, { obj }) {
      return axios.post(`${API}/artikel/${obj.id}/setplagiat`, obj);
    },
    setNonPlagiat(_, { obj }) {
      return axios.post(`${API}/artikel/${obj.id}/setbukanplagiat`, obj);
    },
    batalSetPlagiat(_, { obj }) {
      return axios.post(`${API}/artikel/${obj.id}/unsetplagiat`, obj);
    },
    ajukan(_, { obj }) {
      var objVerval = {
        id: obj.id,
        judul: obj.judul,
        status: 2
      };
      return axios.post(`${API}/artikel/${obj.id}`, objVerval);
    },

    batalAjuan(_, { obj }) {
      var objVerval = {
        id: obj.id,
        status: 1,
        post_type_id: obj.post_type_id
      };
      return axios.post(`${API}/artikel/${obj.id}/draft`, objVerval);
    },
    batalTayang(_, { obj }) {
      var objVerval = {
        id: obj.id,
        status: 1,
        post_type_id: obj.post_type_id
      };
      return axios.post(`${API}/artikel/${obj.id}/unapprove`, objVerval);
    },
    batalKurasi(_, { obj }) {
      var objVerval = {
        id: obj.id,
        status: 1
      };
      return axios.post(`${API}/artikel/${obj.id}/unapprove`, objVerval);
    },

    drop(_, artikel) {
      return axios.delete(`${API}/artikel/${artikel.id}`).then(res => {
        return res.data;
      });
    }
  }
};

export default store;
