import React, { useState } from 'react';
import axios from 'axios';
import PageLink from '../../components/common/pageLink';
import AuthHeader from './authHeader';
import { FormInputs } from '../../components/form/formInput';
import FormBtn from '../../components/form/formBtn';

const Register = () => {
  const [message, setMessage] = useState('');
  const fields = ['username', 'email', 'password'];

  const handleClick = async (evt) => {
    evt.preventDefault();

    const apiUrl = 'http://localhost:3000/register';

    const formData = {};
    fields.forEach((field) => {
      formData[field] = document.getElementById(field).value;
    });

    try {
      // Reset the message before making the new request
      setMessage('');

      const response = await axios.post(apiUrl, formData);
      setMessage(response.data.message);
      console.log(response);
    } catch (error) {
      setMessage(`Error: ${error.response.data.message}`);
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