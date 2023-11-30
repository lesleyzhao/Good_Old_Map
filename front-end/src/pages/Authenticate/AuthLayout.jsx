import { Outlet } from "react-router-dom";
import Logo from "../../components/common/logo";
import NavBar from "../../components/common/navBar";

const AuthLayout = () => {
  return (
    <>
    <div className="min-h-screen flex flex-col">
      <div className='w-[60%] max-w-[30rem] mx-auto mt-[15vh]'>
        <Outlet />
      </div>
    </div>
    </>
  );
};

export default AuthLayout;