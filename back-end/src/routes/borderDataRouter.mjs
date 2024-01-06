import axios from "axios";

const axiosMongoDB = axios.create({
  baseURL: process.env.MONGODB_DATA_API,
  headers: {
    'Content-Type': 'application/json',
    'api-key': process.env.MONGODB_API_KEY
  }
});

export const getBorderData = async (req, res) => {
  try {
    const name = req.query.name;
    console.log(name);

    // Make a request to the MongoDB Data API
    const response = await axiosMongoDB.post('/action/find', {
      collection: 'borderData', 
      database: 'bakerdb', 
      dataSource: 'bakerdb',
      filter: { 
        name: name 
      }
    }); 

    if (response.data.documents) {
      let data = response.data.documents[0];
      console.log(data)
      
      res.json(data);
      
    } else {
      res.status(404).send('Data not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

export default getBorderData;
