const { Book } = require("../models");
const { NotFoundError, BadRequest } = require("../errors");
const { messages } = require("../utils");

let store = [
  ...[...Array(6)].map((_, index) => new Book({ id: String(index + 1) })),
];

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
    if (req.file) {
      const { filename, path } = req.file;

      const newBook = new Book({ fileBook: path, fileName: filename });

      store.push(newBook);

      res.status(201).json({ status: 201, data: newBook });
    } else {
      throw new BadRequest(messages.errors.bookNotCreate);
    }
  } catch (err) {
    console.log(err);
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

    const book = store.find((item) => item.id === id);

    if (!book) {
      throw new NotFoundError(messages.errors.notFound);
    }

    res.download(book.fileBook, `book.txt`, (err) => {
      if (err) {
        next(err);
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getAllBooksView = (req, res) => {
  res.render("index", {
    title: "Библиотека",
    books: store,
  });
};

module.exports.getBookInfo = (req, res) => {
  const { id } = req.params;
  
  if (id === "404") {
    res.render("errors/404", {
      title: "404 | страница не найдена",
    });
    return;
  }
  
    const book = store.find((item) => item.id === id);
  
    if (book) {
      res.render("books/view", {
        title: book.title,
        book,
      });
    } else {
      res.status(404).redirect("/404");
    }
};

module.exports.getBookUpdate = (req, res) => {
  const { id } = req.params;

  const book = store.find((item) => item.id === id);

  if (book) {
    res.render("books/update", {
      title: "update | " + book.title,
      book,
    });
  } else {
    res.status(404).redirect("/404");
  }
};

module.exports.postBookUpdate = (req, res) => {
  const { id } = req.params;
  const { title, description, authors } = req.body;
  
  console.log(req.body)

  const bookIndex = store.findIndex((item) => item.id === id);

  if (bookIndex) {
    
    store[bookIndex] = {
      ...store[bookIndex],
      title,
      description,
      authors: authors.split(","),
    };
    
    res.redirect("/" + id)
  } else {
    res.redirect("/404");
  }
};

module.exports.getBookCreate = (req, res) => {
  res.render("books/create", {
    title: "create | book",
    book: {title: "", description: '', authors: []}
  });
};

module.exports.postBookCreate = (req, res) => {
  const {title, description, authors} = req.body;
  
  const newBook = new Book({title, description, authors: authors.split(', ')});
  
  store.push(newBook);
  
  res.redirect('/' + newBook.id)
};
