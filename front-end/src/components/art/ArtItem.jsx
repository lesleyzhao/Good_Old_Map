import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Card from '../common/card';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axiosProvider from "../../util/api/axios"


const ArtItem = ({ art }) => {  
  // Added updateFavorites prop to update parent component
  const navigate = useNavigate();
  const location = useLocation();
  const [isFavorited, setIsFavorited] = useState(art.inFavList);

  const navigateToDetail = () => {
    navigate("/info", { state: { from: location.pathname, art } });
  };

  const toggleFavorite = async (event) => {
    event.stopPropagation();
    const newFavoritedState = !isFavorited;
    setIsFavorited(newFavoritedState); 
    const artData = {
      id: art._id,
      inFavList: newFavoritedState,
    };

    try {
      const response = await axiosProvider.post('/favlist/add', artData);
      // if (response.data) {
      //   setIsFavorited(response.data.inFavList);
      //   if (updateFavorites) {
      //     updateFavorites(art.id, response.data.inFavList);
      //   }
      // }
    } catch (error) {
      console.error('Error updating favorites', error);
      setIsFavorited(!newFavoritedState);
    }
  };

  return (
    <>
      <Card onClick={navigateToDetail} >
        {/* ...other card content... */}
        <img className="w-[70vw] max-w-[20rem] max-h-[20rem] overflow-hidden object-cover rounded-t-md" src={art.url} alt={art.name} />
        <p className='absolute bottom-[0.15rem] left-[0.18rem] rounded-xl px-1
          text-lg text-center bg-white bg-opacity-60'>
          {/* {art.name} */}
        </p>
        <div className='w-full px-4 py-2'>
          <div className='flex justify-between content-center'>
            <h3 className="pt-1">{`${art.title}`}</h3>
            <IconButton onClick={toggleFavorite}>
              {isFavorited ? <FavoriteIcon sx={{ color: 'red' }} /> : <FavoriteBorderIcon />}
            </IconButton>
          </div>
          {/* The rest of your card content, such as art title, author, year, etc. */}
          <p>{`${art.Year}`}</p>
          <p>{`${art.artist}`}</p>
          <p>{`${art.location}`}</p>
        </div>
      </Card>
    </>
  );
};

export default ArtItem;