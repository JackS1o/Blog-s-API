module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      foreignKey: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'BlogPosts',
        key: 'id',
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'Categories',
        key: 'id',
      },
    }
  },
  {
    timestamps: false,
    tableName: 'PostCategories'
  });
  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      through: PostCategory,
      foreignKey: 'categoryId',
      as: 'blogPosts',
    });
    models.BlogPost.belongsToMany(models.Category, {
      through: PostCategory,
      foreignKey: 'postId',
      as: 'categories',
    });
  }
  return PostCategory;
};
