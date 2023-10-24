import { Outlet } from "react-router-dom";
import Logo from "../../components/common/Logo";

const AuthLayout = () => {
  return (
    <>
    <div className="min-h-screen flex">
      <Logo />
      <div className='w-[60%] m-auto'>
        <Outlet />
      </div>
    </div>
    </>
  );
};

export default AuthLayout;