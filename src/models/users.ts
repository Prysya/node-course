import { Schema, model } from 'mongoose';
import createError from 'http-errors';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import uniqueValidator from 'mongoose-unique-validator';

import { messages } from 'utils';
import type { IUser, IUserDocument, IUserModel } from 'types';

const userSchema = new Schema<IUserDocument>({
  username: {
    type: String,
    required: [true, messages.user.nameIsLongOrShort],
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(name: string) {
        return !validator.isEmpty(name, { ignore_whitespace: true });
      },
      message: messages.schemas.isEmpty,
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, messages.user.passwordTooShort],
    minlength: 8,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (username, password) {
  return this.findOne({ username })
    .select('+password')
    .then((user: IUser) => {
      if (!user) {
        throw createError(401, messages.auth.wrongUsernameOrPassword);
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw createError(401, messages.auth.wrongUsernameOrPassword);
        }

        return user;
      });
    });
};

userSchema.plugin(uniqueValidator, {
  message: messages.auth.usernameIsNotUnique,
});

export const User = model<IUserDocument, IUserModel>('User', userSchema);
