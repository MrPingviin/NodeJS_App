import Model from "../models/model.js";
import crypto from "crypto";
import Utility from "./../utility/utility.js";
import sequelize from "./../utility/sequelize.js";

const createToken = (req, res) => {
  const newtoken = crypto.randomUUID();
  const platform = req.body.platform.toLowerCase();

  const getResult = async () => {

    const result = await Model.token.findAll({
      where: {
        Token: newtoken
      }
    })

    return result;
  };

  Model.token.create({
    token: newtoken,
    platform: platform,
    remaining: Utility.config.defaultRemaining,
  })
    .then((response) => {
      const sendResult = async () => {
        const result = await getResult();
        res.status(200).json(result);
      };
      sendResult();
    })
    .catch((error) => {
      /* res.status(503).json("Failed to create the new token. Please try again."); */
    });
};

export default createToken;
