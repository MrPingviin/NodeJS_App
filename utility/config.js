import dotenv from "dotenv";
dotenv.config();

const Config = {
  defaultRemaining: process.env.DEFAULT_TOKEN_REMAINING,
  minTitleLength: process.env.MIN_TITLE_LENGTH,
  maxTitleLength: process.env.MAX_TITLE_LENGTH,
  minDescriptionLength: process.env.MIN_DESCRIPTION_LENGTH,
  maxDescriptionLength: process.env.MAX_DESCRIPTION_LENGTH,
  validPlatforms: process.env.VALID_PLATFORMS,
  db_connection_database: process.env.DB_CONNECTION_DATABASE,
  db_connection_user: process.env.DB_CONNECTION_USER,
  db_connection_password: process.env.DB_CONNECTION_PASSWORD,
  db_connection_ip: process.env.DB_CONNECTION_IP,
  db_connection_port: process.env.DB_CONNECTION_PORT,
  db_connection_dialect: process.env.DB_CONNECTION_DIALECT
};

export default Config;
