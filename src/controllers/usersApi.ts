import escape from 'escape-html';
import createError, { HttpError } from 'http-errors';
import bcrypt from 'bcryptjs';

import { User } from 'models';
import { messages } from 'utils';

// declare module 'express' {
//   export interface Request {
//     user: any;
//     isAuthenticated: any;
//     logout: any;
//   }
// }

export const getUserInfo = async (req, res, next) => {
  try {
    res.status(200).send({ status: '200', data: { ...req.user } });
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    await User.create({
      username: escape(username),
      password: hash,
    });

    res.status(201).json({
      status: '201',
      message: messages.auth.registrationIsSuccess,
    });
  } catch (err) {
    const error = err as HttpError;

    next(createError(400, error.message));
  }
};
