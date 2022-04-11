const uuid = require('uuid');

const Books = require('../models/books');
const { NotFoundError } = require('../errors');
const { messages } = require('../utils');

module.exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await Books.find().select('-__v');

    res.status(200).json({ status: 200, data: books });
  } catch (err) {
    next(err);
  }
};

module.exports.getBookById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const book = await Books.findById(id).select('-__v');

    if (!book) {
      throw new NotFoundError(messages.errors.notFound);
    }

    res.status(200).json({ status: 200, data: book });
  } catch (err) {
    next(err);
  }
};

module.exports.createNewBook = async (req, res, next) => {
  try {
    const { title, description, authors, favorite, fileName, fileBook } = req.body;

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

module.exports.updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    const newBook = await Books.findByIdAndUpdate(id, req.body, {
      lean: true,
      returnDocument: 'after',
    });

    return res.status(201).json({
      status: 201,
      data: newBook,
      message: messages.success.dataUpdateSuccess,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Books.deleteOne({ _id: id });
  
    return res.status(200).json({
      status: 200,
      message: messages.success.dataDeleteSuccess,
      ok: 'ok'
    });
  } catch (err) {
    next(err);
  }
};
