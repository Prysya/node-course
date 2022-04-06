const router = require("express").Router();
const { NotFoundError } = require("../errors");
const { messages } = require("../utils");

router.all("*", (_, __, next) => {
  next(new NotFoundError(messages.errors.notFound));
});

module.exports = router;
