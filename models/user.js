const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    LastName: String,
    email: {
        type: String,
        required: true,
    },
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);

