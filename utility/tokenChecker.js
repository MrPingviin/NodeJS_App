const express = require('express');
const fs = require('fs');
const path = require('path');
const root = require('./path');
const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING);

const tokenChecker = async (token) => {

    let result = "TOKEN_NOT_VALID";

    try {
        const tokens = await sequelize.query('SELECT * FROM Tokens', {
            type: sequelize.QueryTypes.SELECT
        });

        tokens.find((item) => {
            if (item.Token === token) {
                (item.Remaining > 0) ? result = "TOKEN_VALID_REMAINING" : result = "TOKEN_VALID_NO_REMAINING";
                return true;
            }
        })

        return result;

    } catch (error) {
        res.status(503).send("Error in the process of checking the token. Please try again.");
        return result;
    }
    return result;
}

module.exports = tokenChecker;