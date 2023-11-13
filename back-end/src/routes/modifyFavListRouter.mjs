let arts = [
  // Sample data structure
  { id: '1', inFavList: false , location: 'NewYork', name: 'art1', author: '1XXXXXX', year: 4321, url: 'https://picsum.photos/200'},
  { id: '2', inFavList: false , location: 'Paris', name: 'art2', author: '2XXXXXX', year:1234, url: 'https://picsum.photos/200' },
  { id: '3', inFavList: false , location: 'London', name: 'art3', author: '3XXXXXX', year: 2222, url: 'https://picsum.photos/200' },
];

export const getArts = (req,res) => {
  try {
    const {location, time} = req.body;
    // const arts = arts.filter(art => art.location === location && art.time === time);
    if (typeof location !== 'string' || typeof time !== 'string') {
      return res.status(200).send(arts);
    }else{
      res.sendStatus(400);
    }
    // res.status(200).send(arts);
  } catch (error) {
    res.sendStatus(404);
    // res.status(404).send(arts);
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