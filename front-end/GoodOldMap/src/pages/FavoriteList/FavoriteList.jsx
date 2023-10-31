import { useNavigate } from 'react-router-dom'
import NavBar from "../../components/common/navBar"
import LeftBtn from "../../components/common/leftBtn"
// import RightBtn from "../../components/common/rightBtn";
import Logo from '../../components/common/Logo'
import ArtItem from "../../components/common/ArtItem.jsx"
import React, { useState } from 'react';


const FavoriteList = () => {
  // Declare your arts data array inside the FavoriteList component

  const url_temp = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Vincent_van_Gogh_-_Road_with_Cypress_and_Star_-_c._12-15_May_1890.jpg/1200px-Vincent_van_Gogh_-_Road_with_Cypress_and_Star_-_c._12-15_May_1890.jpg"
  const urt_temp1 = "https://upload.wikimedia.org/wikipedia/commons/9/9d/Vincent_van_Gogh_-_Sunflowers_-_VGM_F458.jpg"
  const url_temp2 = "https://upload.wikimedia.org/wikipedia/commons/6/6d/Vincent_van_Gogh_-_De_stoel_van_Gauguin_-_Google_Art_Project.jpg"
  //TODO: will be a fetch request from the backend database later
  const [arts, setArts] = useState([
    { id: 1, name: 'Art name A', url: url_temp, year: 2023 },
    { id: 2, name: 'Art name C', url: urt_temp1, year: 2000 },
    { id: 3, name: 'Art name B', url: url_temp2, year: 1990 }
  ]);

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
        {/* <div className="max-h-[80vh] max-w-full m-auto flex items-center"> */}
        <div className="min-h-screen flex flex-col mx-auto items-center">
          <h1>My Favorite</h1>
          <button onClick={() => sortArts("name")}>Sort by Name</button>
          <button onClick={() => sortArts("year")}>Sort by Year</button> 
        </div>

        <div className="mx-auto items-center">
          {
            arts.map(art => <ArtItem
              key={art.id}
              art={art}
              onRemoveFromFavorites={() => handleRemoveFromFavorites(art.id)} />)
          }
        </div>
    </>


  )
};

export default FavoriteList;


