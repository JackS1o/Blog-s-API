const { User } = require('../database/models');

const login = async ({ email }) => {
  const userEmail = await User.findOne({ where: { email } });
  if (!userEmail) return false;
  return userEmail;
};

const createUser = async (body) => {
  const { email } = body;
  const userEmail = await User.findOne({ where: { email } });
  if (userEmail) return false;
  const result = await User.create(body);
  if (!result) return false;
  return result;
};

module.exports = {
  login,
  createUser,
};
