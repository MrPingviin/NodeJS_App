const express = require("express");
const router = express.Router();
const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING);

const getArticle = async (req, res) => {
  const id = req.body.id;
  const token = req.headers("Authorization");

  try {
    const article = await sequalize.query(
      "SELECT * FROM Articles WHERE ID = :id",
      {
        replacements: {
          id: id,
        },
      }
    );

    res.status(200).json(article);
  } catch (error) {
    res.status(503).send("Failed to retrieve the article. Please try again.");
  }
};

router.post("/", async (req, res) => {
  const token = req.header("Authorization");
  const tokenCheck = await tokenChecker(token);

  switch (tokenCheck) {
    case "TOKEN_NOT_VALID":
      res.status(404).send("There is no such token. Please use a valid token.");
      break;
    case "TOKEN_VALID_NO_REMAINING":
      res.status(401).send("Token is valid but no remaining");
      break;
    case "TOKEN_VALID_REMAINING":
      getArticle(req, res);
      break;
  }
});

module.exports = router;
