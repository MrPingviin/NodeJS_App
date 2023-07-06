const express = require("express");
const root = require("./../../utility/path");
const Config = require("./../../config");
const Controllers = require("./../../controllers");
const Utility = require("./../../utility");
const sequelize = require("./../../utility/sequalize");
const router = express.Router();

router.post("/token", async (req, res) => {
  const token = req.header("Authorization");
  const tokenCheck = await Controller.tokenChecker(token);

  switch (tokenCheck) {
    case Utility.tokenCheck.TOKEN_NOT_VALID:
      res.status(404).send("There is no such token. Please use a valid token.");
      break;
    case Utility.tokenCheck.TOKEN_VALID_NO_REMAINING:
      Controllers.resetRemaining(token, res);
      break;
    case Utility.tokenCheck.TOKEN_VALID_REMAINING:
      res
        .status(200)
        .send("Token is valid and still has remainings. No action taken.");
      break;
  }
});

module.exports = router;
