import axios from "axios";
import { API } from "../../const";
import { normParam } from "@/tools";

const store = {
  namespaced: true,
  state: {
    bantuan: null,
    kegiatan_id: null
  },
  getters: {
    bantuan(state) {
      return state.bantuan;
    },
    kegiatan_id(state) {
      return state.kegiatan_id;
    }
  },
  mutations: {
    setKegiatan(state, val) {
      state.bantuan = val;
    }
  },
  actions: {
    // eslint-disable-next-line
    get(_, { params }) {
      return axios
        .get(`${API}/pesan-jawab${normParam(params)}`)
        .then(res => {
          return res.data;
        })
        .catch(err => Promise.reject(err));
    },
    jawab(_, { obj }) {
      //update jawaban
      if (obj.proses == "update") {
        return axios
          .post(`${API}/pesan-jawab/${obj.jawaban_id}`, obj)
          .then(res => {
            return res;
          })
          .catch(e => e);
      } else {
        //jawaban baru
        return axios
          .post(`${API}/pesan-jawab`, obj)
          .then(res => {
            return res;
          })
          .catch(e => e);
      }
    },
    setujui(_, { obj }) {
      var objVerval = {
        id: obj.id,
        judul: obj.judul,
        status: 1
      };
      return axios.post(`${API}/pesan-jawab/${obj.id}/approve`, objVerval);
    },
    batalSetujui(_, { obj }) {
      var objVerval = {
        id: obj.id,
        judul: obj.judul,
        status: 0
      };
      return axios.post(`${API}/pesan-jawab/${obj.id}/unapprove`, objVerval);
    },
    hapus(_, { obj }) {
      return axios.delete(`${API}/pesan-jawab/${obj.id}/delete`).then(res => {
        return res.data;
      });
    }
  }
};

export default store;
