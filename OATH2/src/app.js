require('dotenv').config();
const express = require('express');
const app = express ();
const PORT = process.env.PORT || 3001;
const session = require('express-session');
const passport = require('passport');
const DiscordStrategy = require('./strategies/discordStrategy');
const db = require('./database/database');

db.then(() => console.log("Connected to MongoDb")).catch(err => console.log(err));


// Routes
const authRoute = require('./routes/auth');

app.use(session({

    secret: 'some secret',
    cookie: {
        maxAge: 60000 * 60 * 24,

    },
    saveUninitialized: false,
    resave: true,
}));

//Passport
app.use(passport.initialize());
app.use(passport.session());

//MiddleWare Routes
app.use('/auth', authRoute);

// app.get('/', (req,res) => {
//     res.send("Hello");
// });

// app.get('/dashboard', (req, res) => {
//     res.json({
//         msg: 'Good',
//         status: 200
//     });
// });

app.listen(PORT, () => {
    console.log(`Now listening to request on port ${PORT}`);
});