import { useNavigate } from 'react-router-dom'
import NavBar from "../../components/common/navBar"
import LeftBtn from "../../components/common/leftBtn"
// import RightBtn from "../../components/common/rightBtn";
import Logo from '../../components/common/Logo'
import ArtItem from "../../components/common/ArtItem.jsx"
import axios from "axios"
import React, { useState, useEffect } from "react"


const FavoriteList = () => {
  // Declare your arts data array inside the FavoriteList component
  const [arts, setArts] = useState([])
  useEffect(() => {
    // Fetch mock data
    axios.get("https://my.api.mockaroo.com/fav_list?key=dd3f48f0", {
      headers: {
        "X-API-Key": "dd3f48f0"
      }
    })
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
      });
  }, []);

  const navigate = useNavigate();

  const navigateToDetail = (evt) => {
    evt.preventDefault()
    navigate("/info");  // Adjust this path as necessary
  }

  const sortArts = (criteria) => {
    if (criteria === "name") {
      setArts(prevArts => [...prevArts].sort((a, b) => a.name.localeCompare(b.name)));
    } else if (criteria === "year") {
      setArts(prevArts => [...prevArts].sort((a, b) => a.year - b.year));
    }
  }

  const handleRemoveFromFavorites = (idToRemove) => {
    // Remove the art with the specified ID from the favorites list
    setArts(prevArts => prevArts.filter(art => art.id !== idToRemove));
  }

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <NavBar className="flex">
          <LeftBtn className="flex-grow" />
          <Logo />
        </NavBar>
        <div className="mx-auto items-center">
          <h1 >My Favorite</h1>
          <button className="text-2xl font-bold mt-4" onClick={() => sortArts("name")}>Sort by Name</button>
          <button className="text-2xl font-bold mt-4" onClick={() => sortArts("year")}>Sort by Year</button>
        </div>

        <div className="mx-auto items-center">
          {
            arts.map(art => <ArtItem
              key={art.id}
              art={art}
              onRemoveFromFavorites={() => handleRemoveFromFavorites(art.id)} />)
          }
        </div>
      </div>
    </>


  )
};

export default FavoriteList;


