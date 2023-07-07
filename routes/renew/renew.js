import express from "express";
import root from "./../../utility/path.js";
import Controller from "./../../controllers/controller.js";
import Utility from "./../../utility/utility.js";
const router = express.Router();

router.post("/token", async (req, res) => {
  const token = req.header("Authorization");
  const tokenCheck = await Controller.tokenChecker(token, res);

  switch (tokenCheck) {
    case Utility.tokenCheckerResults.TOKEN_NOT_VALID:
      res.status(404).send("There is no such token. Please use a valid token.");
      break;
    case Utility.tokenCheckerResults.TOKEN_VALID_NO_REMAINING:
      Controller.resetRemaining(token, res);
      break;
    case Utility.tokenCheckerResults.TOKEN_VALID_REMAINING:
      res
        .status(200)
        .send("Token is valid and still has remainings. No action taken.");
      break;
  }
});

export default router;
