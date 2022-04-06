const path = require("path");

module.exports = (id) =>
  path.join(__dirname, "..", "public", "books", `book_${id}.txt`);
