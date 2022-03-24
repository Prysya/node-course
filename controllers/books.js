const { Book } = require("../models");
const { NotFoundError } = require("../errors");
const { messages, generatePathToBook } = require("../utils");

let store = [...["1", "2", "3"].map((id) => new Book({ id }))];

module.exports.getAllBooks = (req, res, next) => {
  try {
    res.status(200).json({ status: 200, data: store });
  } catch (err) {
    next(err);
  }
};

module.exports.getBookById = (req, res, next) => {
  try {
    const { id } = req.params;

    const book = store.find((item) => item.id === id);

    if (book) {
      return res.status(200).json({ status: 200, data: book });
    }

    throw new NotFoundError(messages.errors.notFound);
  } catch (err) {
    next(err);
  }
};

module.exports.createNewBook = (req, res, next) => {
  try {
    const newBook = new Book(req.body);

    store.push(newBook);

    res.status(200).json({ status: 200, data: newBook });
  } catch (err) {
    next(err);
  }
};

module.exports.updateBook = (req, res, next) => {
  try {
    const { id } = req.params;

    const indexOfBook = store.findIndex((item) => item.id === id);

    if (indexOfBook !== -1) {
      const newBook = {
        ...store[indexOfBook],
        ...req.body,
      };

      store[indexOfBook] = newBook;

      return res.status(200).json({
        status: 200,
        data: newBook,
        message: messages.success.dataUpdateSuccess,
      });
    }

    throw new NotFoundError(messages.errors.notFound);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteBook = (req, res, next) => {
  try {
    const { id } = req.params;

    const book = store.find((item) => item.id === id);

    if (book) {
      store = store.filter((item) => item.id !== id);

      res
        .status(200)
        .json({ status: 200, message: messages.success.dataDeleteSuccess });
    }

    throw new NotFoundError(messages.errors.notFound);
  } catch (err) {
    next(err);
  }
};

module.exports.downloadBook = (req, res, next) => {
  try {
    const { id } = req.params;

    res.download(
      generatePathToBook(id),
      `book${id}.txt`,
      (err) => {
        if (err) {
          throw err;
        }
      }
    );
  } catch (err) {
    next(err);
  }
};
