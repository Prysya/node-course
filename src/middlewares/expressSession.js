const router = require('express').Router();

const {COOKIE_SECRET = 'secret'} = process.env;

router.use(
  require('express-session')({
    secret: COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
  })
)

module.exports = router;
