//This line gets us our .env file at setup.env, allowing us to use the process.env
require("dotenv").config({path: "./setup.env"});
// We initialize the dependencies we are going to use
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const {Server} = require("socket.io");
var mongo = require("mongodb");
//our database
const database = require("./database/connection.js");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors({

    origin: process.env.CORS_ORIGIN,
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200

}));
app.use(express.json());

const server = http.createServer(app);
const port = process.env.PORT || 4000;
//lets setup our websocket
const io = new Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN,
        methods: ["GET", "POST"],
    },
});

// websocket event, when someone connects
io.on('connection', (socket) => {
    //when we receive the sendAction
    socket.on("sendAction", (data) => {
        socket.to(data.room).emit("receiveAction", data)
    })

    socket.on("joinRoom", data => {
        socket.join(data.gameID)

    })
});

//get connected to the mongo database and websocket at the same time
server.listen(port, () => {
    database.connectToServer("users");
    console.log(`Server running on port ${port}`);
});

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-PINGOTHER');
    next();
});
//The map parser simply parses our map with different input values inside the file, this is what determines what units or terrain are placed in which tiles inside our /game page
const mapParser = require("./scripts/awbwMapParser");
mapParser(18, 18, "parsedMap");

//------------------------------
//Steve work on authorization
//------------------------------
const session = require("express-session");

const {
    hashPassword,
    comparePassword,
} = require("./authStrategy/hashing_password");
const localStrategy = require("./authStrategy/localStrategy");

const passport = require("passport");

app.use(
    session({
        //secret needs work
        secret: "some secret",
        cookie: {
            maxAge: 60000 * 60 * 24,
        },
        saveUninitialized: false,
        resave: true,
    })
);

//Passport

app.use(passport.session());
app.use(passport.initialize());

//-------
//login
//----

const LocalStrategy = require("passport-local").Strategy;
//login post request using passport local
app.post("/loginUser", passport.authenticate("local"), (req, res) => {
    //console.log("logged in");
    req.session.username = req.user.username;
    req.session._id = req.user._id;

    //we send 200 because that means we logged in correctly
    res.sendStatus(200);
});

passport.use(
    "local",
    new LocalStrategy(
        {
            usernameField: "username",
        },
        async (username, password, done) => {
            try {
                if (!username || !password) {
                    done(new Error("Bad request. Missing credentials"), null);
                }
                let dbConnect = database.getDatabase();
                let collection = dbConnect.collection("learn");

                const userDB = await collection.findOne({$or: [{username}]});
                if (!userDB) {
                    throw new Error("User not found");
                }

                const isValid = comparePassword(password, userDB.password);
                if (isValid) {
                    //console.log("Authenticated Successfully!");
                    // req.session.user = userDB;
                    done(null, userDB);
                } else {
                    //console.log("Failed to Authenticate");
                    // return res.sendStatus(401);
                    done(null, null);
                }
            } catch (err) {
                done(err, null);
            }
        }
    )
);

//serializing
passport.serializeUser((user, done) => {
    //console.log("Serializing user local");
    done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
    //console.log("Deserializing user local strategy");
    let dbConnect = database.getDatabase();
    let collection = dbConnect.collection("learn");
    try {
        const userDB = await collection.findOne({$or: [{_id: _id}]});
        if (!userDB) throw new Error("User not found");
        done(null, userDB);
    } catch (err) {
        console.log(err);
        done(err, null);
    }
});

//Register post request
app.post("/registerUser", async (req, res) => {
    try {
        let dbConnect = database.getDatabase();
        //use the collection
        let collection = dbConnect.collection("learn");
        const {username, password} = req.body;
        const userDB = await collection.findOne({$or: [{username}]});
        if (userDB) {
            //console.log("user already exist!");
            res.sendStatus(400);
        } else {
            const hashedPassword = hashPassword(password);
            let myDoc = await collection.countDocuments({_id: {$gt: -1}});
            let userDocument = {
                _id: myDoc + 1,
                username: username,
                password: hashedPassword,
                games: [],
            };
            try {
                await collection.insertOne(userDocument);
                console.log("User created");
                res.sendStatus(200);
            } catch (e) {
                console.log(e);
            }
        }
    } catch (e) {
        console.log(e)
    }

});


//TODO: Create our own folders for our account routes
//Protected route, it checks if user is authenticated, if so, you can access the protectRoute, otherwise, you get redirected to login
app.get("/protectRoute", loggedIn, (req, res) => {
    res.redirect("/game");
});

function loggedIn(req, res, next) {
    try {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.redirect("/login");
        }
    } catch (e) {
        console.log(e)
    }

}

app.get("/authenticateUser", loggedIn, (req, res) => {
    res.sendStatus(200);
});

app.get("/logout", function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});

// StartGames Data from database

app.get("/getStartGames", loggedIn, async (req, res) => {
    try {
        let dbConnect = database.getDatabase();
        let collection = dbConnect.collection("startGame"); // change this to startGame
        let myDoc = await collection.find();
        let pushData = [];
        await myDoc.forEach((doc) => pushData.push(doc));
        //   console.log(pushData);
        res.json({
            pushData,
        });
    } catch (e) {
        console.log(e)
    }

});

app.get("/getCurrentGames", async (req, res) => {
    try {

        let dbConnect = database.getDatabase();
        let collection = dbConnect.collection("currentGame");
        let myDoc = await collection.find();
        let pushData = [];
        await myDoc.forEach((doc) => pushData.push(doc));


        let extraGames = []
        if (req.isAuthenticated()) {
            let userColl = dbConnect.collection("learn")
            const currentUser = await userColl.findOne({_id: req.session._id})
            console.log(currentUser)
            currentUser.games.forEach((game) => {
                pushData.forEach(item => {
                  if (item._id.toString() == game.toString()) extraGames.push(item)
                })
            })
        }

        res.json({

            pushData, extraGames

        });
    } catch (e) {
        console.log(e)
    }

});

app.get("/getGameLog", loggedIn, (req, res) => {
    res.redirect("/startGames");
});

const createGame = require("./database/createGame");
app.use(createGame);
const gameActions = require("./database/gameActions");
app.use(gameActions);

app.get("/userInfo", (req, res) => {
    const data = req.session;
    res.json({
        data,
    });
});

app.post("/joinGame", loggedIn, async (req, res) => {
    try {
// getting database
        let dbConnect = database.getDatabase();
        let userColl = dbConnect.collection("learn")
        const currentUser = await userColl.findOne({_id: req.session._id})
        if (currentUser.games.length > 5) {
            res.json({
                flash: "error"
            })
        }
        //doesnt have more than 3 games so they can make a game!
        else {

            // getting startGame colleciton
            let startGameCollection = dbConnect.collection("startGame");
            // retrieving the game
            let myDoc = await startGameCollection.findOne({
                _id: new mongo.ObjectId(req.body.gameId),
            });
            // Checking if player is already in the game
            // or because of current game entries still going to this api
            if (myDoc.playerState.orangeStar.username == req.session.username || myDoc.playerState.blueMoon.username == req.session.username) {
                return;
            }
            // deleting the non-started game
            let result = await startGameCollection.deleteOne({
                _id: new mongo.ObjectId(req.body.gameId),
            });
            result.deletedCount === 1
                ? console.log("Deleted one document")
                : console.log("No documents deleted");
            // setting the settings of blueMoon to the player
            myDoc.playerState.blueMoon.username = req.session.username;
            myDoc.playerState.blueMoon._id = req.session._id;
            myDoc.playerState.blueMoon.CO = req.body.selectedCO;
            // moving the game from startGame to currentGame
            let currentGameCollection = dbConnect.collection("currentGame");


            await currentGameCollection.insertOne(myDoc);
            console.log("Game Created");

            //lets find our user and add them to this game
            await userColl.updateOne({_id: req.session._id}, {$push: {games: new mongo.ObjectId(req.body.gameId)}})

            res.sendStatus(200);
        }
    } catch (e) {
        console.log(e);
    }
});
