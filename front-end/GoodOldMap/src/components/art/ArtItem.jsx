import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import Card from '../common/card';

const ArtItem = ({ art,onRemoveFromFavorites }) => {
  const navigate = useNavigate()
  const location = useLocation()
  
  const navigateToDetail = (evt) => {
      evt.preventDefault()
      navigate("/info", {state:{from:location.pathname}});  // Adjust this path as necessary
      // window.location.href = "/info";
  }
  
  return (
    <div className="mb-4">
      <Card>
        <div className="relative mx-auto">
          <img className="w-full rounded-lg" src={art.url} alt={art.name} onClick={navigateToDetail} />
          <p className='absolute bottom-[0.15rem] left-[0.15rem] rounded-xl px-1
            text-lg text-center bg-white bg-opacity-60'>
              <span className='pr-[0.15rem]' onClick={onRemoveFromFavorites}>❤️</span>
              {`${art.name} ${art.year}`}
          </p>
        </div>
        <p className="pt-1">Made by Artist: Van Gogh, Holland</p>
      </Card>
    </div>
  );

};

export default ArtItem;
