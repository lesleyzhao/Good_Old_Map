// let arts = [
  
//   { id: '1', inFavList: false , location: 'NewYork', name: 'art1', author: '1XXXXXX', year: 4321, url: 'https://picsum.photos/200'},
//   { id: '2', inFavList: false , location: 'Paris', name: 'art2', author: '2XXXXXX', year:1234, url: 'https://picsum.photos/200' },
//   { id: '3', inFavList: false , location: 'London', name: 'art3', author: '3XXXXXX', year: 2222, url: 'https://picsum.photos/200' },
// ];

export const getArts = (req,res) => {
  try {
    const {location, time} = req.body;
    
    if (typeof location !== 'string' || typeof time !== 'string') {
      return res.status(200).send(arts);
    }else{
      res.sendStatus(400);
    }
    
  } catch (error) {
    res.sendStatus(404);

  }
}

// export const favListRouter = (req, res) => {
//     const favorites = arts.filter(art => art.inFavList === true);
//     res.status(200).send(favorites);
// };
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
  const { userUUID, artUUID } = req.body; 

  try {
    const user = await UserModel.findOne({ "_id": userUUID });

    if (!user) {
      return res.status(404).send('User not found');
    }
    const isFavorite = user.favorites.includes(artUUID);

    if (isFavorite) {
      // already a favorite, remove it from the favorites array
      user.favorites = user.favorites.filter(fav => fav !== artUUID);
      await user.save(); // Save the updated user document
    } else {
      
      user.favorites.push(artUUID);
      await user.save(); 
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating favorite list:", error);
    res.status(500).send('Internal Server Error');
  }
};



export default { addFavListRouter,favListRouter, getArts };