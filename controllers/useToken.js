import express from "express";
import root from "../utility/path.js";
import sequelize from "../utility/sequelize.js";
import Model from "./../models/model.js";

const useToken = async (token, res) => {
  try {

    const currentRemaining = await Model.token.findAll({
      attributes: ["Remaining"],
      where: {
        Token: token
      }
    });

    if (currentRemaining[0].dataValues.Remaining > 0) {
      await Model.token.update({ remaining: currentRemaining[0].dataValues.Remaining - 1 }, {
        where: {
          Token: token
        }
      });
    }

    return true;

  } catch (error) {
    /* res
      .status(503)
      .send(
        "Error in the process of calculating remainigs in the token. Please try again."
      ); */
    return false;
  }
};

export default useToken;