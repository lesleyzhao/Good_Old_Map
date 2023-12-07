import Artwork from '../models/Artwork.mjs';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../models/User.mjs';
import mongoose from 'mongoose';


export const getArts = async (req, res) => {
  const { timeRange, location } = req.query;
  console.log(location, timeRange)

  const startYear = parseInt(timeRange[0]);
  const endYear = parseInt(timeRange[1]);

  try {
    const artworks = await Artwork.find({
      Year: { $gte: startYear, $lte: endYear },
      geoLocation: {
        $near: { 
          $geometry: { 
            type: "Point", 
            coordinates: [location[1], location[0]]
          }
        }
      }
    }).limit(15);

    if (artworks.length === 0) {
      return res.status(404).send('No artwork found in the specified location and time range');
    }

    res.json(artworks);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).send('Internal Server Error');
  }
};



export const favListRouter = async (req, res) => {
  
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userID = decoded.id;
  
  try {

    const user = await User.findOne({ uuid: userID }); 

      if (!user) {
          return res.status(404).send({ message: 'User not found' });
      }
      console.log(user.favorites);
      const favorites = await Artwork.find({
          '_id': { $in: user.favorites }
      });

      res.status(200).send(favorites);
  } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal server error' });
  }
};



export const addFavListRouter = async (req, res) => {
  // Check if the Authorization header is present
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userID = decoded.id;
  const artID = req.body;
  const objectId = mongoose.Types.ObjectId(artID);
  console.log('uuid',userID);
  try {

    const user = await User.findOne({ uuid: userID });  
    if (!user) {
      return res.status(404).send('User not found');
    }

    let isFavorited;
    const index = user.favorites.findIndex(fav => fav.toString() === objectId.toString());

    console.log(index);

    console.log(user.favorites);
    if (index > -1) {
      user.favorites.splice(index, 1);
      isFavorited = false;
    } else {
      user.favorites.push(objectId);
      isFavorited = true;
    }


    await user.save();
    console.log(user.favorites);
    res.status(200).json({ message: 'Favorites updated', isFavorited });
  } catch (error) {
    console.error('Error updating favorites', error);
    res.status(500).send('Error updating favorites');
  }
};



export default { addFavListRouter,favListRouter, getArts };