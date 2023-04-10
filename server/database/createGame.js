const database = require("./connection")
const fs = require('fs');
const {Router} = require('express');
const mongo = require("mongodb");
const router = Router()

    //Currently this just submits parsedMap.json to mongoDB.
//TODO: Make this route take user input, a user creating a game needs to put down their id so when we check the game we can route it back to them.
    router.post("/createNewGame", async (req, res) => {
        let dbConnect = database.getDatabase()
        //use the collection
        let collection = dbConnect.collection("startGame")
        const data =  fs.readFileSync('./scripts/parsedMap.json', 'utf8');
        const parsedData = await JSON.parse(data)
        let gameDocument = {
          ...parsedData,
        };
        // get current day
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let currentDate = `${month}/${day}/${year}`;
        gameDocument.startDate = currentDate;
        gameDocument.playerState.orangeStar.username = req.session.username;
        gameDocument.playerState.orangeStar.CO = req.body.selectedCO;
        gameDocument.playerState.orangeStar._id = req.session._id;
        gameDocument.playerState.blueMoon.username = "...";
        gameDocument.playerState.blueMoon.CO = "";
        gameDocument.playerState.blueMoon._id = "";
        //insert the document
        await collection.insertOne(gameDocument);
        //insert the document
        
        res.redirect('/')

    })


//This route is used so an user can get a game they are playing in
router.get('/getGameState', async (req,res)=>{
    let dbConnect = database.getDatabase();


    let collection = dbConnect.collection("currentGame");

    //TODO: Find game id by user id, make id check for the user attributes when we log in OR Save gamestate id in the user data so then we can just check the user's games and find our game through that
    let findGame = await collection.findOne({_id: new mongo.ObjectId(req.query.id)})

    res.json({

        ...findGame
    })
})


module.exports = router;



