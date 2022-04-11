module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  
  res.status(statusCode).render("errors/404", {
    title: "404 | страница не найдена",
    message
  });

  next();
};
