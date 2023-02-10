const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");


//This line gets us our .env file at setup.env, allowing us to use the process.env files
require("dotenv").config({path: "./setup.env"});
//our database
const dbo = require("./database/connection.js");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const port = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());


app.listen(port, () => {
    dbo.connectToServer()
    console.log(`Server running on port ${port}`)
});


//get connected to the mongo database


// our pages inside the website
app.get("/home", async (req, res) => {
    let dbConnect = dbo.getDatabase()
    //use the collection
    let collection = dbConnect.collection("users")
    let myDoc = await collection.find()
    //Lets define a document
    let userDocument = {
        _id: myDoc.length + 1,
        username: "Cynic",
        armyColor: "purple",
        favoriteCO: "Drake",
    }
    let pushData = []

    //insert the document
    //await collection.insertOne(userDocument);

    // find he documents in our collection and iterate through every one of them
    myDoc = await collection.find()
    await myDoc.forEach(doc => pushData.push(doc));

    console.log(pushData)
    res.json({
        pushData
    })
})

app.post('/createUser', async (req, res) => {
    console.log('hello')
    let dbConnect = dbo.getDatabase()
    //use the collection
    let collection = dbConnect.collection("users")
    let myDoc = await collection.countDocuments({_id: {$gt: -1} })
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