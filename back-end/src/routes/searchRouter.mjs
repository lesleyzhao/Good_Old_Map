import Artwork from '../models/Artwork.mjs';

export const searchRouter = async (req, res) => {

    const { city, artinfo, timeline } = req.query;
    let startYear = -10000000;
    let endYear = 10000;
    let location = [0, 0];

    try {
        let searchCriteria = {};

        if (city) {
            location = city.split(',').map(Number);
        }

        if (timeline) {
            console.log("Timeline values:", timeline[0], timeline[1]);
            startYear = parseInt(timeline[0]);
            endYear = parseInt(timeline[1]);
        }

        if (artinfo) {
            searchCriteria.$or = [
                { artist: { $regex: artinfo, $options: 'i' } },
                { title: { $regex: artinfo, $options: 'i' } }
            ];
        }

        searchCriteria.Year = { $gte: startYear, $lte: endYear };
        searchCriteria.geoLocation = {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [location[1], location[0]]
                }
            }
        };
        console.log("Search criteria:", searchCriteria);

        const artworks = await Artwork.find(searchCriteria).limit(15);
        console.log("Mongoose Query:", artworks._mongooseOptions.query);
        res.json(artworks);
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
     }
};

  

export default searchRouter;

  