const { User } = require('../database/models');

const login = async ({ email }) => {
  const userEmail = await User.findOne({ where: { email } });
  if (!userEmail) return false;
  return userEmail;
};

module.exports = { login };