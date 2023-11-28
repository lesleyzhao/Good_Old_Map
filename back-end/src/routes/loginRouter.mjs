import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.mjs';

//The following is "Login with Email and Password"
const loginRouter = async (req, res) => {
  console.log("Login route hit");
  const { email, password } = req.body; // Changed from email to username
  
  try {
    // Find the user asynchronously
    const user = await User.findOne({ email: email }).select('+password'); // Changed from email to username
    
    if (user) {
      // Check if two passwords match
      if (bcrypt.compareSync(password, user.password)) {
          // Generate an access token
          const accessToken = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "2h" });
          res.status(200).json({ message: "Successfully logged in!", accessToken });
      } else {
          res.status(401).json({ message: "Incorrect Password." });
      }
    } else {
          res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error." });
  }
};

export default loginRouter;
