const router = require("express").Router();

const {
  getAllBooks,
  getBookById,
  createNewBook,
  updateBook,
  deleteBook,
} = require("../../controllers/booksApi");

const routes = require('../../config/routes');

router.get(routes.basePath, getAllBooks);
router.get(routes.books.bookId, getBookById);

router.post(routes.basePath, createNewBook);

router.put(routes.books.bookId, updateBook);

router.delete(routes.books.bookId, deleteBook);

module.exports = router;
