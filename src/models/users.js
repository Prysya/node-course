const { Schema, model } = require('mongoose');
const createError = require('http-errors');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');

const { messages } = require('../utils');

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, messages.user.nameIsLongOrShort],
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(name) {
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

/**
 *
 * @memberOf User
 */
userSchema.statics.findUserByCredentials = function (
  username,
  password,
) {
  return this.findOne({ username })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw createError(401, messages.auth.wrongUsernameOrPassword);
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw createError(401, messages.auth.wrongUsernameOrPassword);
        }

        return user;
      });
    })
};

userSchema.plugin(uniqueValidator, {
  message: messages.auth.usernameIsNotUnique,
});

/** @class User */
const User = model('User', userSchema);

module.exports = User;
