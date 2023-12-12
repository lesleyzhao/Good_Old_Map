import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
    <div className="flex flex-col">
      <div className='w-[60%] max-w-[30rem] mx-auto mt-[15vh]'>
        <Outlet />
      </div>
    </div>
    </>
  );
};

export default AuthLayout;