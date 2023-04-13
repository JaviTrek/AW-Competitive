const database = require("./connection");
const {Router} = require('express');
const mongo = require("mongodb");
const router = Router();

function loggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        //console.log(req.isAuthenticated());
        //console.log("user is logged In, access granted");
        next();
    } else {
        //console.log("not logged, cant access protectRoute");
        res.sendStatus(401);
    }
}

router.post("/saveGameAction", loggedIn, async (req, res) => {
    try {
        let {initialTile, newTile, attackedTile, playerState} = req.body
        let dbConnect = database.getDatabase()
        let collection = await dbConnect.collection("currentGame")
        const query = {_id: new mongo.ObjectId(req.query.id)}
        //lets do some user verification
        let data = await collection.findOne(query, "playerState.turn")
        let countryOrder = [data.playerState.orangeStar._id, data.playerState.blueMoon._id,]
        if (!req.user || req.user._id !== countryOrder[data.playerState.turn]) {
            res.json({error: 'error'})
        } else {
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
        }
    } catch (e) {
        console.log(e)
        res.sendStatus(401)
    }


})


router.post("/passTheTurn", loggedIn, async (req, res) => {
    try {
        let {unitsToRefresh, turn, day, orangeStar, blueMoon} = req.body.playerState

        let dbConnect = database.getDatabase()
        let collection = await dbConnect.collection("currentGame")
        const query = {_id: new mongo.ObjectId(req.query.id)}

        //lets do some error validation
        let data = await collection.findOne(query, "playerState.turn")
        let countryOrder = [data.playerState.orangeStar._id, data.playerState.blueMoon._id,]
        if (!req.user || req.user._id !== countryOrder[data.playerState.turn]) {
            res.json({error: 'error'})
        } else {

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
        }
    } catch (e) {
        console.log(e)
        res.sendStatus(401)
    }
})

module.exports = router;