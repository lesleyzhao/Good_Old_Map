import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Card from '../common/card';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from 'axios';

const ArtItem = ({ art, updateFavorites }) => {  // Added updateFavorites prop to update parent component
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
      id: art.id,
      inFavList: newFavoritedState,
    };

    try {
      const response = await axios.post('http://localhost:3000/favlist/add', artData);

      if (response.data) {
        setIsFavorited(response.data.inFavList);
        if (updateFavorites) {
          updateFavorites(art.id, response.data.inFavList);
        }
      }
    } catch (error) {
      console.error('Error updating favorites', error);
      setIsFavorited(!newFavoritedState);
    }
  };

  return (
    <>
      <Card onClick={navigateToDetail} >
        {/* ...other card content... */}
        <img className="w-[70vw] max-w-[20rem] max-h-[20rem] rounded-md object-cover" src={art.url} alt={art.name} />
        <p className='absolute bottom-[0.15rem] left-[0.18rem] rounded-xl px-1
          text-lg text-center bg-white bg-opacity-60'>
          {/* {art.name} */}
        </p>
        <div className='w-full flex justify-between content-center'>
          <p className="pt-1">{`${art.name} , ${art.year}`}</p>
          
          <IconButton onClick={toggleFavorite}>
            {isFavorited ? <FavoriteIcon style={{ color: 'red' }} /> : <FavoriteBorderIcon />}
          </IconButton>
          {/* The rest of your card content, such as art title, author, year, etc. */}
        </div>
      </Card>
    </>
  );
};

export default ArtItem;