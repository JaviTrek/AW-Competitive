// We initialize the dependencies we are going to use
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");


//This line gets us our .env file at setup.env, allowing us to use the process.env
require("dotenv").config({path: "./setup.env"});


//our database
const database = require("./database/connection.js");


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4000;


//get connected to the mongo database
app.listen(port, () => {
    database.connectToServer()
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
const createMap = require('./scripts/randomMapGenerator')
createMap(18, 18, "randomMap")
//This is our random map generator
const randomMap = require("./scripts/randomMap.json");
//This is our random map function


app.get('/map/randomMap', (req, res) => {
    res.json(randomMap)
});


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
//------------------------------
//Steve work on authorization
//------------------------------
const session = require('express-session');
const DiscordStrategy = require('./Authentication_Strategies/discordStrategy');
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

const { Strategy } = require('passport-local');
const { hashPassword, comparePassword } = require('./Authentication_Strategies/hashing_password'); 

//serializing 
passport.serializeUser((user, done)=> {
    console.log("Serializing user");
    console.log(user)
    console.log(user._id)
    done(null, user._id)});

passport.deserializeUser(async (id, done)=> {
    console.log("Deserializing user");
    console.log(id);
    let dbConnect = database.getDatabase();
    let collection = dbConnect.collection("learn");
    try{
        const userDB = await collection.findOne({$or : [{ _id: id }]});
        console.log(userDB);
        if(!userDB) throw new Error("User not found");
        done(null, userDB);
    } catch(err) {
        console.log(err);
        done(err, null);
    }
})

//creating a local passport strategy 
passport.use(
    new Strategy({
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


//Login post request
// app.post('/login', async (req,res) => {
//     const { username, password } = req.body;
//     if(!username || !password){
//         return res.sendStatus(400);
//     }else{
//         let dbConnect = database.getDatabase();
//         let collection = dbConnect.collection("learn");
//         const userDB = await collection.findOne({$or : [{ username }]});
//         if(!userDB){return res.sendStatus(401);
//         }else{
//             console.log(typeof userDB.password);
//             console.log(typeof password);
//             const hashedPassword = userDB.password;
//             const isValid = comparePassword(password, hashedPassword);
//             // const isValid = comparePassword('123', '123');
//             if(isValid){
//                 req.session.user = userDB;
//                 console.log(req.session.user)
//                 return res.sendStatus(200);
//             }else{
//                 return res.sendStatus(401);
//             }
//         }
//     };
// });

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

    //Passport
    app.use(passport.initialize());
    app.use(passport.session());
});
