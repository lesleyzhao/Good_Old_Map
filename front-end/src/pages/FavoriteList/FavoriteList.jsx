import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "../../components/common/navBar"
import LeftBtn from "../../components/common/leftBtn"
import ArtItem from "../../components/art/ArtItem.jsx"
import axiosProvider from "../../util/api/axios"

const FavoriteList = () => {
  // const [favorites, setFavorites] = useState([]);
  const [arts, setArts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  //TODO: 

  useEffect(() => {
    fetchFavoriteArts();
  }, []);

  const fetchFavoriteArts = async () => {
    try {
      const response = await axiosProvider.get('/getfavlist');
      setArts(response.data);
      console.log(arts);
    } catch (error) {
      console.error("Error fetching favorite arts:", error);
    }
  };


  const sortArts = (criteria) => {
    if (criteria === "title") {
      setArts(prevArts => [...prevArts].sort((a, b) => a.name.localeCompare(b.name)));
    } else if (criteria === "Year") {
      setArts(prevArts => [...prevArts].sort((a, b) => a.year - b.year));
    }
  }

  const handleArtItemClick = (artId) => {
    // Navigate to the art information page
    navigate("/info", { state: { from: location.pathname } });
  };
  return (
    <>
      <NavBar>
        <div className="flex justify-start items-center gap-3">
          <LeftBtn/>
          <h2>My Favorite Arts</h2>
        </div>
      </NavBar>
      <div className="max-w-[30rem] w-[80%] mx-auto flex flex-col">
        <div className="text-center space-x-8 my-3">
          <button
            className="bg-white hover:bg-beige3 hover:text-white transition duration-300 ease-in-out px-4 py-2 rounded"
            onClick={() => sortArts("name")}>
            Sort by Name
          </button>
          <button
            className="bg-white hover:bg-beige3 hover:text-white transition duration-300 ease-in-out px-4 py-2 rounded"
            onClick={() => sortArts("year")}>
            Sort by Year
          </button>
        </div>


        <div className='mt-5'>
          {arts.map((art) => (
            <div key={art._id} onClick={() => handleArtItemClick(art.id)}>
              <ArtItem art={art}/>
            </div>
          ))}
        </div>
      </div>
    </>


  )
};


export default FavoriteList;