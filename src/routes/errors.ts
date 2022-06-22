import { Router } from 'express';
import createError from 'http-errors';

import { messages } from 'utils';

const errorRouter = Router();

errorRouter.all('*', (_, __, next) => {
  next(createError(404, messages.errors.notFound));
});

export { errorRouter };
