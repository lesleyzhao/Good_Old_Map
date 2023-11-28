import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

mongoose.connect('mongodb://localhost:27017/bakerdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

//Test hashed password to save hased password into db
const password = "password123";
const saltRounds = 10;
bcrypt.hash(password, saltRounds, function(err, hash) {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Hashed password:", hash);
});

//Create 1st user in db
db.users.insertOne({
    uuid: uuidv4(), // This generates a unique UUID
    username: "John Doe",
    email: "email@nyu.edu",
    password: "$2a$10$9STrp3fHvjPnJ3r8PH1WwejDAdf.uegxqYnefmu4QtaAC/bIyqPrS"
});