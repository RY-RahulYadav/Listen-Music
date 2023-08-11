const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose")



const mainSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: String
    },
    email: {
        type: String,
        require: true,
        unique: true

    },
    password: {
        type: String,
        require: true,
        select:false

    },

    playlist: [{
        playlistname: {
            type: String
        },
        SongId: [String]
    }]






})
mainSchema.plugin(passportLocalMongoose);
const UserSchema = mongoose.model('UserSchema', mainSchema);
module.exports = UserSchema;