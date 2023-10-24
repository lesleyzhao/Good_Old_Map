import { redirect } from "react-router-dom"
const Logo = () => {
  const handleClick = (evt) => {
    // TODO: redirect not working
    redirect("/")
  }
  return (
    <>
    {/* TODO: width too large for desktop */}
      {/* Reference: <a href="https://www.flaticon.com/free-icons/map" title="map icons">Map icons created by Freepik - Flaticon</a> */}
      <div className="absolute m-[10%] hover:cursor-pointer"
        onClick={handleClick}>
        <img className="w-12"
          src="/maplogo.png" alt="maplogo"/>
      </div>
    </>
  )
}

export default Logo