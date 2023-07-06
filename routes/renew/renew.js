const express = require('express');
const fs = require('fs');
const path = require('path');
const root = require("./../../utility/path");
const tokenChecker = require("./../../utility/tokenChecker");
const router = express.Router();
const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING);
const defaultRemaining = process.env.DEFAULT_TOKEN_REMAINING;

const resetRemaining = async (token, res) => {
    try {
        await sequelize.query(
            `UPDATE Tokens SET Remaining = :defaultRemaining WHERE Token = :token`,
            {
                replacements: { defaultRemaining: defaultRemaining, token: token },
                type: sequelize.QueryTypes.UPDATE
            }
        );
        return res.status(200).send(`Token remaining resetted to the default value(${defaultRemaining})`);
    } catch (error) {
        return res.status(503).send("Failed to reset the token's remainings. Please try again.");
    }
};

router.post("/token", async (req, res) => {
    const token = req.header("Authorization");
    const tokenCheck = await tokenChecker(token);

    switch (tokenCheck) {
        case "TOKEN_NOT_VALID":
            res.status(404).send("There is no such token. Please use a valid token.");
            break;
        case "TOKEN_VALID_NO_REMAINING":
            resetRemaining(token, res);
            break; 
        case "TOKEN_VALID_REMAINING":
            res.status(200).send("Token is valid and still has remainings. No action taken.");
            break;
    }
});

module.exports = router;
