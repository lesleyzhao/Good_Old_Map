import User from "../models/User.mjs";
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const resetemailRouter = async(req, res) => {
  
  // Input Validation Result
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Concatenate all error messages into a single string
    const errorMessage = errors.array()
      .map(err => err.msg)
      .join(", ");

    // Send the concatenated error message
    return res.status(400).json({ message: errorMessage });
  }

  // Check if the Authorization header is present
  // console.log("Request headers:", req.headers);
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }
  
  // Fetch uuid from jwt token
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userID = decoded.id;
  console.log(userID)

  try{
    //req.body: userID, password, newEmail
    const {newEmail, password} = req.body;
    const user = await User.findOne({ uuid: userID }).select('+password'); 
    
    if(user){
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch){
        user.email = newEmail;
        await user.save();
        return res.status(200).json({message: "Succesfully update email", 
        user: {
          uuid: user.uuid,
          name: user.name,
          email: user.email
        }});
      }
      else{
        return res.status(400).json({message: "Wrong password."});
      }
    }
    else{
      return res.status(400).json({message: "User not found."});
    }
  }
  catch(error){
    return res.status(500).json({message: "Server error, please try again"})
  }  
}

export default resetemailRouter;