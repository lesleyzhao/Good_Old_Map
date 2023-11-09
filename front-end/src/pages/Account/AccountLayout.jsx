import { Outlet } from "react-router-dom"
import NavBar from "../../components/common/navBar"
import LeftBtn from "../../components/common/leftBtn"
import Logo from "../../components/common/logo"
import BottomNavBar from "../../components/common/bottomNavBar"
const AccountLayout = () => {
  return (
    <>
    <div className="min-h-screen flex flex-col">
      <NavBar relative="1">
        <LeftBtn />
      </NavBar>
      <div className="w-[80%] max-w-[30rem] mx-auto">
        <Outlet />
      </div>
      <BottomNavBar />
    </div>
    </>
  )
}

export default AccountLayout