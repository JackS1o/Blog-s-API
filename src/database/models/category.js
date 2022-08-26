module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    timestamps: false,
  });
  Category.associate = (models) => {
    Category.belongsTo(models.BlogPost, { through: 'PostCategory', foreignKey: 'categoryId'});
  }
  return Category;
};
