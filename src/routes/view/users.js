const router = require('express').Router();

const {
  getLoginPage,
  getSignupPage,
  createUserView,
  getUserProfile,
  logout,
  postUserLogin,
} = require('../../controllers/usersView');
const {
  authenticate,
  handleCheckIsAuth,
  handleCheckIsNotAuth,
} = require('../../middlewares/passport');

const routes = require('../../config/routes');

router.get(routes.user.login, handleCheckIsAuth, getLoginPage);
router.post(routes.user.login, authenticate, postUserLogin);

router.get(routes.user.signup, handleCheckIsAuth, getSignupPage);
router.post(routes.user.signup, createUserView);

router.get(routes.user.userPage, handleCheckIsNotAuth, getUserProfile);

router.post(routes.user.logout, logout);

module.exports = router;
