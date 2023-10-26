import { redirect } from "react-router-dom"
const Logo = () => {
  const handleClick = (evt) => {
    evt.stopPropagation();
    // TODO: redirect not working
    redirect("/")
  }
  return (
    <>
    {/* Reference: <a href="https://www.flaticon.com/free-icons/map" title="map icons">Map icons created by Freepik - Flaticon</a> */}
    <img className="w-11 hover:cursor-pointer" src="/maplogo.png" alt="maplogo" onClick={handleClick}/>
    </>
  )
}

export default Logo
