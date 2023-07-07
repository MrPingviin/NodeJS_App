import sequelize from "../utility/sequelize.js";
import Utility from "../utility/utility.js";
import Model from "../models/model.js";

const resetRemaining = async (token, res) => {
  try {

    await Model.token.update({ remaining: Utility.config.defaultRemaining }, {
      where: {
        Token: token
      }
    });

    return res
      .status(200)
      .send(
        `Token remaining resetted to the default value(${Utility.config.defaultRemaining})`
      );
  } catch (error) {
    return res
      .status(503)
      .send("Failed to reset the token's remainings. Please try again.");
  };
};


export default resetRemaining;