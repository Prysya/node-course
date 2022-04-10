const router = require("express").Router();

const viewBooks = require("./view/books");

const apiBooks = require("./api/books");
const apiUsers = require("./api/users");

/* api routes */
router.use("/api/user", apiUsers);
router.use("/api/books", apiBooks);

/* view routes */
router.use("/", viewBooks);

module.exports = router;
