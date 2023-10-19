import './Register.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import AuthForm from './AuthForm'
const Register = () => {
  const [message, setMessage] = useState("")
  const inputFields = ["username", "email", "password"]
  // click to register
  const handleClick = (evt) => {
    evt.preventDefault()
    alert("register")
    setMessage("error message if register fails")
  }
  return(
    <>
    <div>
      <AuthForm 
        header="Register"
        inputFields={inputFields}
        handleClick={handleClick}
        message={message}/>
      <Link to="/login">Login</Link>
      </div>
    </>
  )
}

export default Register