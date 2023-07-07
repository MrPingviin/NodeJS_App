import express from "express";
import root from "./../../utility/path.js";
import Controller from "./../../controllers/controller.js";
import Utility from "./../../utility/utility.js";
const router = express.Router();

router.post("/article", async (req, res) => {
  const token = req.header("Authorization");
  const tokenCheck = await Controller.tokenChecker(token, res);

  switch (tokenCheck) {
    case Utility.tokenCheckerResults.TOKEN_NOT_VALID:
      return res.status(404).send("There is no such token. Please use a valid token.");
      break;
    case Utility.tokenCheckerResults.TOKEN_VALID_NO_REMAINING:
      return res.status(401).send("Token is valid but no remaining");
      break;
    case Utility.tokenCheckerResults.TOKEN_VALID_REMAINING:
      if (Controller.lengthChecker(req)) {
        Controller.createArticle(req, res);
        Controller.useToken(token, res);
      } else {
        return res
          .status(400)
          .send(
            `Title (min ${Utility.config.minTitleLength}, max ${Utility.config.maxTitleLength} chars) or description (min ${Utility.config.minDescriptionLength}, max ${Utility.config.maxDescriptionLength} chars) doesn't have a proper length.`
          );
      }
      break;
  }
});

router.post("/token", (req, res) => {
  if (Controller.platformValidator(req, Utility.config.validPlatforms)) {
    Controller.createToken(req, res);
  } else {
    res
      .status(400)
      .send(
        `Platform is either not provided or not valid. Please provide a valid platform. ${Utility.config.validPlatforms} `
      ); 
  }
});

export default router;