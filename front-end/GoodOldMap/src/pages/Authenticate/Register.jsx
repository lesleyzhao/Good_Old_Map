import './Register.css'
import { Link } from 'react-router-dom'
import AuthForm from './AuthForm'
const Register = () => {
  const inputFields = ["username", "email", "password"]
  const handleClick = (evt) => {
    evt.preventDefault()
    alert("send data to register")
  }
  return(
    <>
    <div>
      <AuthForm 
        header="Register"
        inputFields={inputFields}
        handleClick={handleClick}/>
      <Link to="/login">Login</Link>
      </div>
    </>
  )
}

export default Register