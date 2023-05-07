import axios from "axios";
import { API } from "../../const";
import { normParam } from "@/tools";

const store = {
  namespaced: true,
  state: {
    aksi: null,
    kegiatan_id: null
  },
  getters: {
    aksi(state) {
      return state.aksi;
    },
    kegiatan_id(state) {
      return state.kegiatan_id;
    }
  },
  mutations: {
    setKegiatan(state, val) {
      state.aksi = val;
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
        .get(`${API}/aksi_kurasi${normParam(params)}`)
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
    tambah(_, { obj }) {
      if (obj.id) {
        let formDataBacaan = new FormData();
        formDataBacaan.append("id", obj.id);
        formDataBacaan.append("post_type_id", 3);
        formDataBacaan.append("judul", obj.judul);
        formDataBacaan.append("deskripsi", obj.deskripsi);
        formDataBacaan.append("nilai", obj.nilai);
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
        return axios.post(`${API}/aksi/${obj.id}/approve`, formDataBacaan, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
      } else {
        let formDataBacaan = new FormData();
        formDataBacaan.append("judul", obj.judul);
        formDataBacaan.append("post_type_id", 3);
        formDataBacaan.append("deskripsi", obj.deskripsi);
        formDataBacaan.append("sumber_file", obj.sumber_file);
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
        return axios.post(`${API}/aksi`, formDataBacaan, {
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
      // var res = {
      //   url:
      //     "https://cdn.siap.id/s3/simpkb/asset img/Guru-Berbagi/illustrasi/Banner-1920x1080.jpg"
      // };
      // return res;
    },
    ajukan(_, { obj }) {
      var objVerval = {
        id: obj.id,
        judul: obj.judul,
        status: 2
      };
      return axios.post(`${API}/aksi/${obj.id}`, objVerval);
    },

    batalAjuan(_, { obj }) {
      var objVerval = {
        id: obj.id,
        status: 1,
        post_type_id: obj.post_type_id
      };
      return axios.post(`${API}/aksi/${obj.id}/draft`, objVerval);
    },
    batalTayang(_, { obj }) {
      var objVerval = {
        id: obj.id,
        status: 1,
        post_type_id: obj.post_type_id
      };
      return axios.post(`${API}/aksi/${obj.id}/unapprove`, objVerval);
    },
    batalKurasi(_, { obj }) {
      var objVerval = {
        id: obj.id,
        status: 1
      };
      return axios.post(`${API}/aksi/${obj.id}/unapprove`, objVerval);
    },

    drop(_, aksi) {
      return axios.delete(`${API}/aksi/${aksi.id}`).then(res => {
        return res.data;
      });
    }
  }
};

export default store;
