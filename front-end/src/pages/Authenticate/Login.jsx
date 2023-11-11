import { useState } from 'react'
import AuthHeader from './authHeader'
import PageLink from '../../components/common/pageLink'
import { FormInputs } from '../../components/form/formInput'
import FormBtn from '../../components/form/formBtn'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'

const Login = () => {
  const [message, setMessage] = useState("")
  const fields = ["username", "password"]
  const formRef = useRef(null);
  const navigate = useNavigate();

  // click to login
  const handleClick = async (evt) => {
    evt.preventDefault();

    const formData = new FormData(formRef.current)
    const username = formData.get('username');
    const password = formData.get('password');

    const loginData = {
      username,
      password
    };
    console.log('Sending login request with:', loginData);
    try{
      //console.log('Sending login request with:', loginData);

      const response = await fetch("http://localhost:3000/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
        //credentials:'include'
      });

      const data = await response.json();
      if(response.ok){
        setMessage("Login successful!");
        navigate("/")
      }else{
        throw data.message || 'Login failed, please try again.';
      }
    }catch(error){
      setMessage(error.message);
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