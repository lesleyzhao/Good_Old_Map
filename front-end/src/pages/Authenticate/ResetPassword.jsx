import { useRef, useState } from 'react';
import FormBtn  from '../../components/form/formBtn';
import NavBar from "../../components/common/navBar";
import LeftBtn from "../../components/icon/leftBtn";
import AuthHeader from './authHeader';
import { FormInputsDetail } from '../../components/form/formInput';
// helper
import getFormData from "../../util/helper/getFormData"

const ResetPassword = () => {
  const formRef = useRef(null)
  const [message, setMessage] = useState('')

  const inputs = [
    {id:"newPassword", name:"newPassword", type:"password", placeholder:"new password"},
    {id:"confirmPassword", name:"confirmPassword", type:"password", placeholder:"confirm password"}
  ]

  // TODO: change email and password
  // Request route
  const handleClick = (evt) => {
    evt.preventDefault()
    try {
      const requestData = getFormData(formRef)
    } catch (error) {
      const errorMessage = error?.requestMessage || error.response?.data?.message || 'Change failed, please try again.';
      setMessage(errorMessage)
    }
  }

  return (
    <>
    <div className="flex flex-col">

      <NavBar relative="1">
        <LeftBtn />
      </NavBar>

      <div className='w-[60%] max-w-[20rem] mx-auto mt-[15vh]'>
        <AuthHeader header="Reset Password" message={message}/>

        <form ref={formRef} className='mt-4'>
          <FormInputsDetail inputs={inputs}/>

          <div className='mt-4'>
            <FormBtn type="submit" value="Reset Password" handleClick={handleClick}/>
          </div>
        
        </form>
      </div>

    </div>
    </>
  );
};

export default ResetPassword;
