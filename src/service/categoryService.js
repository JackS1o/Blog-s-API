const { Category } = require('../database/models');

const addCategory = async (body) => {
  const result = await Category.create(body);
  if (!result) return false;
  return ({ id: result.null, name: result.name });
};

const getCategory = async () => {
  const result = await Category.findAll();
  if (!result) return false;
  return result;
};

module.exports = {
  addCategory,
  getCategory,
};
