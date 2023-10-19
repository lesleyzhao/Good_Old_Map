import './Login.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import AuthForm from './AuthForm'
const Login = () => {
  const [message, setMessage] = useState("")
  const inputFields = ["username", "password"]
  // click to login
  const handleClick = (evt) => {
    evt.preventDefault()
    alert("login")
    setMessage("error message if login failed")
  }
  return(
    <>
    <div>
      <AuthForm 
        header="Login" 
        inputFields={inputFields}
        handleClick={handleClick}
        message={message}/>
      <Link to="/register">Register</Link>
      </div>
    </>
  )
}

export default Login