module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
      references: {
        model: 'Users',
        key: 'id',
      }
    },
    published: {
      type: DataTypes.DATE,
    },
    updated: {
      type: DataTypes.DATE,
    }
  },
  {
    createdAt: 'published',
    updatedAt: 'updated',
  });
  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, { foreignKey: 'userId', as: 'user'});
    // BlogPost.belongsToMany(models.Category, { through: 'PostCategory', foreignKey: 'postId', as: 'categories'});
  }
  return BlogPost;
};
