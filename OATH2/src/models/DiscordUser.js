const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    _id: "0",
    discordId: {type: String, required: true},
    username: {type: String, required: true},
});

const DiscordUser = module.exports = mongoose.model('User', UserSchema);