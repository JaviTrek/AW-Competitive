const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

//This line gets us our .env file at setup.env, allowing us to use the process.env files
require("dotenv").config({path: "./setup.env"});


app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
const port = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());



app.listen(port, () => {

    console.log(`Server running on port ${port}`)
});


//get connected to the mongo database
const {connectMongo} = require("./database/connection.js");

connectMongo()

// our pages inside the website
app.get("/home", (req, res) => {
    res.json({
        name: "Bill",
        age: 99
    })
})