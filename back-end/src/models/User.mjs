import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
  uuid: {
    type: String, // String type for the UUID
    required: true
  },
  name: {
    type: String, // String type for the name
    required: true
  },
  email: {
    type: String, // String type for the email
    required: true,
    unique: true, // Assuming email should be unique
    match: [/.+\@.+\..+/, 'Please fill a valid email address'] // Regex for email validation
  },
  password: {
    type: String, // String type for the hashed password
    required: true
  },
  favorites: [{
    type: mongoose.Schema.Types.Mixed, // Mixed type for an array of favorites, adjust as needed
  }],
  __v: {
    type: Number // Number type for the version key
  }
});

const User = model('User', userSchema,'users');
export default User;
