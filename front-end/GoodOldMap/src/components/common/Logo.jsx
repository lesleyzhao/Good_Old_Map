import { useNavigate } from "react-router-dom"

const Logo = () => {
  const navigate = useNavigate();
  const handleClick = (evt) => {
    evt.stopPropagation()
    navigate("/")
    }

  return (
    <>
    {/* Reference: <a href="https://www.flaticon.com/free-icons/map" title="map icons">Map icons created by Freepik - Flaticon</a> */}
    <img className="w-9 hover:cursor-pointer" src="/maplogo.png" alt="maplogo" onClick={handleClick}/>
    </>
  )
}

export default Logo
