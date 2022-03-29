module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  
  res.render("errors/404", {
    title: "404 | страница не найдена",
  });
  
  // res.status(statusCode).send({
  //   message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  //   err,
  // });
  
 

  next();
};
