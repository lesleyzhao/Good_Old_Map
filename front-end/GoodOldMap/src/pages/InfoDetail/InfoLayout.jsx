import { Outlet } from "react-router-dom"
import NavBar from "../../components/common/navBar"
import LeftBtn from "../../components/common/leftBtn"
import RightBtn from "../../components/common/rightBtn"

const InfoLayout = () => {
  const handleRightClick = (evt) => {
    evt.stopPropagation();
  }

  return (
    <>
    <div className="min-h-screen flex flex-col">
      <NavBar>
        <LeftBtn />
        <RightBtn handleRightClick={handleRightClick}/>
      </NavBar>
      <Outlet />
    </div>

    </>
  )
}

export default InfoLayout