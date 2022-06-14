import uuid from 'uuid';
import createError from 'http-errors';

import { Books } from 'models';
import { messages } from 'utils';

import type { ExpressMiddleware, SocketMiddleware } from 'types';

export const getAllBooks: ExpressMiddleware = async (req, res, next) => {
  try {
    const books = await Books.find().select('-__v');

    res.status(200).json({ status: 200, data: books });
  } catch (err) {
    next(err);
  }
};

export const getBookById: ExpressMiddleware = async (req, res, next) => {
  try {
    const { id } = req.params;

    const book = await Books.findById(id).select('-__v');

    if (!book) {
      throw createError(404, messages.errors.notFound);
    }

    res.status(200).json({ status: 200, data: book });
  } catch (err) {
    next(err);
  }
};

export const createNewBook: ExpressMiddleware = async (req, res, next) => {
  try {
    const { title, description, authors, favorite, fileName, fileBook } =
      req.body;

    const newBook = new Books({
      id: uuid.v4(),
      fileBook,
      fileName,
      title,
      description,
      authors,
      favorite,
    });

    await newBook.save();

    res.status(201).json({ status: 201, data: newBook });
  } catch (err) {
    next(err);
  }
};

export const updateBook: ExpressMiddleware = async (req, res, next) => {
  try {
    const { id } = req.params;

    const newBook = await Books.findByIdAndUpdate(id, req.body, {
      lean: true,
      returnDocument: 'after',
    });

    res.status(201).json({
      status: 201,
      data: newBook,
      message: messages.success.dataUpdateSuccess,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteBook: ExpressMiddleware = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Books.deleteOne({ _id: id });

    res.status(200).json({
      status: 200,
      message: messages.success.dataDeleteSuccess,
      ok: 'ok',
    });
  } catch (err) {
    next(err);
  }
};

export const handleSocketConnection: SocketMiddleware = (socket) => {
  const { id } = socket;
  console.log(`Socket connected: ${id}`);

  const { roomName } = socket.handshake.query;
  socket.join(roomName);

  socket.on('message', (msg) => {
    msg.type = `room: ${roomName}`;
    socket.to(roomName).emit('message', msg);
    socket.emit('message', msg);
  });

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${id}`);
  });
};
