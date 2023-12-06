import Artwork from '../models/Artwork.mjs';
import { getArts } from './modifyFavListRouter.mjs';

export const searchRouter = async (req, res) => {

    const { city, artinfo, timeline } = req.query;
    try {
        let searchQuery = {};
        if (city || artinfo || timeline) {
            searchQuery = {};
            if (city) {
                searchQuery.city = { $regex: city, $options: 'i' };
            }
            searchQuery.$or = [
                { artinfo: { $regex: artinfo, $options: 'i' } },
                { title: { $regex: artinfo, $options: 'i' } },
            ];
            if (!artinfo) {
                searchQuery.$or.push({ artinfo: { $exists: false } });
            }
            if (timeline) {
                searchQuery.year = { $gte: timeline.startYear, $lte: timeline.endYear };
            }
        }
        const artworks = getArts(searchQuery);
        res.json(artworks);
    } catch (error) {
        res.status(500).json({ message: "Internal server error." });
    }
};

export default searchRouter;

  