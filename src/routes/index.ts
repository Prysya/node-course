import { Router } from 'express';

import { booksView } from 'controllers';

import { booksViewRouter } from './view/books';
import { usersViewRouter } from './view/users';

import { booksApiRouter } from './api/books';
import { usersApiRouter } from './api/users';
import { errorRouter } from './errors';

import { routes } from 'config';

const mainRouter = Router();

/* index route */
mainRouter.get(routes.basePath, booksView.getAllBooksView);

/* api routes */
mainRouter.use(routes.apiBasePath + routes.user.basePath, usersApiRouter);
mainRouter.use(routes.apiBasePath + routes.books.basePath, booksApiRouter);

/* view routes */
mainRouter.use(routes.books.basePath, booksViewRouter);

/* user login */
mainRouter.use(routes.user.basePath, usersViewRouter);

mainRouter.use(errorRouter);

export { mainRouter };
