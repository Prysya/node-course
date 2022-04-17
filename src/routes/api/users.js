const router = require('express').Router();

const { getUserInfo, createUser } = require('../../controllers/usersApi');
const { authenticate } = require('../../middlewares/passport');

const routes = require('../../config/routes');

/*
 *
 * GET /api/user/login   страница с формой входа / регистрации
 * GET /api/user/me      страница профиля
 * POST /api/user/login
 * POST /api/user/signup
 *
 * */
router.get(routes.user.login, authenticate, getUserInfo);
router.post(routes.user.signup, createUser);
// router.get(routes.user.userPage, handleUserLogin);
//
// router.get(routes.user.login, handleUserLogin);
// router.get(routes.user.login, handleUserLogin);

module.exports = router;
