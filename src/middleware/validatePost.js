const { Category } = require('../database/models');

const validatePost = (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  if (!title || !content || !categoryIds) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  if (categoryIds.length <= 0) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }
  next();
};

const ifCategoryExists = async (req, res, next) => {
  const { categoryIds } = req.body;
  const falseArray = [];
  await Promise.all(categoryIds.map(async (id) => {
    const result = await Category.findOne({ where: { id } });
    if (!result) return falseArray.push(result);
    return result;
  }));
  if (falseArray.length > 0) return res.status(400).json({ message: '"categoryIds" not found' });
  next();
};

module.exports = {
  validatePost,
  ifCategoryExists,
};
