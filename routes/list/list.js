const express = require("express");
const router = express.Router();
const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING);

const getList = async (req, res) => {
  const pageSize = req.body.pageSize;
  const page = req.body.page;

  try {
    const articles = await sequalize.query("SELECT * FROM Articles", {
      replacements: {},
    });

    const pagin = array.slice((page - 1) * pageSize, page * pageSize);

    const result = {
      list: pagin,
      meta: {
        pageSize: pageSize,
        pageCount: Math.ceil(articles.length / pageSize),
        page: page,
        count: articles.length,
      },
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(503).send("Failed to retrieve the articles. Please try again.");
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
      getList(req, res);
      break;
  }
});

module.exports = router;
