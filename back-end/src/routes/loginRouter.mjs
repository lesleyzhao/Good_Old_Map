import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.mjs';
import axios from 'axios';

const axiosMongoDB = axios.create({
  baseURL: process.env.MONGODB_DATA_API,
  headers: {
    'Content-Type': 'application/json',
    'api-key': process.env.MONGODB_API_KEY
  }
});

//The following is "Login with Email and Password"
const loginRouter = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user asynchronously
    // const user = await User.findOne({ email: email }).select('+password')
    const response = await axiosMongoDB.post('/action/find', {
      collection: 'users',
      database: 'bakerdb',
      dataSource: 'bakerdb',
      filter: { email: email }
    });

    const user = response.data.documents[0];
    
    // User not found
    if (!user) return res.status(404).json({ message: "Incorrect user or password." })

    // Password mismatch
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Incorrect user or password." })

    // Generate access token
    const accessToken = jwt.sign(
      { id: user.uuid,
        name: user.name }, 
      process.env.JWT_SECRET, 
      { expiresIn: "2h" }
    )

    // return res.status(200).json({ message: "Successfully logged in!", 
    // accessToken,
    // user: {
    //   name: user.name,
    //   email: user.email
    //   }
    // })
    return res.status(200).json({
      message: "Successfully logged in!", 
      accessToken,
      user: {
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
      return res.status(500).json({ message: "Internal server error." });
  }
};

export default loginRouter;
