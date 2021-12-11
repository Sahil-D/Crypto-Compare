const catchAsync = require('../utils/catchAsync');
const userService = require('../services/userService');

const registerNewUser = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const newuser = await userService.registerNewUser(username, password);
  return { status: true, data: newuser };
});

const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const user = await userService.login(username, password);
  return { status: 'success', data: user };
});

module.exports = {
  registerNewUser,
  login,
};
