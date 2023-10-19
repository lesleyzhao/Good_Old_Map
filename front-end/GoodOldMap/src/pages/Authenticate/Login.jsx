import './Login.css'
import { Link } from 'react-router-dom'
import AuthForm from './AuthForm'
const Login = () => {
  const inputFields = ["username", "password"]
  const handleClick = (evt) => {
    evt.preventDefault()
    alert("send data")
  }
  return(
    <>
    <div>
      <AuthForm 
        header="Login" 
        inputFields={inputFields}
        handleClick={handleClick}
        message="username or password is not correct"/>
      <Link to="/register">Register</Link>
      </div>
    </>
  )
}

export default Login