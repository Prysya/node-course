const router = require('express').Router();

const { getAllBooksView } = require('../controllers/booksView');

const viewBooks = require('./view/books');
const viewUsers = require('./view/users');

const apiBooks = require('./api/books');
const apiUsers = require('./api/users');
const errorRoute = require('./errors');

const routes = require('../config/routes');

/* index route */
router.get(routes.basePath, getAllBooksView);

/* api routes */
router.use(routes.apiBasePath + routes.user.basePath, apiUsers);
router.use(routes.apiBasePath + routes.books.basePath, apiBooks);

/* view routes */
router.use(routes.books.basePath, viewBooks);

/* user login */
router.use(routes.user.basePath, viewUsers);

router.use(errorRoute);

module.exports = router;
