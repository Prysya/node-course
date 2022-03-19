const express = require('express');
const router = require('./routes');

require('dotenv').config();

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json())
app.use(router);

app.listen(PORT, () => {
  console.log(`Слушаю порт ${PORT}`);
});
