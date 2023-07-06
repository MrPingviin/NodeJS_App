const express = require('express');
const app = express();
const cors = require('cors');
const tokenchecker = require('./utility/tokenchecker');
const create = require('./routes/create/create');
const renew = require('./routes/renew/renew');
const usetoken = require('./utility/usetoken');
const list = require('./routes/list/list');
const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING);

app.use("/", cors());
app.use("/", express.json());
app.use("/create", create);
app.use("/renew", renew);
app.use("/list", list);

app.listen(process.env.PORT, async (err) => {
    (err) && console.error(err);

    console.log(`Server is running on port ${process.env.PORT}`);

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})



