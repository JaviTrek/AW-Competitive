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

    socket.on("send_message", (data) => {
        socket.broadcast.emit("receive_message", data)
    })
});




//get connected to the mongo database and websocket at the same time?
server.listen(port, () => {
    database.connectToServer("users")
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
const DiscordStrategy = require('./authStrategy/discordStrategy');
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


//auth routes
app.get('/routes/auth', passport.authenticate('discord'));
app.get('/routes/auth/redirect', passport.authenticate('discord', {
    failureRedirect: '/forbidden'
}), (req,res) => {
    res.send(req.user);
});


//-------
//login
//----

const { hashPassword, comparePassword } = require('./authStrategy/hashing_password');
const LocalStrategy = require('./authStrategy/localStrategy');

//login post request using passport local
app.post('/login', passport.authenticate('local'), (req,res)=> {
    console.log('logged in');
    res.sendStatus(200);
})

//Register post request
app.post('/register', async (req,res) => {
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
    await collection.insertOne(userDocument);
    console.log("User created");
    res.sendStatus(201);
    }

   
});

 //Passport
 app.use(passport.initialize());
 app.use(passport.session());


