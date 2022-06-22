import { Router } from 'express';
import 'express-session';

import passport from 'passport';
import type { IVerifyOptions } from 'passport-local';
import { Strategy as LocalStrategy } from 'passport-local';

import { User } from 'models';
import { routes } from 'config';
import type { ExpressMiddleware, IUserDocument } from 'types';

const router = Router();

declare global {
  namespace Express {
    interface User {
      _id?: string;
    }
  }
}

declare module 'express-session' {
  interface SessionData {
    returnTo: string;
  }
}

/*
 * Variables
 * */

const options = {
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: false,
} as const;

/**
 * Функция для проверки пользователя
 * @param {string} username - логин пользователя
 * @param {string} password - пароль пользователя
 * @param {function} done - коллбэк пользователя
 *
 * @requires User
 *
 * @return возвращает вызов колбэка с ошибкой или пользователем
 * */
const verify = async (
  username: string,
  password: string,
  done: (error: any, user?: any, options?: IVerifyOptions) => void,
) => {
  try {
    const user = await User.findUserByCredentials(username, password);
    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

passport.use('local', new LocalStrategy(options, verify));

// Конфигурирование Passport для сохранения пользователя в сессии
passport.serializeUser((user, cb) => cb(null, user._id));

passport.deserializeUser((_id, cb) =>
  User.findById(_id, (err: NativeError, user: IUserDocument) =>
    err ? cb(err) : cb(null, user),
  ),
);

router.use(passport.initialize());
router.use(passport.session());
router.use(passport.authenticate('session'));

const handleCheckIsNotAuth: ExpressMiddleware = (req, res, next) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    if (req.session) {
      req.session.returnTo = req.originalUrl || req.url;
    }
    return res.redirect(routes.user.basePath + routes.user.login);
  }
  next();
};

const handleCheckIsAuth: ExpressMiddleware = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return res.redirect(routes.user.userPage);
  }
  next();
};

const passportRouter = {
  router,
  authenticate: passport.authenticate('local', {
    failureRedirect: routes.user.login,
  }),
  handleCheckIsNotAuth,
  handleCheckIsAuth,
};

export { passportRouter };
