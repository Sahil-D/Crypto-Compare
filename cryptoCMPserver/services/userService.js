const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const { ErrorMessages } = require('../utils/ErrorMessages');
const ApiError = require('../utils/ApiError');
const User = require('../models/User');

async function registerNewUser(username, password) {
  if (!username || !password) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      ErrorMessages.INVALID_CREDENTIALS
    );
  }

  const usernameExists = await User.findOne({ username: username });
  if (usernameExists) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      ErrorMessages.USERNAME_ALREADY_REGISTERED
    );
  }

  try {
    // encoding password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await new User({
      username: username,
      password: hashedPassword,
    });

    await user.save();
    return user;
  } catch (err) {
    throw new ApiError(httpStatus.NOT_FOUND, err);
  }
}

async function login(username, password) {
  if (!username || !password) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      ErrorMessages.INVALID_CREDENTIALS
    );
  }

  try {
    const user = await User.findOne({ username: username });
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        ErrorMessages.INVALID_PASSWORD
      );
    }
    return user;
  } catch (err) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      ErrorMessages.GENERIC_ERROR_MESSAGE
    );
  }
}

module.exports = {
  registerNewUser,
  login,
};
