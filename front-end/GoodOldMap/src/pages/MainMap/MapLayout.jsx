import { Outlet } from "react-router-dom";
import FormInput from "../../components/form/formInput";

const MapLayout = () => {
  return (
    <>
    <div className="h-screen flex flex-col">
      <nav className="py-[2vh] px-[5%] w-full bg-white flex flex-row justify-between">
        <FormInput placeholder="search for city"/>
        {/* TODO: timeline goes here */}
      </nav>
      <div className='w-full h-full'>
        <Outlet />
      </div>
    </div>
    </>
  );
};

export default MapLayout;