import { Router } from 'express';

import { routes } from 'config';
import { booksApi } from 'controllers';

const { getAllBooks, getBookById, createNewBook, updateBook, deleteBook } =
  booksApi;

const booksApiRouter = Router();

booksApiRouter.get(routes.basePath, getAllBooks);
booksApiRouter.get(routes.books.bookId, getBookById);

booksApiRouter.post(routes.basePath, createNewBook);

booksApiRouter.put(routes.books.bookId, updateBook);

booksApiRouter.delete(routes.books.bookId, deleteBook);

export { booksApiRouter };
