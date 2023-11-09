import ArtItem from "../art/ArtItem"
import axios from "axios"
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const PopupSearch = (props) => {
  // setFoundData, foundData
  const [arts, setArts] = useState([])
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    axios.get("http://localhost:3000/getArts")
      .then(response => {
        // Setting state based on potential response structures
        if (response.data.arts) {
          setArts(response.data.arts);
        } else {
          setArts(response.data);
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setArts([])
      });
  }, []);

  const handleArtItemClick = (artId) => {
    // Navigate to the art information page
    navigate("/info", { state: { from: location.pathname } });
  };


  const handleClosePopup = (evt) => {
    evt.stopPropagation()
    props?.setFoundData(prev => ({
      ...prev,
      search: false
    }))
  }

  const updateFavorites = (artId, newFavoritedState) => {
    setArts(prevArts => prevArts.map(art => {
      if (art.id === artId) {
        return { ...art, inFavList: newFavoritedState };
      }
      return art;
    }));
  };


  return (
    <>
      <div className="overflow-scroll absolute z-[2000] rounded-lg bottom-0 w-full h-[60vh] bg-beige2">
        <img className="w-4 m-[4%]" src="/close.png" alt="x" onClick={handleClosePopup} />
        <div className="mx-[10%] items-center rounded-lg h-[calc(60vh-8%-1rem)] overflow-scroll">
          {arts.map((art) => (
            <div key={art.id} onClick={() => handleArtItemClick(art.id)}>
              <ArtItem art={art} updateFavorites={updateFavorites} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};


export default PopupSearch