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
    get(_, { params }) {
      return axios
        .get(`${API}/aksi${normParam(params)}`)
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
    submit(_, { obj }) {
      let formDataBacaan = new FormData();
      formDataBacaan.append("id", obj.id);
      formDataBacaan.append("status", 3);

      return axios.post(`${API}/aksi/${obj.id}`, formDataBacaan, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
    },
    uploadImage(_, file) {
      let formImageUpload = new FormData();
      formImageUpload.append("file", file);

      return axios.post(`${API}/upload`, formImageUpload, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
    },
    tambah(_, { obj }) {
      if (obj.id) {
        let formDataAksi = new FormData();
        formDataAksi.append("id", obj.id);
        formDataAksi.append("post_type_id", 3);
        formDataAksi.append("judul", obj.judul);
        formDataAksi.append("sumber_file", obj.sumber_file);
        formDataAksi.append("waktu", obj.waktu);
        formDataAksi.append("waktu_selesai", obj.waktu_selesai);
        formDataAksi.append("lokasi", obj.lokasi ? obj.lokasi : null);
        formDataAksi.append("tempat", obj.tempat ? obj.tempat : null);
        formDataAksi.append("jenis_aksi", obj.jenis_aksi);
        formDataAksi.append("deskripsi", obj.deskripsi);

        if (obj.cover) {
          formDataAksi.append("cover", obj.cover);
        }
        if (obj.file) {
          formDataAksi.append("brosur", obj.file);
        }
        return axios.post(`${API}/aksi/${obj.id}`, formDataAksi, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
      } else {
        let formDataAksi = new FormData();
        formDataAksi.append("post_type_id", 3);
        formDataAksi.append("judul", obj.judul);
        formDataAksi.append("sumber_file", obj.sumber_file);
        formDataAksi.append("waktu", obj.waktu);
        formDataAksi.append("waktu_selesai", obj.waktu_selesai);
        formDataAksi.append("lokasi", obj.lokasi ? obj.lokasi : null);
        formDataAksi.append("tempat", obj.tempat ? obj.tempat : null);
        formDataAksi.append("jenis_aksi", obj.jenis_aksi);
        formDataAksi.append("deskripsi", obj.deskripsi);
        if (obj.cover) {
          formDataAksi.append("cover", obj.cover);
        }
        if (obj.file) {
          formDataAksi.append("brosur", obj.file);
        }
        return axios.post(`${API}/aksi`, formDataAksi, {
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
      return axios.post(`${API}/aksi/${obj.id}`, objVerval);
    },

    batalSetujui(_, { obj }) {
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
