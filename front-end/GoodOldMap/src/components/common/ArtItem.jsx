import React from 'react';
import { useNavigate } from 'react-router-dom'

const ArtItem = ({ art,onRemoveFromFavorites }) => {

    const navigate = useNavigate();
    
    const navigateToDetail = (evt) => {
        evt.preventDefault()
        navigate("/info");  // Adjust this path as necessary
        // window.location.href = "/info";
    }
    
    return (

        <div className="relative w-[40%] m-auto">
          <div class="relative">
            <img src={art.url} alt={art.name} onClick={navigateToDetail} className="block rounded-3xl" />
            <p className='text-lg text-center absolute bottom-0 left-1 rounded-2xl bg-white bg-opacity-60'>
                <span onClick={onRemoveFromFavorites} className="mr-2 ml-2">❤️</span>
                {art.name}
                {art.year}
            </p>
          </div>
         <p className="text-center p-4">Made by Artist: Van Gogh, Holland</p>
        </div>
    );

};

export default ArtItem;
