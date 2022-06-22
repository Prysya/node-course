import { Router } from 'express';

import { container } from 'containers';
import { BooksRepository } from 'models';

const booksRepositoryApiRouter = Router();

booksRepositoryApiRouter.get(':id', async (req, res, next) => {
  try {
    const repo = container.get(BooksRepository);
    const book = await repo.getBook(req.params.id);

    res.status(200).json(book);
  } catch (err) {
    next(err);
  }
});

export { booksRepositoryApiRouter };
