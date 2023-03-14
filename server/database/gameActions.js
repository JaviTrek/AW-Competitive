const database = require("./connection");
const {Router} = require('express');
const router = Router();


//this request is sent from our game,
router.post("/moveUnit", async (req, res) => {
    let dbConnect = database.getDatabase()
    let collection = await dbConnect.collection("currentGames")
    //lets get our variables from the frontend
    const initialIndex = req.body.initialIndex
    const newIndex = req.body.newIndex
    const unit = req.body.unit
    //TODO: Make sure to check this is the actual user that belongs in this game, dont want random people sending updates to games they dont belong to

    // this basically means gameState[index].hasUnit, but MongoDB needs it to be put down as dot notation to get the index of the gameState array
    const initialQuery = `gameState.${initialIndex}.hasUnit`
    const newQuery = `gameState.${newIndex}.hasUnit`

    //the id of our game, this lets us find the game to modify
    // TODO: Get _id of game by user signed in
    const query = {"_id": 0}

    // initialQuery is in brackets because thats how you do dynamic object key/value
    //we set the value as false because the unit prob moved to a new tile, therefore making the current tile not have an unit
    const initialDocument = {$set: {[initialQuery]: false}};
    await collection.updateOne(query, initialDocument);

    //we now check the new tile and update it with the unit we moved
    const newDocument = {$set: {[newQuery]: unit}};
    await collection.updateOne(query, newDocument);


})


module.exports = router;



