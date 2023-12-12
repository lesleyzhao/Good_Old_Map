import { Outlet } from "react-router-dom"
import BottomNavBar from "./components/common/bottomNavBar"
const AppLayout = () => {
  return (
    <>
    <div className="mb-[calc(4vh+1.75rem)]">
    <Outlet />
    </div>
    <BottomNavBar/>
    </>
  )
}

export default AppLayout