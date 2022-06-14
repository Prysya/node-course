import bcrypt from 'bcryptjs';
import escape from 'escape-html';
import type { HttpError } from 'http-errors';

import { User } from 'models';
import { routes } from 'config';

export const getLoginPage = async (req, res, next) => {
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

export const postUserLogin = async (req, res) => {
  try {
    return res.redirect('/');
  } catch (err) {
    const error = err as HttpError;

    res.render('user/userForm', {
      title: 'Вход в личный кабинет',
      formTitle: 'Вход в личный кабинет',
      buttonTitle: 'Вход',
      isAuthenticated: req.isAuthenticated && req.isAuthenticated(),
      error: error.message,
    });
  }
};

export const getSignupPage = async (req, res, next) => {
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

export const getUserProfile = async (req, res, next) => {
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

export const createUserView = async (req, res) => {
  try {
    const { username, password } = req.body;

    const hash = await bcrypt.hash(password, 10);
    await User.create({
      username: escape(username),
      password: hash,
    });

    return res
      .status(201)
      .redirect(routes.user.basePath + routes.user.userPage);
  } catch (err) {
    const error = err as HttpError;

    res.render('user/userForm', {
      title: 'Регистрация',
      formTitle: 'Регистрация',
      buttonTitle: 'Зарегистрироваться',
      isAuthenticated: req.isAuthenticated && req.isAuthenticated(),
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  req.logout(null);
  res.redirect('/');
};
