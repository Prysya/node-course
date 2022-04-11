const router = require("express").Router();

const {
  getBookInfo,
  getBookCreate,
  postBookUpdate,
  postBookCreate
} = require("../../controllers/booksView");

router.get("/create", getBookCreate);
router.post("/create", postBookCreate);

router.get("/:id", getBookInfo(false));
router.get("/:id/edit", getBookInfo(true));

router.post("/:id/edit", postBookUpdate);

module.exports = router;
