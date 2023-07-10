import express from "express";
import Controller from "./../../controllers/controller.js";
import Utility from "./../../utility/utility.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const token = req.header("Authorization");
  const tokenCheck = await Controller.tokenChecker(token, res);

  switch (tokenCheck) {
    case Utility.tokenCheckerResults.TOKEN_NOT_VALID:
      res.status(404).send("There is no such token. Please use a valid token.");
      break;
    case Utility.tokenCheckerResults.TOKEN_VALID_NO_REMAINING:
      res.status(401).send("Token is valid but no remaining");
      break;
    case Utility.tokenCheckerResults.TOKEN_VALID_REMAINING:
      Controller.getArticle(req, res, token);
      break;
  }
});

export default router;
