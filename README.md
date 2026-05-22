# Lab 6: size2json

Маршруты:

- `GET /login/` - возвращает логин `dieuvina`.
- `POST /size2json/` - принимает PNG-файл в поле `image` формата `multipart/form-data` и возвращает JSON вида `{"width":123,"height":456}`.

## Запуск

```bash
npm install
npm start
```

## Docker

```bash
docker build -t lab6-size2json .
docker run -p 4321:4321 lab6-size2json
```
