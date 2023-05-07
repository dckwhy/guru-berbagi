import axios from "axios";
import { API } from "../../const";
import { normParam } from "@/tools";

const store = {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    get(_, params) {
      return axios
        .get(`${API}/logactivity${normParam(params)}`)
        .then(res => {
          return res.data;
        })
        .catch(err => Promise.reject(err));
    }
  }
};

export default store;
