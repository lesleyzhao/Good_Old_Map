import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
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

const User = mongoose.model('User', UserSchema);

export default User;
