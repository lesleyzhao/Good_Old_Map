import Artwork from '../models/Artwork.mjs';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../models/User.mjs';
import mongoose from 'mongoose';
import axios from 'axios';

const axiosMongoDB = axios.create({
  baseURL: process.env.MONGODB_DATA_API,
  headers: {
    'Content-Type': 'application/json',
    'api-key': process.env.MONGODB_API_KEY
  }
});

// export const getArts = async (req, res) => {

//   const { timeRange, location } = req.query;
//   console.log(location, timeRange)


//   const startYear = parseInt(timeRange[0]);
//   const endYear = parseInt(timeRange[1]);

//   try {
//     const artworks = await Artwork.find({
//       Year: { $gte: startYear, $lte: endYear },
//       geoLocation: {
//         $near: {
//           $geometry: {
//             type: "Point",
//             coordinates: [location[1], location[0]]
//           }
//         }
//       }
//     }).limit(15);

//     if (artworks.length === 0) {
//       return res.status(404).send('No artwork found in the specified location and time range');
//     }

//     res.json(artworks);
//   } catch (err) {
//     console.error(err); // Log the error for debugging
//     res.status(500).send('Internal Server Error');
//   }
// };

export const getArts = async (req, res) => {
  const { timeRange, location } = req.query;
  const startYear = parseInt(timeRange[0]);
  const endYear = parseInt(timeRange[1]);
  console.log(req.query);
  const filter = {
    Year: { $gte: startYear, $lte: endYear },
    geoLocation: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [parseFloat(location[1]), parseFloat(location[0])]
        }
      }
    }
  };

  try {
    const response = await axiosMongoDB.post('/action/find', {
      collection: 'arts', // Replace with your collection name
      database: 'bakerdb', // Replace with your database name
      dataSource: 'bakerdb', // Replace with your cluster name
      filter: filter,
      limit: 15
    });

    const artworks = response.data.documents;

    if (artworks.length === 0) {
      return res.status(404).send('No artwork found in the specified location and time range');
    }

    res.json(artworks);
  } catch (err) {
    console.error(err);
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
  console.log(userID);
  try {
    const response = await axiosMongoDB.post('/action/find', {
      collection: 'users', // Replace with your actual user collection name
      database: 'bakerdb',
      dataSource: 'bakerdb',
      filter: { uuid: userID }
    });

    const user = response.data.documents[0];
    
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const objectIds = user.favorites.map(id => ({ "$oid": id }));

    // Fetch artworks from MongoDB Data API
    const artworksResponse = await axiosMongoDB.post('/action/find', {
      collection: 'arts', // Replace with your actual artwork collection name
      database: 'bakerdb',
      dataSource: 'bakerdb',
      filter: { '_id': { $in: objectIds } }
    });

    const favorites = artworksResponse.data.documents;
    
    console.log(artworksResponse.data);
    const favoritesWithFlag = favorites.map(artwork => ({
      ...artwork, 
      isFavorited: true
    }));
    
    res.status(200).send(favoritesWithFlag);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

//     const user = await User.findOne({ uuid: userID });

//     if (!user) {
//       return res.status(404).send({ message: 'User not found' });
//     }
//     console.log(user.favorites);
//     const favorites = await Artwork.find({
//       '_id': { $in: user.favorites }
//     });

//     const favoritesWithFlag = favorites.map(artwork => {
//       return {
//         ...artwork._doc, // Spread the existing artwork properties
//         isFavorited: true // Set isFavorited to true
//       };
//     });

//     res.status(200).send(favoritesWithFlag);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: 'Internal server error' });
//   }
// };



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


  try {

    const user = await User.findOne({ uuid: userID });
    if (!user) {
      return res.status(404).send('User not found');
    }

    const index = user.favorites.findIndex(fav => fav.toString() === objectId.toString());
    let isFavorited;
    // console.log(index);

    // console.log(user.favorites);
    if (index > -1) {
      user.favorites.splice(index, 1);
      isFavorited = false;
    } else {
      user.favorites.push(objectId);
      isFavorited = true;
    }
    const favorites = await Artwork.find({
      '_id': { $in: user.favorites }
    });

    
    await user.save();

    res.status(200).json({ message: 'Favorites updated', isFavorited });
    // res.status(200).send(favoritesWithFlag);
  } catch (error) {
    console.error('Error updating favorites', error);
    res.status(500).send('Error updating favorites');
  }
};



export default { addFavListRouter, favListRouter, getArts };