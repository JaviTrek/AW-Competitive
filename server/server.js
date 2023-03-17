//This line gets us our .env file at setup.env, allowing us to use the process.env
require("dotenv").config({path: "./setup.env"});
// We initialize the dependencies we are going to use
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require('http');
const { Server } = require("socket.io");
//our database
const database = require("./database/connection.js");


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const port = process.env.PORT || 4000;
//lets setup our websocket
const io = new Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN,
        methods:["GET","POST"]
    }
});


// websocket event, when someone connects
io.on('connection', (socket) => {
    //when we receive the sendAction
    socket.on("sendAction", (data) => {
        socket.broadcast.emit("receiveAction", data)
    })
});




//get connected to the mongo database and websocket at the same time?
server.listen(port, () => {
    database.connectToServer("users")
    console.log(`Server running on port ${port}`)
});

const mapParser = require('./scripts/awbwMapParser')
mapParser(18, 18, "parsedMap")
const parsedMap = require("./scripts/parsedMap.json");

app.get('/map/parsedMap', (req, res) => {
    res.json(parsedMap)
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





//TODO: Create our own folders for our account routes

// ------------
// POST REQUESTS
// ------------
app.post('/createUser', async (req, res) => {
    let dbConnect = database.getDatabase()
    //use the collection
    let collection = dbConnect.collection("users")
    let myDoc = await collection.countDocuments({_id: {$gt: -1}})
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

});

const createGame = require("./database/createGame")
app.use(createGame)
const gameActions = require("./database/gameActions")
app.use(gameActions)








//------------------------------
//Steve work on authorization
//------------------------------
const session = require('express-session');

const { hashPassword, comparePassword } = require('./Authentication_Strategies/hashing_password');
//const localStrategy = require('./Authentication_Strategies/localStrategy');

const passport = require('passport');




app.use(session({
    //secret needs work
    secret: 'some secret',
    cookie: {
        maxAge: 60000 * 60 * 24,

    },
    saveUninitialized: false,
    resave: true,
}));

//Passport

app.use(passport.session());
app.use(passport.initialize());






//-------
//login
//----


const LocalStrategy = require('passport-local').Strategy;
//login post request using passport local
app.post('/loginUser', passport.authenticate('local'), (req,res)=> {
    console.log('logged in');
    console.log('local authenticate');
    res.sendStatus(200);
})


passport.use('local',
    new LocalStrategy({
        usernameField: 'username',
    }, async (username, password, done) =>{
        console.log(username);
        console.log(password);

        try{
            if(!username || !password){
                done(new Error('Bad request. Missing credentials'), null);
            }
            let dbConnect = database.getDatabase();
            let collection = dbConnect.collection("learn");

            const userDB = await collection.findOne({$or : [{ username }]});
            if(!userDB){
                throw new Error("User not found");
            };

            const isValid = comparePassword(password, userDB.password);
            if(isValid){
                console.log("Authenticated Successfully!");
                // req.session.user = userDB;
                done(null, userDB);
                // return res.sendStatus(200);
            }else{
                console.log("Failed to Authenticate");
                // return res.sendStatus(401);
                done(null, null)
            }

        }catch(err){
            done(err, null);
        }
    })
);


//serializing
passport.serializeUser((user, done)=> {
    console.log("Serializing user local");
    done(null, user._id)});

passport.deserializeUser(async (_id, done)=> {
    console.log("Deserializing user local strategy");
    let dbConnect = database.getDatabase();
    let collection = dbConnect.collection("learn");
    try{
        const userDB = await collection.findOne({$or : [{ _id: _id }]});
        console.log(userDB);
        if(!userDB) throw new Error("User not found");
        done(null, userDB);
    } catch(err) {
        console.log(err);
        done(err, null);
    }
});

//Register post request
app.post('/registerUser', async (req,res) => {
    let dbConnect = database.getDatabase()
    //use the collection
    let collection = dbConnect.collection("learn")
    const { username, password } = req.body;
    const userDB = await collection.findOne({$or : [{ username }]});
    if(userDB){
        console.log("user already exist!");
        res.sendStatus(400);
    } else{
        const hashedPassword = hashPassword(password);
        let myDoc = await collection.countDocuments({_id: {$gt: -1} });
        let userDocument = {
            _id: myDoc + 1,
            username: username,
            password: hashedPassword,
        };
        try{
            await collection.insertOne(userDocument);
            console.log("User created");
            res.redirect('/game?flash=correct');
        } catch(e){
            console.log(e);
        }
    }


});


//Discord
/*
const discordStrategy = require('./Authentication_Strategies/discordStrategy');

app.get('/routes/auth', passport.authenticate('discord123'));
app.get('/routes/auth/redirect', passport.authenticate('discord123', {
    failureRedirect: '/forbidden'
}), (req,res) => {
    console.log(req.user)
    res.send(req.user);

    console.log("discord authenticate");
});

*/



//TODO: Create our own folders for our account routes
//Protected route, it checks if user is authenticated, if so, you can access the protectRoute, otherwise, you get redirected to login
app.get("/protectRoute", loggedIn, (req,res) => {
    console.log('you accessed our route')
    res.redirect("/game")
function loggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        console.log(req.isAuthenticated());
        console.log('user is logged In')
        next();
    } else {
        console.log("not logged")
        res.redirect("/login")
    }}
app.get('/logout', function (req, res, next) {
        req.logout(function (err) {
          if (err) {
            return next(err);
          }
          res.redirect('/');
        });
      });