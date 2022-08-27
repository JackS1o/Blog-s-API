const { BlogPost, User, PostCategory, sequelize } = require('../database/models');

const addPost = async (body, auth) => {
  // const teste = await BlogPost.findByPk(2, { inclide: { model: User } });
  // console.log('hdhwd', teste);
  const a = await sequelize.transaction(async (transaction) => {
    const { title, content, categoryIds } = body;
  
    const { id } = await User.findOne({ where: { email: auth } });
    
    const { id: postId, updated, published } = await BlogPost
      .create({ title, content, userId: id }, { transaction });
    
    const ids = await categoryIds.map((post) => ({ postId, categoryId: post }));
    await PostCategory.bulkCreate(ids, { transaction });
    const finalResult = { id: postId, title, content, userId: id, updated, published };
    return finalResult;
  });
  return a;
};

module.exports = {
  addPost,
};
