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
        <div className="w-[40%] m-auto fle">
            <img src={art.url} alt={art.name} onClick= {navigateToDetail}/>
            <p>
                <span onClick={onRemoveFromFavorites} >❤️</span>
                {art.name}
                {art.year}
            </p>
        </div>
    );
};

export default ArtItem;
