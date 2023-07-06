const Models = require("../models");
const crypto = require("crypto");
const Config = require("./../utility/config");
const sequalize = require("./../utility/sequalize");

exports.createToken = (req, res) => {
  const newtoken = crypto.randomUUID();
  const platform = req.body.platform.toLowerCase();

  const getResult = async () => {
    const result = await sequelize.query(
      "SELECT * FROM Tokens WHERE Token = :token",
      {
        replacements: { token: newtoken },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    return result;
  };

  Models.Token.create({
    token: newtoken,
    platform: platform,
    remaining: Config.defaultRemaining,
  })
    .then((response) => {
      const sendResult = async () => {
        const result = await getResult();
        res.status(200).json(result);
      };
      sendResult();
    })
    .catch((error) => {
      res.status(503).json("Failed to create the new token. Please try again.");
    });
};
