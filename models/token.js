exports.Token = sequelize.define("Token", {
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  platform: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  remaining: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
