const router = require("express").Router();

const {
  getAllBooksView,
  getBookInfo,
  getBookUpdate,
  getBookCreate,
  postBookUpdate,
  postBookCreate
} = require("../../controllers/books");

router.get("/", getAllBooksView);
router.get("/create", getBookCreate);
router.post("/create", postBookCreate);

router.get("/:id", getBookInfo);
router.get("/:id/edit", getBookUpdate);

router.post("/:id/edit", postBookUpdate);

module.exports = router;
