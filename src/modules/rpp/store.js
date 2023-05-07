import axios from "axios";
import { API } from "../../const";
import { normParam } from "@/tools";

const store = {
  namespaced: true,
  state: {
    rpp: null,
    kegiatan_id: null
  },
  getters: {
    rpp(state) {
      return state.rpp;
    },
    kegiatan_id(state) {
      return state.kegiatan_id;
    }
  },
  mutations: {
    setKegiatan(state, val) {
      state.rpp = val;
    }
  },
  actions: {
    // eslint-disable-next-line
    get(_, { params }) {
      return axios
        .get(`${API}/rpp${normParam(params)}`)
        .then(res => {
          return res.data;
        })
        .catch(err => Promise.reject(err));
    },
    // eslint-disable-next-line
    search(_, key) {
      return axios
        .get(`${API}/rpp_cari_filename?s=${key}`)
        .then(res => {
          return res.data;
        })
        .catch(err => Promise.reject(err));
    },
    // eslint-disable-next-line
    getMy(_, { params }) {
      return axios
        .get(`${API}/my_rpp${normParam(params)}`)
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
    form(_, { obj }) {
      if (obj.id) {
        let formData = new FormData();
        formData.append("id", obj.id);
        formData.append("post_type_id", 1);
        formData.append("judul", obj.judul);
        formData.append("moda", obj.moda);
        formData.append("deskripsi", obj.deskripsi);
        obj.tags.forEach(function(value, i) {
          if (typeof value == "object") {
            formData.append("tags[" + i + "]", value.nama);
          } else {
            formData.append("tags[" + i + "]", value);
          }
        });

        formData.append("mapel[1]", obj.jenjang);
        formData.append("mapel[2]", obj.tingkat);
        formData.append("mapel[0]", obj.mata_pelajaran);
        if (obj.cover) {
          formData.append("cover", obj.cover);
        }
        if (obj.file) {
          formData.append("file", obj.file);
        }
        return axios.post(`${API}/rpp/${obj.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
      } else {
        let formData = new FormData();
        formData.append("judul", obj.judul);
        formData.append("moda", obj.moda);
        formData.append("post_type_id", 1);
        formData.append("deskripsi", obj.deskripsi);
        obj.tags.forEach(function(value, i) {
          if (typeof value == "object") {
            formData.append("tags[" + i + "]", value.nama);
          } else {
            formData.append("tags[" + i + "]", value);
          }
        });
        formData.append("mapel[1]", obj.jenjang);
        formData.append("mapel[2]", obj.tingkat);
        formData.append("mapel[0]", obj.mata_pelajaran);
        formData.append("file", obj.file);
        if (obj.cover) {
          formData.append("cover", obj.cover);
        }
        return axios.post(`${API}/rpp`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
      }
    },
    ajukan(_, { obj }) {
      var objVerval = {
        id: obj.id,
        judul: obj.judul,
        status: 2
      };
      return axios.post(`${API}/rpp/${obj.id}/approve`, objVerval);
    },

    batalSetujui(_, { obj }) {
      var objVerval = {
        id: obj.id,
        status: 1
      };
      return axios.post(`${API}/rpp/${obj.id}/unapprove`, objVerval);
    },

    drop(_, rpp) {
      return axios.delete(`${API}/rpp/${rpp.id}`).then(res => {
        return res.data;
      });
    }
  }
};

export default store;
