import { Outlet } from "react-router-dom"
import NavBar from "../../components/common/navBar"
import LeftBtn from "../../components/common/leftBtn"
const AccountLayout = () => {
  return (
    <>
    <div className="min-h-screen flex flex-col">
      <NavBar relative="1">
        <LeftBtn />
      </NavBar>
      <div className='w-[80%] mb-[10%] mx-auto'>
        <Outlet />
      </div>
    </div>

    </>
  )
}

export default AccountLayout