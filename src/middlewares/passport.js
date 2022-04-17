const router = require('express').Router();

const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');

const User = require('../models/users');
const routes = require('../config/routes')

/*
* Variables
* */

const options = {
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: false,
};


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
const verify = async (username, password, done) => {
  try {
    const user = await User.findUserByCredentials(username, password)
    return done(null, user );
  } catch (err) {
    return done(err);
  }
};

passport.use('local', new LocalStrategy(options, verify));

// Конфигурирование Passport для сохранения пользователя в сессии
passport.serializeUser((user, cb) => cb(null, user._id));
passport.deserializeUser((_id, cb) =>
  User.findById(_id, (err, user) => (err ? cb(err) : cb(null, user))),
);

router.use(passport.initialize());
router.use(passport.session());
router.use(passport.authenticate('session'));

const handleCheckIsNotAuth = (req, res, next) =>{
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    if (req.session) {
      console.log(req.originalUrl, req.url)
      req.session.returnTo = req.originalUrl || req.url
    }
    return res.redirect(routes.user.basePath + routes.user.login)
  }
  next()
}

const handleCheckIsAuth = (req, res, next) =>{
  if ((req.isAuthenticated && req.isAuthenticated())) {
    return res.redirect(routes.user.userPage)
  }
  next()
}


module.exports = {
  passport: router,
  authenticate: passport.authenticate('local', {
    failureRedirect: routes.user.login,
  }),
  handleCheckIsNotAuth,
  handleCheckIsAuth
};
