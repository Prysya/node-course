import { Router } from 'express';
import expressSession from 'express-session';

const expressSessionRoute = Router();

const { COOKIE_SECRET = 'secret' } = process.env;

expressSessionRoute.use(
  expressSession({
    secret: COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

export { expressSessionRoute };
