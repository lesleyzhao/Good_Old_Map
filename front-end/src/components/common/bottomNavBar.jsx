import { useLocation, useNavigate } from "react-router-dom"
import Logo from "./logo"
const BottomNavBar = ({relative}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleClickHeart = (evt) => {
    evt.stopPropagation()
    navigate("/favoritelist", { state: { from: location.pathname } })
  }
  const handleClickUser = (evt) => {
    evt.stopPropagation()
    navigate("/account", { state: { from: location.pathname } })
  }
  return (
    <>
    <div className={`${relative ? "h-[calc(3vh+2.25rem)]" : ""}`}>
      <nav className="z-[1500] flex fixed bottom-0 pt-[2vh] pb-[2vh] px-[10%] w-full bg-beige1">
        <div className="flex flex-row justify-between w-full max-w-[30rem] mx-auto">
          <Logo />
          <img className="w-7 h-7 hover:cursor-pointer" src="/heart.png" alt="heart" onClick={handleClickHeart}/>
          <img className="w-7 h-7 hover:cursor-pointer" src="/user.png" alt="user" onClick={handleClickUser}/>
        </div>
      </nav>
    </div>
    </>
  )
}

export default BottomNavBar;