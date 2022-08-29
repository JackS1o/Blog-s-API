const { BlogPost, User, Category, PostCategory,
  sequelize, Sequelize } = require('../database/models');

const { Op } = Sequelize;

const addPost = async (body, auth) => {
  const result = await sequelize.transaction(async (transaction) => {
    const { title, content, categoryIds } = body;
  
    const { id } = await User.findOne({ where: { email: auth } });
    
    const { id: postId, updated, published } = await BlogPost
      .create({ title, content, userId: id }, { transaction });
    
    const ids = await categoryIds.map((post) => ({ postId, categoryId: post }));
    await PostCategory.bulkCreate(ids, { transaction });
    const finalResult = { id: postId, title, content, userId: id, updated, published };
    return finalResult;
  });
  return result;
};

const getPost = async () => {
  const result = await BlogPost.findAll({
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    {
    model: Category,
    as: 'categories',
    through: { attributes: [] },
    }],
  });
  if (!result) return false;
  return result;
};

const getPostById = async (id) => {
  const result = await BlogPost.findByPk(id, {
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    {
    model: Category,
    as: 'categories',
    through: { attributes: [] },
    }],
  });
  if (!result) return false;
  return result;
};

const updatePost = async (id, body) => {
  const { title, content } = body;
  await BlogPost.update({ title, content }, { where: { id } });
  const result = await getPostById(id);
  return result;
};

const deletePost = async (id) => {
  const post = await getPostById(id);
  if (!post) return false;
  await BlogPost.destroy({ where: { id } });
  return true;
};

const searchPost = async (q) => {
  const post = await BlogPost.findAll({
    where: {
      [Op.or]: [{ title: { [Op.like]: `%${q}%` } }, { content: { [Op.like]: `%${q}%` } },
      ],
    },
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    {
    model: Category,
    as: 'categories',
    through: { attributes: [] },
    }],
  });
  console.log(post);
  return post;
};

module.exports = {
  addPost,
  getPost,
  getPostById,
  updatePost,
  deletePost,
  searchPost,
};
