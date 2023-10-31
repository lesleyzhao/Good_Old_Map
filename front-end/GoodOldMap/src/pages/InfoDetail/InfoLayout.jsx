import { Outlet } from "react-router-dom"

const InfoLayout = () => {
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