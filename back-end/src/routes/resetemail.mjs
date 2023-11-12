let users = {
    "1234": {id: "1234", username: "John Doe", password: "password123", email: "email@nyu.edu"}
   }

const resetemail = async(req, res) => {
    const {userID, password, newEmail} = req.body;
    
    try{
        if(users[userID]){
            if (users[userID].password != password){
                res.status(400).json({message: "Wrong password."});
            }
            else{
                users[userID].email = newEmail;
                res.status(200).json({message: "Succesfully update email", user: users[userID]});
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

export default resetemail;