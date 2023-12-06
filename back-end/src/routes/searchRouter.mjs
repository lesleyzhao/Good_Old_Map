import Artwork from '../models/Artwork.mjs';

export const searchRouter = async (req, res) => {
    console.log('Search route accessed');
    const { artinfo, timeRange } = req.query;
    const timeRangeArray = timeRange.split(',');
    const startYear = parseInt(timeRangeArray[0]);
    const endYear = parseInt(timeRangeArray[1]);
    console.log(req.query);
    console.log(startYear);
    console.log(endYear);

    try {
        console.log('Searching for artworks...');
        const artworks = await Artwork.find({
            Year: { $gte: startYear, $lte: endYear },
            $or: [
                { title: { $regex: `${artinfo}`, $options: 'i' } },
                { artist: { $regex: `${artinfo}`, $options: 'i' } }
            ]
        }).limit(15);
        console.log('Artworks found');
        console.log(artworks);
        res.json(artworks);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).send('Internal Server Error');
    }
};
export default searchRouter;