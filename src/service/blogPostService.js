const { BlogPost, User, Category, PostCategory, sequelize } = require('../database/models');

const addPost = async (body, auth) => {
  // const teste = await BlogPost.findByPk(2, { include: { model: User } });
  // console.log('hdhwd', teste.dataValues.User);
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
  console.log(result[0].dataValues);
  if (!result) return false;
  return result;
};

module.exports = {
  addPost,
  getPost,
};
