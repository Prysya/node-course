const router = require("express").Router();

const {
  getAllBooks,
  getBookById,
  createNewBook,
  updateBook,
  deleteBook,
  downloadBook
} = require("../controllers/books");

router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.get('/:id/download', downloadBook)

router.post("/", createNewBook);

router.put("/:id", updateBook);

router.delete("/:id", deleteBook);

module.exports = router;
