import root from "../utility/path.js";
import sequelize from "./../utility/sequelize.js";
import Utility from "./../utility/utility.js";
import Model from "./../models/model.js";
import { Op } from "sequelize";

const tokenChecker = async (token, res) => {
  let result = Utility.tokenCheckerResults.TOKEN_NOT_VALID;

  try {

    const results = await Model.token.findAll({
      where: {
        Token: token
        }
    });

    if (results.length > 0) { result = Utility.tokenCheckerResults.TOKEN_VALID_NO_REMAINING };
    if (results[0].remaining > 0) { result = Utility.tokenCheckerResults.TOKEN_VALID_REMAINING };

    return result;

  } catch (error) {
/*     res
      .status(503)
      .send("Error in the process of checking the token. Please try again."); */
    return result;
  }
};

export default tokenChecker;