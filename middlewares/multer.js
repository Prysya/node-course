const multer = require("multer");
const uuid = require("uuid");
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'public', 'books'));
  },
  filename: (req, file, cb) => {
    cb(null, `book_${uuid.v4()}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "text/plain") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = multer({
  storage, fileFilter
});
