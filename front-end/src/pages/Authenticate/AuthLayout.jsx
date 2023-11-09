import { Outlet } from "react-router-dom";
import Logo from "../../components/common/logo";
import NavBar from "../../components/common/navBar";

const AuthLayout = () => {
  return (
    <>
    <div className="min-h-screen flex flex-col">
      <NavBar>
        <Logo />
      </NavBar>
      <div className='w-[60%] max-w-[30rem] mx-auto mt-[10vh]'>
        <Outlet />
      </div>
    </div>
    </>
  );
};

export default AuthLayout;