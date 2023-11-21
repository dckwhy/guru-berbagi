# App Web

## Deskripsi
Guru Berbagi adalah salah satu program Kementerian Pendidikan yang bertujuan untuk mewujudkan kolaborasi antara pemerintah, guru, masyarakat, dan aktivis pendidikan agar bersama-sama menghadapi Covid-19. Pemerintah, guru, masyarakat, dan aktivis pendidikan bekerja sama untuk berbagi ide dan praktik melalui Rencana Pelaksanaan Pembelajaran (RPP) sehingga anak-anak Indonesia dapat belajar dari mana saja.
Guru Berbagi adalah sistem berbasis web. Sistem ini memiliki fitur untuk berbagi RPP, video, dan artikel. RPP, video, dan artikel dapat dikurasi oleh admin sebelum dipublikasikan agar dapat diakses oleh para guru.

## Project setup
```
cp .env.example .env
```
Sesuaikan varible VUE_APP_TITLE untuk judul WebApp
Contoh :
```
VUE_APP_TITLE=My App
```
Sesuaikan variable VUE_APP_API untuk URL API
Contoh :
```
VUE_APP_API=http://localhost:8000/api
```
Catatan :
Setiap kali anda mengubah .env dan sedang menjalan hot-reload, maka pastikan untuk mematikan merestart hot-reload

Install package
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Lints and fixes files
```
yarn run lint
```
