import Artwork from '../models/Artwork.mjs';

export const searchRouter = async (req, res) => {

    const { query } = req.query;

    try {
        let searchQuery = {};

        if (query) {
            searchQuery = {
                $or: [
                    { Year: query },
                    { artist: { $regex: query, $options: 'i' } },
                    { title: { $regex: query, $options: 'i' } },
                    { location: { $regex: query, $options: 'i' } }
                ]
            };
        }

        const artworks = await Artwork.find(searchQuery).limit(10);
        res.json(artworks);
    } catch (error) {
        res.status(500).json({ message: "Internal server error." });
    }
};

export default searchRouter;

  