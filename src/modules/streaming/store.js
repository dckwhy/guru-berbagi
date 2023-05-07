import axios from "axios";
import { API } from "../../const";
import { normParam } from "@/tools";

const store = {
  namespaced: true,
  state: {
    streaming: null
  },
  getters: {
    streaming(state) {
      return state.streaming;
    }
  },
  mutations: {},
  actions: {
    // eslint-disable-next-line
    get(_, { params }) {
      return axios
        .get(`${API}/streaming${normParam(params)}`)
        .then(res => {
          return res.data;
        })
        .catch(err => Promise.reject(err));
    },
    form(_, { obj }) {
      if (obj.id) {
        let formData = new FormData();
        formData.append("id", obj.id);
        formData.append("urlvideo", obj.urlvideo);
        formData.append("post_type_id", 7);
        formData.append("judul", obj.judul);
        formData.append("waktu", obj.waktu);
        formData.append("waktu_selesai", obj.waktu_selesai);
        formData.append("deskripsi", obj.deskripsi);

        return axios.post(`${API}/streaming/${obj.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
      } else {
        let formData = new FormData();
        formData.append("judul", obj.judul);
        formData.append("urlvideo", obj.urlvideo);
        formData.append("waktu", obj.waktu);
        formData.append("waktu_selesai", obj.waktu_selesai);
        formData.append("post_type_id", 7);
        formData.append("deskripsi", obj.deskripsi);
        return axios.post(`${API}/streaming`, formData, {
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
      return axios.post(`${API}/streaming/${obj.id}/approve`, objVerval);
    },
    submit(_, { obj }) {
      let formDataBacaan = new FormData();
      formDataBacaan.append("id", obj.id);
      formDataBacaan.append("status", 3);

      return axios.post(`${API}/streaming/${obj.id}`, formDataBacaan, {
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
      return axios.post(`${API}/streaming/${obj.id}/unapprove`, objVerval);
    },

    drop(_, streaming) {
      return axios.delete(`${API}/streaming/${streaming.id}`).then(res => {
        return res.data;
      });
    }
  }
};

export default store;
