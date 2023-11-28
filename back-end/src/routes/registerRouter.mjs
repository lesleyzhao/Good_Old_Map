import bcrypt from 'bcryptjs';
import User from '../models/User.mjs';
import { v4 as uuidv4 } from 'uuid';

const registerRouter = async (req, res) => {
    // req.body: username, email, password
    // TODO: might need email authentification / email optional
    const { username, email, password } = req.body;
  
    try {
      // Check if the email is already registered
      const user = await User.findOne({ email: email }).select('+password')
     
      if (user) {
        res.status(400).json({ message: "Email is already registered." });
      } else {
        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  
        // Create a new user object
        const newUser = new User({
          uuid: uuidv4(), //Generate a unique id for each new user
          name: username,
          email: email,
          password: hashedPassword
        });
  
        // Add the new user to mongodb database
        await newUser.save();
  
        res.status(201).json({ message: "User successfully registered", user: newUser });
        console.log('New user registered:', newUser);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ message: "Server error occurred", error: error.message });
    }
  };

  
  export default registerRouter;
  