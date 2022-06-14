export const errorHandlerMiddleware = (
  err,
  req,
  res,
  next,
) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).render('errors/404', {
    title: '404 | страница не найдена',
    message,
    isAuthenticated: req.isAuthenticated && req.isAuthenticated(),
  });

  next();
};
