let users = {
    "1234": {id: "1234", username: "John Doe", password: "password123", email: "email@nyu.edu"}
   }

const resetemailRouter = async(req, res) => {
  //req.body: userID, password, newEmail
  const {userID, password, newEmail} = req.body;
  console.log(req.body)
  try{
    if(users[userID]){
      if (users[userID].password != password){
        return res.status(400).json({message: "Wrong password."});
      }
      else{
        users[userID].email = newEmail;
        return res.status(200).json({message: "Succesfully update email", user: users[userID]});
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