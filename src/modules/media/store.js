import axios from "axios";
import { API } from "../../const";
import { normParam } from "@/tools";

const store = {
  namespaced: true,
  state: {
    media: null,
    kegiatan_id: null
  },
  getters: {
    media(state) {
      return state.media;
    },
  },
  mutations: {
  },
  actions: {
    // eslint-disable-next-line
    get(_, { params }) {
      return axios
        .get(`${API}/upload${normParam(params)}`)
        .then(res => {
          return res.data;
        })
        .catch(err => Promise.reject(err));
    },
    drop(_, media) {
      return axios.delete(`${API}/upload/${media.id}`).then(res => {
        return res.data;
      });
    }
  }
};

export default store;
