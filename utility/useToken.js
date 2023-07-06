const express = require('express');
const fs = require('fs');
const path = require('path');
const root = require('./path');
const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING);

const useToken = async (token) => {

    try {
        const currentRemaining = await sequelize.query(
            `SELECT Remaining FROM Tokens WHERE Token = :token`,
            {
                replacements: { token: token },
                type: sequelize.QueryTypes.SELECT
            }
        );

        await sequelize.query(
            `UPDATE Tokens SET Remaining = :newRemaining WHERE Token = :token`,
            {
                replacements: { newRemaining: currentRemaining[0].Remaining - 1, token: token },
                type: sequelize.QueryTypes.UPDATE
            }
        );
    } catch (error) {
        res.status(503).send("Error in the process of calculating remainigs in the token. Please try again.");
        return false;
    }
}

module.exports = useToken;