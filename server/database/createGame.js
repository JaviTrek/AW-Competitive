const database = require("./connection")
const fs = require('fs');
const {Router} = require('express');
const mongo = require("mongodb");
const router = Router()

    router.post("/createNewGame", async (req, res) => {
        try {
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


            let {orangeStar, blueMoon} = gameDocument.playerState
            orangeStar.username = req.session.username;
            orangeStar.CO = req.body.selectedCO;
            orangeStar._id = req.session._id;
            blueMoon.username = "...";
            blueMoon.CO = "";
            blueMoon._id = "";
            //insert the document
            await collection.insertOne(gameDocument);

            let findGame = await collection.findOne({["playerState.orangeStar._id"]: req.session._id})
            //lets find our user and add them to this game
            let userColl = dbConnect.collection("learn")
            await userColl.updateOne({_id: req.session._id}, {$push: {games: findGame._id }})
            res.redirect('/')
        } catch (e) {
            console.log(e)
            res.sendStatus(401)
        }
    })

//This route is used so an user can get a game they are playing in
router.get('/getGameState', async (req,res)=>{
    try {
        let dbConnect = database.getDatabase();
        let collection = dbConnect.collection("currentGame");
        let findGame = await collection.findOne({_id: new mongo.ObjectId(req.query.id)})
        res.json({
            ...findGame
        })
    }catch (e) {
        console.log(e)
    }

})


module.exports = router;



