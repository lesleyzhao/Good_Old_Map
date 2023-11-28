import { useState } from 'react'
import AuthHeader from './authHeader'
import PageLink from '../../components/common/pageLink'
import { FormInputs } from '../../components/form/formInput'
import FormBtn from '../../components/form/formBtn'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import axiosProvider from '../../util/api/axios'

const Login = () => {
  const [message, setMessage] = useState("")
  const fields = ["email", "password"]
  const formRef = useRef(null);
  const navigate = useNavigate();

  // click to login
  const handleClick = async (evt) => {
    evt.preventDefault();

    const formData = new FormData(formRef.current)
    const email = formData.get('email');
    const password = formData.get('password');

    const loginData = {
      email,
      password
    };
    console.log('Sending login request with:', loginData);

    const postOptions = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try{
      const response = await axiosProvider.post(
        "/login",
        loginData,
        postOptions
      )
        localStorage.setItem('token', response.data.accessToken); // Store the token
        const userData = {
          uuid: response.data.user.uuid,
          name: response.data.user.name,
          email: response.data.user.email
        };
        localStorage.setItem('user', JSON.stringify(userData))
        // console.log(response.data.user)
        setMessage("Login successful!");
        navigate("/")
      }
    catch(error){
      const errorMessage = error.response?.data?.message || 'Login failed, please try again.';
      setMessage(errorMessage);
    }
  }
  
  // if user click guest visit redirect to main map
  const handleGuest = (evt) => {
    evt.preventDefault()
    // pop up alert: confirm guest visit
    const continueGuest  = window.confirm('Guest visit will not save your data, continue?');
    if (continueGuest) {
      navigate("/", { state: { from: location.pathname } });
    }
  }
  

  return(
    <>
      <AuthHeader header="Login" message={message}/>
      <form ref={formRef} onSubmit = {handleClick}>
        <FormInputs fields={fields} />
        <div className='mt-2'>
          <FormBtn type="submit" handleClick={handleClick}/>
          <FormBtn value="Guest Visit" handleClick={handleGuest}/>
        </div>
      </form>
      <div className='mt-2'>
        <PageLink to="/register" value="Register"/>
        <PageLink to="/login" value="Forget Password"/>
      </div>
    </>
  )
}

export default Login