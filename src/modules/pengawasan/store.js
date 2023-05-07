import axios from "axios";
import { API } from "../../const";
import { normParam } from "@/tools";

const store = {
  namespaced: true,
  state: {
    pengawasan: null
  },
  getters: {
    pengawasan(state) {
      return state.pengawasan;
    }
  },
  mutations: {},
  actions: {
    // eslint-disable-next-line
    get(_, { params }) {
      return axios
        .get(`${API}/post${normParam(params)}`)
        .then(res => {
          return res.data;
        })
        .catch(err => Promise.reject(err));
    },
    // eslint-disable-next-line
    detail(_, id) {
      return axios
        .get(`${API}/post/${id}`)
        .then(res => {
          return res.data;
        })
        .catch(err => Promise.reject(err));
    },

    tolak(_, { obj }) {
      var objVerval = {
        id: obj.id,
        status: 3,
        keterangan_tolak: obj.keterangan
      };
      return axios
        .post(`${API}/post/${obj.id}/tolak`, objVerval)
        .then(res => {
          return res.data;
        })
        .catch(err => Promise.reject(err));
    },
    batal(_, { obj }) {
      var objVerval = {
        id: obj.id,
        status: 2
      };
      return axios
        .post(`${API}/post/${obj.id}/hapus_lapor`, objVerval)
        .then(res => {
          return res.data;
        })
        .catch(err => Promise.reject(err));
    }
  }
};

export default store;
