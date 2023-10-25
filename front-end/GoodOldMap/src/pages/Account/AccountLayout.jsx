import { Outlet } from "react-router-dom"
import NavBar from "../../components/common/navBar"
const AccountLayout = () => {
  return (
    <>
    <div className="min-h-screen flex flex-col">
      <NavBar relative="1">
        <img className="w-11 h-11" src="/back.png" alt="back"/>
      </NavBar>
      <div className='w-[80%] mb-[10%] mx-auto'>
        <Outlet />
      </div>
    </div>

    </>
  )
}

export default AccountLayout