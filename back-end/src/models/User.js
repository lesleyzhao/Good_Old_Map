const moogoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new moogoose.Schema({
    uuid: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false, // hide password by default
    },
    favorites: {
        type: Array,
        required: false,
    },
});

const User = moogoose.model('User', UserSchema);

module.exports = User;