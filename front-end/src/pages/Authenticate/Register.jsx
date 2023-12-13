import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLink from '../../components/common/pageLink';
import AuthHeader from './authHeader';
import { FormInputs } from '../../components/form/formInput';
import FormBtn from '../../components/form/formBtn';
// helper
import axiosProvider from "../../util/api/axios"
import getFormData from '../../util/helper/getFormData';

const Register = () => {
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const formRef = useRef(null);

  const fields = ['username', 'email', 'password']
  
  const handleClick = async (evt) => {
    evt.preventDefault();
    
    try {
      const postData = getFormData(formRef)

      await axiosProvider.post(
        "/register",
        postData
      )

      setMessage("")
      navigate("/login")
      
    } catch (error) {
      const errorMessage = error.requestMessage || error.response?.data?.message || 'Login failed, please try again.';
      setMessage(errorMessage)
    }
  };

  return (
    <>
     <style>
     {`
          body::before {
            content: '';
            position: fixed; /* Cover the entire viewport */
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background-image: url('/river.jpeg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            filter: blur(0px); /* Apply the blur effect */
            z-index: -1; /* Ensure it's behind the content */
          }
        `}
       </style>
      <AuthHeader header="Register" message={message} />
      
      <form ref={formRef}>
        <FormInputs fields={fields} />
        <div className='mt-2'>
          <FormBtn handleClick={handleClick} />
        </div>
      </form>

      <div className='mt-2'>
        <PageLink to="/login" value="Login" />
      </div>
    </>
  );
};

export default Register;