import { useState } from 'react'
import AuthHeader from './authHeader'
import PageLink from '../../components/common/pageLink'
import { FormInputs } from '../../components/form/formInput'
import FormBtn from '../../components/form/formBtn'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [message, setMessage] = useState("")
  const fields = ["username", "password"]
  const navigate = useNavigate();
  // click to login
  const handleClick = (evt) => {
    evt.preventDefault();
    setMessage("error message if login failed");
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
      <form>
        <FormInputs fields={fields}/>
        <div className='mt-2'>
          <FormBtn handleClick={handleClick}/>
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