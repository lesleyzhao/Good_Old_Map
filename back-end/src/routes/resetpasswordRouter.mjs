import e from "express";
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../models/User.mjs';
import bcrypt from 'bcryptjs';


const resetpasswordRouter = async(req, res) =>{

    // Input Validation Result
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    // Concatenate all error messages into a single string
    const errorMessage = errors.array()
      .map(err => err.msg)
      .join(". ");

    // Send the concatenated error message
    return res.status(400).json({ message: errorMessage });
    }
  
    // Check if the Authorization header is present
    if (!req.headers.authorization) {
        return res.status(401).json({ message: "Authorization token is missing" });
    }

    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userID = decoded.id;
    console.log(userID)

    // userID, oldPassword, newPassword
    const {oldPassword, newPassword} = req.body;

    try{
        //const wasUpdate = await database.updateUsername(newUserId, newUserName)
        const user = await User.findOne({ uuid: userID }).select('+password'); 

        if(user){
            // Check if two passwords match
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            console.log("isMatch:", isMatch)
            console.log(oldPassword)
            console.log(user.password)
            if(isMatch){
                user.password = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));
                await user.save();
                return res.status(200).json({message: "Succesfully update username", 
                user: {
                uuid: user.uuid,
                name: user.name,
                email: user.email
                }});
            }else{
                return res.status(401).json({ message: "Old password is wrong." });
            }   
        }
        else{
            return res.status(400).json({message: "User not found."});
        }
    }
    catch(error){
        return res.status(500).json({message: "Server error occurred", error})
    }

}
export default resetpasswordRouter;