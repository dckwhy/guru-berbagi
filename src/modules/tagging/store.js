/* istanbul ignore file */
import axios from "axios";
import { API } from "../../const";
import { normParam } from "@/tools";

const store = {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    // eslint-disable-next-line
    get(_, { params }) {
      return axios
        .get(`${API}/term${normParam(params)}`)
        .then(res => {
          return res.data;
        })
        .catch(err => Promise.reject(err));
    },
    form(_, { obj }) {
      if (obj.id) {
        return axios
          .put(`${API}/term/${obj.id}`, obj)
          .then(res => {
            return res;
          })
          .catch(e => e);
      } else {
        return axios
          .post(`${API}/term`, obj)
          .then(res => {
            return res;
          })
          .catch(e => e);
      }
    },
    drop(_, { term_id }) {
      return axios.delete(`${API}/term/${term_id}`).then(res => {
        return res.data;
      });
    }
  }
};

export default store;
