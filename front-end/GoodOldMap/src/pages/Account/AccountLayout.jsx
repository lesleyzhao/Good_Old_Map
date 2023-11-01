import { Outlet } from "react-router-dom"
import NavBar from "../../components/common/navBar"
import LeftBtn from "../../components/common/leftBtn"
import Logo from "../../components/common/Logo"
const AccountLayout = () => {
  return (
    <>
    <div className="min-h-screen flex flex-col">
      <NavBar relative="1">
        <LeftBtn />
        <Logo />
      </NavBar>
      <div className='w-[80%] mb-[10%] mx-auto'>
        <Outlet />
      </div>
    </div>

    </>
  )
}

export default AccountLayout