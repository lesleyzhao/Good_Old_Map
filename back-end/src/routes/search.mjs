
import Event from '../models/Event.mjs'; 

const handleSearch = async (query) => {
  try {
    // Use regex to perform case-insensitive search on 'name' and 'location'
    const results = await Event.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { location: { $regex: query, $options: 'i' } },
      ],
    });

    return results;
  } catch (error) {
    console.error(error);
    throw new Error('Error while searching for events');
  }
};

export default handleSearch;
