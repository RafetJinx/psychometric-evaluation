import express from 'express'
// const express = require('express')
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv'
import router from './router/route.js';


/** import connection file */
import connect from './database/conn.js';
config();


const app = express();

/** app middlewares */
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

/** application port */
const port = process.env.PORT || 8080;


/** routes */
app.use('/api', router); /** api's */

app.get('/', (req, res) => {
    try {
        res.json("Get Request")
    } catch (error) {
        res.json(error);
    }
})


/**start server only when we have a valid connection*/
connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`);
        });
    } catch(error){
        console.log("Cannot connect to the server");
    }
}).catch(error => {
    console.log("Invalid Database connection")
})

