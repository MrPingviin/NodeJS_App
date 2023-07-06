const root = require("./path");
const sequalize = require("./../utility/sequalize");
const Utility = require("./../utility");

exports.tokenChecker = async (token) => {
  let result = Utility.tokenCheckerResults.TOKEN_NOT_VALID;

  try {
    const tokens = await sequelize.query(
      "SELECT Token FROM Tokens WHERE Tokens = :token",
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );

    tokens.find((item) => {
      if (item.Token === token) {
        item.Remaining > 0
          ? (result = Utility.tokenCheckerResults.TOKEN_VALID_REMAINING)
          : (result = Utility.tokenCheckerResults.TOKEN_VALID_NO_REMAINING);
        return true;
      }
    });

    return result;
  } catch (error) {
    res
      .status(503)
      .send("Error in the process of checking the token. Please try again.");
    return result;
  }
  return result;
};
