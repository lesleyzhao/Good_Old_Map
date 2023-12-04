// Import statements
// import bcrypt from 'bcryptjs';

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const artworkSchema = new Schema({
    url: String,
    Year: {
        $numberInt: String
    },
    Style: String,
    title: String,
    artist: String,
    Date: String,
    birthplace_id: String,
    location: String,
    geoLocation: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: {
          type: [Number],
          index: '2dsphere'
        }
    },
    latitude: {
        $numberDouble: Number
    },
    longitude: {
        $numberDouble: Number
    }
});

artworkSchema.index({ 'geoLocation': '2dsphere' });

const Artwork = model('Artwork', artworkSchema, 'arts');
export default Artwork;


// // Import statements
// import mongoose from 'mongoose';

// // Schema definition
// const EventSchema = new mongoose.Schema({
//     id: {
//         type: String,
//         unique: true,
//         required: true,
//     },
//     location: {
//         type: String,
//         required: true,
//     },
//     name: {
//         type: String,
//         required: true,
//     },
//     author: {
//         type: String,
//         required: true,
//     },
//     year: {
//         type: Number,
//         required: true,
//     },
//     url: {
//         type: String,
//         required: true,
//     },
// });

// // Model creation
// const Event = mongoose.model('Event', EventSchema);

// // Export the model
// export default Event;
