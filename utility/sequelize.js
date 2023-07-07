import { Sequelize, DataTypes } from "sequelize";
import Config from "./config.js";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(Config.db_connection_database, Config.db_connection_user, Config.db_connection_password, {
    host: Config.db_connection_ip,
    port: Config.db_connection_port,
    dialect: 'mariadb'
  });

export default sequelize;
