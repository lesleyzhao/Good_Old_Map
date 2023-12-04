import Artwork from '../models/Artwork.mjs';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../models/User.mjs';


export const getArts = async (req, res) => {
  const { timeRange, location } = req.body;
  console.log(location)

  const startYear = parseInt(timeRange[0]);
  const endYear = parseInt(timeRange[1]);

  try {
    const artworks = await Artwork.find({
      Year: { $gte: startYear, $lte: endYear },
      // "latitude": location.latitude, 
      // "longitude": location.longitude
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
  try {
      const userUuid = req.params.uuid;

      const user = await User.findOne({ uuidd: userUuid });

      if (!user) {
          return res.status(404).send({ message: 'User not found' });
      }

      const favorites = await Art.find({
          '_id': { $in: user.favorites }
      });

      res.status(200).send(favorites);
  } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal server error' });
  }
};


// export const addFavListRouter = (req, res) => {
//   const artToUpdate = req.body; 

//   const artIndex = arts.findIndex(art => art.id === artToUpdate.id);

//   if (artIndex > -1) {
//     arts[artIndex].inFavList = !arts[artIndex].inFavList;
//     res.status(200).json(arts[artIndex]);
//   } else {
//     res.status(404).send('Art not found');
//   }
// };

export const addFavListRouter = async (req, res) => {
  // const { userUUID, artUUID } = req.body; 

  // try {
  //   const user = await UserModel.findOne({ "_id": userUUID });

  //   if (!user) {
  //     return res.status(404).send('User not found');
  //   }
  //   const isFavorite = user.favorites.includes(artUUID);

  //   if (isFavorite) {
  //     // already a favorite, remove it from the favorites array
  //     user.favorites = user.favorites.filter(fav => fav !== artUUID);
  //     await user.save(); // Save the updated user document
  //   } else {
      
  //     user.favorites.push(artUUID);
  //     await user.save(); 
  //   }

  //   res.status(200).json(user);
  // } catch (error) {
  //   console.error("Error updating favorite list:", error);
  //   res.status(500).send('Internal Server Error');
  // }
  const userId = req.user.uuid;

  try {
    const user = await User.findById(userId).populate('favorites');

    if (!user) return res.status(404).json({ message: "User not found." });

    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};



export default { addFavListRouter,favListRouter, getArts };