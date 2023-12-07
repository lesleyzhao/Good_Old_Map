import Artwork from '../models/Artwork.mjs';

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
    console.log('Searching for artworks...');
    const artworks = await Artwork.find({
      Year: { $gte: startYear, $lte: endYear },
      $or: [
        { title: { $regex: `${artInfo}`, $options: 'i' } },
        { artist: { $regex: `${artInfo}`, $options: 'i' } }
      ]
    }).limit(15);
    console.log('Artworks found');
    console.log(artworks);
    return res.json(artworks);
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(500).send('Internal Server Error');
  }
};

export default searchArtsRouter;