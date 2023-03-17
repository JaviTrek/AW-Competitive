const database = require("./connection")
const fs = require('fs');
const {Router} = require('express');
const router = Router()

    //Currently this just submits parsedMap.json to mongoDB.
//TODO: Make this route take user input, a user creating a game needs to put down their id so when we check the game we can route it back to them.
    router.get("/createNewGame", async (req, res) => {


        let dbConnect = database.getDatabase()

        //use the collection
        let collection = dbConnect.collection("currentGames")


        //count amount of documents that have the _id value
        let myDoc = await collection.countDocuments({_id: {$gt: -1}})
        const data =  fs.readFileSync('./scripts/parsedMap.json', 'utf8');
        const parsedData = await JSON.parse(data)
        let gameDocument = {
            _id: 0,
            gameState: parsedData.gameState,
            mapData: parsedData.mapData
        }

        //insert the document
        await collection.insertOne(gameDocument);


        //insert the document

        res.redirect('/')

    })


//This route is used so an user can get a game they are playing in
router.get('/getGameState', async (req,res)=>{
    let dbConnect = database.getDatabase();

    let collection = dbConnect.collection("currentGames");

    //TODO: Find game id by user id, make id check for the user attributes when we log in OR Save gamestate id in the user data so then we can just check the user's games and find our game through that
    let findGame = await collection.findOne({_id: 0})

    res.json({

        gameState: findGame.gameState
    })
})


module.exports = router;



