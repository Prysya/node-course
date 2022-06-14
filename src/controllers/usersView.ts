import bcrypt from 'bcryptjs';
import escape from 'escape-html';
import type { HttpError } from 'http-errors';

import { User } from 'models';
import { routes } from 'config';
import type { ExpressMiddleware, ExpressResponse } from 'types';

export const getLoginPage: ExpressMiddleware = async (req, res, next) => {
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

export const postUserLogin: ExpressResponse = async (req, res) => {
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

export const getSignupPage: ExpressMiddleware = async (req, res, next) => {
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

export const getUserProfile: ExpressMiddleware = async (req, res, next) => {
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

export const createUserView: ExpressResponse = async (req, res) => {
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

export const logout: ExpressResponse = async (req, res) => {
  req.logout(null);
  res.redirect('/');
};
