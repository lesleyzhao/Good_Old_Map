import { Outlet } from "react-router-dom"
import NavBar from "../../components/common/navBar"
import LeftBtn from "../../components/common/leftBtn"
import BottomNavBar from "../../components/common/bottomNavBar"
const AccountLayout = () => {
  return (
    <>
    <div className="flex flex-col">
      <NavBar relative="1">
        <LeftBtn />
      </NavBar>
      <div className="w-[80%] max-w-[30rem] mx-auto">
        <Outlet />
      </div>
    </div>
    <BottomNavBar relative="1"/>
    </>
  )
}

export default AccountLayout