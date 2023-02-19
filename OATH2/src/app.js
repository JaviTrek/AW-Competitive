require('dotenv').config();
const express = require('express');
const app = express ();
const PORT = process.env.PORT || 3001;
const session = require('express-session');
const passport = require('passport');
const DiscordStrategy = require('./strategies/discordStrategy');
const cors = require("cors");
const bodyParser = require("body-parser");

//This line gets us our .env file at setup.env, allowing us to use the process.env
require("dotenv").config({path: '.env'});


const database = require('./database/database');
//our database

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4000;



// Routes
const authRoute = require('./routes/auth');

app.use(session({

    secret: 'some secret',
    cookie: {
        maxAge: 60000 * 60 * 24,

    },
    saveUninitialized: false,
    resave: true,
}));

//Passport
app.use(passport.initialize());
app.use(passport.session());

//MiddleWare Routes
app.use('/auth', authRoute);


//get connected to the mongo database
app.listen(port, () => {
    database.connectToServer()
    console.log(`Server running on port ${port}`)
});