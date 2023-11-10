import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react";
import Logo from "./logo"
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import config from "../../../tailwind.config"


const BottomNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleClickMap = (evt) => {
    evt.stopPropagation()
    evt.preventDefault()
    navigate("/", { state: { from: location.pathname } })
  }
  const handleClickHeart = (evt) => {
    evt.stopPropagation()
    navigate("/favoritelist", { state: { from: location.pathname } })
  }
  const handleClickUser = (evt) => {
    evt.stopPropagation()
    navigate("/account", { state: { from: location.pathname } })
  }
  const beige1 = config.theme.extend.colors.beige1;
  return (
    <>
      <BottomNavigation className="fixed bottom-0 w-full" sx={{bgcolor: beige1}}>
        <BottomNavigationAction label="Map" icon={<Logo/>} onClick={handleClickMap}/>
        <BottomNavigationAction label="Favorites" icon={<img className="w-7 h-7 hover:cursor-pointer" src="/heart.png" alt="heart"/>} onClick={handleClickHeart}/>
        <BottomNavigationAction label="Account" icon={<img className="w-7 h-7 hover:cursor-pointer" src="/user.png" alt="user"/>} onClick={handleClickUser}/>
      </BottomNavigation>
    </>
  )
}

export default BottomNavBar;