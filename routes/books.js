const router = require("express").Router();
const fileMiddleware  = require("../middlewares/multer");

const {
  getAllBooks,
  getBookById,
  createNewBook,
  updateBook,
  deleteBook,
  downloadBook,
} = require("../controllers/books");

router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.get("/:id/download", downloadBook);

router.post("/", fileMiddleware.single("filedata"), createNewBook);

router.put("/:id", updateBook);

router.delete("/:id", deleteBook);

module.exports = router;
