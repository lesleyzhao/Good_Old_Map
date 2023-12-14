import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Card from '../common/card';
// helper
import { axiosPrivateProvider } from "../../util/api/axios"


const ArtItem = ({art}) => {  
  // Added updateFavorites prop to update parent component
  const navigate = useNavigate();
  const location = useLocation();
  const [isFavorited, setIsFavorited] = useState(art.isFavorited);

  // const navigateToDetail = (art) => {
  //   if (art && art.id) {
  //     navigate(`/info/${art.title}`);
  //   } else {
  //     console.error("Art data is missing");
  //   }
  // };
  const navigateToDetail = (art) => {
    navigate('/info', { state: { from: location.pathname, art }  }); // Passing art object in state
  };

  const toggleFavorite = async (event) => {
    event.stopPropagation();
  
    const artData = {
      id: art._id
    };
  
    try {
      const response = await axiosPrivateProvider.post('/addFavorite', artData);
      setIsFavorited(response.data.isFavorited);
    } catch (error) {
      console.error('Error updating favorites', error);
    }
  };

  

  return (
    <>
      <Card onClick={() => navigateToDetail(art)}>
        {/* onClick={navigateToDetail} art={art} */}

        <img className="w-[70vw] max-w-[20rem] max-h-[20rem] overflow-hidden object-cover rounded-t-md" src={art.url} alt={art.name} />
        <p className='absolute bottom-[0.15rem] left-[0.18rem] rounded-xl px-1
          text-lg text-center bg-white bg-opacity-60'>
        </p>
        <div className='w-full px-4 py-2'>
          <div className='flex justify-between content-center'>
            <h3 className="pt-1">{`${art.title}`}</h3>
            <IconButton onClick={toggleFavorite}>
              {isFavorited ? <FavoriteIcon sx={{ color: 'red' }} /> : <FavoriteBorderIcon />}
            </IconButton>
          </div>
          <p>{`${art.Year}`}</p>
          <p>{`${art.artist}`}</p>
          <p>{`${art.location}`}</p>
        </div>
      </Card>
    </>
  );
};

export default ArtItem;

 