const moogoose = require('mongoose');
const bcrypt = require('bcryptjs');
const EventSchema = new moogoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
});
const Event = moogoose.model('Event', EventSchema);
module.exports = Event;