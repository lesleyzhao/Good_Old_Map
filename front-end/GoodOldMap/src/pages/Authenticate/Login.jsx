import './Login.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import AuthHeader from '../../components/form/authHeader'
import { FormInputs } from '../../components/form/formInput'
import FormBtn from '../../components/form/formBtn'

const Login = () => {
  const [message, setMessage] = useState("")
  const fields = ["username", "password"]
  // click to login
  const handleClick = (evt) => {
    evt.preventDefault()
    alert("login")
    setMessage("error message if login failed")
  }
  return(
    <>
    <div>
      <AuthHeader header="Login" message={message}/>
      <form>
        <FormInputs fields={fields}/>
        <FormBtn handleClick={handleClick}/>
      </form>
      <Link to="/register">Register</Link>
      </div>
    </>
  )
}

export default Login