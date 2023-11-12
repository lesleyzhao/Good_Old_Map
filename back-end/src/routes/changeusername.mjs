let users = {
    "1234": {id: "1234", username: "John Doe", password: "password123"},
    "4567": {id: "4567", username: "Lesley Zhao", password: "lesleyzhao"}
   }

const changeusername = async(req, res) =>{
    const userID = req.session.userID;
    const {newUsername} = req.body;
    console.log("Received body:", req.body)
    console.log("User ID from session:", req.session.userID)

    try{
        //const wasUpdate = await database.updateUsername(newUserId, newUserName)
        //Simulate database update
        if(userID && users[userID]){
            users[userID].username = newUsername;
            res.status(200).json({message: "Succesfully update username", user: users[userID]});
            console.log('Updated user data:', users[userID])
        }
        else{
            res.status(400).json({message: "User not found."});
        }
    }
    catch(error){
        res.status(500).json({message: "Server error occurred", error})
    }

}


export default changeusername;
