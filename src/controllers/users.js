module.exports.handleUserLogin = (req, res, next) => {
  try {
    res.status(200).json({ status: 200, id: 1, mail: "test@mail.ru" });
  } catch (err) {
    next(err);
  }
};
