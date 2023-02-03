const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({path: "./config.env"});

const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());


//get driver connection
const {connectMongo} = require("./database/connection.js");
app.listen(port, () => {

    console.log(`Server running on port ${port}`)
});

connectMongo()