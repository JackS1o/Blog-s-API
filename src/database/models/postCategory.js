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
    models.Category.belongsToMany(models.BlogPost, {
      through: 'PostCategory',
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
    models.BlogPost.belongsToMany(models.Category, {
      through: 'PostCategory',
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  }
  return PostCategory;
};
