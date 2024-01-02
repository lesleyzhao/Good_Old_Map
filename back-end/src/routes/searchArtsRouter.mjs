import Artwork from '../models/Artwork.mjs';
import axios from 'axios';

const axiosMongoDB = axios.create({
  baseURL: process.env.MONGODB_DATA_API,
  headers: {
    'Content-Type': 'application/json',
    'api-key': process.env.MONGODB_API_KEY
  }
});

const searchArtsRouter = async (req, res) => {
  // artinfo, timeRange
  const { artInfo, timeRange } = req.query;
  console.log(artInfo, timeRange)

  const startYear = parseInt(timeRange[0]);
  const endYear = parseInt(timeRange[1]);
  
  console.log(req.query);
  console.log(startYear);
  console.log(endYear);

  try {
    // console.log('Searching for artworks...');
    // const artworks = await Artwork.find({
    //   Year: { $gte: startYear, $lte: endYear },
    //   $or: [
    //     { title: { $regex: `${artInfo}`, $options: 'i' } },
    //     { artist: { $regex: `${artInfo}`, $options: 'i' } }
    //   ]
    // }).limit(15);
    // console.log('Artworks found');
    // console.log(artworks);
    // return res.json(artworks);
    const response = await axiosMongoDB.post('/action/find', {
      collection: 'arts', 
      database: 'bakerdb', 
      dataSource: 'bakerdb', 
      filter: {
        Year: { $gte: startYear, $lte: endYear },
        $or: [
          { title: { $regex: artInfo, $options: 'i' } },
          { artist: { $regex: artInfo, $options: 'i' } }
        ]
      },
      limit: 15
    });

    const artworks = response.data.documents;
    return res.json(artworks);

  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(500).send('Internal Server Error');
  }
};

export default searchArtsRouter;