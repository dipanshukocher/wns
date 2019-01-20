const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create alarm schema & model

const userSchema = new Schema({
    _id: mongoose.Schema.ObjectId,
    email: { 
        type: String,
        required: [true, 'User Email Address is Required']
    },
    password: {
        type: String,
        required: [true, 'Password is Required']
    }
});

const Users = mongoose.model('users', userSchema);

module.exports = Users;