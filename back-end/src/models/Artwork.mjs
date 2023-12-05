// Import statements
// import bcrypt from 'bcryptjs';

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const artworkSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId, // Object ID type for MongoDB
        required: true
    },
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
