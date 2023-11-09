let arts = [
  // Sample data structure
  { id: '1', name: 'art1', author: 'Leonardo da Vinci', year: '4321', url: 'https://picsum.photos/200', inFavList: true },
  { id: '2', name: 'art2', author: 'XXXXXX', year: '1234', url: 'https://picsum.photos/200', inFavList: false },

];

// export const removeFavListRouter = (req, res) => {
//   const { id } = req.body;
//   const index = favorites.findIndex(f => f.id === id);
//   if (index !== -1) {
//     favorites.splice(index, 1);
//     res.status(200).send('Item removed from favorites.');
//   } 
// }

export const getArts = (req,res) => {
  try {
    const {location, time} = req.body;
    res.status(200).send(arts);
  } catch (error) {
    res.sendStatus(404);
  }
}

export const favListRouter = (req, res) => {
    const favorites = arts.filter(art => art.inFavList === true);
    res.status(200).send(favorites);
};


export const addFavListRouter = (req, res) => {
  const artToUpdate = req.body; 

  const artIndex = arts.findIndex(art => art.id === artToUpdate.id);

  if (artIndex > -1) {
    arts[artIndex].inFavList = !arts[artIndex].inFavList;
    res.status(200).json(arts[artIndex]);
  } else {
    res.status(404).send('Art not found');
  }
};


export default { addFavListRouter,favListRouter, getArts };