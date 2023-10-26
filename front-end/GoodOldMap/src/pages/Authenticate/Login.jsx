import { useState } from 'react'
import { redirect, useNavigate } from 'react-router-dom'
import AuthHeader from '../../components/form/authHeader'
import PageLink from '../../components/common/pageLink'
import { FormInputs } from '../../components/form/formInput'
import FormBtn from '../../components/form/formBtn'

const Login = () => {
  const [message, setMessage] = useState("")
  const fields = ["username", "password"]
  const navigate = useNavigate();
  // click to login
  const handleClick = (evt) => {
    evt.preventDefault()
    setMessage("error message if login failed")
  }
  const handleGuest = (evt) => {
    evt.preventDefault()
    navigate("/")
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