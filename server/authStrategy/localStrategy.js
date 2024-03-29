//local strategy of auhtentication
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const database = require('../database/connection');
const { hashPassword, comparePassword } = require('./hashing_password'); 


//serializing 
passport.serializeUser((user, done)=> {
    //console.log("Serializing user local");
    // console.log(user)
    // console.log(user._id)
    done(null, user._id)});

passport.deserializeUser(async (_id, done)=> {
   // console.log("Deserializing user local strategy");
    let dbConnect = database.getDatabase();
    let collection = dbConnect.collection("learn");
    try{
        const userDB = await collection.findOne({$or : [{ _id: _id }]});
        //console.log(userDB);
        if(!userDB) throw new Error("User not found");
        done(null, userDB);
    } catch(err) {
        console.log(err);
        done(err, null);
    }
});

passport.use('local',
    new LocalStrategy({
        usernameField: 'username',   
    }, async (username, password, done) =>{

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
                //console.log("Authenticated Successfully!");
                // req.session.user = userDB;
                done(null, userDB);
                // return res.sendStatus(200);
            }else{
                //console.log("Failed to Authenticate");
                // return res.sendStatus(401);
                done(null, null)
            }

        }catch(err){
            done(err, null);
        }
    })
);