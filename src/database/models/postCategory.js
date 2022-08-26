module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      references: {
        model: 'BlogPosts',
        key: 'id',
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      references: {
        model: 'Categories',
        key: 'id',
      },
    },
    timestamps: false,
  });
  PostCategory.associate = (models) => {
    PostCategory.belongsToMany(models.BlogPost, { through: 'PostCategory', foreignKey: 'categoryId'});
    PostCategory.belongsToMany(models.Category, { through: 'PostCategory', foreignKey: 'postId'});
  }
  return PostCategory;
};
