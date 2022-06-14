import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import type { ConnectOptions } from 'mongoose';
import { Server } from 'socket.io';

import 'dotenv/config';

import { booksApi } from 'controllers';

import {
  passportRouter,
  expressSessionRoute,
  errorHandlerMiddleware,
  requestLogger,
  errorLogger,
  parserRouter,
} from 'middlewares';

import { mainRouter } from 'routes';
import http from 'http';

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

const server = http.createServer(app);

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
app.use(expressSessionRoute);
app.use(passportRouter.router);

app.use(parserRouter);

app.use(requestLogger);

app.use(mainRouter);

io.on('connection', booksApi.handleSocketConnection);

app.use(errorLogger);
app.use(errorHandlerMiddleware);

(async () => {
  try {
    const mongooseOptions: ConnectOptions = {
      user: DB_USERNAME,
      pass: DB_PASSWORD,
      dbName: DB_NAME,
    };

    await mongoose.connect(DB_HOST, mongooseOptions);

    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
})();
