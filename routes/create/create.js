const express = require('express');
const fs = require('fs');
const path = require('path');
const root = require("./../../utility/path");
const tokenchecker = require("./../../utility/tokenchecker");
const useToken = require("./../../utility/useToken");
const router = express.Router();
const crypto = require('crypto');
const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING);

const createArticle = async (req, res) => {

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    const Article = sequelize.define('Article', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    const getResult = async () => {
        const matches = await sequelize.query(
            'SELECT * FROM Articles WHERE Title = :title AND Description = :description AND CreatedAt = :createdAt',
            {
                replacements: { title: req.body.title, description: req.body.description, createdAt: formattedDate },
                type: sequelize.QueryTypes.SELECT
            }
        );

        const sortedMatches = matches.sort((a, b) => a.ID > b.ID);
        const result = sortedMatches[sortedMatches.length - 1];

        return result;
    }

    Article.create({
        title: req.body.title,
        description: req.body.description
    }).then(response => {
        const sendResult = async () => {
            const result = await getResult();
            res.status(200).json(result);
        };
        sendResult();
    }).catch((error) => {
        res.status(503).send("Failed to create the new article. Please try again.");
    });


}

const lengthChecker = (req, minTitleLength, maxTitleLength, minDescriptionLength, maxDescriptionLength) => {
    return ((req.body.title.length >= minTitleLength && req.body.title.length <= maxTitleLength) && (req.body.description.length >= minDescriptionLength && req.body.description.length <= maxDescriptionLength));
}

router.post("/article", async (req, res) => {
    const token = req.header("Authorization");
    const tokenCheck = await tokenchecker(token);
    const maxTitleLength = process.env.MAX_TITLE_LENGTH;
    const minTitleLength = process.env.MIN_TITLE_LENGTH;
    const minDescriptionLength = process.env.MIN_DESCRIPTION_LENGTH;
    const maxDescriptionLength = process.env.MAX_DESCRIPTION_LENGTH;

    switch (tokenCheck) {
        case "TOKEN_NOT_VALID":
            res.status(404).send("There is no such token. Please use a valid token.");
            break;
        case "TOKEN_VALID_NO_REMAINING":
            res.status(401).send("Token is valid but no remaining");
            break;
        case "TOKEN_VALID_REMAINING":
            if (lengthChecker(req, minTitleLength, maxTitleLength, minDescriptionLength, maxDescriptionLength)) {
                createArticle(req, res);
                useToken(token);
            } else {
                res.status(400).send(`Title (min ${minTitleLength}, max ${maxTitleLength} chars) or description (min ${minDescriptionLength}, max ${maxDescriptionLength} chars) doesn't have a proper length.`);
            }
            break;
    }
});


const platformValidator = (req, validPlatforms) => {
    const platform = req.body.platform;
    if (platform === undefined) { return false };

    const platformLowercase = platform.toLowerCase();
    return validPlatforms.includes(platformLowercase);
}

const createtoken = (req, res) => {
    const newtoken = crypto.randomUUID();
    const platform = req.body.platform.toLowerCase();
    const defaultRemaining = process.env.DEFAULT_TOKEN_REMAINING;

    const Token = sequelize.define('Token', {
        token: {
            type: DataTypes.STRING,
            allowNull: false
        },
        platform: {
            type: DataTypes.STRING,
            allowNull: false
        },
        remaining: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    const getResult = async () => {
        const result = await sequelize.query(
            'SELECT * FROM Tokens WHERE Token = :token',
            {
                replacements: { token: newtoken },
                type: sequelize.QueryTypes.SELECT
            }
        );

        return result;
    }

    Token.create({
        token: newtoken,
        platform: platform,
        remaining: defaultRemaining
    }).then(response => {
        const sendResult = async () => {
            const result = await getResult();
            res.status(200).json(result);
        };
        sendResult();
    }).catch((error) => {
        res.status(503).json("Failed to create the new token. Please try again.");
    });
}

router.post("/token", (req, res) => {
    const validPlatforms = process.env.VALID_PLATFORMS;

    if (platformValidator(req, validPlatforms)) {
        createtoken(req, res);
    } else {
        res.status(400).send(`Platform is either not provided or not valid. Please provide a valid platform. ${validPlatforms} `);
    }
});

module.exports = router;