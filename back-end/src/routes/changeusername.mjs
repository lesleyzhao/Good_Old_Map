let users = {
 "1234": {id: "1234", username: "John Doe", password: "password123"}
}

const changeusername = async(req, res) =>{
    const {userID, newUsername} = req.body;

    try{
        //const wasUpdate = await database.updateUsername(newUserId, newUserName)
        //Simulate database update
        if(users[userID]){
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
