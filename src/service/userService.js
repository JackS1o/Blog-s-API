const { User } = require('../database/models');

const login = async (body) => {
  const userEmail = await User.findOne({ where: body });
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

const getAllUsers = async () => {
  const result = await User.findAll({ attributes: { exclude: ['password'] } });
  if (!result) return false;
  return result;
};

const getUserById = async (id) => {
  const result = await User.findByPk(id, { attributes: { exclude: ['password'] } });
  if (!result) return false;
  return result;
};

const deleteMe = async (auth) => {
  await User.destroy({ where: { email: auth } });
  return true;
};

module.exports = {
  login,
  createUser,
  getAllUsers,
  getUserById,
  deleteMe,
};
