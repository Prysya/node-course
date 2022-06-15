import multer from 'multer';
import type { Request } from 'express';
import uuid from 'uuid';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'public', 'books'));
  },
  filename: (req, file, cb) => {
    cb(null, `book_${uuid.v4()}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: (error: Error | null, destination: boolean) => void,
) => {
  if (file.mimetype === 'text/plain') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const multerRouter = multer({
  storage,
  fileFilter,
});

export { multerRouter };
