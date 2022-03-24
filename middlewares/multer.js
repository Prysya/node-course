const multer = require("multer");
const uuid = require("uuid");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/books");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}_${uuid.v4()}`);
  },
});

const fileFilter = (req, file, cb) => {
  console.log(file.mimetype);
  
  if (file.mimetype === "text/plain") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = multer({
  storage, fileFilter
});
