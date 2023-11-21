import express from 'express';
import url from 'url';
import path from 'path';
import { fileURLToPath } from 'url';
// middlewares
import multer from "multer";
import cors from 'cors';
import "dotenv/config";
import dotenv from 'dotenv';
import morgan from 'morgan';
import session from 'express-session'
// routes
import delaccountRouter from './routes/delaccoountRouter.mjs';
import getpieceRouter from './routes/getpieceRouter.mjs';
import login from './routes/login.mjs';
import changeusername from './routes/changeusername.mjs';
import resetpassword from './routes/resetpassword.mjs';
import resetemail from './routes/resetemail.mjs';
import register from './routes/register.mjs';

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
app.post("/register", register)
app.post("/login", login);

// routes that needs authentication
// Account routes
app.delete("/delaccount", delaccountRouter);
app.patch("/changeusername", changeusername);
app.patch("/resetpassword", resetpassword);
app.patch("/resetemail", resetemail);
// Favorites list routes 
app.get('/getfavlist', favListRouter);
app.post('/favlist/add',addFavListRouter);
app.post('/getArts', getArts);
// app.post('/favlist/remove',removeFavListRouter);

// export the express app we created to make it available to other modules
export default app;
