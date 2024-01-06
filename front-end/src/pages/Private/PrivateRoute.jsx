import { Outlet, useLocation, Link } from "react-router-dom"

const PrivateRoute = () => {
  // TODO: update to real authorization
  return (
    <>
      {localStorage.getItem('token')
        ? <Outlet/>
        : <Unauthorized/>
      }
    </>
  )
}

const Unauthorized = () => {
  const location = useLocation();
  const featureName = location.pathname.split("/").join(" ").trim()
  
  return (
    <>
      <div className="flex">
        <div className="mx-auto mt-[30vh]">

          <h1>
            Please&#20;
            {<Link to="/login" className="text-[2rem] underline">
              Login
            </Link>}
          </h1>

          <h3 className="pb-6">for your private {featureName}</h3>
        
          <Link to="/login">
            {"Login to your account >>"}
          </Link>

        </div>

      </div>
    </>
  )
}

export default PrivateRoute