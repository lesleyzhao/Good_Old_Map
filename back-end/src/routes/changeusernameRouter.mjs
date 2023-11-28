import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../models/User.mjs';

const changeusernameRouter = async(req, res) =>{
  console.log("Request headers:", req.headers);
  // req.body : newUsername, userID
  const {newUsername} = req.body;
  console.log("Received body:", req.body)
  // Check if the Authorization header is present
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  const token = req.headers.authorization.split(' ')[1];

  // Verify and decode the token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userID = decoded.id;

  try{
    //const wasUpdate = await database.updateUsername(newUserId, newUserName)
    const user = await User.findOne({ uuid: userID }).select('+password'); 
    if(user){
        user.username = newUsername;
        await user.save();
        res.status(200).json({message: "Succesfully update username", user: {uuid: user.uuid, username: user.username}});
    }
    else{
        res.status(400).json({message: "User not found."});
    }
  }
  catch(error){
    if(error.name === 'JsonWebTokenError') {
      // Handle invalid token
      res.status(401).json({message: "Invalid Token"});
    } else{
      res.status(500).json({message: "Server error occurred", error})
    }
  }

}


export default changeusernameRouter;
