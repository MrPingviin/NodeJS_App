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

    const result = await Model.token.findAll({
      attributes: ['Remaining'],
      where: {
        Token: token
      }
    });

    res.status(200).json(result);
    
  } catch (error) {
    return res
      .status(503)
      .send("Failed to reset the token's remainings. Please try again.");
  };
};


export default resetRemaining;