import axios from "axios";
import { API } from "../../const";
import { normParam } from "@/tools";

const store = {
  namespaced: true,
  state: {
    video: null
  },
  getters: {
    video(state) {
      return state.video;
    }
  },
  mutations: {},
  actions: {
    // eslint-disable-next-line
    get(_, { params }) {
      return axios
        .get(`${API}/video${normParam(params)}`)
        .then(res => {
          return res.data;
        })
        .catch(err => Promise.reject(err));
    },
    // eslint-disable-next-line
    getMy(_, { params }) {
      return axios
        .get(`${API}/my_video${normParam(params)}`)
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
        formData.append("post_type_id", 5);
        formData.append("judul", obj.judul);
        formData.append("jenis_aksi", obj.jenis_aksi);
        formData.append("urlvideo", obj.urlvideo);
        formData.append("lingkup", obj.lingkup);
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

        return axios.post(`${API}/video/${obj.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
      } else {
        let formData = new FormData();
        formData.append("judul", obj.judul);
        formData.append("jenis_aksi", obj.jenis_aksi);
        formData.append("urlvideo", obj.urlvideo);
        formData.append("lingkup", obj.lingkup);
        formData.append("post_type_id", 5);
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
        return axios.post(`${API}/video`, formData, {
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
      return axios.post(`${API}/video/${obj.id}/approve`, objVerval);
    },
    submit(_, { obj }) {
      let formDataBacaan = new FormData();
      formDataBacaan.append("id", obj.id);
      formDataBacaan.append("status", 3);

      return axios.post(`${API}/video/${obj.id}`, formDataBacaan, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
    },

    batalSetujui(_, { obj }) {
      var objVerval = {
        id: obj.id,
        status: 1
      };
      return axios.post(`${API}/video/${obj.id}/unapprove`, objVerval);
    },

    drop(_, video) {
      return axios.delete(`${API}/video/${video.id}`).then(res => {
        return res.data;
      });
    }
  }
};

export default store;
