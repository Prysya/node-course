const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const middlewareRouter = require('./middlewares');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const expressSession = require('./middlewares/expressSession');
const { passport } = require('./middlewares/passport');
const { handleSocketConnection } = require('./controllers/booksApi');

const router = require('./routes');

require('dotenv').config();

/**
 * Variables
 * */
const {
  PORT = 3000,
  DB_USERNAME = 'root',
  DB_PASSWORD = 'password',
  DB_NAME = 'library_database',
  DB_HOST = 'mongodb://localhost:27017',
} = process.env;

/**
 * Server variable
 * */
const app = express();

const server = require('http').createServer(app);

const { Server } = require('socket.io');
const io = new Server(server);

app.use(express.static(__dirname + '/public'));

/**
 * View engine
 * */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/**
 * Routes
 * */
app.use(expressSession);
app.use(passport);

app.use(middlewareRouter);

app.use(requestLogger);

app.use(router);

io.on('connection', handleSocketConnection);

app.use(errorLogger);
app.use(errorHandler);

(async () => {
  try {
    await mongoose.connect(DB_HOST, {
      user: DB_USERNAME,
      pass: DB_PASSWORD,
      dbName: DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
})();
