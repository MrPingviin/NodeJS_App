import express from 'express';
const app = express();
import cors from 'cors';
import create from './routes/create/create.js';
import renew from './routes/renew/renew.js';
import detailed from './routes/detailed/detailed.js';
import list from './routes/list/list.js';
import root from './utility/path.js';
import { Sequelize, DataTypes } from 'sequelize';
import Controller from './controllers/controller.js';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING);

app.use("/", cors());
app.use("/", express.json());
app.use("/create", create);
app.use("/renew", renew);
app.use("/detailed", detailed);
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



