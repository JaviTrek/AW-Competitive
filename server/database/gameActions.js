const database = require("./connection");
const fs = require('fs');
const {Router} = require('express');
const router = Router();


//this request is sent from our game,
router.post("/moveUnit", async (req,res)=>{
    console.log(req.body);


    let dbConnect = database.getDatabase()

    //use the collection
    let collection = dbConnect.collection("currentGames")


    //TODO: Get _id of game by user signed in
    //TODO: Make sure to check this is the actual user that belongs in this game, dont want random people sending updates to games they dont belong to
    const initialIndex = req.body.initialIndex
    const initialUnit = req.body.initialUnit
    const query = {_id: 0, gameState: initialIndex}
    const updateDocument = {$set: {"gameState.$.hasUnit": initialUnit}};
    const result = await collection.updateOne(query, updateDocument)
    console.log(result)

})


module.exports = router;



