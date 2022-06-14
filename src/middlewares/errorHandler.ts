import { NextFunction, Request, Response, ErrorRequestHandler } from 'express';
import type { HttpError } from 'http-errors';

export const errorHandlerMiddleware = (
  err: null | HttpError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).render('errors/404', {
    title: '404 | страница не найдена',
    message,
    isAuthenticated: req.isAuthenticated && req.isAuthenticated(),
  });

  next();
};
