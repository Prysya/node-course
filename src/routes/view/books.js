const router = require('express').Router();

const {
  getBookInfo,
  getBookCreate,
  postBookUpdate,
  postBookCreate,
} = require('../../controllers/booksView');

const routes = require('../../config/routes');

router.get(routes.books.create, getBookCreate);
router.post(routes.books.create, postBookCreate);

router.get(routes.books.bookId, getBookInfo(false));
router.get(routes.books.edit, getBookInfo(true));

router.post(routes.books.edit, postBookUpdate);

module.exports = router;
