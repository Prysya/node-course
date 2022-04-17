const bcrypt = require('bcryptjs');
const escape = require('escape-html');

const User = require('../models/users');
const routes = require('../config/routes');

module.exports.getLoginPage = async (req, res, next) => {
  try {
    res.render('user/userForm', {
      title: 'Вход в личный кабинет',
      formTitle: 'Вход в личный кабинет',
      buttonTitle: 'Вход',
      isAuthenticated: req.isAuthenticated && req.isAuthenticated(),
      error: null,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.postUserLogin = async (req, res) => {
  try {
    return res.redirect('/');
  } catch (err) {
    res.render('user/userForm', {
      title: 'Вход в личный кабинет',
      formTitle: 'Вход в личный кабинет',
      buttonTitle: 'Вход',
      isAuthenticated: req.isAuthenticated && req.isAuthenticated(),
      error: err.message,
    });
  }
};

module.exports.getSignupPage = async (req, res, next) => {
  try {
    res.render('user/userForm', {
      title: 'Регистрация',
      formTitle: 'Регистрация',
      buttonTitle: 'Зарегистрироваться',
      isAuthenticated: req.isAuthenticated && req.isAuthenticated(),
      error: null,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserProfile = async (req, res, next) => {
  try {
    res.render('user/userPage', {
      title: 'Профиль',
      isAuthenticated: req.isAuthenticated && req.isAuthenticated(),
      user: req.user,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.createUserView = async (req, res) => {
  try {
    const { username, password } = req.body;

    const hash = await bcrypt.hash(password, 10);
    await User.create({
      username: escape(username),
      password: hash,
    });

    return res.status(201).redirect(routes.user.userPage);
  } catch (err) {
    res.render('user/userForm', {
      title: 'Регистрация',
      formTitle: 'Регистрация',
      buttonTitle: 'Зарегистрироваться',
      isAuthenticated: req.isAuthenticated && req.isAuthenticated(),
      error: err.message,
    });
  }
};

module.exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};
