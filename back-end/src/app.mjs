import express from 'express';
import url from 'url';
import path from 'path';
// middlewares
import multer from "multer";
import cors from 'cors';
import "dotenv/config";
import morgan from 'morgan';
// routes
import delaccountRouter from './routes/delaccoountRouter.mjs';
import getpieceRouter from './routes/getpieceRouter.mjs';
import {addFavListRouter,favListRouter, getArts} from './routes/modifyFavListRouter.mjs'
const app = express();

// use the morgan middleware to log all incoming http requests
app.use(morgan("dev"));

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()); // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })); // decode url-encoded incoming POST data

// serve static files
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
app.use("/static", express.static(path.join(__dirname, 'public')));

// cors
// TODO: store in env
const clientURL = "http://localhost:5173";
const corsOptions = {
  credentials: true,
  origin: clientURL,
  methods: ['GET', 'PUT', 'POST', 'DELETE']
}
app.use(cors(corsOptions));
// middlewares


// routes that does not need authentication
app.post("/getpiece", getpieceRouter);

// authentication


// routes that needs authentication
app.post("/delaccount", delaccountRouter);


// Favorites list routes
app.get('/getfavlist', favListRouter);
app.get('/getArts', getArts);
app.post('/favlist/add',addFavListRouter);
// app.post('/favlist/remove',removeFavListRouter);




// export the express app we created to make it available to other modules
export default app;