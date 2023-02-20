// We initialize the dependencies we are going to use
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");


//This line gets us our .env file at setup.env, allowing us to use the process.env
require("dotenv").config({path: "./setup.env"});


//our database
const database = require("./database/connection.js");


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4000;


//get connected to the mongo database
app.listen(port, () => {
    database.connectToServer()
    console.log(`Server running on port ${port}`)
});


//This /home route is used by our home page
app.get("/home", async (req, res) => {
    console.log("get home")
    let dbConnect = database.getDatabase()
    //use the collection
    let collection = dbConnect.collection("users")
    let myDoc = await collection.find()
    let pushData = []
    // find he documents in our collection and iterate through every one of them
    await myDoc.forEach(doc => pushData.push(doc));

    res.json({
        pushData
    })
})





//TODO: Create our own folders for our account routes

// ------------
// POST REQUESTS
// ------------
app.post('/createUser', async (req, res) => {
    let dbConnect = database.getDatabase()
    //use the collection
    let collection = dbConnect.collection("users")
    let myDoc = await collection.countDocuments({_id: {$gt: -1}})
    console.log(myDoc)
    //Lets define a document
    const username = req.body.username
    const armyColor = req.body.armyColor
    const favoriteCO = req.body.favoriteCO
    let userDocument = {
        _id: myDoc + 1,
        username: username,
        armyColor: armyColor,
        favoriteCO: favoriteCO,
    }

    //insert the document
    await collection.insertOne(userDocument);
    res.redirect('/');
})















//TODO: Move these scripts/get routes into its own file which we then get via app.use

// MAP RENDERING

// Random Map Generator

const createMap = require('./scripts/randomMapGenerator')
createMap(18, 18, "randomMap")
const randomMap = require("./scripts/randomMap.json");
app.get('/map/randomMap', (req, res) => {
    res.json(randomMap)
});


// Map Parser
const mapParser = require('./scripts/awbwMapParser')
mapParser(18, 18, "parsedMap")
const parsedMap = require("./scripts/parsedMap.json");

app.get('/map/parsedMap', (req, res) => {
    res.json(parsedMap)
});

