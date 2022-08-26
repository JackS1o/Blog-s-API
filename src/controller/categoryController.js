const Service = require('../service/categoryService');

const addCategory = async (req, res) => {
  const { body } = req;
  if (!body.name) return res.status(400).json({ message: '"name" is required' });
  const result = await Service.addCategory(body);
  return res.status(201).json(result);
};

const getCategory = async (req, res) => {
  const result = await Service.getCategory();
  return res.status(200).json(result);
};

module.exports = {
  addCategory,
  getCategory,
};
