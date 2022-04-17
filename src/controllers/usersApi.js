const escape = require('escape-html');
const createError = require('http-errors');
const bcrypt = require('bcryptjs');
const User = require('../models/users');
const messages = require('../utils/messages');

module.exports.getUserInfo = async (req, res, next) => {
  try {
    res.status(200).send({ status: '200', data: { ...req.user } });
  } catch (err) {
    next(err);
  }
};

module.exports.createUser = async (req, res, next) => {
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
    next(createError(400, err.message));
  }
};
