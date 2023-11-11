let users = {
    "1234": {id: "1234", username: "John Doe", password: "password123"},
    "4567": {id: "4567", username: "Lesley Zhao", password: "lesleyzhao"}
   }

const login = (req, res) =>{
    console.log("Login route hit"); 
    const {username, password} =  req.body;
    const user = Object.values(users).find(u => u.username === username);

    if(user){
        //Check if two passwords match
        if(user.password === password){
            res.status(200).json({message: "Successfully logged in!", user: users[user.id]})
        }else{
            res.status(401).json({message: "Incorrect Password."})
        }
    }else{
        res.status(404).json({message: "User is not found."})
    }
}

export default login;

