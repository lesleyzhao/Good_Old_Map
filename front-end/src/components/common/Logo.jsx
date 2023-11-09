import { useNavigate, useLocation } from "react-router-dom"

const Logo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleClick = (evt) => {
    evt.stopPropagation()
    navigate("/", { state: { from: location.pathname } })
  }

  return (
    <>
    {/* Reference: <a href="https://www.flaticon.com/free-icons/map" title="map icons">Map icons created by Freepik - Flaticon</a> */}
    <img className="w-7 h-7 hover:cursor-pointer" src="/maplogo.png" alt="maplogo" onClick={handleClick}/>
    </>
  )
}

export default Logo
