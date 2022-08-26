module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    displayName: {
      type: DataTypes.STRING,
      // defaultValue: ""
    },
    image: {
      type: DataTypes.STRING,
      // defaultValue: ""
    },
  },
  {
    timestamps: false,
  });
  User.associate = (models) => {
    User.hasMany(models.BlogPost , { foreignKey: 'userId' });
  }
  return User;
}
