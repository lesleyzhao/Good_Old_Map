// Import statements
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Schema definition
const EventSchema = new mongoose.Schema({
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

// Model creation
const Event = mongoose.model('Event', EventSchema);

// Export the model
export default Event;
