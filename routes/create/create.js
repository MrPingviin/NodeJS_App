const express = require("express");
const root = require("./../../utility/path");
const Controllers = require("./../../controllers");
const Config = require("./../../config");
const Utility = require("./../../utility");
const router = express.Router();

router.post("/article", async (req, res) => {
  const token = req.header("Authorization");
  const tokenCheck = await Controllers.tokenchecker(token);

  switch (tokenCheck) {
    case Utility.tokenCheck.TOKEN_NOT_VALID:
      res.status(404).send("There is no such token. Please use a valid token.");
      break;
    case Utility.tokenCheck.TOKEN_VALID_NO_REMAINING:
      res.status(401).send("Token is valid but no remaining");
      break;
    case Utility.tokenCheck.TOKEN_VALID_REMAINING:
      if (Controllers.lengthChecker(req)) {
        Controllers.createArticle(req, res);
        Controllers.useToken(token);
      } else {
        res
          .status(400)
          .send(
            `Title (min ${Config.minTitleLength}, max ${Config.maxTitleLength} chars) or description (min ${Config.minDescriptionLength}, max ${Config.maxDescriptionLength} chars) doesn't have a proper length.`
          );
      }
      break;
  }
});

router.post("/token", (req, res) => {
  if (Controllers.platformValidator(req, Config.validPlatforms)) {
    Controllers.createToken(req, res);
  } else {
    res
      .status(400)
      .send(
        `Platform is either not provided or not valid. Please provide a valid platform. ${Config.validPlatforms} `
      );
  }
});

module.exports = router;
