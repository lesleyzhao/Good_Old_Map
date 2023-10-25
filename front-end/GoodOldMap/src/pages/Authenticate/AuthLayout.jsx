import { Outlet } from "react-router-dom";
import Logo from "../../components/common/Logo";
import NavBar from "../../components/common/navBar";

const AuthLayout = () => {
  return (
    <>
    <div className="min-h-screen flex flex-col">
      <NavBar>
        <Logo />
      </NavBar>
      <div className='w-[60%] m-auto z-10'>
        <Outlet />
      </div>
    </div>
    </>
  );
};

export default AuthLayout;