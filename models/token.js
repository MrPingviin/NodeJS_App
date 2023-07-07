import { Sequelize, DataTypes } from 'sequelize';
import sequelize from "../utility/sequelize.js";

const Token = sequelize.define("Token", {
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

export default Token;
