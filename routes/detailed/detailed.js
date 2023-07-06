const express = require("express");
const router = express.Router();
const Controllers = require("./../../controllers");
const Utility = require("./../../utility");

router.post("/", async (req, res) => {
  const token = req.header("Authorization");
  const tokenCheck = await Controllers.tokenChecker(token);

  switch (tokenCheck) {
    case Utility.tokenCheck.TOKEN_NOT_VALID:
      res.status(404).send("There is no such token. Please use a valid token.");
      break;
    case Utility.tokenCheck.TOKEN_VALID_NO_REMAINING:
      res.status(401).send("Token is valid but no remaining");
      break;
    case Utility.tokenCheck.TOKEN_VALID_REMAINING:
      Controllers.getArticle(req, res);
      break;
  }
});

module.exports = router;
