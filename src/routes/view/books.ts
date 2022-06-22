import { Router } from 'express';

import { booksView } from 'controllers';
import { routes } from 'config';

const { getBookInfo, getBookCreate, postBookUpdate, postBookCreate } =
  booksView;

const booksViewRouter = Router();

booksViewRouter.get(routes.books.create, getBookCreate);
booksViewRouter.post(routes.books.create, postBookCreate);

booksViewRouter.get(routes.books.bookId, getBookInfo(false));
booksViewRouter.get(routes.books.edit, getBookInfo(true));

booksViewRouter.post(routes.books.edit, postBookUpdate);

export { booksViewRouter };
