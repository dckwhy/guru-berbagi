import axios from "axios";
import { BASE_API, API } from "../../const";
import { normParam } from "../../tools";
const lc = window.localStorage;
const TOKEN = "gbtoken";
const RTOKEN = "rToken";

const store = {
  namespaced: true,
  state: {
    user: null,
    config: null,
    token: lc.getItem(TOKEN),
    rToken: lc.getItem(RTOKEN),
    permission: [],
    roles: [],
    meta: null,
    promiseRT: null,
    arrayOfRT: [],
    retryRefresh: true
  },
  getters: {
    user(state) {
      return state.user;
    },
    permission(state) {
      return state.permission;
    },
    userMeta(state) {
      return state.meta ? state.meta.users_meta : null;
    },
    roles(state) {
      return state.roles;
    },
    check(state) {
      return state.token;
    },
    token(state) {
      return state.token;
    },
    rToken(state) {
      return state.rToken;
    },
    promiseRT(state) {
      return state.promiseRT;
    },
    arrayOfRT(state) {
      return state.arrayOfRT;
    },
    retryRefresh(state) {
      return state.retryRefresh;
    }
  },
  mutations: {
    setUser(state, val) {
      state.user = { ...val };
    },
    addArrayRT(state, val) {
      state.arrayOfRT.push(val);
    },
    setPromiseRT(state, val) {
      state.promiseRT = val;
      state.promiseRT.then(() => {
        //jalankan function request ulang API
        var y = state.arrayOfRT.map(f => f());

        //setelah semua promise y dijalankan set null
        Promise.allSettled(y)
          .then(() => {
            state.promiseRT = null;
            state.arrayOfRT = [];
          })
          .catch(() => {
            state.promiseRT = null;
            state.arrayOfRT = [];
          });
      });
    },
    retryRefresh(state, val) {
      state.retryRefresh = val;
    },
    login(state, { user, token, rToken }) {
      let u = {
        ...user
      };
      delete u.token;

      state.user = user;
      state.token = token;
      state.rToken = rToken;
      lc.setItem(TOKEN, token);
      lc.setItem(RTOKEN, rToken);
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.rToken = null;
      state.instansi_aktif = null;
      // state.role = null
      state.roles = [];
      state.permission = [];
      state.promiseRT = null;
      state.arrayOfRT = [];
      state.retryRefresh = true;

      lc.removeItem(TOKEN);
      lc.removeItem(RTOKEN);
    },
    setToken(state, { token }) {
      state.token = token;
      lc.setItem(TOKEN, token);
    },
    setrToken(state, { rToken }) {
      state.rToken = rToken;
      lc.setItem(RTOKEN, rToken);
    },
    delToken(state) {
      state.token = null;
      lc.removeItem(TOKEN);
    }
  },
  actions: {
    // eslint-disable-next-line
    get({}, { params }) {
      return axios
        .get(`${API}/user${normParam(params)}`)
        .then(res => {
          return res.data;
        })
        .catch(err => Promise.reject(err));
    },
    // eslint-disable-next-line
    cekAkun({}, email) {
      return axios
        .get(`${API}/get_email/${email}`)
        .then(res => {
          return res.data;
        })
        .catch(err => Promise.reject(err));
    },
    // eslint-disable-next-line
    getMapel({}, { params }) {
      return axios
        .get(`${API}/mapel${normParam(params)}`)
        .then(res => {
          return res.data;
        })
        .catch(err => Promise.reject(err));
    },
    // eslint-disable-next-line
    getLayanan({}, {}) {
      return axios
        .get(`${API}/simpkb_layanan`)
        .then(res => {
          return res.data;
        })
        .catch(err => Promise.reject(err));
    },
    // eslint-disable-next-line
    getTipe({}, _) {
      return [
        {
          id: 1,
          keterangan: "Umum"
        },
        {
          id: 2,
          keterangan: "Yayasan"
        },
        {
          id: 3,
          keterangan: "Perusahaan"
        },
        {
          id: 4,
          keterangan: "Komunitas"
        },
        {
          id: 5,
          keterangan: "Lembaga Pemerintah"
        },
        {
          id: 6,
          keterangan: "Perkumpulan"
        },
        {
          id: 99,
          keterangan: "Lainnya"
        }
      ];
    },
    // eslint-disable-next-line
    getLingkup({}, _) {
      return [
        {
          id: 1,
          keterangan: "Umum",
          pivot: {
            user_komunitas_id: 5,
            lingkup_komunitas_id: 1
          }
        },
        {
          id: 2,
          keterangan: "Pendidikan Dasar",
          pivot: {
            user_komunitas_id: 5,
            lingkup_komunitas_id: 2
          }
        },
        {
          id: 3,
          keterangan: "Pendidikan Menengah",
          pivot: {
            user_komunitas_id: 5,
            lingkup_komunitas_id: 3
          }
        },
        {
          id: 6,
          keterangan: "Teknologi untuk Pendidikan",
          pivot: {
            user_komunitas_id: 5,
            lingkup_komunitas_id: 6
          }
        },
        {
          id: 5,
          keterangan: "Konseling Pendidikan",
          pivot: {
            user_komunitas_id: 5,
            lingkup_komunitas_id: 5
          }
        },
        {
          id: 4,
          keterangan: "Pendidikan Tinggi",
          pivot: {
            user_komunitas_id: 5,
            lingkup_komunitas_id: 4
          }
        },
        {
          id: 99,
          keterangan: "Lainnya",
          pivot: {
            user_komunitas_id: 5,
            lingkup_komunitas_id: 99
          }
        }
      ];
    },
    // eslint-disable-next-line
    detail(_, user_id) {
      return axios.get(`${API}/users/${user_id}`).then(res => {
        return res.data;
      });
    },
    // eslint-disable-next-line
    verify(_, kode_verifikasi) {
      return axios.post(`${API}/verify`, kode_verifikasi).then(res => {
        return res.data;
      });
    },
    // eslint-disable-next-line
    verifyKomunitas(_, obj) {
      return axios.post(`${API}/approve_komunitas`, obj).then(res => {
        return res.data;
      });
    },
    // eslint-disable-next-line
    verifyEmail(_, kode_verifikasi) {
      return axios
        .post(`${API}/verify_alt_email`, kode_verifikasi)
        .then(res => {
          return res.data;
        });
    },
    // eslint-disable-next-line
    getProvinsi({}, { params }) {
      return axios
        .get(`${API}/master?master=propinsi`)
        .then(res => {
          return res.data;
        })
        .catch(err => Promise.reject(err));
    },
    // eslint-disable-next-line
    getKota({}, { id, params }) {
      return axios
        .get(`${API}/master?master=kota&propinsi_id=${id}`)
        .then(res => {
          return res.data;
        })
        .catch(err => Promise.reject(err));
    },
    // eslint-disable-next-line
    register(_, { obj }) {
      return axios
        .post(`${API}/register`, obj)
        .then(res => {
          return res.data;
        })
        .catch(err => Promise.reject(err));
    },
    // eslint-disable-next-line
    registerKomunitas(_, { obj }) {
      return axios
        .post(`${API}/registerkomunitas`, obj)
        .then(res => {
          return res.data;
        })
        .catch(err => Promise.reject(err));
    },
    // eslint-disable-next-line
    setKuratorPlagiat(_, { obj, akses }) {
      return axios.post(`${API}/user/${obj.id}/updatakses`, akses).then(res => {
        return res.data;
      });
    },

    // eslint-disable-next-line
    update({ commit }, obj) {
      return axios.post(`${API}/self`, obj).then(res => {
        commit("setUser", obj);
        return res.data;
      });
    },
    // eslint-disable-next-line
    updateKomunitas({ state }, obj) {
      let formData = new FormData();
      formData.append("id", obj.id);
      formData.append("nama_komunitas", obj.nama_komunitas);
      formData.append("tipe_komunitas_id", obj.tipe_komunitas_id);
      formData.append("tanggal_berdiri", obj.tanggal_berdiri);
      formData.append("deskripsi", obj.deskripsi);
      formData.append("alamat", obj.alamat);
      formData.append("telp", obj.telp);
      formData.append("fb", obj.fb);
      formData.append("ig", obj.ig);
      formData.append("website", obj.website);
      formData.append("propinsi_id", obj.propinsi_id);
      formData.append("kota_id", obj.kota_id);
      formData.append("kode_pos", obj.kode_pos);

      if (obj.cover) {
        formData.append("logo", obj.cover);
      }
      return axios
        .post(`${API}/update_komunitas`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(() => {
          return axios.get(`${API}/self`).then(res => {
            state.user = {
              ...res.data,
              name: res.data.name
            };
            return;
          });
        });
    },
    // eslint-disable-next-line
    aktivasi(_, { obj }) {
      return axios
        .post(`${API}/kirim-ulang`, obj)
        .then(res => {
          return res.data;
        })
        .catch(err => Promise.reject(err));
    },
    // eslint-disable-next-line
    subscribe(_, { obj }) {
      return axios
        .post(`${API}/kirim-ulang`, obj)
        .then(res => {
          return res.data;
        })
        .catch(err => Promise.reject(err));
    },
    // eslint-disable-next-line
    setRole(_, obj) {
      return axios
        .post(`${API}/user/${obj.user_id}`, obj)
        .then(res => {
          return res.data;
        })
        .catch(err => Promise.reject(err));
    },
    // eslint-disable-next-line
    drop(_, item) {
      return axios.delete(`${API}/users/${item.user_id}`).then(res => {
        return res.data;
      });
    },
    refreshToken(_, { grant_type, client_id, client_secret, refresh_token }) {
      return axios
        .post(`${API}/oauth/token`, {
          grant_type,
          client_id,
          client_secret,
          refresh_token
        })
        .then(res => {
          return res.data;
        });
    },
    saveToken({ dispatch, commit }, token) {
      commit("setToken", token);
      // try get me
      return dispatch("fetch").catch(() => {
        commit("delToken", null);
        return Promise.reject();
      });
    },
    // eslint-disable-next-line
    login(
      {
        commit,
        dispatch
        // state
      },
      { token }
    ) {
      commit("login", { token: token });
      return dispatch("fetch");
    },
    // eslint-disable-next-line
    logout({ commit }) {
      commit("logout");
      // goto logout logout url
      window.location.href = `${BASE_API}/logout`;
      return Promise.resolve();
    },
    // eslint-disable-next-line
    fetch({ state, dispatch }) {
      if (!state.token) return Promise.reject(null);
      else {
        if (state.user) {
          return Promise.resolve();
        } else {
          // state.user = { email: "gbtoken@test.com", name: "Admin" };
          return axios
            .get(`${API}/self`)
            .then(res => {
              state.user = {
                ...res.data,
                name: res.data.name
              };
            })
            .then(() => {
              return dispatch("akses");
            });
        }
      }
    },
    // eslint-disable-next-line
    akses({ state }) {
      return axios.get(`${API}/myakses`).then(res => {
        state.permission = res.data;
      });
    }
  }
};

export default store;
