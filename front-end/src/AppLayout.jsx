import { Outlet } from "react-router-dom"
import BottomNavBar from "./components/common/bottomNavBar"
const AppLayout = () => {
  return (
    <>
    <Outlet />
    <BottomNavBar/>
    </>
  )
}

export default AppLayout