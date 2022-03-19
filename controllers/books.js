const { Book } = require("../models/book");

let store = [...["1", "2", "3"].map((id) => new Book({ id }))];

module.exports.getAllBooks = (req, res) => {
  res.status(200).json({ status: 200, data: store });
};

module.exports.getBookById = (req, res) => {
  const { id } = req.params;

  console.log(req.params);

  const book = store.find((item) => item.id === id);

  if (book) {
    return res.status(200).json({ status: 200, data: book });
  }

  res.status(404).json({ status: 404, error: "Данные не найдены" });
};

module.exports.createNewBook = (req, res) => {
  const newBook = new Book(req.body);

  store.push(newBook);

  res.status(200).json({ status: 200, data: newBook });
};

module.exports.updateBook = (req, res) => {
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
      message: "Данные обновлены успешно",
    });
  }

  res.status(404).json({ status: 404, error: "Данные не найдены" });
};

module.exports.deleteBook = (req, res) => {
  const { id } = req.params;

  const book = store.find((item) => item.id === id);

  if (book) {
    store = store.filter((item) => item.id !== id);

    res.status(200).json({ status: 200, message: "ok" });
  }

  res.status(404).json({ status: 404, error: "Данные не найдены" });
};
