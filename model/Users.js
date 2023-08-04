//create a schema for the User data model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    email: {
        type: String,
    },
    phoneNumber: {
        type: Number,
    },

    fullName:{
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Users", usersSchema);
