# App Web

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
