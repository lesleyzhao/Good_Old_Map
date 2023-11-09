const getpieceRouter = (req, res) => {
  try {
    const {location, time} = req.body;
    const foundPieces = [
      {id:"1", url:"https://picsum.photos/200", name:"error item1", year: "1234"},
      {id:"2", url:"https://picsum.photos/200", name:"error item2", year: "2345"}
    ]
    res.status(200).send(foundPieces);
  } catch (error) {
    res.sendStatus(400);
  }
}

export default getpieceRouter;