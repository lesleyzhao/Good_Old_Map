import { useNavigate } from 'react-router-dom'
import NavBar from "../../components/common/navBar"
import LeftBtn from "../../components/common/leftBtn"
// import RightBtn from "../../components/common/rightBtn";
import Logo from '../../components/common/Logo'
import ArtItem from "../../components/art/ArtItem.jsx"
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
        setArts([
          {id:"1", url:"https://picsum.photos/200", name:"error item1", year: "1234"},
          {id:"2", url:"https://picsum.photos/200", name:"error item2", year: "2345"}
        ])
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
      <NavBar className="flex">
          <LeftBtn className="flex-grow" />
          <h2>My Favorite Arts</h2>
        <Logo />
      </NavBar>
      <div className="w-[80%] mx-auto min-h-screen flex flex-col">
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


