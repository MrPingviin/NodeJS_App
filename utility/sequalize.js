const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING);

exports.modules = sequelize;
