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

































app.get("/about", async (req, res) => {
    res.send("hello")
})


// ------------
// POST REQUESTS
// ------------
app.post('/createUser', async (req, res) => {
    let dbConnect = database.getDatabase()
    //use the collection
    let collection = dbConnect.collection("users")
    let myDoc = await collection.countDocuments({_id: {$gt: -1} })
    console.log(myDoc)
    //Lets define a document
    const { username, armyColor, favoriteCO } = req.body;

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

app.post('/changeSettings', async (req, res) => {
    try{
        // Insert the document
        let dbConnect = database.getDatabase()
        //use the collection
        let collection = dbConnect.collection("users")
        const { username, armyColor, favoriteCO } = req.body
        const userDB = await collection.findOne({$or: [{username}]});

        console.log(req.body);
        if(userDB){
            await collection.updateOne( {username: username} , 
                {
                    $set: {
                        armyColor: armyColor,
                        favoriteCO: favoriteCO,
                    },
                   $currentDate : {lastUpdated: true}
                })
            console.log("updated")
        }else{
            console.log("ooooops! cannot change the settings of the user")
        }
        // If everything was successful, then the url should show that
        res.redirect('/?change=true');
    }catch{

        // If at any point the settingsChange fails, then the url should represent that
        res.redirect('/?change=false');
    }

})