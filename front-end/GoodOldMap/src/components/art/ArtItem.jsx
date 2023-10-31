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

        <div className="relative w-full">
          <div className="relative m-auto">
            {/* <img src={art.url} alt={art.name} onClick={navigateToDetail} className="block rounded-3xl" /> */}
            <img className="w-full rounded-lg" src={`https://picsum.photos/500/300`} alt={art.name} onClick={navigateToDetail} />
            <p className='absolute bottom-[0.15rem] left-[0.15rem] rounded-xl px-1
              text-lg text-center bg-white bg-opacity-60'>
                <span className='pr-[0.15rem]' onClick={onRemoveFromFavorites}>❤️</span>
                {art.name}
                {art.year}
            </p>
          </div>
         <p className="text-center p-4">Made by Artist: Van Gogh, Holland</p>
        </div>
    );

};

export default ArtItem;
