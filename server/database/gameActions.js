const database = require("./connection");
const {Router} = require('express');
const mongo = require("mongodb");
const router = Router();

function loggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        console.log(req.isAuthenticated());
        console.log("user is logged In, access granted");
        next();
    } else {
        console.log("not logged, cant access protectRoute");
        res.sendStatus(401);
    }
}

router.post("/saveGameAction", async (req, res) => {
    let {initialTile, newTile, attackedTile, playerState} = req.body
    let {turn, day, orangeStar, blueMoon} = playerState

    //lets do some user verification
    let countryOrder = [orangeStar._id, blueMoon._id]
   // if (req.user._id !== countryOrder[turn]) {
        //res.sendStatus(401)
    //} else {
        let dbConnect = database.getDatabase()
        let collection = await dbConnect.collection("currentGame")
        //lets get our variables from the frontend
        const query = {_id: new mongo.ObjectId(req.query.id)}

        //let findGame = await collection.findOne({_id: new mongo.ObjectId(req.query.id)})
        let tilesToUpdate = [initialTile, newTile]
        //if attacked tile isnt true, that means that a tile wasnt attacked and therefore doesnt need to be updated
        if (attackedTile) tilesToUpdate.push(attackedTile)
        tilesToUpdate.forEach( (element, arrayIndex) => {
            let tileIndex = `gameState.${element.index}`
            let setNewTile = {$set: {[tileIndex]: element.gameState}};
            collection.updateOne(query, setNewTile);
        })

        //lets update our playerstate(income, property, etc)
        collection.updateOne(query, {$set: {playerState: playerState }});

        //lets add our new unit to the refresh array
        let unitsToRefresh = `playerState.unitsToRefresh`
        collection.updateOne(query, {$push: {[unitsToRefresh]: newTile.index }});
        res.sendStatus(200)
   // }

})


router.post("/passTheTurn", async (req, res) => {
    let {unitsToRefresh, turn, day, orangeStar, blueMoon} = req.body.playerState
    //lets do some user verification
    let countryOrder = [orangeStar._id, blueMoon._id]
   // if (req.user._id !== countryOrder[turn]) {
        //res.sendStatus(401)
    //} else {
        let dbConnect = database.getDatabase()
        let collection = await dbConnect.collection("currentGame")

        const query = {_id: new mongo.ObjectId(req.query.id)}
        //lets free every used unit
        if (unitsToRefresh && unitsToRefresh?.length > 0) {
            unitsToRefresh.forEach(tileIndex => {
                let unit = `gameState.${tileIndex}.tileUnit.isUsed`
                let refresh = {$set: {[unit]: false}};
                collection.updateOne(query, refresh);
            })
        }

        //lets update our playerstate
        collection.updateOne(query, {$set: {playerState: req.body.playerState}});

        //lets update our playerstate
        collection.updateOne(query, {$set: {gameState: req.body.gameState}});

        //lets empty our units to refresh array
        let objectRefresh = `playerState.unitsToRefresh`
        collection.updateOne(query, {$set: {[objectRefresh]: []}});
        res.sendStatus(200)
   // }
})

module.exports = router;



// if (req.user._id !== countryOrder[turn]) {
//res.sendStatus(401)