const router = require("express").Router();

const {
  getAllBooks,
  getBookById,
  createNewBook,
  updateBook,
  deleteBook,
} = require("../../controllers/booksApi");

router.get("/", getAllBooks);
router.get("/:id", getBookById);

router.post("/", createNewBook);

router.put("/:id", updateBook);

router.delete("/:id", deleteBook);

module.exports = router;
