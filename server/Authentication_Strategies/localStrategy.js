//local strategy of auhtentication
const { Strategy } = require('passport-local');
const passport = require('passport');
const database = require('../database/connection');
const { hashPassword, comparePassword } = require('./hashing_password'); 


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
});

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