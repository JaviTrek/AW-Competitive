//strategy of auhtentication through discord
const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');
const database = require('../database/connection');
require("dotenv").config();

//Serializing user
passport.serializeUser((user, done) => {
    console.log("Serializing user");
    console.log(user);
    done(null, user);
});

//Decerializing user
passport.deserializeUser(async (user, done) => {
    console.log("Deserializing user");
    let dbConnect = database.getDatabase()
    //use the collection

    let collection = dbConnect.collection("users")
   
    const userS = await collection.findOne({_id : {$eq: id}});
    if(userS) 
        done(null, userS);
});

//Getting the discord token
passport.use(new DiscordStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CLIENT_REDIRECT,
    scope: ['identify']

}, async (accessToken, refreshToken, profile, done) => {
    console.log(profile.username);
    console.log(profile.id);
    try{
        let dbConnect = database.getDatabase()
        //use the collection of users
        let collection = dbConnect.collection("users")
        const userS = await collection.findOne({discordId : {$eq : profile.id} });

        if(userS){
            done(null, userS);
        }
        else{
            // creating a userDocument and passing it to "user" collection
            console.log("Creating a user")
            let myDoc = await collection.countDocuments({_id: {$gt: -1} })
            let userDocument = {
                _id: myDoc + 1,
                discordId: profile.id,
                username: profile.username,
            }
            await collection.insertOne(userDocument);
            done(null, userDocument);
        }
    }
    catch(err){
        console.log(err);
        done(err, null);
    }

}));

 