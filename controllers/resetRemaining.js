const sequelize = require("../utility/sequelize");
const Config = require("../utility/config");

exports.resetRemaining = async (token, res) => {
  try {
    await sequelize.query(
      `UPDATE Tokens SET Remaining = :defaultRemaining WHERE Token = :token`,
      {
        replacements: {
          defaultRemaining: Config.defaultRemaining,
          token: token,
        },
        type: sequelize.QueryTypes.UPDATE,
      }
    );
    return res
      .status(200)
      .send(
        `Token remaining resetted to the default value(${Config.defaultRemaining})`
      );
  } catch (error) {
    return res
      .status(503)
      .send("Failed to reset the token's remainings. Please try again.");
  }
};
