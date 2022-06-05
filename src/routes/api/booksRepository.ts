import express from 'express';
import { container } from '../../containers/container';
import { BooksRepository } from '../../models/booksRepository';

const router = express.Router();

router.get(":id", async (req, res, next) => {
  try {
    const repo = container.get(BooksRepository);
    const book = await repo.getBook(req.params.id);

    res.status(200).json(book)
  } catch (err) {
    next(err)
  }
})
