import e from "express";
import { body, validationResult } from 'express-validator';

let users = {
    "1234": {id: "1234", username: "John Doe", password: "password123"}
   }


const resetpasswordRouter = async(req, res) =>{
  // userID, oldPassword, newPassword
    const {userID, oldPassword, newPassword} = req.body;

    try{
        //const wasUpdate = await database.updateUsername(newUserId, newUserName)
        //Simulate database update
        if(users[userID]){
            if (users[userID].password != oldPassword){
                res.status(400).json({message: "Wrong password."});
            }
            else{
                users[userID].password = newPassword;
                res.status(200).json({message: "Succesfully update password", user: users[userID]});
                console.log('Updated user data:', users[userID])
            }
        }
        else{
            res.status(400).json({message: "User not found."});
        }
    }
    catch(error){
        res.status(500).json({message: "Server error occurred", error})
    }

}
export default resetpasswordRouter;