const express = require('express');
const multer = require('multer');

const LOGIN = process.env.LOGIN || 'dieuvina';
const PORT = process.env.PORT || 4321;

const app = express();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: 1,
    fileSize: 5 * 1024 * 1024
  }
});

app.disable('x-powered-by');

app.use((request, response, next) => {
  response.set('Access-Control-Allow-Origin', 'https://kodaktor.ru');
  response.set('Access-Control-Allow-Credentials', 'true');
  response.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  response.set('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.options('*', (request, response) => {
  response.sendStatus(204);
});

app.get('/', (request, response) => {
  response.type('text/plain').send('Use /login/ and POST /size2json/');
});

app.head('/', (request, response) => {
  response.sendStatus(200);
});

app.get('/login/', (request, response) => {
  response.type('text/plain').send(LOGIN);
});

app.post('/size2json/', upload.single('image'), (request, response) => {
  if (!request.file || !request.file.buffer) {
    return response.status(400).json({ error: 'PNG file is required in image field' });
  }

  const buffer = request.file.buffer;
  const pngSignature = '89504e470d0a1a0a';
  if (buffer.length < 24 || buffer.subarray(0, 8).toString('hex') !== pngSignature) {
    return response.status(400).json({ error: 'Only PNG images are supported' });
  }

  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);

  return response.json({ width, height });
});

app.use((request, response) => {
  response.status(400).type('text/plain').send('Bad request');
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
