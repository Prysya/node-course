import { Router } from 'express';

import { usersApi } from 'controllers';
import { routes } from 'config';
import { passportRouter } from 'middlewares';

const { createUser, getUserInfo } = usersApi;

const usersApiRouter = Router();

usersApiRouter.get(routes.user.login, passportRouter.authenticate, getUserInfo);
usersApiRouter.post(routes.user.signup, createUser);

export { usersApiRouter };
