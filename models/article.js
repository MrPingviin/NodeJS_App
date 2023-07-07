import { Sequelize, DataTypes } from 'sequelize';
import sequelize from "../utility/sequelize.js";

const Article = sequelize.define("Article", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Article;
