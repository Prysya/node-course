import { Router } from 'express';

import { usersView } from 'controllers';
import { passportRouter } from 'middlewares';
import { routes } from 'config';

const {
  getLoginPage,
  getSignupPage,
  createUserView,
  getUserProfile,
  logout,
  postUserLogin,
} = usersView;

const usersViewRouter = Router();
const { authenticate, handleCheckIsAuth, handleCheckIsNotAuth } =
  passportRouter;

usersViewRouter.get(routes.user.login, handleCheckIsAuth, getLoginPage);
usersViewRouter.post(routes.user.login, authenticate, postUserLogin);

usersViewRouter.get(routes.user.signup, handleCheckIsAuth, getSignupPage);
usersViewRouter.post(routes.user.signup, createUserView);

usersViewRouter.get(routes.user.userPage, handleCheckIsNotAuth, getUserProfile);

usersViewRouter.post(routes.user.logout, logout);

export { usersViewRouter };
