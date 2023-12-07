import React, { useRef } from 'react'; // Import React and useRef
import {FormInputs} from '../../components/form/formInput';
import FormBtn  from '../../components/form/formBtn';
import AuthHeader from '../Authenticate/authHeader';
import NavBar from "../../components/common/navBar";
import LeftBtn from "../../components/common/leftBtn";

const ResetPassword = ({ loginMessage, handleLogin, handleGuest }) => {
  const formRef = useRef(null); 
  const fields = ["newPassword", "confirmPassword"]; 

  return (
    <>
    <div className="flex flex-col">
      <NavBar relative="1">
        <LeftBtn />
      </NavBar>
      <div className="flex flex-col w-[80%] max-w-[30rem] mx-auto justify-center items-center bg-gray-100 pt-4 mt-24">
        <AuthHeader header="Reset Password" message={loginMessage}  />
        <div className="w-full max-w-xs">
          <form ref={formRef} onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <FormInputs fields={fields} />
            <div className='flex justify-center mt-4'>
              <FormBtn type="submit" value="Reset Password" />
            </div>
          </form>
        </div>
      </div>
      </div>
    </>
  );
};

export default ResetPassword;
