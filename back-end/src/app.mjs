import express from 'express';
import url from 'url';
import path from 'path';
import { fileURLToPath } from 'url';
import User from './models/User.mjs'; 
// middlewares
import multer from "multer";
import bcrypt from 'bcryptjs';
import cors from 'cors';
import "dotenv/config";
import dotenv from 'dotenv';
import morgan from 'morgan';
import session from 'express-session';
import mongoose from 'mongoose';  
import { v4 as uuidv4 } from 'uuid';
import { body, validationResult }  from 'express-validator';

// routes
import loginRouter from './routes/loginRouter.mjs';
import registerRouter from './routes/registerRouter.mjs';
import changeusernameRouter from './routes/changeusernameRouter.mjs';
import forgetpasswordRouter from './routes/forgetpasswordRouter.mjs';
import delaccountRouter from './routes/delaccountRouter.mjs';
import getpieceRouter from './routes/getpieceRouter.mjs';
import resetpasswordRouter from './routes/resetpasswordRouter.mjs';
import resetemailRouter from './routes/resetemailRouter.mjs';


import {addFavListRouter,favListRouter, getArts} from './routes/modifyFavListRouter.mjs'
import { configDotenv } from 'dotenv';
const app = express();
//const __filename = fileURLToPath(import.meta.url);


// use the morgan middleware to log all incoming http requests
app.use(morgan("dev"));

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()); // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })); // decode url-encoded incoming POST data

// serve static files
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
app.use("/static", express.static(path.join(__dirname, 'public')));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// cors
const corsOptions = {
  credentials: true,
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH']
}
app.use(cors(corsOptions));


// Connect to MongoDB
  mongoose.connect('mongodb://localhost:27017/bakerdb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Connected to MongoDB...');
  
      // Hash the password
      const password = "password123";
      const saltRounds = 10;
      bcrypt.hash(password, saltRounds, function(err, hash) {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Hashed password:", hash);
  
        // Insert the first test user into the database
        const newUser = new User({
          uuid: uuidv4(),
          name: "John Doe",
          email: "email@nyu.edu",
          password: hash
        });
  
        newUser.save()
          .then(doc => console.log("User saved:", doc))
          .catch(err => console.error(err));
      });
  
    })
    .catch(err => console.error('Could not connect to MongoDB...', err));
  

// session to auto-save user data (like id) when they login
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized:true,
  cookie: {httpOnly: true, secure: process.env.NODE_ENV==="production"}
}))
console.log('Session secret:', process.env.SESSION_SECRET);

// other middlewares

// routes that does not need authentication
// app.post("/getpiece", getpieceRouter);
app.post("/register", registerRouter)
app.post("/login", loginRouter);

// routes that needs authentication
// Account routes
app.patch("/changeusername", changeusernameRouter);
app.patch("/resetemail", resetemailRouter);
app.post("/forgetpassword", forgetpasswordRouter);
app.patch("/resetpassword", resetpasswordRouter);
app.delete("/delaccount", delaccountRouter);

// Favorites list routes 
app.get('/getfavlist', favListRouter);
app.post('/favlist/add',addFavListRouter);
app.post('/getArts', getArts);
// app.post('/favlist/remove',removeFavListRouter);

// export the express app we created to make it available to other modules
export default app;
