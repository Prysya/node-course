const router = require("express").Router();

const books = require("./books");
const users = require("./users");
const error = require("./errors");

router.use("/user", users);
router.use("/books", books);
router.use("*", error);

module.exports = router;
