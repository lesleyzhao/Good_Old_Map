import React, { useState } from 'react';
import axiosProvider from "../../util/api/axios"
import PageLink from '../../components/common/pageLink';
import AuthHeader from './authHeader';
import { FormInputs } from '../../components/form/formInput';
import FormBtn from '../../components/form/formBtn';

const Register = () => {
  const [message, setMessage] = useState('');
  const fields = ['username', 'email', 'password'];

  const handleClick = async (evt) => {
    evt.preventDefault();

    const formData = {};
    fields.forEach((field) => {
      formData[field] = document.getElementById(field).value;
    });

    try {
      const response = await axiosProvider.post("/register", formData);
      setMessage(response.data.message);
      console.log(response);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed, please try again.';
      setMessage(errorMessage);
    }
  };

  return (
    <>
      <AuthHeader header="Register" message={message} />
      <form>
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