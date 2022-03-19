const router = require('express').Router();

const books = require('./books')
const users = require('./users')

router.use('/user', users);
router.use('/books', books);

module.exports = router;
