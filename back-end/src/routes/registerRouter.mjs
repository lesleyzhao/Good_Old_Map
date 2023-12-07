import bcrypt from 'bcryptjs';
import User from '../models/User.mjs';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const axiosMongoDB = axios.create({
  baseURL: process.env.MONGODB_DATA_API,
  headers: {
    'Content-Type': 'application/json',
    'api-key': process.env.MONGODB_API_KEY
  }
});


const registerRouter = async (req, res) => {
    // req.body: username, email, password
    // TODO: might need email authentification / email optional
    const { username, email, password } = req.body;
  
    try {
      // Check if the email is already registered
      // const user = await User.findOne({ email: email })
      const findUserResponse = await axiosMongoDB.post('/action/find', {
        collection: 'users',
        database: 'bakerdb',
        dataSource: 'bakerdb',
        filter: { email: email }
      });

      const existingUser = findUserResponse.data.documents[0];
     
      // Email is Registered
      if (existingUser) return res.status(400).json({ message: "Email is already registered." });

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      
      // Create a new user object
      // const newUser = new User({
      //   uuid: uuidv4(),
      //   name: username,
      //   email: email,
      //   password: hashedPassword,
      //   favorites: [],
      // });
      const newUser = {
        uuid: uuidv4(),
        name: username,
        email: email,
        password: hashedPassword,
        favorites: []
      };

      // Add the new user to mongodb database
      // await newUser.save();
      await axiosMongoDB.post('/action/insertOne', {
        collection: 'users',
        database: 'bakerdb',
        dataSource: 'bakerdb',
        document: newUser
      });

      return res.status(201).json({ message: "User successfully registered", user: newUser });
      
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ message: "Server error occurred", error: error.message });
    }
  };

  
  export default registerRouter;
  