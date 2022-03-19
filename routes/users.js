const router = require("express").Router();

const { handleUserLogin } = require("../controllers/users");

router.get("/login", handleUserLogin);

module.exports = router;
