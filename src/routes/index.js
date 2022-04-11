const router = require('express').Router();

const { getAllBooksView } = require('../controllers/booksView');

const viewBooks = require('./view/books');

const apiBooks = require('./api/books');
const apiUsers = require('./api/users');
const errorRoute  = require('./errors');

/* index route */
router.get('/', getAllBooksView);

/* api routes */
router.use('/api/user', apiUsers);
router.use('/api/books', apiBooks);

/* view routes */
router.use('/books', viewBooks);

router.use(errorRoute)

module.exports = router;
