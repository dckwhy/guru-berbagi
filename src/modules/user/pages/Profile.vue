<template>
  <v-container grid-list-lg>
    <v-row row v-if="user">
      <v-col cols="12">
        <m-card title="Profil Diri" :isCover="false" edit @edit="edit()">
          <v-row wrap class="mt-3">
            <v-col cols="12" sm="3" md="3" lg="3" xl="3" class="pr-2">
              <v-card text color="#fff" flat>
                <v-container fill-height container--fluid>
                  <v-row fill-height>
                    <v-col class="text-center" cols="12" align-end colbox>
                      <v-avatar :size="100" color="grey lighten-4">
                        <img
                          :src="
                            user.file_foto
                              ? user.file_foto
                              : 'img/avatar-default.png'
                          "
                          alt="avatar"
                        />
                      </v-avatar>
                      <div
                        class="card-footer text-muted"
                        v-html="message"
                      ></div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-col>
            <v-col cols="12" sm="9" md="9" lg="9" xl="9">
              <v-subheader class="title primary--text">{{
                current_user.peran.id == 4 ? "Narahubung Komunitas" : "Profilku"
              }}</v-subheader>

              <v-row>
                <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-subtitle>Nama Lengkap</v-list-item-subtitle>
                      <v-list-item-title>
                        {{ $tools.pVal(user, "name") }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-subtitle
                        >Nomor Handphone</v-list-item-subtitle
                      >
                      <v-list-item-title>
                        {{ $tools.pVal(user, "no_hp") }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-subtitle>Surel</v-list-item-subtitle>
                      <v-list-item-title>
                        {{ $tools.pVal(user, "email") }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-subtitle>Peran</v-list-item-subtitle>
                      <v-list-item-title>
                        {{ $tools.pVal(user.peran, "name") }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="12">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-subtitle
                        >Mata Pelajaran</v-list-item-subtitle
                      >
                      <div class="mt-2">
                        <p v-for="mapel in user.mapel" :key="mapel.index">
                          <v-chip label color="success" outlined class="mr-2">{{
                            mapel
                          }}</v-chip>
                        </p>
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </m-card>
      </v-col>
      <v-col cols="12">
        <m-card
          title="Profil Komunitas"
          :isCover="false"
          edit
          @edit="editKomunitas()"
        >
          <v-row wrap class="mt-3">
            <v-col cols="12" sm="3" md="3" lg="3" xl="3" class="pr-2">
              <v-card text color="#fff" flat>
                <v-container fill-height container--fluid>
                  <v-row fill-height>
                    <v-col class="text-center" cols="12" align-end colbox>
                      <v-avatar :size="100" color="grey lighten-4">
                        <img
                          :src="
                            user.komunitas && user.komunitas.logo
                              ? user.komunitas.logo.url
                              : 'img/avatar-default.png'
                          "
                          alt="avatar"
                        />
                      </v-avatar>
                      <div
                        class="card-footer text-muted"
                        v-html="message"
                      ></div>
                    </v-col>
                  </v-row>
                </v-container>
                <!-- <v-btn
                  icon
                  large
                  color="grey"
                  style="position: absolute;right: 0px;top: 5px;"
                  id="pick-avatar"
                >
                  <v-icon>mdi-camera</v-icon>
                </v-btn>
                <avatar-cropper
                  :upload-handler="cropperHandler"
                  trigger="#pick-avatar"
                  :output-mime="cropperOutputMime"
                  :output-quality="0.8"
                  :output-options="{ width: 400, height: 400 }"
                  :labels="{ submit: 'Simpan', cancel: 'Hapus' }"
                />-->
              </v-card>
            </v-col>
            <v-col cols="12" sm="9" md="9" lg="9" xl="9">
              <v-list>
                <v-subheader class="title primary--text"
                  >Data Komunitas/Organisasi</v-subheader
                >

                <v-row>
                  <v-col cols="12" sm="4" md="4" lg="4" xl="4">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-subtitle
                          >Nama Komunitas</v-list-item-subtitle
                        >
                        <v-list-item-title v-if="user.komunitas">
                          {{ $tools.pVal(user.komunitas, "nama_komunitas") }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" sm="4" md="4" lg="4" xl="4">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-subtitle
                          >Tipe Komunitas</v-list-item-subtitle
                        >
                        <v-list-item-title v-if="user.komunitas">
                          {{ $tools.pVal(user.komunitas.tipe, "keterangan") }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" sm="4" md="4" lg="4" xl="4">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-subtitle
                          >Tanggal Berdiri</v-list-item-subtitle
                        >
                        <v-list-item-title v-if="user.komunitas">
                          {{
                            $tools.pVal(user.komunitas, "tanggal_berdiri") | toD
                          }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-subtitle
                          >Deskripsi Komunitas</v-list-item-subtitle
                        >
                        <v-list-item-title v-if="user.komunitas">
                          {{ $tools.pVal(user.komunitas, "deskripsi") }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-subtitle
                          >Alamat lengkap Komunitas</v-list-item-subtitle
                        >
                        <v-list-item-title v-if="user.komunitas">
                          {{ $tools.pVal(user.komunitas, "alamat") }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          <v-icon>mdi-phone</v-icon
                          ><span v-if="user.komunitas">{{
                            $tools.pVal(user.komunitas, "telp")
                          }}</span>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          <v-icon>mdi-web</v-icon>
                          <a
                            v-if="user.komunitas"
                            target="_blank"
                            :href="$tools.pVal(user.komunitas, 'website')"
                            >{{ $tools.pVal(user.komunitas, "website") }}</a
                          >
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          <v-icon>mdi-instagram</v-icon>
                          <a
                            v-if="user.komunitas"
                            target="_blank"
                            :href="$tools.pVal(user.komunitas, 'ig')"
                            >{{ $tools.pVal(user.komunitas, "ig") }}</a
                          >
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          <v-icon>mdi-facebook</v-icon>
                          <a
                            v-if="user.komunitas"
                            target="_blank"
                            :href="$tools.pVal(user.komunitas, 'fb')"
                            >{{ $tools.pVal(user.komunitas, "fb") }}</a
                          >
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-subtitle
                          >Ruang Lingkup Komunitas</v-list-item-subtitle
                        >
                        <v-list-item-title v-if="user.komunitas">
                          <v-chip
                            class="mx-1"
                            v-for="item in current_user.komunitas.lingkup"
                            :key="item.index"
                            >{{ item.keterangan }}</v-chip
                          >
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-row>
              </v-list>
              <v-list v-if="false">
                <v-subheader class="title primary--text"
                  >Narahubung Komunitas</v-subheader
                >

                <v-row>
                  <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-subtitle
                          >Nama Lengkap</v-list-item-subtitle
                        >
                        <v-list-item-title>
                          {{ $tools.pVal(user, "name") }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-subtitle>Jabatan</v-list-item-subtitle>
                        <v-list-item-title v-if="user.komunitas">
                          {{ $tools.pVal(user.komunitas, "jabatan") }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-subtitle
                          >Alamat Email</v-list-item-subtitle
                        >
                        <v-list-item-title>
                          {{ $tools.pVal(user, "email") }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-subtitle
                          >Nomor Telepon</v-list-item-subtitle
                        >
                        <v-list-item-title>
                          {{ $tools.pVal(user, "no_hp") }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-row>
              </v-list>
            </v-col>
          </v-row>
        </m-card>
      </v-col>
    </v-row>
    <ChangeDlg ref="dlg" />
    <ChangeKomunitasDlg ref="komunitasDlg" />
  </v-container>
</template>

<script>
import AvatarCropper from "vue-avatar-cropper";
import ChangeDlg from "../components/Form.vue";
import ChangeKomunitasDlg from "../components/FormKomunitas.vue";
export default {
  components: {
    AvatarCropper,
    ChangeDlg,
    ChangeKomunitasDlg
  },
  data() {
    return {
      message: "",
      cropperOutputMime: null,
      randomImg: "sqwea12"
    };
  },
  activated() {
    this.message = "";
  },
  computed: {
    user() {
      return this.current_user;
    }
  },
  methods: {
    edit() {
      this.$refs.dlg.open(this.current_user);
    },
    editKomunitas() {
      this.$refs.komunitasDlg.open(this.current_user);
    },
    cropperHandler(cropper) {
      var imgdat = cropper.getCroppedCanvas().toDataURL(this.cropperOutputMime);
      var file = this.dataURLtoFile(imgdat, "test.png");

      return this.$store
        .dispatch("user/uploadImage", {
          user_id: this.user.user_id,
          data: file
        })
        .then(() => {
          this.randomImg = Math.random();
        })
        .catch(e => e);
    },
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], filename, { type: mime });
    }
  },
  watch: {}
};
</script>
