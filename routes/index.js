const router = require("express").Router();

const viewBooks = require("./view/books");

const apiBooks = require("./api/books");
const apiUsers = require("./api/users");

/* view routes */
router.use("/", viewBooks);

/* api routes */
router.use("/api/user", apiUsers);
router.use("/api/books", apiBooks);

module.exports = router;
