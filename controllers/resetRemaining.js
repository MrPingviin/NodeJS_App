import sequelize from "../utility/sequelize.js";
import Utility from "../utility/utility.js";
import Model from "../models/model.js";

const resetRemaining = async (token, res) => {
  try {

    let result = {
      message: "The token is valid but it still has remainings. No action taken."
    }

    const match = await Model.token.findAll({
      attributes: ['remaining'],
      where: {
        Token: token
      }
    });

    if (match[0].dataValues.remaining === 0) {

      await Model.token.update({ remaining: Utility.config.defaultRemaining }, {
        where: {
          Token: token
        }
      });

      result = {
        remaining: Utility.config.defaultRemaining
      }
      res.status(200).json(result);
      return true;
    }

    res.status(401).json(result);
    return false;
    
  } catch (error) {
    return res
      .status(503)
      .send("Failed to reset the token's remainings. Please try again.");
  };
};


export default resetRemaining;