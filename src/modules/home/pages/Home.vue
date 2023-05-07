<template>
  <v-container class="pa-2" fluid>
    <v-row>
      <v-col cols="12">
        <m-alert :show="current_user && current_user.peran.id == 1">
          <template v-slot:default>
            <h3>Pemberitahuan bagi Admin!</h3>
            <p>
              Harap Set/atur Mapel pada Kurator agar muncul daftar Artikel
              Refleksi dan RPP sesuai mapel yang dipilih. Apabila tidak diset,
              maka tidak akan muncul daftar Artikel dan RPP pada Kurator
              tersebut. Untuk menambahkan Mapel Silakan klik tombol berikut
            </p>
            <v-btn
              :small="$vuetify.breakpoint.xs"
              label
              color="blue white--text"
              @click="toKelolaPengguna()"
              >Set Mapel</v-btn
            >
          </template>
        </m-alert>
        <m-alert :show="!current_user && !current_user.alt_email && false">
          <template v-slot:default>
            <h3>Pemberitahuan</h3>
            <p>
              Bagi
              <strong>Kontributor</strong> dengan Akun
              <strong>SIMPKB</strong> dan <strong>SIMPATIKA</strong>, mohon
              menambahkan surel alternatif pada menu profil
            </p>
            <v-btn
              :small="$vuetify.breakpoint.xs"
              label
              color="blue white--text"
              @click="updateProfil(current_user)"
              >Tambah Surel Alternatif</v-btn
            >
          </template>
        </m-alert>
      </v-col>
    </v-row>
    <v-row v-if="isCan('artikel_kurasi')">
      <v-col cols="12" sm="4" md="4" lg="3">
        <StatistikCard
          title="Artikel"
          modul="kurasiArtikel"
          color="amber"
          :ajuan="current_user.kurasi.ajuan_artikel"
          :total="current_user.kurasi.total_artikel"
        />
      </v-col>
      <v-col cols="12" sm="4" md="4" lg="3">
        <StatistikCard
          title="Video"
          modul="kurasiVideo"
          color="green"
          :ajuan="current_user.kurasi.ajuan_video"
          :total="current_user.kurasi.total_video"
        />
      </v-col>
      <v-col cols="12" sm="4" md="4" lg="3">
        <StatistikCard
          title="Aksi"
          modul="kurasiAksi"
          color="red"
          :ajuan="current_user.kurasi.ajuan_aksi"
          :total="current_user.kurasi.total_aksi"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-if="isCan('rpp_write')"
        cols="12"
        sm="12"
        :md="current_user && current_user.peran.id == 2 ? 4 : 4"
        :lg="current_user && current_user.peran.id == 2 ? 4 : 4"
        :xl="current_user && current_user.peran.id == 2 ? 4 : 3"
      >
        <v-card>
          <v-img
            position="bottom 20% center"
            style="background-position: bottom 20% center;"
            class="white--text align-end"
            height="200px"
            :src="
              current_user && current_user.peran.id == 2
                ? 'https://cdn.siap.id/s3/simpkb/asset img/Guru-Berbagi/illustrasi/thumb-kontributor.jpg'
                : 'https://cdn.siap.id/s3/simpkb/asset img/Guru-Berbagi/revisi-portal/banner-md-sm.jpg'
            "
          >
            <v-card-title class="headline font-weight-bold"
              >BERBAGI RPP</v-card-title
            >
          </v-img>

          <v-card-text class="text--primary">
            <div v-if="current_user && current_user.peran.id != 2">
              Melalui menu ini Anda dapat berbagi RPP dengan seluruh Guru /
              Pengajar di Penjuru Nusantara, Guna membantu Pendidikan Indonesia
              yang lebih baik.
            </div>
            <v-divider
              v-if="current_user && current_user.peran.id !== 2"
              class="mt-2"
            ></v-divider>
            <div v-if="current_user && current_user.peran.id == 2">
              <!-- <p class="title font-weight-bold">Panduan Berbagi RPP</p> -->
              <v-expansion-panels v-model="panelRpp">
                <v-expansion-panel class="rounded-lg">
                  <v-expansion-panel-header class="font-weight-bold">
                    Ketentuan Teknis
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <ol>
                      <li>File dibuat dalam bentuk PDF.</li>
                      <li>Nama file Rencana Pembelajaran_judul_kelas.</li>
                      <li>Ukuran file maksimal 2MB.</li>
                      <li>
                        Hal-hal yang perlu disertakan dalam file yang akan
                        diunggah:
                        <ul>
                          <li>Nama pembuat Rencana Pembelajaran.</li>
                          <li>
                            Nama Sekolah/Instansi pembuat Rencana Pembelajaran.
                          </li>
                          <li>Surel pembuat Rencana Pembelajaran.</li>
                          <li>
                            Rencana Pembelajaran untuk jenjang apa dan kelas
                            berapa.
                          </li>
                          <li>Topik/Tema Pembelajaran.</li>
                        </ul>
                      </li>
                    </ol>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel class="rounded-lg">
                  <v-expansion-panel-header class="font-weight-bold">
                    Format dan isi Rencana Pembelajaran
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <ol>
                      <li>
                        Moda pembelajaran dalam RPP bisa menggunakan
                        pembelajaran daring, luring, atau kombinasi.
                      </li>
                      <li>
                        Guru-guru diberikan kebebasan untuk menentukan format
                        rencana pembelajaran.
                      </li>
                      <li>
                        Hal-hal yang perlu disertakan dalam file yang akan
                        diunggah:
                        <ul>
                          <li>Kompetensi Inti</li>
                          <li>Kompetensi Dasar</li>
                          <li>Tujuan Pembelajaran</li>
                          <li>Indikator Hasil Pembelajaran</li>
                          <li>Materi Pembelajaran</li>
                          <li>Metode/Strategi /Aktifitas pembelajaran</li>
                          <li>Penilaian</li>
                        </ul>
                      </li>
                    </ol>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel class="rounded-lg">
                  <v-expansion-panel-header class="font-weight-bold">
                    Ketentuan lain-lain
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <ol>
                      <li>
                        Disarankan ada aktifitas yang kontekstual dengan kondisi
                        rumah, sekolah, dan lingkungan sekitar.
                      </li>
                      <li>
                        Disarankan ada 1-3 asesmen formatif selama proses
                        pembelajaran.
                      </li>
                      <li>Proses komunikasi dua arah.</li>
                      <li>Mencantumkan asal sumber belajar.</li>
                      <li>
                        RPP tidak ada proses kurasi
                      </li>
                      <!-- <li>Disarankan membuat penjelasan dan instruksi belajar yang spesifik dan rinci.</li>
                <li>Disarankan tidak hanya menggunakan satu strategi atau keiatan yang monoton.</li>
                <li>Tidak memuat unsur SARA dan intoleransi.</li>
                <li>Tidak plagiat karya orang lain.</li>
                <li>Jika anda memasukan foto wajah murid ke dalam RPP anda, pastikan anda sudah meminta izin pada anak dan orang tuanya.</li>
                <li>Konten RPP yang dikirimkan adalah sepenuhnya tanggung jawab pengguna.</li>
                <li>Kementrian Pendidikan dan Kebudayaan berhak menurunkan RPP yang terverifikasi tidak sesuai ketentuan.</li>-->
                    </ol>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel class="rounded-lg">
                  <v-expansion-panel-header class="font-weight-bold">
                    Syarat Berbagi RPP
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <ol>
                      <li>
                        Pengguna mengakses laman
                        <a
                          href="http://ayoguruberbagi.kemdikbud.go.id/"
                          target="_blank"
                          >ayoguruberbagi.kemdikbud.go.id</a
                        >
                      </li>
                      <li>
                        Pada pojok kanan atas laman, klik
                        <span
                          style="
                                            background-color: #eeeeee;
                                            font-weight: bold;
                                            border-radius: 50px;
                                            padding: 5px 20px;
                                            font-size: 12px;
                                          "
                        >
                          Masuk
                        </span>
                      </li>
                      <li>
                        Pengguna masuk menggunakan akun Ayo Guru Berbagi yang
                        telah teraktivasi
                      </li>
                      <li>
                        Pada beranda halaman, klik
                        <span
                          style="
                                            background-color: #eeeeee;
                                            padding: 5px 20px;
                                            font-size: 12px;
                                          "
                          ><i class="mdi mdi-book"></i> Kelola RPP</span
                        >
                        atau
                        <span
                          style="
                                            background-color: #eeeeee;
                                            padding: 5px 20px;
                                            font-size: 12px;
                                            display: ruby-base;
                                          "
                          ><i class="mdi mdi-book"></i> RPP Saya</span
                        >
                      </li>
                      <li>
                        Klik
                        <span
                          style="
                                            background-color: #eeeb62;
                                            padding: 5px;
                                            font-size: 12px;
                                          "
                          ><i class="mdi mdi-plus"></i> Tambah RPP</span
                        >
                        untuk mulai berbagi RPP
                      </li>
                      <li>
                        Pengguna telah masuk ke ruang RPP, klik
                        <span
                          style="
                                            padding: 4px 5px 3px 6px;
                                            border-radius: 50px;
                                            background-color: #dd0b0b;
                                            color: white;
                                          "
                          ><i class="mdi mdi-camera"></i
                        ></span>
                        untuk mengunggah Gambar/Ilustrasi
                      </li>
                      <li>
                        Pengguna mengisi Judul, Jenis, dan Deskripsi RPP
                      </li>
                      <li>
                        Pengguna memilih Jenjang, Tingkat/Kelas, dan Mata
                        Pelajaran yang relevan
                      </li>
                      <li>
                        Pengguna memilih/menambah Tag/Kata Kunci RPP
                      </li>
                      <li>
                        Pengguna mengunggah dokumen RPP pada Lampiran Berkas
                        (PDF)
                      </li>
                      <li>
                        Pengguna mencentang
                        <span
                          style="
                                            color: #12befc;
                                            font-size: 19px;
                                          "
                          ><i class="mdi mdi-checkbox-marked"></i
                        ></span>
                        pernyataan pada laman
                      </li>
                      <li>
                        Klik
                        <span
                          style="
                                            background-color: #11befc;
                                            padding: 3px 8px;
                                            color: white;
                                            font-size: 12px;
                                            border-radius: 3px;
                                          "
                          >SIMPAN</span
                        >
                        untuk menyelesaikan berbagi RPP
                      </li>
                    </ol>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>
            <v-card-actions v-if="current_user && current_user.peran.id == 2">
              <v-spacer></v-spacer>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="mt-2"
                    block
                    :small="$vuetify.breakpoint.xs"
                    v-on="on"
                    color="primary"
                    depressed
                    @click="toRpp"
                    >Berbagi RPP Sekarang</v-btn
                  >
                </template>
                <span>{{
                  current_user.no_hp
                    ? "Menuju menu Berbagi RPP"
                    : "Anda belum mengupdate nomor seluler Anda"
                }}</span>
              </v-tooltip>
            </v-card-actions>
          </v-card-text>
          <v-card-actions v-if="current_user && current_user.peran.id != 2">
            <v-spacer></v-spacer>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn
                  block
                  :small="$vuetify.breakpoint.xs"
                  v-on="on"
                  color="primary"
                  depressed
                  @click="toRpp"
                  >Berbagi RPP Sekarang</v-btn
                >
              </template>
              <span>{{
                current_user.no_hp
                  ? "Menuju menu Berbagi RPP"
                  : "Anda belum mengupdate nomor seluler Anda"
              }}</span>
            </v-tooltip>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col
        v-if="isCan('artikel_write')"
        cols="12"
        sm="12"
        :md="current_user && current_user.peran.id == 2 ? 4 : 4"
        :lg="current_user && current_user.peran.id == 2 ? 4 : 4"
        :xl="current_user && current_user.peran.id == 2 ? 4 : 3"
      >
        <v-card>
          <v-img
            position="bottom 20% center"
            style="background-position: bottom 20% center;"
            class="white--text align-end"
            height="200px"
            :src="
              current_user && current_user.peran.id == 2
                ? 'https://cdn.siap.id/s3/simpkb/asset img/Guru-Berbagi/illustrasi/thumb-kontributor.jpg'
                : 'https://cdn.siap.id/s3/simpkb/asset img/Guru-Berbagi/revisi-portal/banner-md-sm.jpg'
            "
          >
            <v-card-title
              class="headline font-weight-bold"
              style="word-break: break-word;"
              >BERBAGI ARTIKEL</v-card-title
            >
          </v-img>

          <v-card-text class="text--primary">
            <div v-if="current_user && current_user.peran.id != 2">
              Melalui menu ini Anda dapat berbagi Artikel Refleksi dengan
              seluruh Guru / Pengajar di Penjuru Nusantara, Guna membantu
              Pendidikan Indonesia yang lebih baik.
            </div>
            <v-divider
              v-if="current_user && current_user.peran.id !== 2"
              class="mt-2"
            ></v-divider>
            <div v-if="current_user && current_user.peran.id == 2">
              <v-expansion-panels v-model="panelArtikel">
                <v-expansion-panel class="rounded-lg">
                  <v-expansion-panel-header class="font-weight-bold">
                    Ketentuan Teknis
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <ol>
                      <li>
                        Jumlah kata dalam artikel minimal 300 kata dan maksimal
                        1000 kata
                      </li>
                      <li>
                        Setelah klik SIMPAN, maka Artikel Anda akan berstatus
                        DRAF
                      </li>
                      <li>
                        Klik Ajukan, untuk mengajukan ke Kurator Mapel terkait
                      </li>
                      <li>
                        Artikel Anda akan muncul di situs portal apabila telah
                        disetujui oleh admin, dengan sebelumnya melalui
                        mekanisme kurasi oleh pihak yang berkompeten
                      </li>
                    </ol>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel class="rounded-lg">
                  <v-expansion-panel-header class="font-weight-bold">
                    Artikel Refleksi
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <ol>
                      <li>Judul menarik dan menggambarkan isi artikel</li>
                      <li>
                        Menuliskan pengalaman pembelajaran sesuai dengan RPP
                        yang diunggah
                      </li>
                      <li>
                        Hasil refleksi pembelajaran berupa keunggulan atau
                        kelemahan pembelajaran
                      </li>
                      <li>
                        Dilengkapi dengan hasil pencapaian tujuan pembelajaran
                      </li>
                      <li>
                        Dapat dilengkapi dengan respon/tanggapan siswa atau
                        pihak yang terlibat dalam pembelajaran tersebut
                      </li>
                      <li>Jumlah kata minimal 300 dan maksimum 2500 kata</li>
                      <li>
                        Tidak memuat unsur SARA, pornografi, ujaran kebencian,
                        dan ideologi yang bertentangan dengan Pancasila
                      </li>
                      <li>Bukan merupakan hasil plagiasi karya orang lain</li>
                      <li>
                        Penulisan mengikuti Pedoman Umum Ejaan Bahasa Indonesia
                        (PUEBI)
                      </li>
                      <li>
                        Dapat menggunakan ilustrasi, cerita, contoh, studi
                        kasus, gambar, diagram, tabel, analogi dan atau
                        perbandingan, untuk memperjelas bacaan
                      </li>
                      <li>
                        Jika memasukan foto/ gambar/ ilustrasi ke dalam artikel,
                        pastikan sudah mendapatkan persetujuan dari yang
                        bersangkutan dan mencantumkan sumber
                      </li>
                      <li>
                        Jika memasukan video pembelajaran dalam artikel wajib
                        menuliskan sumber aslinya
                      </li>
                      <li>
                        Konten artikel yang dikirimkan sepenuhnya tanggung jawab
                        kontributor
                      </li>
                      <li>
                        Bila dalam waktu 3 bulan belum ada informasi artikel
                        telah dikurasi, maka kontributor dapat memperbaiki dan
                        mengunggah kembali
                      </li>
                      <li>
                        Kementerian Pendidikan, Kebudayaan, Riset dan Teknologi
                        berhak membatalkan penayangan artikel yang tidak sesuai
                        ketentuan
                      </li>
                    </ol>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel class="rounded-lg">
                  <v-expansion-panel-header class="font-weight-bold">
                    Artikel Bacaan
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <ol>
                      <li>Judul menarik dan menggambarkan isi bacaan</li>
                      <li>
                        Menuliskan gagasan, pengalaman, resensi atau kajian
                        ilmiah dalam mengembangkan pembelajaran
                      </li>
                      <li>
                        Mengikuti prinsip penulisan; apa; mengapa; di mana;
                        kapan; siapa dan bagaimana (5W+ 1H)
                      </li>
                      <li>Artikel Bacaan berkaitan dengan pendidikan</li>
                      <li>Jumlah kata minimal 300 dan maksimum 2500 kata</li>
                      <li>
                        Tidak memuat unsur SARA, pornografi, ujaran kebencian,
                        perundungan dan ideologi yang bertentangan dengan
                        Pancasila;
                      </li>
                      <li>Bukan merupakan hasil plagiasi karya orang lain</li>
                      <li>
                        Penulisan mengikuti Pedoman Umum Ejaan Bahasa Indonesia
                        (PUEBI)
                      </li>
                      <li>
                        Dapat menggunakan ilustrasi, cerita, contoh, studi
                        kasus, gambar, diagram, tabel, analogi dan atau
                        perbandingan, untuk memperjelas bacaan
                      </li>
                      <li>
                        Jika memasukan foto/ gambar/ ilustrasi ke dalam artikel,
                        dipastikan sudah mendapatkan persetujuan dari yang
                        bersangkutan dan mencantumkan sumber
                      </li>
                      <li>
                        Jika memasukan video pembelajaran dalam artikel, wajib
                        menuliskan sumber aslinya
                      </li>
                      <li>
                        Konten artikel yang dikirim sepenuhnya tanggung jawab
                        kontributor
                      </li>
                      <li>
                        Bila dalam waktu 1 bulan belum ada informasi artikel
                        telah dikurasi, maka kontributor dapat memperbaiki dan
                        mengunggah Kembali
                      </li>
                      <li>
                        Kementerian Pendidikan, Kebudayaan, Riset dan Teknologi
                        Republik Indonesia berhak membatalkan penayangan artikel
                        yang tidak sesuai ketentuan
                      </li>
                    </ol>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel class="rounded-lg">
                  <v-expansion-panel-header class="font-weight-bold">
                    Artikel Tips
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <ol>
                      <li>Judul menarik dan menggambarkan isi artikel tips</li>
                      <li>
                        Menuliskan gagasan kreatif dan inovatif yang pernah
                        diterapkan dalam pembelajaran
                      </li>
                      <li>
                        Menuliskan petunjuk praktis penerapan gagasan kreatif
                        dan inovatif tersebut
                      </li>
                      <li>Artikel Tips berkaitan dengan pendidikan</li>
                      <li>
                        Tidak memuat unsur SARA, pornografi, ujaran kebencian,
                        dan ideologi yang bertentangan dengan Pancasila
                      </li>
                      <li>Bukan merupakan hasil plagiasi karya orang lain</li>
                      <li>
                        Penulisan mengikuti Pedoman Umum Ejaan Bahasa Indonesia
                        (PUEBI)
                      </li>
                      <li>
                        Dapat melampirkan gambar, desain, bahan, atau video
                      </li>
                      <li>
                        Konten Artikel Tips yang dikirimkan sepenuhnya tanggung
                        jawab kontributor
                      </li>
                      <li>
                        Bila dalam waktu 1 bulan belum ada informasi artikel
                        telah dikurasi, maka kontributor dapat memperbaiki dan
                        mengunggah kembali
                      </li>
                      <li>
                        Kementerian Pendidikan, Kebudayaan, Riset, dan
                        Teknologi. berhak membatalkan penayangan artikel yang
                        tidak sesuai ketentuan
                      </li>
                    </ol>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel class="rounded-lg">
                  <v-expansion-panel-header class="font-weight-bold">
                    Ketentuan lain-lain
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <ol>
                      <li>Tidak memuat unsur SARA dan intoleransi.</li>
                      <li>Tidak mengandung unsur pornografi.</li>
                      <li>
                        Bukan merupakan hasil plagiasi dari karya orang lain.
                      </li>
                      <li>
                        Jika anda memasukan foto wajah murid ke dalam Artikel
                        anda, pastikan anda sudah meminta izin pada anak dan
                        orang tuanya.
                      </li>
                      <li>
                        Konten Artikel yang dikirimkan adalah sepenuhnya
                        tanggung jawab pengguna
                      </li>
                      <li>
                        Bila dalam waktu 3 bulan belum ada informasi artikel
                        telah dikurasi, maka kontributor dapat mencoba
                        mengunggah artikel kembali
                      </li>
                      <li>
                        Kementerian Pendidikan dan Kebudayaan berhak membatalkan
                        penayangan artikel yang tidak sesuai ketentuan.
                      </li>
                    </ol>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel class="rounded-lg">
                  <v-expansion-panel-header class="font-weight-bold">
                    Syarat Berbagi Artikel
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <ol>
                      <li>
                        Pengguna mengakses laman
                        <a
                          href="http://ayoguruberbagi.kemdikbud.go.id/"
                          target="_blank"
                          >ayoguruberbagi.kemdikbud.go.id</a
                        >
                      </li>
                      <li>
                        Pada pojok kanan atas laman, klik
                        <span
                          style="
                                          background-color: #eeeeee;
                                          font-weight: bold;
                                          border-radius: 50px;
                                          padding: 5px 20px;
                                          font-size: 12px;
                                        "
                        >
                          Masuk
                        </span>
                      </li>
                      <li>
                        Pengguna masuk menggunakan akun Ayo Guru Berbagi yang
                        telah teraktivasi
                      </li>
                      <li>
                        Pada beranda halaman, klik
                        <span
                          style="
                                          background-color: #eeeeee;
                                          padding: 5px 20px;
                                          font-size: 12px;
                                        "
                          ><i class="mdi mdi-book"></i> Kelola Artikel</span
                        >
                        atau
                        <span
                          style="
                                          background-color: #eeeeee;
                                          padding: 5px 20px;
                                          font-size: 12px;
                                          display: ruby-base;
                                        "
                          ><i class="mdi mdi-book"></i> Artikel</span
                        >
                      </li>
                      <li>
                        Klik
                        <span
                          style="
                                          background-color: #eeeb62;
                                          padding: 5px;
                                          font-size: 12px;
                                        "
                          ><i class="mdi mdi-plus"></i> Tambah Artikel</span
                        >
                        untuk mulai berbagi Artikel
                      </li>
                      <li>
                        Pengguna telah masuk ke ruang RPP, klik
                        <span
                          style="
                                          padding: 4px 5px 3px 6px;
                                          border-radius: 50px;
                                          background-color: #dd0b0b;
                                          color: white;
                                        "
                          ><i class="mdi mdi-camera"></i
                        ></span>
                        untuk mengunggah Gambar/Ilustrasi
                      </li>
                      <li>
                        Pengguna mengisi Judul, Jenis, dan Deskripsi Artikel
                      </li>
                      <li>
                        Pengguna memilih Jenjang, Tingkat/Kelas, dan Mata
                        Pelajaran yang relevan
                      </li>
                      <li>
                        Pengguna memilih/menambah Tag/Kata Kunci Artikel
                      </li>
                      <li>
                        Pengguna mengunggah dokumen RPP pada Lampiran Berkas
                        (PDF) (Hanya untuk artikel jenis refleksi)
                      </li>
                      <li>
                        Pengguna mencentang
                        <span style="color: #12befc; font-size: 19px"
                          ><i class="mdi mdi-checkbox-marked"></i
                        ></span>
                        pernyataan pada laman
                      </li>
                      <li>
                        Klik
                        <span
                          style="
                                          background-color: #11befc;
                                          padding: 3px 8px;
                                          color: white;
                                          font-size: 12px;
                                          border-radius: 3px;
                                        "
                          >SIMPAN</span
                        >
                        untuk menyelesaikan berbagi Artikel
                      </li>
                    </ol>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>

              <br />
            </div>
            <v-card-actions v-if="current_user && current_user.peran.id == 2">
              <v-spacer></v-spacer>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="mt-2"
                    block
                    :small="$vuetify.breakpoint.xs"
                    v-on="on"
                    color="primary"
                    depressed
                    @click="toArtikel"
                    >BERBAGI ARTIKEL SEKARANG</v-btn
                  >
                </template>
                <span>{{
                  current_user.no_hp
                    ? "Menuju menu Berbagi Artikel"
                    : "Anda belum mengupdate nomor seluler Anda"
                }}</span>
              </v-tooltip>
            </v-card-actions>
          </v-card-text>
          <v-card-actions v-if="current_user && current_user.peran.id != 2">
            <v-spacer></v-spacer>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn
                  block
                  :small="$vuetify.breakpoint.xs"
                  v-on="on"
                  color="primary"
                  depressed
                  @click="toArtikel"
                  >BERBAGI ARTIKEL SEKARANG</v-btn
                >
              </template>
              <span>{{
                current_user.no_hp
                  ? "Menuju menu Berbagi Artikel"
                  : "Anda belum mengupdate nomor seluler Anda"
              }}</span>
            </v-tooltip>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col
        v-if="isCan('video_read')"
        cols="12"
        sm="12"
        :md="current_user && current_user.peran.id == 2 ? 4 : 4"
        :lg="current_user && current_user.peran.id == 2 ? 4 : 4"
        :xl="current_user && current_user.peran.id == 2 ? 4 : 3"
      >
        <v-card>
          <v-img
            position="bottom 20% center"
            style="background-position: bottom 20% center;"
            class="white--text align-end"
            height="200px"
            :src="
              current_user && current_user.peran.id == 2
                ? 'https://cdn.siap.id/s3/simpkb/asset img/Guru-Berbagi/illustrasi/thumb-kontributor.jpg'
                : 'https://cdn.siap.id/s3/simpkb/asset img/Guru-Berbagi/revisi-portal/banner-md-sm.jpg'
            "
          >
            <v-card-title class="headline font-weight-bold"
              >BERBAGI VIDEO</v-card-title
            >
          </v-img>

          <v-card-text class="text--primary">
            <v-divider
              v-if="current_user && current_user.peran.id !== 2"
              class="mt-2"
            ></v-divider>
            <div v-if="current_user && current_user.peran.id == 2">
              <v-expansion-panels v-model="panelVideo">
                <v-expansion-panel class="rounded-lg">
                  <v-expansion-panel-header class="font-weight-bold">
                    Ketentuan Teknis
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <ol>
                      <li>
                        Mengunggah video dengan cara meng-embed tautan video
                        dari akun media sosial yang dimiliki ke dalam portal Ayo
                        Guru Berbagi
                      </li>
                      <li>
                        Memastikan bahwa video yang tayang tidak mengandung
                        konten penistaan, diskriminasi terhadap Suku, Agama,
                        RAS, dan Antar Golongan
                      </li>
                      <li>Audio berkualitas baik dan terdengar jelas</li>
                      <li>
                        Video yang tayang pada portal Ayo Guru Berbagi adalah
                        video pendidikan yang diharapkan dapat memberikan
                        edukasi dan inspirasi bagi guru-guru dalam peningkatan
                        layanan pendidikan bagi peserta didik
                      </li>
                    </ol>
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel class="rounded-lg">
                  <v-expansion-panel-header class="font-weight-bold">
                    Ketentuan Jenis dan Format Video
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <ol>
                      <li>
                        Jenis-jenis video yang dapat ditayangkan dalam portal
                        Ayo Guru Berbagi di antaranya adalah live action,
                        animasi, infografis dan motion grafis.
                        <ul>
                          <li>
                            Live action<br />
                            Bentuk sinematografi dan videografi dengan
                            menggunakan fotografi atau merekam sebuah peristiwa
                            dan kejadian secara langsung dengan kamera, tanpa
                            menggunakan animasi;
                          </li>
                          <li>
                            Animasi<br />
                            Video yang merupakan hasil dari pengolahan gambar
                            tangan sehingga menjadi gambar yang bergerak
                          </li>
                          <li>
                            Infografis<br />
                            Representasi visual informasi, data atau ilmu
                            pengetahuan secara grafis
                          </li>
                          <li>
                            Motion Grafis <br />Gabungan dari media visual
                            (gambar, 3D, atau animasi) yang menggabungkan bahasa
                            film dengan desain grafis
                          </li>
                        </ul>
                      </li>
                      <li>
                        Format sajian video berupa: Tutorial, Talkshow, Vlog,
                        Dokumenter, Doku-drama
                        <ul>
                          <li>
                            Tutorial<br />
                            Video yang menayangkan seorang pengajar sedang
                            mendeskripsikan langkah-langkah pembelajaran untuk
                            membantu pemahaman terhadap suatu materi
                            pembelajaran sebagai bimbingan atau bahan
                            pengajaran.
                          </li>
                          <li>
                            Talkshow <br />
                            Video yang menayangkan hasil diskusi atau tanya
                            jawab dengan lebih dari satu narasumber dengan
                            membahas suatu isu / topik pembelajaran tertentu.
                          </li>
                          <li>
                            Vlog<br />
                            Video yang menayangkan dokumentasi kegiatan atau
                            melaporkan suatu peristiwa yang direkam melalui
                            video dengan menggunakan kamera video sederhana atau
                            ponsel.
                          </li>
                          <li>
                            Dokumenter <br />
                            Video yang merekam kejadian sehari - hari, berupa
                            fakta dan kisah nyata.
                          </li>
                          <li>
                            Doku Drama<br />
                            Video yang diambil dari acara radio dan televisi,
                            film cerita, dan pentas teater yang menampilkan reka
                            ulang yang didramatisasi dari peristiwa sejarah yang
                            sebenarnya.
                          </li>
                        </ul>
                      </li>
                      <li>
                        Pengguna masuk menggunakan akun Ayo Guru Berbagi yang
                        telah teraktivasi
                      </li>
                      <li>
                        Pada beranda halaman, klik
                        <span
                          style="
                                            background-color: #eeeeee;
                                            padding: 5px 20px;
                                            font-size: 12px;
                                          "
                          ><i class="mdi mdi-book"></i> Kelola Video</span
                        >
                        atau
                        <span
                          style="
                                            background-color: #eeeeee;
                                            padding: 5px 20px;
                                            font-size: 12px;
                                            display: ruby-base;
                                          "
                          ><i class="mdi mdi-book"></i> Video</span
                        >
                      </li>
                      <li>
                        Klik
                        <span
                          style="
                                            background-color: #eeeb62;
                                            padding: 5px;
                                            font-size: 12px;
                                          "
                          ><i class="mdi mdi-plus"></i> Tambah Video</span
                        >
                        untuk mulai berbagi Video
                      </li>
                      <li>
                        Pengguna telah masuk ke ruang Video, masukan link video
                        dari YouTube atau TikTok hasil karya mandiri untuk
                        mengunggah video
                      </li>
                      <li>
                        Pengguna mengisi Judul, Jenis, dan Deskripsi Video
                      </li>
                      <li>
                        Pengguna memilih/menambah Tag/Kata Kunci Video
                      </li>
                      <li>
                        Pengguna mencentang
                        <span
                          style="
                                            color: #12befc;
                                            font-size: 19px;
                                          "
                          ><i class="mdi mdi-checkbox-marked"></i
                        ></span>
                        pernyataan pada laman
                      </li>
                      <li>
                        Klik
                        <span
                          style="
                                            background-color: #11befc;
                                            padding: 3px 8px;
                                            color: white;
                                            font-size: 12px;
                                            border-radius: 3px;
                                          "
                          >SIMPAN</span
                        >
                        untuk menyelesaikan berbagi Video
                      </li>
                    </ol>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <!--                <v-expansion-panel class="rounded-lg">-->
                <!--                  <v-expansion-panel-header class="font-weight-bold">-->
                <!--                    Syarat Berbagi Video-->
                <!--                  </v-expansion-panel-header>-->
                <!--                  <v-expansion-panel-content>-->
                <!--                    <ol>-->
                <!--                      <li>-->
                <!--                        Pengguna mengakses laman-->
                <!--                        <a-->
                <!--                          href="http://ayoguruberbagi.kemdikbud.go.id/"-->
                <!--                          target="_blank"-->
                <!--                          >ayoguruberbagi.kemdikbud.go.id</a-->
                <!--                        >-->
                <!--                      </li>-->
                <!--                      <li>-->
                <!--                        Pada pojok kanan atas laman, klik-->
                <!--                        <span-->
                <!--                          style="-->
                <!--                                            background-color: #eeeeee;-->
                <!--                                            font-weight: bold;-->
                <!--                                            border-radius: 50px;-->
                <!--                                            padding: 5px 20px;-->
                <!--                                            font-size: 12px;-->
                <!--                                          "-->
                <!--                        >-->
                <!--                          Masuk-->
                <!--                        </span>-->
                <!--                      </li>-->
                <!--                      <li>-->
                <!--                        Pengguna masuk menggunakan akun Ayo Guru Berbagi yang-->
                <!--                        telah teraktivasi-->
                <!--                      </li>-->
                <!--                      <li>-->
                <!--                        Pada beranda halaman, klik-->
                <!--                        <span-->
                <!--                          style="-->
                <!--                                            background-color: #eeeeee;-->
                <!--                                            padding: 5px 20px;-->
                <!--                                            font-size: 12px;-->
                <!--                                          "-->
                <!--                          ><i class="mdi mdi-book"></i> Kelola Video</span-->
                <!--                        >-->
                <!--                        atau-->
                <!--                        <span-->
                <!--                          style="-->
                <!--                                            background-color: #eeeeee;-->
                <!--                                            padding: 5px 20px;-->
                <!--                                            font-size: 12px;-->
                <!--                                            display: ruby-base;-->
                <!--                                          "-->
                <!--                          ><i class="mdi mdi-book"></i> Video</span-->
                <!--                        >-->
                <!--                      </li>-->
                <!--                      <li>-->
                <!--                        Klik-->
                <!--                        <span-->
                <!--                          style="-->
                <!--                                            background-color: #eeeb62;-->
                <!--                                            padding: 5px;-->
                <!--                                            font-size: 12px;-->
                <!--                                          "-->
                <!--                          ><i class="mdi mdi-plus"></i> Tambah Video</span-->
                <!--                        >-->
                <!--                        untuk mulai berbagi Video-->
                <!--                      </li>-->
                <!--                      <li>-->
                <!--                        Pengguna telah masuk ke ruang Video, masukan link video-->
                <!--                        dari YouTube atau TikTok hasil karya mandiri untuk-->
                <!--                        mengunggah video-->
                <!--                      </li>-->
                <!--                      <li>-->
                <!--                        Pengguna mengisi Judul, Jenis, dan Deskripsi Video-->
                <!--                      </li>-->
                <!--                      <li>-->
                <!--                        Pengguna memilih/menambah Tag/Kata Kunci Video-->
                <!--                      </li>-->
                <!--                      <li>-->
                <!--                        Pengguna mencentang-->
                <!--                        <span-->
                <!--                          style="-->
                <!--                                            color: #12befc;-->
                <!--                                            font-size: 19px;-->
                <!--                                          "-->
                <!--                          ><i class="mdi mdi-checkbox-marked"></i-->
                <!--                        ></span>-->
                <!--                        pernyataan pada laman-->
                <!--                      </li>-->
                <!--                      <li>-->
                <!--                        Klik-->
                <!--                        <span-->
                <!--                          style="-->
                <!--                                            background-color: #11befc;-->
                <!--                                            padding: 3px 8px;-->
                <!--                                            color: white;-->
                <!--                                            font-size: 12px;-->
                <!--                                            border-radius: 3px;-->
                <!--                                          "-->
                <!--                          >SIMPAN</span-->
                <!--                        >-->
                <!--                        untuk menyelesaikan berbagi Video-->
                <!--                      </li>-->
                <!--                    </ol>-->
                <!--                  </v-expansion-panel-content>-->
                <!--                </v-expansion-panel>-->
              </v-expansion-panels>
            </div>
            <v-card-actions v-if="current_user && current_user.peran.id == 2">
              <v-spacer></v-spacer>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="mt-2"
                    block
                    :small="$vuetify.breakpoint.xs"
                    v-on="on"
                    color="primary"
                    depressed
                    @click="toVideo"
                    >Berbagi Video Sekarang</v-btn
                  >
                </template>
                <span>{{
                  current_user.no_hp
                    ? "Menuju menu Berbagi Video"
                    : "Anda belum mengupdate nomor seluler Anda"
                }}</span>
              </v-tooltip>
            </v-card-actions>
          </v-card-text>
          <v-card-actions v-if="current_user && current_user.peran.id != 2">
            <v-spacer></v-spacer>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn
                  block
                  :small="$vuetify.breakpoint.xs"
                  v-on="on"
                  color="primary"
                  depressed
                  @click="toVideo"
                  >Berbagi Video Sekarang</v-btn
                >
              </template>
              <span>{{
                current_user.no_hp
                  ? "Menuju menu Berbagi Video"
                  : "Anda belum mengupdate nomor seluler Anda"
              }}</span>
            </v-tooltip>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="4"
        lg="4"
        xl="3"
        v-if="isCan('bantuan_write')"
      >
        <!-- forum bantuan -->

        <v-card>
          <v-img
            position="bottom 20% center"
            style="background-position: bottom 20% center;"
            class="white--text align-end"
            height="200px"
            src="https://cdn.siap.id/s3/simpkb/asset img/Guru-Berbagi/revisi-portal/banner-md-sm.jpg"
          >
            <v-card-title class="headline font-weight-bold"
              >FORUM BANTUAN</v-card-title
            >
          </v-img>

          <v-card-text class="text--primary">
            <div>
              Melalui menu ini Anda dapat menjawab pertanyaan yang diajukan di
              portal Guru Berbagi serta mempublikasi maupun menghapus pertanyaan
              yang telah diajukan.
            </div>
            <v-divider
              v-if="current_user && current_user.peran.id !== 2"
              class="mt-2"
            ></v-divider>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn
                  block
                  :small="$vuetify.breakpoint.xs"
                  v-on="on"
                  color="primary"
                  depressed
                  @click="toBantuan"
                  >Cek Forum Bantuan</v-btn
                >
              </template>
              <span>Menuju menu Forum Bantuan</span>
            </v-tooltip>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="12"
        lg="12"
        xl="12"
        class="grey lighten-2 ml-3 mt-5"
        align="center"
      >
        <a
          href="https://play.google.com/store/apps/details?id=id.simpkb.app"
          target="_blank"
        >
          <v-img
            max-width="700px"
            :lazy-src="
              $vuetify.breakpoint.smAndUp
                ? 'https://cdn.siap.id/s3/simpkb/asset%20img/banner-info/Leaderboard-iklan-simpkb.png'
                : 'https://cdn.siap.id/s3/simpkb/asset%20img/banner-info/Leaderboard-iklan-simpkb-mobile-version.png'
            "
            :src="
              $vuetify.breakpoint.smAndUp
                ? 'https://cdn.siap.id/s3/simpkb/asset%20img/banner-info/Leaderboard-iklan-simpkb.png'
                : 'https://cdn.siap.id/s3/simpkb/asset%20img/banner-info/Leaderboard-iklan-simpkb-mobile-version.png'
            "
          ></v-img>
        </a>
      </v-col>
    </v-row>
    <ProfilDlg ref="dlgProfil" />
    <ViewPDF ref="dlgPdf" />
  </v-container>
</template>

<script>
import { POSTER_RPP } from "@/const";
import BlockCard from "@/components/BlockCard";
import ProfilDlg from "../../user/components/Form.vue";
import StatistikCard from "../pages/StatistikCard.vue";
import ViewPDF from "../pages/PdfViewer.vue";
export default {
  components: {
    BlockCard,
    ProfilDlg,
    StatistikCard,
    ViewPDF
  },
  data() {
    return {
      token: "",
      panelArtikel: 0,
      panelRpp: 0,
      panelVideo: 0
    };
  },
  mounted() {
    this.checkQuery();
  },
  computed: {},
  methods: {
    checkQuery() {
      if (this.$route.query.token) {
        this.token = this.$route.query.token;
        // clean query
        window.history.replaceState({}, document.title, "/login");
        // langsung lakukan verifikasi
        this.$nextTick(() => {
          this.verify();
        });
      } else {
        this.token = null;
      }
    },
    toKelolaPengguna() {
      this.$router.push({
        name: "user"
      });
    },
    updateProfil(item) {
      this.$refs.dlgProfil.open(item);
    },
    viewPdf(title, url) {
      this.$refs.dlgPdf.open(title, url);
    },
    toRpp() {
      this.$router.push({
        name: "rpp"
      });
    },
    toVideo() {
      this.$router.push({
        name: "video"
      });
    },
    toArtikel() {
      this.$router.push({
        name: "artikel"
      });
    },
    toTips() {
      this.$router.push({
        name: "tips"
      });
    },
    toBantuan() {
      this.$router.push({
        name: "bantuan"
      });
    },
    toFaq() {
      this.$router.push({
        name: "faq"
      });
    },
    toPosterRpp() {
      window.open(POSTER_RPP, "_blank");
    },
    verify() {
      this.$validator
        .validateAll("form-1")
        .then(res => {
          if (!res) return Promise.reject();
        })
        .then(() => {
          this.loading = true;
          this.$store
            .dispatch("user/login", { token: this.token })
            .then(res => {
              this.loading = false;
              res.id ? this.st++ : Promise.reject;
            })
            .catch(() => {
              this.loading = false;
            });
        })
        .catch(e => e);
    }
  }
};
</script>
